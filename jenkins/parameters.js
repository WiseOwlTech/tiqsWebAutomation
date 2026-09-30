const { escapeXml } = require('./xml');

// Must stay in sync with the parameters block in the Jenkinsfile.
const PARAMETERS = [
  { type: 'string', name: 'BRANCH', value: 'web-automation', description: 'Git branch. Type any branch name.' },
  { type: 'string', name: 'GROUP', value: '', description: 'Optional group, matching a describe title such as Login PIN.' },
  { type: 'string', name: 'CLASS', value: '', description: 'Optional spec, such as login or tests/login.spec.js.' },
  { type: 'string', name: 'TEST_CASE', value: '', description: 'Optional test title.' },
  {
    type: 'choice',
    name: 'BROWSER',
    choices: ['chromium', 'chrome', 'safari', 'firefox', 'edge', 'opera'],
    description: 'Browser. Safari runs the WebKit engine.',
  },
  {
    type: 'choice',
    name: 'MODE',
    choices: ['headless', 'headed'],
    description: 'headless = no UI. headed = live browser; auto-opens on jenkin-m1 if autoOpenLiveView.sh is running.',
  },
];

function stringParameter({ name, value, description }) {
  return `
        <hudson.model.StringParameterDefinition>
          <name>${escapeXml(name)}</name>
          <description>${escapeXml(description)}</description>
          <defaultValue>${escapeXml(value)}</defaultValue>
          <trim>true</trim>
        </hudson.model.StringParameterDefinition>`;
}

function choiceParameter({ name, choices, description }) {
  const items = choices.map((choice) => `<string>${escapeXml(choice)}</string>`).join('');
  return `
        <hudson.model.ChoiceParameterDefinition>
          <name>${escapeXml(name)}</name>
          <description>${escapeXml(description)}</description>
          <choices class="java.util.Arrays$ArrayList"><a class="string-array">${items}</a></choices>
        </hudson.model.ChoiceParameterDefinition>`;
}

function parametersXml() {
  const body = PARAMETERS.map((p) => (p.type === 'choice' ? choiceParameter(p) : stringParameter(p))).join('');
  return `
    <hudson.model.ParametersDefinitionProperty>
      <parameterDefinitions>${body}
      </parameterDefinitions>
    </hudson.model.ParametersDefinitionProperty>`;
}

module.exports = { parametersXml };
