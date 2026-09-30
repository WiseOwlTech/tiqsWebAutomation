class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  watchlist() {
    return this.page.getByText('Watchlist', { exact: true });
  }

  funds() {
    return this.page.getByText('AVAILABLE FUNDS');
  }

  screeners() {
    return this.page.getByText('Screeners', { exact: true });
  }

  topStocks() {
    return this.page.getByText("Today's Top Stocks");
  }

  async openHome() {
    await this.page.getByRole('link', { name: 'Home' }).click();
    return this;
  }

  async openWatchlistStock(symbol) {
    await this.page.getByText(symbol, { exact: true }).first().click();
    return this;
  }

  async openTopStocks() {
    await this.topStocks().locator('xpath=..').getByText('View All').click();
    return this;
  }
}

module.exports = { DashboardPage };
