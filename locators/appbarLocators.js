/**
 * Shared app shell data-testid values from https://app.dev.tiqs.in/.
 * Primary nav items do not have per-link testids yet; use href inside appbar-nav.
 */
class AppbarLocators {
  constructor(page) {
    this.page = page;
  }

  root() {
    return this.byTestId('appbar');
  }

  brandLink() {
    return this.byTestId('appbar-brand-link');
  }

  nav() {
    return this.byTestId('appbar-nav');
  }

  userMenu() {
    return this.byTestId('appbar-user-menu');
  }

  navLink(path) {
    return this.nav().locator(`[href="${path}"]`);
  }

  homeNav() {
    return this.navLink('/home');
  }

  ordersNav() {
    return this.navLink('/orders');
  }

  holdingsNav() {
    return this.navLink('/holdings');
  }

  positionsNav() {
    return this.navLink('/positions');
  }

  watchlistNav() {
    return this.navLink('/watchlist');
  }

  fundsNav() {
    return this.page.getByRole('link', { name: /^Funds$/i }).or(this.navLink('/funds'));
  }

  ipoNav() {
    return this.page.getByRole('link', { name: /^IPO$/i }).or(this.navLink('/ipo'));
  }

  researchNav() {
    return this.page.getByRole('link', { name: /^Research$/i }).or(this.navLink('/research'));
  }

  byTestId(testId) {
    return this.page.getByTestId(testId);
  }
}

module.exports = { AppbarLocators };
