const { test } = require('../fixtures/baseFixture');

test.describe('Network errors', () => {
  test.fixme('Verify Get OTP shows an error when the internet is off', async () => {});
  test.fixme('Verify Proceed on the OTP screen shows an error when the internet is off', async () => {});
  test.fixme('Verify the home page shows an offline message when the internet drops', async () => {});
  test.fixme('Verify data reloads when the internet comes back', async () => {});
  test.fixme('Verify Slow 3G shows loaders during login and page opens', async () => {});
  test.fixme('Verify an API 500 shows a friendly error', async () => {});
  test.fixme('Verify a 30 second API delay is handled', async () => {});
  test.fixme('Verify a network drop just after placing an order does not create a duplicate', async () => {});
  test.fixme('Verify an unknown URL shows a not-found state', async () => {});
});
