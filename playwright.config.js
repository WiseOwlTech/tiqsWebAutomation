const fs = require('fs');
const { defineConfig, devices } = require('@playwright/test');
const config = require('./config/configReader');
const { isHeaded, slowMoMs } = require('./support/pace');

function operaExecutable() {
  if (process.env.OPERA_PATH) {
    return process.env.OPERA_PATH;
  }
  const mac = '/Applications/Opera.app/Contents/MacOS/Opera';
  if (fs.existsSync(mac)) {
    return mac;
  }
  return '/usr/bin/opera';
}

const headed = isHeaded();
const slowMo = slowMoMs();
const defaultTimeout = headed
  ? config.number('headed.timeout.ms', 90000)
  : config.number('default.timeout.ms', 30000);

module.exports = defineConfig({
  testDir: './tests',
  timeout: defaultTimeout,
  retries: config.number('retry.count', 0),
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }], ['junit', { outputFile: 'test-results/junit.xml' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: config.url(),
    headless: !headed,
    launchOptions: slowMo > 0 ? { slowMo } : {},
    screenshot: process.env.CI ? 'on' : 'only-on-failure',
    video: process.env.CI ? 'on' : 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: config.number('action.timeout.ms', 15000),
    navigationTimeout: config.number('navigation.timeout.ms', 45000),
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'opera',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          executablePath: operaExecutable(),
          ...(slowMo > 0 ? { slowMo } : {}),
        },
      },
    },
  ],
});
