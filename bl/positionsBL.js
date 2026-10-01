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

  async loginAndOpen() {
    await new LoginBL(this.page).login();
    await this.positionsPage.open();
    return this;
  }

  async verifyLocatorsAfterLogin() {
    await this.loginAndOpen();
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

  /** Case 117 */
  async verifyPositionsSummary() {
    await this.loginAndOpen();
    await expect(this.positionsPage.bookedProfit()).toBeVisible();
    await expect(this.positionsPage.openPnl()).toBeVisible();
    await expect(this.positionsPage.totalProfit()).toBeVisible();
    await expect(this.positionsPage.positions.totalPct()).toBeVisible();
    log.info('Case 117: positions summary');
    return true;
  }
}

module.exports = { PositionsBL };
