const { test } = require('../fixtures/baseFixture');

test.fixme('Verify the Exit Order popup shows the permanent-removal message', async () => {});
test.fixme('Verify Keep Order closes the popup and leaves the order in place', async () => {});
test.fixme('Verify Exit Order confirms and exits the order', async () => {});
test.fixme('Verify the close icon dismisses the Exit Order popup', async () => {});
test.fixme('Verify a double click on Exit Order does not exit the order twice', async () => {});
test.fixme('Verify a success toast appears when cash is added', async () => {});
test.fixme('Verify a toast disappears on its own after a few seconds', async () => {});
test.fixme('Verify a failed action shows an error toast', async () => {});

test('Cancel Instant Exit dialog without confirming', async ({ exitOrderBL }) => {
  await exitOrderBL.cancelInstantExit();
});

test('Confirm Instant Exit requires destructive flag', async ({ exitOrderBL }) => {
  await exitOrderBL.confirmInstantExit();
});
