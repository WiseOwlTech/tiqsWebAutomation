const { test } = require('../fixtures/baseFixture');

test.fixme('Verify Short Term, Mid Term and Long Term tabs change the signal list and counts', async () => {});
test.fixme('Verify View More on a signal opens the stock detail', async () => {});

test('Select Short Term filter when signals page is reachable', async ({ earlySignalsBL }) => {
  await earlySignalsBL.verifyShortTermFilter();
});
