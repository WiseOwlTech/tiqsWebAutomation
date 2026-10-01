const { PositionsLocators } = require('../locators/positionsLocators');
const { AppbarLocators } = require('../locators/appbarLocators');
const { typeVisible, pause } = require('../support/pace');

/**
 * Positions page actions. Locators come from PositionsLocators.
 */
class PositionsPage {
  constructor(page) {
    this.page = page;
    this.positions = new PositionsLocators(page);
    this.appbar = new AppbarLocators(page);
  }

  async open() {
    await this.page.goto('/positions');
    await this.positions.pageRoot().waitFor({ state: 'visible' });
    await pause(this.page);
    return this;
  }

  async search(symbol) {
    await typeVisible(this.positions.searchInput(), symbol);
    await pause(this.page);
    return this;
  }

  async download() {
    await this.positions.downloadButton().click();
    await pause(this.page);
    return this;
  }

  summary() {
    return this.positions.summary();
  }

  bookedProfit() {
    return this.positions.bookedProfit();
  }

  openPnl() {
    return this.positions.openPnl();
  }

  totalProfit() {
    return this.positions.totalProfit();
  }

  title() {
    return this.positions.title();
  }
}

module.exports = { PositionsPage };
