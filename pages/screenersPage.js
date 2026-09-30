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
    return this;
  }
}

module.exports = { ScreenersPage };
