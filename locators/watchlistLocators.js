/**
 * Watchlist data-testid values from https://app.dev.tiqs.in/watchlist.
 */
class WatchlistLocators {
  constructor(page) {
    this.page = page;
  }

  root() {
    return this.byTestId('watchlist');
  }

  title() {
    return this.byTestId('watchlist-title');
  }

  searchInput() {
    return this.byTestId('watchlist-search-input');
  }

  items() {
    return this.byTestId('watchlist-items');
  }

  item() {
    return this.byTestId('watchlist-item');
  }

  itemSymbol() {
    return this.byTestId('watchlist-item-symbol');
  }

  itemLtp() {
    return this.byTestId('watchlist-item-ltp');
  }

  footerTab(index) {
    return this.byTestId(`watchlist-footer-tab-${index}`);
  }

  buyButton() {
    return this.byTestId('watchlist-symbol-buy-button');
  }

  sellButton() {
    return this.byTestId('watchlist-symbol-sell-button');
  }

  chartButton() {
    return this.byTestId('watchlist-symbol-chart-button');
  }

  byTestId(testId) {
    return this.page.getByTestId(testId);
  }
}

module.exports = { WatchlistLocators };
