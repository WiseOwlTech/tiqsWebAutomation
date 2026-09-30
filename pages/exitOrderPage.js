class ExitOrderPage {
  constructor(page) {
    this.page = page;
  }

  dialog() {
    return this.page.getByRole('dialog', { name: 'Exit Order' });
  }

  async openForSymbol(symbol) {
    await this.page.getByText(symbol, { exact: true }).first().click();
    await this.page.getByText('Instant Exit').click();
    return this;
  }

  async keepOrder() {
    await this.page.getByRole('button', { name: 'Keep Order' }).click();
    return this;
  }

  async confirm() {
    await this.page.getByRole('button', { name: 'Exit Order' }).click();
    return this;
  }
}

module.exports = { ExitOrderPage };
