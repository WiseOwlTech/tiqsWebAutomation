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
    const home = this.dashboardPage.home;
    await expect(home.pageRoot()).toBeVisible();
    await expect(home.summaryCards()).toBeVisible();
    await expect(home.fundsCard()).toBeVisible();
    await expect(home.addFundsButton()).toBeVisible();
    await expect(home.holdingsCard()).toBeVisible();
    await expect(home.positionsCard()).toBeVisible();
    await expect(home.screeners()).toBeVisible();
    await expect(home.todaysTopStocks()).toBeVisible();
    await expect(home.quickTrade()).toBeVisible();
    await expect(home.indices()).toBeVisible();
    log.info('Home locator blocks are visible');
    return true;
  }

  async verifyWatchlistAfterLogin() {
    await new LoginBL(this.page).login();
    await this.page.goto('/watchlist');
    await expect(this.page.getByTestId('watchlist')).toBeVisible();
    await expect(this.page.getByTestId('watchlist-search-input')).toBeVisible();
    log.info('Watchlist locator blocks are visible');
    return true;
  }

  async openWatchlistStock(symbol) {
    await this.dashboardPage.openWatchlistStock(symbol);
    log.info(`Opened watchlist stock ${symbol}`);
    return this.dashboardPage;
  }
}

module.exports = { DashboardBL };
