const { expect } = require('@playwright/test');
const config = require('../config/configReader');
const { logger } = require('../support/logger');
const { LoginPage } = require('../pages/loginPage');

const log = logger('LoginBL');

/**
 * Login flows. Specs call this class only. Assertions stay here.
 */
class LoginBL {
  constructor(page) {
    this.loginPage = new LoginPage(page);
  }

  async login() {
    log.info(`Login started for ${config.url()}`);
    await this.openLogin();
    await this.verifyMobileStage();
    await this.submitMobile();
    await this.verifyOtpStage();
    await this.submitOtp();
    await this.verifyMpinStage();
    await this.submitMpin();
    return this.verifyLoggedIn();
  }

  async loginWithConfiguredCredentials() {
    return this.login();
  }

  async verifyLoginPageLoads() {
    await this.openLogin();
    await expect(this.loginPage.brandMark()).toBeVisible();
    await expect(this.loginPage.headline()).toContainText('Trade with clarity');
    await expect(this.loginPage.cardTitle()).toContainText('Sign in to your TIQS account');
    await expect(this.loginPage.mobileInput()).toBeVisible();
    await expect(this.loginPage.getOtpButton()).toBeVisible();
    await expect(this.loginPage.createAccountLink()).toBeVisible();
    await expect(this.loginPage.signInWithUserIdLink()).toBeVisible();
    log.info('Login page landmarks are visible');
    return true;
  }

  async verifyGetOtpDisabledWhenMobileEmpty() {
    await this.openLogin();
    await expect(this.loginPage.mobileInput()).toHaveValue('');
    await expect(this.loginPage.getOtpButton()).toBeDisabled();
    log.info('Get OTP is disabled for an empty mobile field');
    return true;
  }

  async verifyValidMobileOpensOtpScreen() {
    await this.openLogin();
    await this.submitMobile();
    await this.verifyOtpStage();
    log.info('Valid mobile number opened the OTP screen');
    return true;
  }

  async verifyGetOtpEnabledOnlyAfterTenDigits() {
    await this.openLogin();
    await this.loginPage.typeMobile(config.mobileShort());
    await expect(this.loginPage.getOtpButton()).toBeDisabled();
    await this.loginPage.typeMobile(`${config.mobileShort()}8`);
    await expect(this.loginPage.getOtpButton()).toBeEnabled();
    log.info('Get OTP stays disabled until 10 digits are entered');
    return true;
  }

  async verifyMobileRejectsAlphabets() {
    await this.openLogin();
    await this.loginPage.typeMobile(config.mobileLetters());
    await expect(this.loginPage.mobileInput()).toHaveValue('');
    await expect(this.loginPage.getOtpButton()).toBeDisabled();
    log.info('Mobile field ignored alphabets');
    return true;
  }

  async verifyMobileRejectsSpecialCharacters() {
    await this.openLogin();
    await this.loginPage.typeMobile(config.mobileSymbols());
    await expect(this.loginPage.mobileInput()).toHaveValue('');
    await expect(this.loginPage.getOtpButton()).toBeDisabled();
    log.info('Mobile field ignored special characters');
    return true;
  }

  async verifyMobileKeepsOnlyTenDigits() {
    await this.openLogin();
    await this.loginPage.typeMobile(config.mobileTooLong());
    await expect(this.loginPage.mobileInput()).toHaveValue(config.mobileTooLong().slice(0, 10));
    log.info('Mobile field kept only 10 digits');
    return true;
  }

  async verifyShortMobileCannotRequestOtp() {
    await this.openLogin();
    await this.loginPage.typeMobile(config.mobileShort());
    await expect(this.loginPage.getOtpButton()).toBeDisabled();
    log.info('Short mobile number cannot request OTP');
    return true;
  }

  async verifyInvalidPrefixMobileIsRejected() {
    await this.openLogin();
    await this.loginPage.typeMobile(config.mobileInvalidPrefix());
    await this.loginPage.requestOtp();
    await expect(this.loginPage.mobileError()).toBeVisible();
    await expect(this.loginPage.otpInput()).toHaveCount(0);
    log.info('Mobile number starting with 3 was rejected');
    return true;
  }

  async verifyPastedMobileNumberEnablesGetOtp() {
    await this.openLogin();
    await this.loginPage.pasteMobile(config.mobile());
    await expect(this.loginPage.mobileInput()).toHaveValue(config.mobile());
    await expect(this.loginPage.getOtpButton()).toBeEnabled();
    log.info('Pasted mobile number enabled Get OTP');
    return true;
  }

  async verifyEnterKeyRequestsOtp() {
    await this.openLogin();
    await this.loginPage.typeMobile(config.mobile());
    await this.loginPage.pressEnterOnMobile();
    await this.verifyOtpStage();
    log.info('Enter key submitted the mobile form');
    return true;
  }

