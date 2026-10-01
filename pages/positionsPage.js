const { PositionsLocators } = require('../locators/positionsLocators');
const { AppbarLocators } = require('../locators/appbarLocators');

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
    return this;
  }

  async search(symbol) {
    const field = this.positions.searchInput();
    await field.click();
    await field.fill(symbol);
    return this;
  }

  async download() {
    await this.positions.downloadButton().click();
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
