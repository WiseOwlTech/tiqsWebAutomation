const { test: base, expect } = require('@playwright/test');
const { LoginBL } = require('../bl/loginBL');
const { DashboardBL } = require('../bl/dashboardBL');
const { ScreenersBL } = require('../bl/screenersBL');
const { EarlySignalsBL } = require('../bl/earlySignalsBL');
const { ProfileBL } = require('../bl/profileBL');
const { StockDetailBL } = require('../bl/stockDetailBL');
const { ExitOrderBL } = require('../bl/exitOrderBL');

/**
 * Shared Playwright fixtures. Specs take a BL from here instead of constructing it.
 */
const test = base.extend({
  loginBL: async ({ page }, use) => {
    await use(new LoginBL(page));
  },
  dashboardBL: async ({ page }, use) => {
    await use(new DashboardBL(page));
  },
  screenersBL: async ({ page }, use) => {
    await use(new ScreenersBL(page));
  },
  earlySignalsBL: async ({ page }, use) => {
    await use(new EarlySignalsBL(page));
  },
  profileBL: async ({ page }, use) => {
    await use(new ProfileBL(page));
  },
  stockDetailBL: async ({ page }, use) => {
    await use(new StockDetailBL(page));
  },
  exitOrderBL: async ({ page }, use) => {
    await use(new ExitOrderBL(page));
  },
});

module.exports = { test, expect };
