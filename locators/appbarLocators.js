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

  byTestId(testId) {
    return this.page.getByTestId(testId);
  }
}

module.exports = { AppbarLocators };
