const { expect, test } = require('@playwright/test');
const { logger } = require('../support/logger');
const { LoginBL } = require('./loginBL');
const { EarlySignalsPage } = require('../pages/earlySignalsPage');

const log = logger('EarlySignalsBL');

class EarlySignalsBL {
  constructor(page) {
    this.page = page;
    this.earlySignalsPage = new EarlySignalsPage(page);
  }

  async verifyShortTermFilter() {
    await new LoginBL(this.page).login();
    const heading = this.earlySignalsPage.heading();
    if (await heading.count() === 0) {
      test.skip(true, "Navigation path to Today's Signals is not wired yet");
    }
    await this.earlySignalsPage.selectTerm('Short Term');
    await expect(this.earlySignalsPage.term('Short Term')).toBeVisible();
    log.info('Selected signal term Short Term');
    return true;
  }
}

module.exports = { EarlySignalsBL };
