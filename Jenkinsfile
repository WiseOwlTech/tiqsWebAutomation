pipeline {
    agent any

    parameters {
        string(
            name: 'BRANCH',
            defaultValue: 'web-automation',
            description: 'Git branch. Type any branch name.',
            trim: true
        )
        string(
            name: 'GROUP',
            defaultValue: '',
            description: 'Optional group, matching a describe title such as Login PIN. Leave empty to skip this filter.',
            trim: true
        )
        string(
            name: 'CLASS',
            defaultValue: '',
            description: 'Optional spec, such as login or tests/login.spec.js. Leave empty to run the login spec.',
            trim: true
        )
        string(
            name: 'TEST_CASE',
            defaultValue: '',
            description: 'Optional test title. Leave empty to run every test in the selected spec.',
            trim: true
        )
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'chrome', 'safari', 'firefox', 'edge', 'opera'],
            description: 'Browser. Safari runs the WebKit engine. Opera uses the Opera app installed on the agent.'
        )
        choice(
            name: 'MODE',
            choices: ['headless', 'headed'],
            description: 'headless = no UI (faster). headed = show browser in noVNC at http://192.168.4.30:6080/vnc.html'
        )
    }

    environment {
        CI = 'true'
        PATH = "${env.HOME}/.local/node-v22.20.0/bin:${env.PATH}"
    }

    options {
        timestamps()
        timeout(time: 45, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    def branch = params.BRANCH?.trim() ?: 'web-automation'
                    if (!(branch ==~ /[A-Za-z0-9._\/-]+/)) {
                        error("Invalid branch name: ${branch}")
                    }
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "*/${branch}"]],
                        doGenerateSubmoduleConfigurations: false,
                        extensions: scm.extensions,
                        userRemoteConfigs: scm.userRemoteConfigs
                    ])
                }
            }
        }

        stage('Install') {
            steps {
                sh '''
                  if ! command -v npm >/dev/null 2>&1; then
                    NODE_VERSION=22.20.0
                    case "$(uname -m)" in
                      aarch64|arm64) ARCH=arm64 ;;
                      x86_64|amd64) ARCH=x64 ;;
                      *) echo "Unsupported CPU: $(uname -m)"; exit 1 ;;
                    esac
                    mkdir -p "${HOME}/.local"
                    curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${ARCH}.tar.gz" | tar -xz -C "${HOME}/.local"
                    rm -rf "${HOME}/.local/node-v${NODE_VERSION}"
                    mv "${HOME}/.local/node-v${NODE_VERSION}-linux-${ARCH}" "${HOME}/.local/node-v${NODE_VERSION}"
                    export PATH="${HOME}/.local/node-v${NODE_VERSION}/bin:${PATH}"
                  fi
                  npm ci
                  # One install covers Chromium, Firefox, and WebKit (Safari).
                  # Chrome, Edge, and Opera are separate apps and are not in this set.
                  if [ "$(id -u)" -eq 0 ]; then
                    npx playwright install-deps
                  elif command -v sudo >/dev/null 2>&1 && sudo -n true >/dev/null 2>&1; then
                    sudo -E env "PATH=${PATH}" npx playwright install-deps
                  fi
                  npx playwright install chromium firefox webkit
                '''
            }
        }

        stage('Test') {
            steps {
                withCredentials([
                    string(credentialsId: 'TIQS_MOBILE', variable: 'TIQS_MOBILE'),
                    string(credentialsId: 'TIQS_OTP', variable: 'TIQS_OTP'),
                    string(credentialsId: 'TIQS_PIN', variable: 'TIQS_PIN')
                ]) {
                    sh '''
                      bash -s <<'BASH'
                      set -euo pipefail
                      MODE="${MODE:-headless}"

                      if [ "${MODE}" = "headed" ]; then
                        if ! command -v Xvfb >/dev/null 2>&1 || ! command -v x11vnc >/dev/null 2>&1 || ! command -v websockify >/dev/null 2>&1; then
                          echo "Live view is not installed in this Jenkins container."
                          echo "On the Jenkins machine run:"
                          echo "  curl -fsSL -o /tmp/enableLiveView.sh https://raw.githubusercontent.com/WiseOwlTech/tiqsWebAutomation/web-automation/jenkins/enableLiveView.sh"
                          echo "  bash /tmp/enableLiveView.sh"
                          exit 1
                        fi

                        export DISPLAY=:99
                        export PLAYWRIGHT_HEADED=1
                        if ! xdpyinfo -display :99 >/dev/null 2>&1; then
                          JENKINS_NODE_COOKIE=dontKillMe nohup Xvfb :99 -screen 0 1440x900x24 -ac +extension GLX +render -noreset >/tmp/xvfb.log 2>&1 &
                          sleep 1
                        fi
                        if ! xdpyinfo -display :99 >/dev/null 2>&1; then
                          echo "Xvfb did not start. See /tmp/xvfb.log"
                          exit 1
                        fi
                        if ! bash -c 'echo >/dev/tcp/127.0.0.1/5900' >/dev/null 2>&1; then
                          JENKINS_NODE_COOKIE=dontKillMe nohup x11vnc -display :99 -nopw -forever -shared -rfbport 5900 >/tmp/x11vnc.log 2>&1 &
                        fi
                        if ! bash -c 'echo >/dev/tcp/127.0.0.1/6080' >/dev/null 2>&1; then
                          JENKINS_NODE_COOKIE=dontKillMe nohup websockify --web=/usr/share/novnc 6080 localhost:5900 >/tmp/novnc.log 2>&1 &
                        fi
                        echo "Live view: open http://192.168.4.30:6080/vnc.html and click Connect"
                      else
                        unset DISPLAY || true
                        export PLAYWRIGHT_HEADED=0
                        echo "Running headless (no live browser UI)"
                      fi

                      case "${BROWSER}" in
                        safari) PROJECT=webkit ;;
                        chrome|chromium|firefox|edge|opera) PROJECT="${BROWSER}" ;;
                        *) echo "Unknown browser: ${BROWSER}"; exit 1 ;;
                      esac

                      if [ -z "${CLASS}" ]; then
                        SPEC="tests/login.spec.js"
                      elif printf '%s' "${CLASS}" | grep -q '^tests/'; then
                        SPEC="${CLASS}"
                      elif printf '%s' "${CLASS}" | grep -q '\\.spec\\.js$'; then
                        SPEC="tests/${CLASS}"
                      else
                        SPEC="tests/${CLASS}.spec.js"
                      fi

                      set -- npx playwright test "${SPEC}" --project="${PROJECT}" --workers=1
                      if [ -n "${GROUP}" ]; then
                        set -- "$@" --grep "${GROUP}"
                      fi
                      if [ -n "${TEST_CASE}" ]; then
                        set -- "$@" --grep "${TEST_CASE}"
                      fi
                      "$@"
BASH
                    '''
                }
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'test-results/junit.xml'
            archiveArtifacts artifacts: 'playwright-report/**,test-results/**,logs/framework.log', allowEmptyArchive: true
        }
    }
}
