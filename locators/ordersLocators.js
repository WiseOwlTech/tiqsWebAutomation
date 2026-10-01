/**
 * Orders screen data-testid values from https://app.dev.tiqs.in/orders.
 */
class OrdersLocators {
  constructor(page) {
    this.page = page;
  }

  content() {
    return this.byTestId('orders-content');
  }

  tabs() {
    return this.byTestId('orders-tabs');
  }

  cardHeader() {
    return this.byTestId('orders-card-header');
  }

  tabsList() {
    return this.byTestId('orders-tabs-list');
  }

  ordersTab() {
    return this.byTestId('orders-tab-orders');
  }

  gttTab() {
    return this.byTestId('orders-tab-gtt');
  }

  ordersPanel() {
    return this.byTestId('orders-panel-orders');
  }

  gttPanel() {
    return this.byTestId('orders-panel-gtt');
  }

  listPanel() {
    return this.byTestId('orders-list-panel');
  }

  openSubtab() {
    return this.byTestId('orders-subtab-open');
  }

  executedSubtab() {
    return this.byTestId('orders-subtab-executed');
  }

  tradesSubtab() {
    return this.byTestId('orders-subtab-trades');
  }

  searchInput() {
    return this.byTestId('orders-search-input');
  }

  downloadButton() {
    return this.byTestId('orders-download-button');
  }

  byTestId(testId) {
    return this.page.getByTestId(testId);
  }
}

module.exports = { OrdersLocators };
