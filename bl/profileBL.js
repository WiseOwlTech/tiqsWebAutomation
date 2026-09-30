const { expect } = require('@playwright/test');
const { logger } = require('../support/logger');
const { LoginBL } = require('./loginBL');
const { ProfilePage } = require('../pages/profilePage');

const log = logger('ProfileBL');

class ProfileBL {
  constructor(page) {
    this.page = page;
    this.profilePage = new ProfilePage(page);
  }

  async verifyMenuOpen() {
    await new LoginBL(this.page).login();
    await this.profilePage.openMenu();
    await expect(this.profilePage.menu()).toBeVisible();
    log.info('Opened profile menu');
    return true;
  }

  async verifyTradebookVisible() {
    await this.verifyMenuOpen();
    await expect(this.profilePage.item('Tradebook')).toBeVisible();
    log.info('Tradebook menu item is visible');
    return true;
  }
}

module.exports = { ProfileBL };
