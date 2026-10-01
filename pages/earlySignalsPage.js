const { pause } = require('../support/pace');

class EarlySignalsPage {
  constructor(page) {
    this.page = page;
  }

  heading() {
    return this.page.getByRole('heading', { name: "Today's Signals" });
  }

  term(label) {
    return this.page.getByText(label, { exact: true });
  }

  async selectTerm(label) {
    await this.term(label).click();
    await pause(this.page);
    return this;
  }
}

module.exports = { EarlySignalsPage };
