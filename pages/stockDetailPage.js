const { pause } = require('../support/pace');

class StockDetailPage {
  constructor(page) {
    this.page = page;
  }

  tab(name) {
    return this.page.getByRole('tab', { name });
  }

  section(name) {
    return this.page.getByText(name, { exact: true });
  }

  async openTab(name) {
    await this.tab(name).click();
    await pause(this.page);
    return this;
  }
}

module.exports = { StockDetailPage };
