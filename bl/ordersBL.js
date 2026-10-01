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

  async verifyLocatorsAfterLogin() {
    await new LoginBL(this.page).login();
    await this.ordersPage.open();
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
}

module.exports = { OrdersBL };
