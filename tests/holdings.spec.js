const { test } = require('../fixtures/baseFixture');

test('Holdings locator blocks are visible after login', async ({ holdingsBL }) => {
  await holdingsBL.verifyLocatorsAfterLogin();
});

// Case 110
test('Verify holdings summary shows invested value, current value, today\'s P&L and overall P&L', async ({
  holdingsBL,
}) => {
  await holdingsBL.verifyHoldingsSummary();
});

test.fixme('Verify the holdings list shows stock, quantity, average price, LTP, current value and P&L', async () => {});
test.fixme('Verify profit P&L is green and loss P&L is red', async () => {});
test.fixme('Verify holdings P&L matches (LTP - average) x quantity', async () => {});
test.fixme('Verify holdings search finds a stock such as HDFC', async () => {});
test.fixme('Verify the Holdings Download button downloads a file', async () => {});
test.fixme('Verify the holding menu shows Exit, Add, Set Exit Price, Market Depth, Chart and Add to Watchlist', async () => {});
