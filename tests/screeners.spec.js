const { test } = require('../fixtures/baseFixture');

test.fixme('Verify the screeners listing page and its columns', async () => {});
test.fixme('Verify Back on the screeners listing returns to the previous page', async () => {});

test('Open top stocks listing from dashboard', async ({ screenersBL }) => {
  await screenersBL.verifyTopStocksListing();
});

test('Switch Top Gainers filter on the listing', async ({ screenersBL }) => {
  await screenersBL.verifyTopGainersFilter();
});
