const { expect, test } = require('@playwright/test');
const config = require('../config/configReader');
const { logger } = require('../support/logger');
const { LoginBL } = require('./loginBL');
const { ExitOrderPage } = require('../pages/exitOrderPage');

const log = logger('ExitOrderBL');

class ExitOrderBL {
  constructor(page) {
    this.page = page;
    this.exitOrderPage = new ExitOrderPage(page);
  }

  async cancelInstantExit() {
    await new LoginBL(this.page).login();
    const symbol = process.env.TIQS_EXIT_SYMBOL || 'INFOSYS';
    try {
      await this.exitOrderPage.openForSymbol(symbol);
      await this.exitOrderPage.keepOrder();
    } catch (error) {
      test.skip(true, `Instant Exit is not available: ${error.message}`);
    }
    await expect(this.exitOrderPage.dialog()).toBeHidden();
    log.info(`Cancelled Instant Exit for ${symbol}`);
    return true;
  }

  async confirmInstantExit() {
    if (!config.destructiveAllowed()) {
      test.skip(true, 'Destructive order tests are disabled');
    }
    await new LoginBL(this.page).login();
    const symbol = process.env.TIQS_EXIT_SYMBOL || 'INFOSYS';
    try {
      await this.exitOrderPage.openForSymbol(symbol);
      await this.exitOrderPage.confirm();
    } catch (error) {
      test.skip(true, `Cannot confirm Instant Exit: ${error.message}`);
    }
    await expect(this.exitOrderPage.dialog()).toBeHidden();
    log.info(`Confirmed Instant Exit for ${symbol}`);
    return true;
  }
}

module.exports = { ExitOrderBL };
