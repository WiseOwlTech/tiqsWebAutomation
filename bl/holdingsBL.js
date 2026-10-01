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

  async verifyLocatorsAfterLogin() {
    await new LoginBL(this.page).login();
    await this.holdingsPage.open();
    await expect(this.holdingsPage.pageRoot()).toBeVisible();
    await expect(this.holdingsPage.content()).toBeVisible();
    await expect(this.holdingsPage.summary()).toBeVisible();
    log.info('Holdings locator blocks are visible');
    return true;
  }
}

module.exports = { HoldingsBL };
