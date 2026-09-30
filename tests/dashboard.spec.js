const { test } = require('../fixtures/baseFixture');

test('Dashboard core blocks visible after login', async ({ dashboardBL }) => {
  await dashboardBL.verifyCoreBlocksAfterLogin();
});

test('Watchlist block is usable after login', async ({ dashboardBL }) => {
  await dashboardBL.verifyWatchlistAfterLogin();
});

test.fixme('Verify the home page shows watchlist, funds, holdings, positions, top stocks, quick trade and indices', async () => {});
test.fixme('Verify the top bar shows NIFTY 50 and SENSEX, and the values follow the user setting', async () => {});
test.fixme('Verify Home, Orders, Holdings, Positions, Funds, IPO and Research each open the correct page', async () => {});
test.fixme('Verify available funds and the Add button', async () => {});
test.fixme('Verify Recently Viewed keeps up to 10 stocks and can scroll', async () => {});
test.fixme('Verify screener cards on the home page and View All', async () => {});
test.fixme('Verify Today\'s Top Stocks tabs: Top Gainers, Volume Spike, 52 Week Low, 52 Week High and Top Losers', async () => {});
test.fixme('Verify the quick trade chart and timeframe buttons for NIFTY 50, SENSEX and BANK NIFTY', async () => {});
test.fixme('Verify the indices section shows up values in green and down values in red', async () => {});
test.fixme('Verify the empty state for a new user with no holdings or positions', async () => {});
test.fixme('Verify the watchlist loads stocks and prices', async () => {});
test.fixme('Verify watchlist search finds RELIANCE', async () => {});
test.fixme('Verify watchlist search with no match shows a no-results message', async () => {});
test.fixme('Verify switching watchlist tabs 1, 2 and 3', async () => {});
test.fixme('Verify hover actions on a watchlist stock: buy, sell and chart', async () => {});
test.fixme('Verify changing a watchlist name', async () => {});
test.fixme('Verify a watchlist cannot hold more than 10 symbols', async () => {});
test.fixme('Verify live values update inside the watchlist', async () => {});
test.fixme('Verify a stock or option can be bought and sold from the watchlist', async () => {});
test.fixme('Verify chart and graph can be opened from the watchlist', async () => {});
test.fixme('Verify watchlist price colours update green, red and neutral', async () => {});
test.fixme('Verify the Positions and Holdings mini panel on the home page', async () => {});
