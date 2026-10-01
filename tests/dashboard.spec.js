const { test } = require('../fixtures/baseFixture');

test('Home locator blocks are visible after login', async ({ dashboardBL }) => {
  await dashboardBL.verifyCoreBlocksAfterLogin();
});

test('Watchlist locator blocks are visible after login', async ({ dashboardBL }) => {
  await dashboardBL.verifyWatchlistAfterLogin();
});

// Case 51
test('Verify the home page shows watchlist, funds, holdings, positions, top stocks, quick trade and indices', async ({
  dashboardBL,
}) => {
  await dashboardBL.verifyHomePageLoadsAfterLogin();
});

test.fixme('Verify the top bar shows NIFTY 50 and SENSEX, and the values follow the user setting', async () => {});

// Case 53
test('Verify Home, Orders, Holdings, Positions, Funds, IPO and Research each open the correct page', async ({
  dashboardBL,
}) => {
  await dashboardBL.verifyTopMenuNavigation();
});

// Case 54
test('Verify available funds and the Add button', async ({ dashboardBL }) => {
  await dashboardBL.verifyAvailableFundsAndAdd();
});

test.fixme('Verify Recently Viewed keeps up to 10 stocks and can scroll', async () => {});

// Case 56
test('Verify screener cards on the home page and View All', async ({ dashboardBL }) => {
  await dashboardBL.verifyScreenersOnHome();
});

// Case 57
test('Verify Today\'s Top Stocks tabs: Top Gainers, Volume Spike, 52 Week Low, 52 Week High and Top Losers', async ({
  dashboardBL,
}) => {
  await dashboardBL.verifyTodaysTopStocksTabs();
});

test.fixme('Verify the quick trade chart and timeframe buttons for NIFTY 50, SENSEX and BANK NIFTY', async () => {});

// Case 59
test('Verify the indices section shows up values in green and down values in red', async ({ dashboardBL }) => {
  await dashboardBL.verifyIndicesSection();
});

test.fixme('Verify the empty state for a new user with no holdings or positions', async () => {});

// Case 61
test('Verify the watchlist loads stocks and prices', async ({ dashboardBL }) => {
  await dashboardBL.verifyWatchlistLoadsStocksAndPrices();
});

// Case 62
test('Verify watchlist search finds RELIANCE', async ({ dashboardBL }) => {
  await dashboardBL.verifyWatchlistSearchFindsSymbol('RELIANCE');
});

// Case 63
test('Verify watchlist search with no match shows a no-results message', async ({ dashboardBL }) => {
  await dashboardBL.verifyWatchlistSearchNoResults();
});

// Case 64
test('Verify switching watchlist tabs 1, 2 and 3', async ({ dashboardBL }) => {
  await dashboardBL.verifyWatchlistTabs();
});

test.fixme('Verify hover actions on a watchlist stock: buy, sell and chart', async () => {});
test.fixme('Verify changing a watchlist name', async () => {});
test.fixme('Verify a watchlist cannot hold more than 10 symbols', async () => {});
test.fixme('Verify live values update inside the watchlist', async () => {});
test.fixme('Verify a stock or option can be bought and sold from the watchlist', async () => {});
test.fixme('Verify chart and graph can be opened from the watchlist', async () => {});
test.fixme('Verify watchlist price colours update green, red and neutral', async () => {});

// Case 71
test('Verify the Positions and Holdings mini panel on the home page', async ({ dashboardBL }) => {
  await dashboardBL.verifyPositionsHoldingsMiniPanel();
});
