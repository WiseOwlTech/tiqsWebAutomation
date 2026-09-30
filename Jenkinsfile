pipeline {
    agent any

    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit', 'chrome', 'edge'],
            description: 'Playwright project to run'
        )
    }

    environment {
        CI = 'true'
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps ${BROWSER}'
            }
        }

        stage('Test') {
            steps {
                withCredentials([
                    string(credentialsId: 'TIQS_MOBILE', variable: 'TIQS_MOBILE'),
                    string(credentialsId: 'TIQS_OTP', variable: 'TIQS_OTP'),
                    string(credentialsId: 'TIQS_PIN', variable: 'TIQS_PIN')
                ]) {
                    sh 'npx playwright test tests/login.spec.js --project=${BROWSER} --workers=1'
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
