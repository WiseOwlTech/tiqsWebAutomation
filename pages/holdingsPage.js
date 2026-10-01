const { HoldingsLocators } = require('../locators/holdingsLocators');
const { AppbarLocators } = require('../locators/appbarLocators');

/**
 * Holdings page actions. Locators come from HoldingsLocators.
 */
class HoldingsPage {
  constructor(page) {
    this.page = page;
    this.holdings = new HoldingsLocators(page);
    this.appbar = new AppbarLocators(page);
  }

  async open() {
    await this.page.goto('/holdings');
    await this.holdings.pageRoot().waitFor({ state: 'visible' });
    return this;
  }

  summary() {
    return this.holdings.summary();
  }

  content() {
    return this.holdings.content();
  }

  pageRoot() {
    return this.holdings.pageRoot();
  }
}

module.exports = { HoldingsPage };
