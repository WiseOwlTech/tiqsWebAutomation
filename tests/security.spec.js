const { test } = require('../fixtures/baseFixture');

test.describe('Security and authentication', () => {
  test.fixme('Verify a copied Holdings URL redirects to login after logout', async () => {});
  test.fixme('Verify an idle session asks the user to log in again', async () => {});
  test.fixme('Verify the same account login on two devices follows the business rule', async () => {});
  test.fixme('Verify the session after the browser is closed and reopened', async () => {});
  test.fixme('Verify a tampered token is rejected on refresh', async () => {});
  test.fixme('Verify SQL injection text in the mobile or user id field is rejected', async () => {});
  test.fixme('Verify a script tag in watchlist search is not executed', async () => {});
  test.fixme('Verify PIN and OTP are absent from the URL, logs and network response', async () => {});
  test.fixme('Verify the browser does not offer autocomplete for PIN and OTP', async () => {});
  test.fixme('Verify changing an id in an API URL does not return another user\'s data', async () => {});
  test.fixme('Verify Get OTP is rate limited', async () => {});
});
