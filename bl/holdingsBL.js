const { expect } = require('@playwright/test');
const { logger } = require('../support/logger');
const { LoginBL } = require('./loginBL');
const { HoldingsPage } = require('../pages/holdingsPage');

const log = logger('HoldingsBL');

class HoldingsBL {
  constructor(page) {
    this.page = page;
    this.holdingsPage = new HoldingsPage(page);
  }

  async loginAndOpen() {
    await new LoginBL(this.page).login();
    await this.holdingsPage.open();
    return this;
  }

  async verifyLocatorsAfterLogin() {
    await this.loginAndOpen();
    await expect(this.holdingsPage.pageRoot()).toBeVisible();
    await expect(this.holdingsPage.content()).toBeVisible();
    await expect(this.holdingsPage.summary()).toBeVisible();
    log.info('Holdings locator blocks are visible');
    return true;
  }

  /** Case 110 — summary labels currently under holdings-summary */
  async verifyHoldingsSummary() {
    await this.loginAndOpen();
    const summary = this.holdingsPage.summary();
    await expect(summary).toBeVisible();
    await expect(summary.getByText(/Invested Value/i).first()).toBeVisible();
    await expect(summary.getByText(/Current Value/i).first()).toBeVisible();
    await expect(summary.getByText(/Today'?s P&L/i).first()).toBeVisible();
    await expect(summary.getByText(/Overall P&L/i).first()).toBeVisible();
    log.info('Case 110: holdings summary');
    return true;
  }
}

module.exports = { HoldingsBL };