  async verifyCreateAccountLinkOpensOnboarding() {
    await this.openLogin();
    await this.loginPage.openCreateAccount();
    expect(this.loginPage.popupUrl()).toMatch(/onboarding\.dev\.tiqs\.in/);
    log.info('Create account opened onboarding');
    return true;
  }

  async verifySignInWithUserIdOpensUserIdLogin() {
    await this.openLogin();
    await this.loginPage.openSignInWithUserId();
    await this.loginPage.waitForUrl(/\/login/);
    log.info('Sign in with User Id opened the user id login');
    return true;
  }

  async verifyOtpScreenShowsMaskedMobile() {
    await this.reachOtpScreen();
    await expect(this.loginPage.cardTitle()).toContainText(maskedMobile(config.mobile()));
    log.info('OTP screen shows the masked mobile number');
    return true;
  }

  async verifyInvalidOtpShowsError() {
    await this.reachOtpScreen();
    await this.loginPage.typeOtp(config.otpInvalid());
    await this.loginPage.continueAfterOtp();
    await expect(this.loginPage.otpError()).toBeVisible();
    await expect(this.loginPage.pinForm()).toHaveCount(0);
    log.info('Invalid OTP showed an error');
    return true;
  }

  async verifyEmptyOtpCannotContinue() {
    await this.reachOtpScreen();
    await expect(this.loginPage.otpInput()).toHaveValue('');
    await expect(this.loginPage.otpContinueButton()).toBeDisabled();
    log.info('Empty OTP cannot continue');
    return true;
  }

  async verifyShortOtpCannotContinue() {
    await this.reachOtpScreen();
    await this.loginPage.typeOtp(config.otpShort());
    await expect(this.loginPage.otpContinueButton()).toBeDisabled();
    log.info('Short OTP cannot continue');
    return true;
  }

