const { OrdersLocators } = require('../locators/ordersLocators');
const { AppbarLocators } = require('../locators/appbarLocators');

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
    return this;
  }

  async openOrdersTab() {
    await this.orders.ordersTab().click();
    return this;
  }

  async openGttTab() {
    await this.orders.gttTab().click();
    return this;
  }

  async openSubtab() {
    await this.orders.openSubtab().click();
    return this;
  }

  async executedSubtab() {
    await this.orders.executedSubtab().click();
    return this;
  }

  async tradesSubtab() {
    await this.orders.tradesSubtab().click();
    return this;
  }

  async search(symbol) {
    const field = this.orders.searchInput();
    await field.click();
    await field.fill(symbol);
    return this;
  }

  async download() {
    await this.orders.downloadButton().click();
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
