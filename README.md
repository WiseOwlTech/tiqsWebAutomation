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

## Browser

The default project is Chromium. Headless mode comes from `headless` in `config/config.properties`.
