const { expect } = require('@playwright/test');
const { logger } = require('../support/logger');
const { LoginBL } = require('./loginBL');
const { PositionsPage } = require('../pages/positionsPage');

const log = logger('PositionsBL');

class PositionsBL {
  constructor(page) {
    this.page = page;
    this.positionsPage = new PositionsPage(page);
  }

  async verifyLocatorsAfterLogin() {
    await new LoginBL(this.page).login();
    await this.positionsPage.open();
    await expect(this.positionsPage.positions.pageRoot()).toBeVisible();
    await expect(this.positionsPage.title()).toBeVisible();
    await expect(this.positionsPage.summary()).toBeVisible();
    await expect(this.positionsPage.bookedProfit()).toBeVisible();
    await expect(this.positionsPage.openPnl()).toBeVisible();
    await expect(this.positionsPage.totalProfit()).toBeVisible();
    await expect(this.positionsPage.positions.searchInput()).toBeVisible();
    await expect(this.positionsPage.positions.downloadButton()).toBeVisible();
    log.info('Positions locator blocks are visible');
    return true;
  }
}

module.exports = { PositionsBL };
