const { test } = require('../fixtures/baseFixture');

test('Orders locator blocks are visible after login', async ({ ordersBL }) => {
  await ordersBL.verifyLocatorsAfterLogin();
});

// Case 100
test('Verify the Orders page opens with Open, Executed and Trades tabs', async ({ ordersBL }) => {
  await ordersBL.verifyOpenExecutedTradesTabs();
});

// Case 101
test('Verify the GTT tab on the Orders page', async ({ ordersBL }) => {
  await ordersBL.verifyGttTab();
});

test.fixme('Verify order status labels: Complete, Rejected and Trigger Pending', async () => {});

// Case 103
test('Verify order search finds a stock such as BHARTI', async ({ ordersBL }) => {
  await ordersBL.verifyOrderSearch('BHARTI');
});

// Case 104
test('Verify order search with no match shows an empty result', async ({ ordersBL }) => {
  await ordersBL.verifyOrderSearchNoMatch();
});

test.fixme('Verify the Orders Download button downloads a file', async () => {});
test.fixme('Verify a user with no orders sees an empty state', async () => {});
test.fixme('Verify the order menu shows Buy, Sell, Repeat, Info, Market Depth, Chart and Add to Watchlist', async () => {});
test.fixme('Verify Repeat order opens a prefilled order window', async () => {});
test.fixme('Verify Add to Watchlist from the order menu', async () => {});
