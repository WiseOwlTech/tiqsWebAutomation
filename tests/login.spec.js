const { test } = require('../fixtures/baseFixture');

test.describe('Login page', () => {
  test('Verify login page loads with logo, heading, mobile field, Get OTP, Create account and Sign in with User Id', async ({ loginBL }) => {
    await loginBL.verifyLoginPageLoads();
  });

  test('Verify Get OTP is disabled when the mobile field is empty', async ({ loginBL }) => {
    await loginBL.verifyGetOtpDisabledWhenMobileEmpty();
  });

  test('Verify a valid 10 digit mobile number opens the OTP screen', async ({ loginBL }) => {
    await loginBL.verifyValidMobileOpensOtpScreen();
  });

  test('Verify Get OTP stays disabled for 9 digits and enables on the 10th digit', async ({ loginBL }) => {
    await loginBL.verifyGetOtpEnabledOnlyAfterTenDigits();
  });

  test('Verify the mobile field does not accept alphabets', async ({ loginBL }) => {
    await loginBL.verifyMobileRejectsAlphabets();
  });

  test('Verify the mobile field does not accept special characters', async ({ loginBL }) => {
    await loginBL.verifyMobileRejectsSpecialCharacters();
  });

  test('Verify the mobile field keeps only the first 10 digits', async ({ loginBL }) => {
    await loginBL.verifyMobileKeepsOnlyTenDigits();
  });

  test('Verify a mobile number shorter than 10 digits cannot request OTP', async ({ loginBL }) => {
    await loginBL.verifyShortMobileCannotRequestOtp();
  });

  test('Verify a mobile number starting with 3 is rejected', async ({ loginBL }) => {
    await loginBL.verifyInvalidPrefixMobileIsRejected();
  });

  test('Verify pasting a 10 digit mobile number enables Get OTP', async ({ loginBL }) => {
    await loginBL.verifyPastedMobileNumberEnablesGetOtp();
  });

  test.fixme('Verify pasting a mobile number with +91 or spaces', async () => {});

  test.fixme('Verify an unregistered mobile number starts the onboarding journey', async () => {});

  test.fixme('Verify a blocked or inactive mobile number shows the account message', async () => {});

  test('Verify pressing Enter on a valid mobile number opens the OTP screen', async ({ loginBL }) => {
    await loginBL.verifyEnterKeyRequestsOtp();
  });

  test('Verify Create account opens the onboarding page', async ({ loginBL }) => {
    await loginBL.verifyCreateAccountLinkOpensOnboarding();
  });

  test('Verify Sign in with User Id opens the user id login', async ({ loginBL }) => {
    await loginBL.verifySignInWithUserIdOpensUserIdLogin();
  });
});

test.describe('Login OTP', () => {
  test('Verify the OTP screen shows the mobile number in masked form', async ({ loginBL }) => {
    await loginBL.verifyOtpScreenShowsMaskedMobile();
  });

  test.fixme('Verify login with the valid OTP opens the PIN screen', async () => {});

  test('Verify an invalid OTP shows an error and stays on the OTP screen', async ({ loginBL }) => {
    await loginBL.verifyInvalidOtpShowsError();
  });

  test('Verify a blank OTP cannot continue', async ({ loginBL }) => {
    await loginBL.verifyEmptyOtpCannotContinue();
  });

  test('Verify an OTP shorter than 4 digits cannot continue', async ({ loginBL }) => {
    await loginBL.verifyShortOtpCannotContinue();
  });

  test('Verify the OTP field does not accept letters or symbols', async ({ loginBL }) => {
    await loginBL.verifyOtpRejectsLettersAndSymbols();
  });

  test.fixme('Verify an expired OTP is rejected', async () => {});

  test.fixme('Verify Resend OTP sends a new OTP', async () => {});

  test.fixme('Verify the old OTP fails after Resend OTP', async () => {});

  test.fixme('Verify Resend OTP is blocked by a wait timer', async () => {});

  test.fixme('Verify repeated wrong OTP attempts are locked', async () => {});

  test.fixme('Verify browser Back from the OTP screen returns to the mobile screen', async () => {});

  test('Verify refreshing the OTP screen does not crash the login page', async ({ loginBL }) => {
    await loginBL.verifyRefreshOnOtpScreenKeepsLoginPage();
  });
});

