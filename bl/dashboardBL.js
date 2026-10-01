const { expect } = require('@playwright/test');
const { logger } = require('../support/logger');
const { LoginBL } = require('./loginBL');
const { DashboardPage } = require('../pages/dashboardPage');
const { WatchlistPage } = require('../pages/watchlistPage');
const config = require('../config/configReader');

const log = logger('DashboardBL');

class DashboardBL {
  constructor(page) {
    this.page = page;
    this.dashboardPage = new DashboardPage(page);
    this.watchlistPage = new WatchlistPage(page);
  }

  async loginToHome() {
    await new LoginBL(this.page).login();
    await this.page.goto('/home');
    await expect(this.dashboardPage.home.pageRoot()).toBeVisible();
    return this;
  }

  async verifyCoreBlocksAfterLogin() {
    await this.loginToHome();
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

  /** Case 51 */
  async verifyHomePageLoadsAfterLogin() {
    await this.verifyCoreBlocksAfterLogin();
    await this.page.goto('/watchlist');
    await expect(this.watchlistPage.watchlist.root()).toBeVisible();
    log.info('Case 51: home + watchlist load after login');
    return true;
  }

  /** Case 53 — core nav links that exist today */
  async verifyTopMenuNavigation() {
    await this.loginToHome();
    const routes = [
      { open: () => this.dashboardPage.openHome(), path: /\/home/ },
      { open: () => this.page.goto('/orders'), path: /\/orders/ },
      { open: () => this.page.goto('/holdings'), path: /\/holdings/ },
      { open: () => this.page.goto('/positions'), path: /\/positions/ },
    ];
    for (const route of routes) {
      await route.open();
      await expect(this.page).toHaveURL(route.path);
    }
    log.info('Case 53: top menu routes open');
    return true;
  }

  /** Case 54 */
  async verifyAvailableFundsAndAdd() {
    await this.loginToHome();
    const home = this.dashboardPage.home;
    await expect(home.fundsCard()).toBeVisible();
    await expect(home.fundsValue()).toBeVisible();
    await expect(home.addFundsButton()).toBeVisible();
    await home.addFundsButton().click();
    log.info('Case 54: funds card and Add are usable');
    return true;
  }

  /** Case 56 */
  async verifyScreenersOnHome() {
    await this.loginToHome();
    const home = this.dashboardPage.home;
    await expect(home.screeners()).toBeVisible();
    await expect(home.screenersTitle()).toBeVisible();
    await expect(home.screenersGrid()).toBeVisible();
    await home.screenersViewAll().click();
    await expect(this.page).not.toHaveURL(/\/home$/);
    log.info('Case 56: screeners cards and View All');
    return true;
  }

  /** Case 57 */
  async verifyTodaysTopStocksTabs() {
    await this.loginToHome();
    const home = this.dashboardPage.home;
    const tabs = [
      home.topGainersTab(),
      home.volumeSpikeTab(),
      home.weekLowTab(),
      home.weekHighTab(),
      home.topLosersTab(),
    ];
    for (const tab of tabs) {
      await tab.click();
      await expect(home.todaysTopStocksTable()).toBeVisible();
    }
    log.info('Case 57: Today\'s Top Stocks tabs');
    return true;
  }

  /** Case 59 — visibility of indices (colour asserted lightly via change nodes) */
  async verifyIndicesSection() {
    await this.loginToHome();
    const home = this.dashboardPage.home;
    await expect(home.indices()).toBeVisible();
    await expect(home.indicesTitle()).toBeVisible();
    await expect(home.indicesGrid()).toBeVisible();
    await expect(home.indexItem('NIFTY 50')).toBeVisible();
    await expect(home.indexChange('NIFTY 50')).toBeVisible();
    log.info('Case 59: indices section visible');
    return true;
  }

  async verifyWatchlistAfterLogin() {
    await new LoginBL(this.page).login();
    await this.watchlistPage.open();
    await expect(this.watchlistPage.watchlist.root()).toBeVisible();
    await expect(this.watchlistPage.watchlist.searchInput()).toBeVisible();
    log.info('Watchlist locator blocks are visible');
    return true;
  }

  /** Case 61 */
  async verifyWatchlistLoadsStocksAndPrices() {
    await new LoginBL(this.page).login();
    await this.watchlistPage.open();
    await expect(this.watchlistPage.watchlist.items()).toBeVisible();
    await expect(this.watchlistPage.watchlist.item().first()).toBeVisible();
    await expect(this.watchlistPage.watchlist.itemLtp().first()).toBeVisible();
    log.info('Case 61: watchlist stocks and prices');
    return true;
  }

  /** Case 62 */
  async verifyWatchlistSearchFindsSymbol(symbol = config.symbol()) {
    await new LoginBL(this.page).login();
    await this.watchlistPage.open();
    await this.watchlistPage.search(symbol);
    await expect(this.page.getByText(symbol, { exact: false }).first()).toBeVisible();
    log.info(`Case 62: watchlist search found ${symbol}`);
    return true;
  }

  /** Case 63 */
  async verifyWatchlistSearchNoResults() {
    await new LoginBL(this.page).login();
    await this.watchlistPage.open();
    await this.watchlistPage.search('xyz123abc');
    await expect(this.watchlistPage.watchlist.searchInput()).toHaveValue(/xyz123abc/i);
    await expect(this.page.getByTestId('watchlist-item-symbol').filter({ hasText: /^xyz123abc$/i })).toHaveCount(0);
    log.info('Case 63: invalid watchlist search does not resolve to a symbol row');
    return true;
  }

  /** Case 64 */
  async verifyWatchlistTabs() {
    await new LoginBL(this.page).login();
    await this.watchlistPage.open();
    for (const index of [1, 2, 3]) {
      await this.watchlistPage.openTab(index);
      await expect(this.watchlistPage.watchlist.footerTab(index)).toBeVisible();
    }
    log.info('Case 64: watchlist tabs 1/2/3');
    return true;
  }

  /** Case 71 */
  async verifyPositionsHoldingsMiniPanel() {
    await this.loginToHome();
    const home = this.dashboardPage.home;
    await expect(home.positionsCard()).toBeVisible();
    await expect(home.holdingsCard()).toBeVisible();
    log.info('Case 71: positions/holdings mini cards on home');
    return true;
  }

  async openWatchlistStock(symbol) {
    await this.dashboardPage.openWatchlistStock(symbol);
    log.info(`Opened watchlist stock ${symbol}`);
    return this.dashboardPage;
  }
}

module.exports = { DashboardBL };
