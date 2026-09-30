const { test } = require('../fixtures/baseFixture');

test.describe('IPO', () => {
  test.fixme('Verify the IPO page opens with Open, Applied, Closed and Upcoming tabs', async () => {});
  test.fixme('Verify each IPO tab count matches the number of rows', async () => {});
  test.fixme('Verify an open IPO shows company, type, dates, price and Apply', async () => {});
  test.fixme('Verify Applied filters: All, Applied, Allotted, Not Allotted and Refunded', async () => {});
  test.fixme('Verify the Closed tab shows listing gain and loss colours', async () => {});
  test.fixme('Verify Upcoming shows Pre-apply', async () => {});
  test.fixme('Verify the IPO details popup shows price, lot size, schedule and about', async () => {});
  test.fixme('Verify the IPO details popup closes from the close icon and from an outside click', async () => {});
  test.fixme('Verify apply for an IPO with a valid UPI id and quantity', async () => {});
  test.fixme('Verify apply for an IPO rejects an invalid UPI id', async () => {});
  test.fixme('Verify a bid above the cap price is rejected', async () => {});
  test.fixme('Verify a bid quantity above the maximum is rejected', async () => {});
  test.fixme('Verify apply is blocked when funds are insufficient', async () => {});
  test.fixme('Verify apply is blocked after the IPO has closed', async () => {});
  test.fixme('Verify a second application for the same IPO is rejected', async () => {});
  test.fixme('Verify Refresh reloads the IPO list', async () => {});
  test.fixme('Verify a tab with no IPOs shows an empty message', async () => {});
});
