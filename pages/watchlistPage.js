const { WatchlistLocators } = require('../locators/watchlistLocators');
const { typeVisible, pause } = require('../support/pace');

class WatchlistPage {
  constructor(page) {
    this.page = page;
    this.watchlist = new WatchlistLocators(page);
  }

  async open() {
    await this.page.goto('/watchlist');
    await this.watchlist.root().waitFor({ state: 'visible' });
    await pause(this.page);
    return this;
  }

  async search(text) {
    await typeVisible(this.watchlist.searchInput(), text);
    await pause(this.page);
    return this;
  }

  async openTab(index) {
    await this.watchlist.footerTab(index).click();
    await pause(this.page);
    return this;
  }
}

module.exports = { WatchlistPage };
