/**
 * Home screen data-testid values from https://app.dev.tiqs.in/home.
 */
class HomeLocators {
  constructor(page) {
    this.page = page;
  }

  pageRoot() {
    return this.byTestId('home-page');
  }

  summaryCards() {
    return this.byTestId('home-summary-cards');
  }

  fundsCard() {
    return this.byTestId('home-summary-card-funds');
  }

  fundsValue() {
    return this.byTestId('home-summary-funds-value');
  }

  addFundsButton() {
    return this.byTestId('home-summary-add-funds-button');
  }

  holdingsCard() {
    return this.byTestId('home-summary-card-holdings');
  }

  holdingsBadge() {
    return this.byTestId('home-summary-holdings-badge');
  }

  holdingsValue() {
    return this.byTestId('home-summary-holdings-value');
  }

  holdingsPnl() {
    return this.byTestId('home-summary-holdings-pnl');
  }

  positionsCard() {
    return this.byTestId('home-summary-card-positions');
  }

  positionsBadge() {
    return this.byTestId('home-summary-positions-badge');
  }

  positionsValue() {
    return this.byTestId('home-summary-positions-value');
  }

  positionsPnl() {
    return this.byTestId('home-summary-positions-pnl');
  }

  screeners() {
    return this.byTestId('home-screeners');
  }

  screenersTitle() {
    return this.byTestId('home-screeners-title');
  }

  screenersViewAll() {
    return this.byTestId('home-screeners-view-all');
  }

  screenersGrid() {
    return this.byTestId('home-screeners-grid');
  }

  screenerItem(symbol) {
    return this.byTestId(`home-screeners-item-${symbol}`);
  }

  screenerWatchlistButton(symbol) {
    return this.byTestId(`home-screeners-watchlist-button-${symbol}`);
  }

  screenerPrice(symbol) {
    return this.byTestId(`home-screeners-price-${symbol}`);
  }

  screenerChange(symbol) {
    return this.byTestId(`home-screeners-change-${symbol}`);
  }

  todaysTopStocks() {
    return this.byTestId('home-todays-top-stocks');
  }

  todaysTopStocksTitle() {
    return this.byTestId('home-todays-top-stocks-title');
  }

  todaysTopStocksViewAll() {
    return this.byTestId('home-todays-top-stocks-view-all');
  }

  todaysTopStocksTabs() {
    return this.byTestId('home-todays-top-stocks-tabs');
  }

  todaysTopStocksTab(tabId) {
    return this.byTestId(`home-todays-top-stocks-tab-${tabId}`);
  }

  topGainersTab() {
    return this.todaysTopStocksTab('top_movers_gainers');
  }

  volumeSpikeTab() {
    return this.todaysTopStocksTab('volume_breakout');
  }

  weekLowTab() {
    return this.todaysTopStocksTab('52_week_low');
  }

  weekHighTab() {
    return this.todaysTopStocksTab('52_week_high');
  }

  topLosersTab() {
    return this.todaysTopStocksTab('top_movers_losers');
  }

  todaysTopStocksTable() {
    return this.byTestId('home-todays-top-stocks-table');
  }

  todaysTopStocksItem(symbol) {
    return this.byTestId(`home-todays-top-stocks-item-${symbol}`);
  }

  todaysTopStocksPrice(symbol) {
    return this.byTestId(`home-todays-top-stocks-price-${symbol}`);
  }

  todaysTopStocksChange(symbol) {
    return this.byTestId(`home-todays-top-stocks-change-${symbol}`);
  }

  quickTrade() {
    return this.byTestId('home-quick-trade');
  }

  quickTradeTitle() {
    return this.byTestId('home-quick-trade-title');
  }

  quickTradeOptionChain() {
    return this.byTestId('home-quick-trade-action-option-chain');
  }

  quickTradeWithChart() {
    return this.byTestId('home-quick-trade-action-trade-with-chart');
  }

  quickTradeChart() {
    return this.byTestId('home-quick-trade-chart');
  }

  indices() {
    return this.byTestId('home-indices');
  }

  indicesTitle() {
    return this.byTestId('home-indices-title');
  }

  indicesGrid() {
    return this.byTestId('home-indices-grid');
  }

  indexItem(name) {
    return this.byTestId(`home-index-item-${name}`);
  }

  indexPinButton(name) {
    return this.byTestId(`home-index-pin-button-${name}`);
  }

  indexPrice(name) {
    return this.byTestId(`home-index-price-${name}`);
  }

  indexChange(name) {
    return this.byTestId(`home-index-change-${name}`);
  }

  byTestId(testId) {
    return this.page.getByTestId(testId);
  }
}

module.exports = { HomeLocators };