  async verifyOtpRejectsLettersAndSymbols() {
    await this.reachOtpScreen();
    await this.loginPage.typeOtp(config.otpLetters());
    const value = await this.loginPage.otpValue();
    expect(value).not.toMatch(/[a-zA-Z@#]/);
    log.info('OTP field ignored letters and symbols');
    return true;
  }

  async verifyBrowserBackFromOtpReturnsToMobile() {
    await this.reachOtpScreen();
    await this.loginPage.goBack();
    await this.verifyMobileStage();
    log.info('Browser back returned to the mobile screen');
    return true;
  }

  async verifyRefreshOnOtpScreenKeepsLoginPage() {
    await this.reachOtpScreen();
    await this.loginPage.refresh();
    await expect(this.loginPage.headline()).toBeVisible();
    log.info('Refreshing the OTP screen did not crash the login page');
    return true;
  }

  async verifyPinScreenShowsWelcome() {
    await this.reachPinScreen();
    await expect(this.loginPage.cardTitle()).toContainText(/Welcome back/i);
    log.info('PIN screen shows the welcome message');
    return true;
  }

  async verifyWrongPinShowsError() {
    await this.reachPinScreen();
    await this.loginPage.enterMpin(config.mpinInvalid());
    await this.loginPage.proceedAfterMpin();
    await expect(this.loginPage.pinError()).toBeVisible();
    await expect(this.loginPage.pinForm()).toBeVisible();
    log.info('Wrong PIN showed an error');
    return true;
  }

  async verifyBlankPinCannotProceed() {
    await this.reachPinScreen();
    await expect(this.loginPage.pinProceedButton()).toBeDisabled();
    log.info('Blank PIN cannot proceed');
    return true;
  }

  async verifyShortPinCannotProceed() {
    await this.reachPinScreen();
    await this.loginPage.typeIntoFirstPinBox(config.mpinShort());
    await expect(this.loginPage.pinProceedButton()).toBeDisabled();
    log.info('Short PIN cannot proceed');
    return true;
  }

  async verifyPinRejectsLettersAndSymbols() {
    await this.reachPinScreen();
    await this.loginPage.typeIntoFirstPinBox(config.mpinLetters());
    await expect(this.loginPage.pinDigit(1)).toHaveValue('');
    log.info('PIN boxes ignored letters and symbols');
    return true;
  }

  async verifyPinDigitsAreMasked() {
    await this.reachPinScreen();
    await this.loginPage.typeIntoFirstPinBox(config.mpin().charAt(0));
    const masked = await this.loginPage.pinDigit(1).evaluate((element) => {
      const style = getComputedStyle(element);
      const parentText = element.parentElement ? element.parentElement.innerText : '';
      return style.webkitTextSecurity === 'disc'
        || style.color === 'rgba(0, 0, 0, 0)'
        || parentText.includes('•')
        || parentText.includes('●');
    });
    expect(masked).toBe(true);
    log.info('PIN digit is masked');
    return true;
  }

  async verifyPinFocusMovesToNextBox() {
    await this.reachPinScreen();
    await this.loginPage.typeIntoFirstPinBox('1');
    await expect.poll(() => this.loginPage.focusedTestId()).toBe('login-pin-input-2');
    log.info('PIN focus moved to the next box');
    return true;
  }

  async verifyPinBackspaceMovesToPreviousBox() {
    await this.reachPinScreen();
    await this.loginPage.typeIntoFirstPinBox('1');
    await this.loginPage.pressBackspaceOnPin();
    await expect.poll(() => this.loginPage.focusedTestId()).toBe('login-pin-input-1');
    log.info('PIN backspace moved to the previous box');
    return true;
  }

  async verifySwitchAccountReturnsToMobile() {
    await this.reachPinScreen();
    await this.loginPage.switchAccount();
    await this.verifyMobileStage();
    log.info('Switch Account returned to the mobile screen');
    return true;
  }

  async verifyForgotPinOpensSetNewPin() {
    await this.reachPinScreen();
    await this.loginPage.openForgotPin();
    await expect(this.loginPage.cardTitle()).toContainText(/pin/i);
    log.info('Forgot PIN opened the set new PIN screen');
    return true;
  }

  async verifySebiFooterIsPresent() {
    await this.openLogin();
    await expect(this.loginPage.sebiFooter()).toContainText('SEBI');
    await expect(this.loginPage.sebiFooter()).toContainText('INZ000308735');
    log.info('SEBI footer is present');
    return true;
  }

  async verifyLegalLinks() {
    await this.openLogin();
    await expect(this.loginPage.termsLink()).toHaveAttribute('href', /terms/);
    await expect(this.loginPage.privacyLink()).toHaveAttribute('href', /privacy/);
    log.info('Terms and Privacy links are present');
    return true;
  }

  async verifyAppDownloadLinks() {
    await this.openLogin();
    await expect(this.loginPage.playStoreLink()).toHaveAttribute('href', /play\.google\.com/);
    await expect(this.loginPage.appStoreLink()).toHaveAttribute('href', /apps\.apple\.com/);
    await expect(this.loginPage.qrButton()).toBeVisible();
    log.info('App download links are present');
    return true;
  }

  async verifySiteUsesHttps() {
    await this.openLogin();
    expect(this.loginPage.url().startsWith('https://')).toBe(true);
    log.info('Login page uses HTTPS');
    return true;
  }

  async openLogin() {
    await this.loginPage.openLogin(config.url());
    log.info('Opened login page');
    return this.loginPage;
  }

  async verifyMobileStage() {
    await this.loginPage.waitForMobileStage();
    await expect(this.loginPage.mobileInput()).toBeVisible();
    log.info('Mobile stage is visible');
    return true;
  }

  async submitMobile() {
    await this.loginPage.typeMobile(config.mobile());
    await this.loginPage.requestOtp();
    log.info('Submitted mobile number and requested OTP');
    return this.loginPage;
  }

  async verifyOtpStage() {
    await this.loginPage.waitForOtpStage();
    await expect(this.loginPage.otpInput()).toBeVisible();
    log.info('OTP stage is visible');
    return true;
  }

  async submitOtp() {
    await this.loginPage.typeOtp(config.otp());
    await this.loginPage.continueAfterOtp();
    log.info('Submitted OTP');
    return this.loginPage;
  }

  async verifyMpinStage() {
    await this.loginPage.waitForMpinStage();
    await expect(this.loginPage.pinDigit(1)).toBeVisible();
    log.info('MPIN stage is visible');
    return true;
  }

  async submitMpin() {
    await this.loginPage.enterMpin(config.mpin());
    await this.loginPage.proceedAfterMpin();
    log.info('Submitted MPIN');
    return this.loginPage;
  }

  async verifyLoggedIn() {
    await this.loginPage.waitUntilMpinFormHidden();
    await expect(this.loginPage.pinForm()).toBeHidden();
    await this.dismissPostLoginModals();
    log.info('Login completed');
    return true;
  }

  async dismissPostLoginModals() {
    const understand = this.loginPage.page.getByRole('button', { name: 'I Understand' });
    try {
      await understand.waitFor({ state: 'visible', timeout: 5000 });
      await understand.click();
      await understand.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
      log.info('Dismissed risk disclosure modal');
    } catch {
      // Modal does not always appear.
    }
    return this;
  }

  async reachOtpScreen() {
    await this.openLogin();
    await this.submitMobile();
    return this.verifyOtpStage();
  }

  async reachPinScreen() {
    await this.reachOtpScreen();
    await this.submitOtp();
    return this.verifyMpinStage();
  }
}

function maskedMobile(mobile) {
  return `+91 ${mobile.slice(0, 2)}****${mobile.slice(-4)}`;
}

module.exports = { LoginBL };
