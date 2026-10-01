const { pause } = require('../support/pace');

class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  menu() {
    return this.page.getByRole('menu');
  }

  item(name) {
    return this.page.getByRole('menuitem', { name });
  }

  async openMenu() {
    await this.page.getByRole('button', { name: /profile/i }).click();
    await pause(this.page);
    return this;
  }
}

module.exports = { ProfilePage };
