const { expect } = require('@playwright/test');
const { logger } = require('../support/logger');
const { LoginBL } = require('./loginBL');
const { DashboardPage } = require('../pages/dashboardPage');

const log = logger('DashboardBL');

class DashboardBL {
  constructor(page) {
    this.page = page;
    this.dashboardPage = new DashboardPage(page);
  }

  async verifyCoreBlocksAfterLogin() {
    await new LoginBL(this.page).login();
    await expect(this.dashboardPage.watchlist()).toBeVisible();
    await expect(this.dashboardPage.funds()).toBeVisible();
    await expect(this.dashboardPage.screeners()).toBeVisible();
    await expect(this.dashboardPage.topStocks()).toBeVisible();
    log.info('Dashboard core blocks are visible');
    return true;
  }

  async verifyWatchlistAfterLogin() {
    await new LoginBL(this.page).login();
    await expect(this.dashboardPage.watchlist()).toBeVisible();
    log.info('Watchlist is visible');
    return true;
  }

  async openWatchlistStock(symbol) {
    await this.dashboardPage.openWatchlistStock(symbol);
    log.info(`Opened watchlist stock ${symbol}`);
    return this.dashboardPage;
  }
}

module.exports = { DashboardBL };
