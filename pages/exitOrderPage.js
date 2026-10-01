const { pause } = require('../support/pace');

class ExitOrderPage {
  constructor(page) {
    this.page = page;
  }

  dialog() {
    return this.page.getByRole('dialog', { name: 'Exit Order' });
  }

  async openForSymbol(symbol) {
    await this.page.getByText(symbol, { exact: true }).first().click();
    await pause(this.page);
    await this.page.getByText('Instant Exit').click();
    await pause(this.page);
    return this;
  }

  async keepOrder() {
    await this.page.getByRole('button', { name: 'Keep Order' }).click();
    await pause(this.page);
    return this;
  }

  async confirm() {
    await this.page.getByRole('button', { name: 'Exit Order' }).click();
    await pause(this.page);
    return this;
  }
}

module.exports = { ExitOrderPage };
