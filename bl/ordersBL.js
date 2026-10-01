const { expect } = require('@playwright/test');
const { logger } = require('../support/logger');
const { LoginBL } = require('./loginBL');
const { OrdersPage } = require('../pages/ordersPage');

const log = logger('OrdersBL');

class OrdersBL {
  constructor(page) {
    this.page = page;
    this.ordersPage = new OrdersPage(page);
  }

  async loginAndOpen() {
    await new LoginBL(this.page).login();
    await this.ordersPage.open();
    return this;
  }

  async verifyLocatorsAfterLogin() {
    await this.loginAndOpen();
    await expect(this.ordersPage.content()).toBeVisible();
    await expect(this.ordersPage.orders.ordersTab()).toBeVisible();
    await expect(this.ordersPage.gttTab()).toBeVisible();
    await expect(this.ordersPage.openTab()).toBeVisible();
    await expect(this.ordersPage.executedTab()).toBeVisible();
    await expect(this.ordersPage.tradesTab()).toBeVisible();
    await expect(this.ordersPage.orders.searchInput()).toBeVisible();
    await expect(this.ordersPage.orders.downloadButton()).toBeVisible();
    log.info('Orders locator blocks are visible');
    return true;
  }

  /** Case 100 */
  async verifyOpenExecutedTradesTabs() {
    await this.loginAndOpen();
    await this.ordersPage.openOrdersTab();
    await this.ordersPage.openSubtab();
    await expect(this.ordersPage.openTab()).toBeVisible();
    await this.ordersPage.executedSubtab();
    await expect(this.ordersPage.executedTab()).toBeVisible();
    await this.ordersPage.tradesSubtab();
    await expect(this.ordersPage.tradesTab()).toBeVisible();
    log.info('Case 100: Open / Executed / Trades tabs');
    return true;
  }

  /** Case 101 */
  async verifyGttTab() {
    await this.loginAndOpen();
    await this.ordersPage.openGttTab();
    await expect(this.ordersPage.orders.gttPanel()).toBeVisible();
    log.info('Case 101: GTT tab');
    return true;
  }

  /** Case 103 */
  async verifyOrderSearch(symbol = 'BHARTI') {
    await this.loginAndOpen();
    await this.ordersPage.search(symbol);
    await expect(this.ordersPage.orders.searchInput()).toHaveValue(new RegExp(symbol, 'i'));
    log.info(`Case 103: orders search ${symbol}`);
    return true;
  }

  /** Case 104 */
  async verifyOrderSearchNoMatch() {
    await this.loginAndOpen();
    await this.ordersPage.search('zzzz');
    await expect(this.ordersPage.orders.searchInput()).toHaveValue(/zzzz/i);
    log.info('Case 104: orders search no match input accepted');
    return true;
  }
}

module.exports = { OrdersBL };
