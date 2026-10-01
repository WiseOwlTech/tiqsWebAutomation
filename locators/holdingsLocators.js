/**
 * Holdings screen data-testid values from https://app.dev.tiqs.in/holdings.
 * Search / Download / row actions do not have testids yet on this page.
 */
class HoldingsLocators {
  constructor(page) {
    this.page = page;
  }

  pageRoot() {
    return this.byTestId('holdings-page');
  }

  content() {
    return this.byTestId('holdings-content');
  }

  summary() {
    return this.byTestId('holdings-summary');
  }

  byTestId(testId) {
    return this.page.getByTestId(testId);
  }
}

module.exports = { HoldingsLocators };
