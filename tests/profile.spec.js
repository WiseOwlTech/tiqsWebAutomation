const { test } = require('../fixtures/baseFixture');

test('Open profile menu after login', async ({ profileBL }) => {
  await profileBL.verifyMenuOpen();
});

test('Profile menu exposes Tradebook entry', async ({ profileBL }) => {
  await profileBL.verifyTradebookVisible();
});

test.fixme('Verify the profile menu shows Profile/Settings, Funds, Tradebook, P&L, Support, Contact Note and Logout', async () => {});
test.fixme('Verify the profile menu closes when the user clicks outside it', async () => {});
test.fixme('Verify each profile menu option opens the correct page', async () => {});
test.fixme('Verify Logout returns the user to the login page', async () => {});
test.fixme('Verify browser Back after logout does not open a logged-in page', async () => {});
