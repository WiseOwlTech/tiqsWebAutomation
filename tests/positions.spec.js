const { test } = require('../fixtures/baseFixture');

test('Positions locator blocks are visible after login', async ({ positionsBL }) => {
  await positionsBL.verifyLocatorsAfterLogin();
});

// Case 117
test('Verify positions summary shows booked profit, open loss and total P&L', async ({ positionsBL }) => {
  await positionsBL.verifyPositionsSummary();
});

test.fixme('Verify each position shows an Intraday or Delivery tag', async () => {});
test.fixme('Verify Exit on an open position asks for confirmation', async () => {});
test.fixme('Verify the position menu shows Convert, Add and Chart', async () => {});
test.fixme('Verify the total row matches the sum of the position rows', async () => {});
test.fixme('Verify a user with no positions sees an empty state', async () => {});