test.describe('Login PIN', () => {
  test('Verify the PIN screen greets the user with Welcome back', async ({ loginBL }) => {
    await loginBL.verifyPinScreenShowsWelcome();
  });

  test('Verify a valid 4 digit PIN opens the home page', async ({ loginBL }) => {
    await loginBL.login();
  });

  test('Verify a wrong PIN shows an error and stays on the PIN screen', async ({ loginBL }) => {
    await loginBL.verifyWrongPinShowsError();
  });

  test('Verify a blank PIN cannot proceed', async ({ loginBL }) => {
    await loginBL.verifyBlankPinCannotProceed();
  });

  test('Verify a PIN shorter than 4 digits cannot proceed', async ({ loginBL }) => {
    await loginBL.verifyShortPinCannotProceed();
  });

  test('Verify PIN boxes accept only digits', async ({ loginBL }) => {
    await loginBL.verifyPinRejectsLettersAndSymbols();
  });

  test('Verify PIN digits are masked', async ({ loginBL }) => {
    await loginBL.verifyPinDigitsAreMasked();
  });

  test('Verify typing a PIN digit moves focus to the next box', async ({ loginBL }) => {
    await loginBL.verifyPinFocusMovesToNextBox();
  });

  test('Verify backspace on a PIN box moves focus to the previous box', async ({ loginBL }) => {
    await loginBL.verifyPinBackspaceMovesToPreviousBox();
  });

  test.fixme('Verify the app opens the lobby when the MPIN is complete, without clicking Proceed', async () => {});

  test.fixme('Verify pasting a 4 digit PIN into the first box', async () => {});

  test.fixme('Verify repeated wrong PIN attempts lock the account', async () => {});

  test('Verify Switch Account returns to the mobile screen', async ({ loginBL }) => {
    await loginBL.verifySwitchAccountReturnsToMobile();
  });

  test('Verify Forgot PIN opens the set new PIN screen', async ({ loginBL }) => {
    await loginBL.verifyForgotPinOpensSetNewPin();
  });
});

test.describe('Forgot PIN', () => {
  test.fixme('Verify set new PIN with a valid PAN and matching PIN', async () => {});

  test.fixme('Verify an invalid PAN format is rejected', async () => {});

  test.fixme('Verify a lowercase PAN is rejected or converted to uppercase', async () => {});

  test.fixme('Verify a PAN that belongs to another user is rejected', async () => {});

  test.fixme('Verify PIN and Confirm PIN must match', async () => {});

  test.fixme('Verify a weak PIN such as 1111 or 1234 is handled', async () => {});

  test.fixme('Verify Proceed is blocked when every set-new-PIN field is blank', async () => {});

  test.fixme('Verify OTP and MPIN creation for a newly onboarded user', async () => {});

  test.fixme('Verify Switch Account on the set new PIN page returns to mobile login', async () => {});
});

test.describe('Login footer', () => {
  test('Verify the login footer shows SEBI, NSE and BSE details', async ({ loginBL }) => {
    await loginBL.verifySebiFooterIsPresent();
  });

  test('Verify Terms of Service and Privacy Policy links are present', async ({ loginBL }) => {
    await loginBL.verifyLegalLinks();
  });

  test('Verify Play Store, App Store and QR download actions are present', async ({ loginBL }) => {
    await loginBL.verifyAppDownloadLinks();
  });

  test('Verify the login page is served over HTTPS', async ({ loginBL }) => {
    await loginBL.verifySiteUsesHttps();
  });
});
