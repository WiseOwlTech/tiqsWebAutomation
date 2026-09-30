# TIQS Web Automation

Playwright JavaScript tests for [https://app.dev.tiqs.in/](https://app.dev.tiqs.in/).

## Layout

- `tests/` calls only a BL class
- `bl/` holds the flow and the assertions
- `pages/` performs Playwright actions
- `locators/` holds `data-testid` values
- `config/config.properties` holds the URL, mobile number, OTP, and MPIN

Logs are written to `logs/framework.log`.

## Run

```bash
npm install
npx playwright install chromium
npm test
```

`npm test` runs the login spec. `npm run test:headed` shows the browser. `npm run test:all` runs every spec.

Login secrets come from `.env` (`TIQS_MOBILE`, `TIQS_OTP`, `TIQS_PIN`). Copy `.env.example` to `.env` and fill the values. Do not commit `.env`.

## Jenkins

The `Jenkinsfile` runs the login spec on the branch. Create a Pipeline job from SCM, point it at `web-automation`, and set the script path to `Jenkinsfile`.

Add three Secret text credentials with these IDs:

- `TIQS_MOBILE`
- `TIQS_OTP`
- `TIQS_PIN`

The agent needs Node.js and npm on `PATH`. The job parameter `BROWSER` defaults to `chromium`. On a Linux agent, `npx playwright install --with-deps` installs the browser and its system libraries. HTML and JUnit results are archived from `playwright-report/` and `test-results/junit.xml`.

## Browser

The default project is Chromium. Headless mode comes from `headless` in `config/config.properties`.
