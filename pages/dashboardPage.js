const { AppbarLocators } = require('../locators/appbarLocators');
const { HomeLocators } = require('../locators/homeLocators');
const { pause } = require('../support/pace');

/**
 * Home / dashboard actions. Locators come from HomeLocators + AppbarLocators.
 */
class DashboardPage {
  constructor(page) {
    this.page = page;
    this.appbar = new AppbarLocators(page);
    this.home = new HomeLocators(page);
  }

  watchlist() {
    return this.appbar.watchlistNav();
  }

  funds() {
    return this.home.fundsCard();
  }

  screeners() {
    return this.home.screeners();
  }

  topStocks() {
    return this.home.todaysTopStocks();
  }

  async openHome() {
    await this.appbar.homeNav().click();
    await this.home.pageRoot().waitFor({ state: 'visible' });
    await pause(this.page);
    return this;
  }

  async openOrders() {
    await this.appbar.ordersNav().click();
    await pause(this.page);
    return this;
  }

  async openHoldings() {
    await this.appbar.holdingsNav().click();
    await pause(this.page);
    return this;
  }

  async openPositions() {
    await this.appbar.positionsNav().click();
    await pause(this.page);
    return this;
  }

  async openWatchlist() {
    await this.appbar.watchlistNav().click();
    await pause(this.page);
    return this;
  }

  async openWatchlistStock(symbol) {
    await this.page.getByText(symbol, { exact: true }).first().click();
    await pause(this.page);
    return this;
  }

  async openTopStocks() {
    await this.home.todaysTopStocksViewAll().click();
    await pause(this.page);
    return this;
  }

  async openScreenersViewAll() {
    await this.home.screenersViewAll().click();
    await pause(this.page);
    return this;
  }

  async addFunds() {
    await this.home.addFundsButton().click();
    await pause(this.page);
    return this;
  }
}

module.exports = { DashboardPage };
