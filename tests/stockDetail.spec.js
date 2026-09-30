const { test } = require('../fixtures/baseFixture');

test.fixme('Verify stock detail opened from the watchlist shows name, price, change, Buy and Sell', async () => {});
test.fixme('Verify the Chart tab loads the price chart', async () => {});
test.fixme('Verify chart timeframes can be switched', async () => {});
test.fixme('Verify Overview shows stock score, performance, market depth, investment return and company overview', async () => {});
test.fixme('Verify Fundamentals shows insights, key ratios, financials, shareholding and peer comparison', async () => {});
test.fixme('Verify Technicals shows delivery volume and key indicators', async () => {});
test.fixme('Verify the News tab lists news for the selected stock', async () => {});
test.fixme('Verify switching tabs keeps the same stock selected', async () => {});
test.fixme('Verify Buy opens the buy order window', async () => {});
test.fixme('Verify Sell opens the sell order window', async () => {});
test.fixme('Verify the bookmark icon adds the stock to the watchlist', async () => {});
test.fixme('Verify the News tab shows an empty state when the stock has no news', async () => {});
test.fixme('Verify Fundamentals handles an ETF or new listing with missing data', async () => {});
test.fixme('Verify very large or negative numbers do not overflow the stock detail layout', async () => {});
test.fixme('Verify the stock detail shows the last close price when the market is closed', async () => {});

test('Visit all primary stock tabs after opening a watchlist symbol', async ({ stockDetailBL }) => {
  await stockDetailBL.verifyAllPrimaryTabs();
});

test('Overview tab exposes stock score section', async ({ stockDetailBL }) => {
  await stockDetailBL.verifyOverviewStockScore();
});

test('News tab lists news cards', async ({ stockDetailBL }) => {
  await stockDetailBL.verifyNewsCards();
});
