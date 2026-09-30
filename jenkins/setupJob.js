const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true });

const { JenkinsClient } = require('./jenkinsClient');
const { jobXml } = require('./jobXml');
const { secretTextXml } = require('./credentialXml');

const SECRET_IDS = ['TIQS_MOBILE', 'TIQS_OTP', 'TIQS_PIN'];

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Set ${name} in .env before running jenkins:setup`);
  }
  return value;
}

function jobSettings() {
  return {
    name: process.env.JENKINS_JOB_NAME || 'web-automation',
    description: 'Web automation — Playwright JS. Params: BRANCH, GROUP, CLASS, TEST_CASE, BROWSER.',
    gitUrl: process.env.JENKINS_GIT_URL || 'https://github.com/WiseOwlTech/tiqsWebAutomation.git',
    gitCredentialsId: required('JENKINS_GIT_CREDENTIALS_ID'),
    branch: process.env.JENKINS_GIT_BRANCH || 'web-automation',
    scriptPath: 'Jenkinsfile',
  };
}

async function syncCredentials(client) {
  for (const id of SECRET_IDS) {
    const xml = secretTextXml({ id, secret: required(id), description: `TIQS web automation ${id}` });
    console.log(`Credential ${id}: ${await client.upsertCredential(id, xml)}`);
  }
}

async function main() {
  const client = new JenkinsClient({
    url: required('JENKINS_URL'),
    user: required('JENKINS_USER'),
    token: required('JENKINS_TOKEN'),
  });
  const settings = jobSettings();

  await syncCredentials(client);
  console.log(`Job ${settings.name}: ${await client.upsertJob(settings.name, jobXml(settings))}`);
  console.log(`Open ${client.baseUrl}/job/${encodeURIComponent(settings.name)}/build?delay=0sec`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
