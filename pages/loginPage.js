const { LoginLocators } = require('../locators/loginLocators');

/**
 * Playwright actions for the login page. Locators come from LoginLocators.
 */
class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLocators = new LoginLocators(page);
  }

  async openLogin(url) {
    await this.page.goto(url);
    return this;
  }

  url() {
    return this.page.url();
  }

  async waitForUrl(pattern) {
    await this.page.waitForURL(pattern);
    return this;
  }

  async typeMobile(value) {
    const field = this.loginLocators.mobileInput();
    await field.click();
    await field.fill('');
    await field.pressSequentially(value, { delay: 20 });
    return this;
  }

  async pasteMobile(value) {
    await this.loginLocators.mobileInput().fill(value);
    return this;
  }

  async pressEnterOnMobile() {
    await this.loginLocators.mobileInput().press('Enter');
    return this;
  }

  async requestOtp() {
    await this.loginLocators.getOtpButton().click();
    return this;
  }

  async typeOtp(value) {
    const field = this.loginLocators.otpInput();
    await field.click();
    await field.pressSequentially(value, { delay: 20 });
    return this;
  }

  async continueAfterOtp() {
    await this.loginLocators.otpContinueButton().click();
    return this;
  }

  async enterMpin(mpin) {
    const pin = requireFourDigits(mpin);
    await this.loginLocators.pinDigit(1).waitFor({ state: 'visible' });
    await this.fillPinDigit(1, pin);
    await this.fillPinDigit(2, pin);
    await this.fillPinDigit(3, pin);
    await this.fillPinDigit(4, pin);
    return this;
  }

  async typeIntoFirstPinBox(value) {
    const field = this.loginLocators.pinDigit(1);
    await field.click();
    await field.pressSequentially(value, { delay: 40 });
    return this;
  }

  async pressBackspaceOnPin() {
    await this.page.keyboard.press('Backspace');
    return this;
  }

  async proceedAfterMpin() {
    await this.loginLocators.pinProceedButton().click();
    return this;
  }

  async openCreateAccount() {
    const popupPromise = this.page.waitForEvent('popup');
    await this.loginLocators.createAccountLink().click();
    this.popup = await popupPromise;
    await this.popup.waitForLoadState('domcontentloaded');
    return this;
  }

  popupUrl() {
    return this.popup ? this.popup.url() : '';
  }

  async openSignInWithUserId() {
    await this.loginLocators.signInWithUserIdLink().click();
    return this;
  }

  async switchAccount() {
    await this.loginLocators.switchAccountButton().click();
    return this;
  }

  async openForgotPin() {
    await this.loginLocators.forgotPinButton().click();
    return this;
  }

  async goBack() {
    await this.page.goBack();
    return this;
  }

  async refresh() {
    await this.page.reload();
    return this;
  }

  async waitForMobileStage() {
    await this.loginLocators.mobileInput().waitFor({ state: 'visible' });
    return this;
  }

  async waitForOtpStage() {
    await this.loginLocators.otpInput().waitFor({ state: 'visible' });
    return this;
  }

  async waitForMpinStage() {
    await this.loginLocators.pinDigit(1).waitFor({ state: 'visible' });
    return this;
  }

  async waitUntilMpinFormHidden() {
    await this.loginLocators.pinForm().waitFor({ state: 'hidden' });
    return this;
  }

  async mobileValue() {
    return this.loginLocators.mobileInput().inputValue();
  }

  async otpValue() {
    return this.loginLocators.otpInput().inputValue();
  }

  async pinDigitType(index) {
    return this.loginLocators.pinDigit(index).getAttribute('type');
  }

  async focusedTestId() {
    return this.page.evaluate(() => document.activeElement?.getAttribute('data-testid') || '');
  }

  brandMark() {
    return this.loginLocators.brandMark();
  }

  headline() {
    return this.loginLocators.headline();
  }

  cardTitle() {
    return this.loginLocators.cardTitle();
  }

  mobileInput() {
    return this.loginLocators.mobileInput();
  }

  mobileError() {
    return this.loginLocators.mobileError();
  }

  getOtpButton() {
    return this.loginLocators.getOtpButton();
  }

  createAccountLink() {
    return this.loginLocators.createAccountLink();
  }

  signInWithUserIdLink() {
    return this.loginLocators.signInWithUserIdLink();
  }

  otpInput() {
    return this.loginLocators.otpInput();
  }

  otpError() {
    return this.loginLocators.otpError();
  }

  otpContinueButton() {
    return this.loginLocators.otpContinueButton();
  }

  pinForm() {
    return this.loginLocators.pinForm();
  }

  pinError() {
    return this.loginLocators.pinError();
  }

  pinDigit(index) {
    return this.loginLocators.pinDigit(index);
  }

  pinProceedButton() {
    return this.loginLocators.pinProceedButton();
  }

  forgotPinButton() {
    return this.loginLocators.forgotPinButton();
  }

  switchAccountButton() {
    return this.loginLocators.switchAccountButton();
  }

  termsLink() {
    return this.loginLocators.termsLink();
  }

  privacyLink() {
    return this.loginLocators.privacyLink();
  }

  sebiFooter() {
    return this.loginLocators.sebiFooter();
  }

  playStoreLink() {
    return this.loginLocators.playStoreLink();
  }

  appStoreLink() {
    return this.loginLocators.appStoreLink();
  }

  qrButton() {
    return this.loginLocators.qrButton();
  }

  async fillPinDigit(index, pin) {
    await this.loginLocators.pinDigit(index).fill(pin.charAt(index - 1));
    return this;
  }
}

function requireFourDigits(pin) {
  if (!pin || pin.length !== 4) {
    throw new Error('MPIN must be 4 digits');
  }
  return pin;
}

module.exports = { LoginPage };
