/**
 * Login data-testid values taken from https://app.dev.tiqs.in/.
 */
class LoginLocators {
  constructor(page) {
    this.page = page;
  }

  pageRoot() {
    return this.byTestId('login-page');
  }

  brandMark() {
    return this.byTestId('login-brand-mark-card');
  }

  headline() {
    return this.byTestId('login-headline');
  }

  cardTitle() {
    return this.byTestId('login-card-title');
  }

  mobileInput() {
    return this.byTestId('login-mobile-input');
  }

  mobileError() {
    return this.byTestId('login-mobile-error');
  }

  getOtpButton() {
    return this.byTestId('login-get-otp-button');
  }

  createAccountLink() {
    return this.byTestId('login-create-account-link');
  }

  signInWithUserIdLink() {
    return this.byTestId('login-signin-userid-link');
  }

  otpInput() {
    return this.byTestId('login-otp-input');
  }

  otpError() {
    return this.byTestId('login-otp-error');
  }

  otpContinueButton() {
    return this.byTestId('login-otp-continue-button');
  }

  pinForm() {
    return this.byTestId('login-pin-form');
  }

  pinError() {
    return this.byTestId('login-pin-error');
  }

  pinDigit(index) {
    return this.byTestId(`login-pin-input-${index}`);
  }

  pinProceedButton() {
    return this.byTestId('login-pin-proceed-button');
  }

  forgotPinButton() {
    return this.byTestId('login-forgot-pin-button');
  }

  switchAccountButton() {
    return this.byTestId('login-switch-account-button');
  }

  termsLink() {
    return this.byTestId('login-terms-link');
  }

  privacyLink() {
    return this.byTestId('login-privacy-link');
  }

  sebiFooter() {
    return this.byTestId('login-sebi-footer');
  }

  playStoreLink() {
    return this.byTestId('login-play-store-link');
  }

  appStoreLink() {
    return this.byTestId('login-app-store-link');
  }

  qrButton() {
    return this.byTestId('login-qr-button');
  }

  byTestId(testId) {
    return this.page.getByTestId(testId);
  }
}

module.exports = { LoginLocators };
