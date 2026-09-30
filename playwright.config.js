const { defineConfig, devices } = require('@playwright/test');
const config = require('./config/configReader');

module.exports = defineConfig({
  testDir: './tests',
  timeout: config.number('default.timeout.ms', 30000),
  retries: config.number('retry.count', 0),
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: config.url(),
    headless: config.bool('headless', true),
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
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
  ],
});
