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

The `Jenkinsfile` runs the login spec on the branch.

To create the job from code, fill the `JENKINS_*` values in `.env` and run `npm run jenkins:setup`. It creates or updates the Pipeline job and the three TIQS secret text credentials through the Jenkins REST API. `JENKINS_TOKEN` is an API token from your Jenkins user page. `JENKINS_GIT_CREDENTIALS_ID` is the GitHub credential ID Jenkins already uses for other jobs. Running it again updates the job instead of duplicating it.

To create the job by hand instead, make a Pipeline job from SCM, point it at `web-automation`, and set the script path to `Jenkinsfile`.

Add three Secret text credentials with these IDs:

- `TIQS_MOBILE`
- `TIQS_OTP`
- `TIQS_PIN`

The pipeline installs Node 22 into the Jenkins home directory when `npm` is not already on `PATH`. Build parameters:

- `BRANCH` is a text field. Type any branch name. The default is `web-automation`.
- `GROUP` is optional. It matches a `test.describe` title, such as `Login PIN`.
- `CLASS` is optional. Use `login` or `tests/login.spec.js`. Empty runs the login spec.
- `TEST_CASE` is optional. It matches one test title. Empty runs the whole spec.
- `BROWSER` is a dropdown: `chromium`, `chrome`, `safari`, `firefox`, `edge`, `opera`. Safari runs WebKit. Opera needs the Opera app on the agent (`OPERA_PATH` can point at the executable).

On a Linux agent, `npx playwright install --with-deps` installs the browser and its system libraries. HTML and JUnit results are archived from `playwright-report/` and `test-results/junit.xml`.

## Browser

The default project is Chromium. Headless mode comes from `headless` in `config/config.properties`.
