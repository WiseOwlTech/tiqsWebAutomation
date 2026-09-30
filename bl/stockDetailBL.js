const { expect } = require('@playwright/test');
const config = require('../config/configReader');
const { logger } = require('../support/logger');
const { LoginBL } = require('./loginBL');
const { DashboardPage } = require('../pages/dashboardPage');
const { StockDetailPage } = require('../pages/stockDetailPage');

const log = logger('StockDetailBL');
const TABS = ['Chart', 'Overview', 'Option Chain', 'Fundamentals', 'Technicals', 'News'];

class StockDetailBL {
  constructor(page) {
    this.page = page;
    this.stockDetailPage = new StockDetailPage(page);
  }

  async openSampleStock() {
    await new LoginBL(this.page).login();
    await new DashboardPage(this.page).openWatchlistStock(config.symbol());
    return this.stockDetailPage;
  }

  async verifyAllPrimaryTabs() {
    await this.openSampleStock();
    for (const name of TABS) {
      await this.stockDetailPage.openTab(name);
      await expect(this.stockDetailPage.tab(name)).toBeVisible();
    }
    log.info('Visited all primary stock detail tabs');
    return true;
  }

  async verifyOverviewStockScore() {
    await this.openSampleStock();
    await this.stockDetailPage.openTab('Overview');
    await expect(this.stockDetailPage.section('Stock Score')).toBeVisible();
    log.info('Stock score section is visible');
    return true;
  }

  async verifyNewsCards() {
    await this.openSampleStock();
    await this.stockDetailPage.openTab('News');
    await expect(this.stockDetailPage.tab('News')).toBeVisible();
    log.info('News tab is visible');
    return true;
  }
}

module.exports = { StockDetailBL };
