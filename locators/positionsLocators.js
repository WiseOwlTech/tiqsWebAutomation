/**
 * Positions screen data-testid values from https://app.dev.tiqs.in/positions.
 */
class PositionsLocators {
  constructor(page) {
    this.page = page;
  }

  pageRoot() {
    return this.byTestId('positions-page');
  }

  content() {
    return this.byTestId('positions-content');
  }

  header() {
    return this.byTestId('positions-header');
  }

  title() {
    return this.byTestId('positions-title');
  }

  summary() {
    return this.byTestId('positions-summary');
  }

  bookedProfit() {
    return this.byTestId('positions-summary-booked-profit');
  }

  openPnl() {
    return this.byTestId('positions-summary-open-pnl');
  }

  totalProfit() {
    return this.byTestId('positions-summary-total-profit');
  }

  totalPct() {
    return this.byTestId('positions-summary-total-pct');
  }

  toolbar() {
    return this.byTestId('positions-toolbar');
  }

  searchInput() {
    return this.byTestId('positions-search-input');
  }

  downloadButton() {
    return this.byTestId('positions-download-button');
  }

  byTestId(testId) {
    return this.page.getByTestId(testId);
  }
}

module.exports = { PositionsLocators };
