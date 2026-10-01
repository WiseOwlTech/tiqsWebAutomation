const { OrdersLocators } = require('../locators/ordersLocators');
const { AppbarLocators } = require('../locators/appbarLocators');
const { typeVisible, pause } = require('../support/pace');

/**
 * Orders page actions. Locators come from OrdersLocators.
 */
class OrdersPage {
  constructor(page) {
    this.page = page;
    this.orders = new OrdersLocators(page);
    this.appbar = new AppbarLocators(page);
  }

  async open() {
    await this.page.goto('/orders');
    await this.orders.content().waitFor({ state: 'visible' });
    await pause(this.page);
    return this;
  }

  async openOrdersTab() {
    await this.orders.ordersTab().click();
    await pause(this.page);
    return this;
  }

  async openGttTab() {
    await this.orders.gttTab().click();
    await pause(this.page);
    return this;
  }

  async openSubtab() {
    await this.orders.openSubtab().click();
    await pause(this.page);
    return this;
  }

  async executedSubtab() {
    await this.orders.executedSubtab().click();
    await pause(this.page);
    return this;
  }

  async tradesSubtab() {
    await this.orders.tradesSubtab().click();
    await pause(this.page);
    return this;
  }

  async search(symbol) {
    await typeVisible(this.orders.searchInput(), symbol);
    await pause(this.page);
    return this;
  }

  async download() {
    await this.orders.downloadButton().click();
    await pause(this.page);
    return this;
  }

  content() {
    return this.orders.content();
  }

  openTab() {
    return this.orders.openSubtab();
  }

  executedTab() {
    return this.orders.executedSubtab();
  }

  tradesTab() {
    return this.orders.tradesSubtab();
  }

  gttTab() {
    return this.orders.gttTab();
  }
}

module.exports = { OrdersPage };
