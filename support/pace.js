const config = require('../config/configReader');

/**
 * Shared pacing for visible (headed) runs so typing and clicks are watchable.
 * Headless stays fast.
 */
function isHeaded() {
  if (process.env.PLAYWRIGHT_HEADED === '1') return true;
  if (process.env.PLAYWRIGHT_HEADED === '0') return false;
  if (process.env.MODE === 'headed') return true;
  if (process.env.MODE === 'headless') return false;
  if (process.env.DISPLAY) return true;
  return !config.bool('headless', true);
}

function slowMoMs() {
  if (!isHeaded()) return 0;
  return config.number('headed.slow.mo.ms', 400);
}

function typeDelayMs() {
  if (!isHeaded()) return 0;
  return config.number('headed.type.delay.ms', 140);
}

function stepPauseMs() {
  if (!isHeaded()) return 0;
  return config.number('headed.step.pause.ms', 600);
}

async function pause(page, ms = stepPauseMs()) {
  if (!ms || ms <= 0) return;
  await page.waitForTimeout(ms);
}

/**
 * Type so humans can see each keystroke in headed mode.
 * Headless uses fill() for speed.
 */
async function typeVisible(locator, value) {
  const delay = typeDelayMs();
  await locator.click();
  await locator.fill('');
  if (delay > 0) {
    await locator.pressSequentially(String(value), { delay });
  } else {
    await locator.fill(String(value));
  }
}

module.exports = {
  isHeaded,
  slowMoMs,
  typeDelayMs,
  stepPauseMs,
  pause,
  typeVisible,
};
