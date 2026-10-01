const { pause } = require('../support/pace');

class ScreenersPage {
  constructor(page) {
    this.page = page;
  }

  listing() {
    return this.page.getByText("Today's Top Stocks");
  }

  filter(name) {
    return this.page.getByText(name, { exact: true });
  }

  async selectFilter(name) {
    await this.filter(name).click();
    await pause(this.page);
    return this;
  }
}

module.exports = { ScreenersPage };
