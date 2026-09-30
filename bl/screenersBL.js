const { expect } = require('@playwright/test');
const { logger } = require('../support/logger');
const { LoginBL } = require('./loginBL');
const { DashboardPage } = require('../pages/dashboardPage');
const { ScreenersPage } = require('../pages/screenersPage');

const log = logger('ScreenersBL');

class ScreenersBL {
  constructor(page) {
    this.page = page;
    this.dashboardPage = new DashboardPage(page);
    this.screenersPage = new ScreenersPage(page);
  }

  async verifyTopStocksListing() {
    await new LoginBL(this.page).login();
    await this.dashboardPage.openTopStocks();
    await expect(this.screenersPage.listing()).toBeVisible();
    log.info('Top stocks listing is visible');
    return true;
  }

  async verifyTopGainersFilter() {
    await this.verifyTopStocksListing();
    await this.screenersPage.selectFilter('Top Gainers');
    await expect(this.screenersPage.filter('Top Gainers')).toBeVisible();
    log.info('Top Gainers filter is visible');
    return true;
  }
}

module.exports = { ScreenersBL };
