# Screenshot coverage matrix

Maps every visible page/block/action from the TIQS Figma screenshots to Page / BL / Test (same stem names).

**Status legend**

| Status | Meaning |
|---|---|
| `mapped` | Class + methods exist; role/text selectors preferred |
| `blocked-credentials` | Needs `TIQS_MOBILE` / `TIQS_PIN` (optional `TIQS_OTP`) |
| `blocked-testid` | `TestIds.*` still empty placeholders |
| `skeleton` | TestNG class compiles; UI tests stay out of default `testng.xml` until credentials exist |

**Assumptions**

- Accessible names/labels match the screenshot copy (English).
- Dashboard deep-links for Early Signals may differ; navigation is marked blocked until confirmed.
- Instant Exit confirmation is destructive and gated by `allow.destructive.tests`.
- No hardcoded credentials; no fake passes for blocked flows.

---

## Login

| Page / block | Visible action / assertion intent | Page / Component | BL | Test class | Status |
|---|---|---|---|---|---|
| Login landing | Hero "Trade with clarity…"; card "Sign in to your TIQS account" | `LoginPage` | `LoginBL.openLogin` | `LoginTest` | mapped / skeleton |
| Mobile stage | Fill Mobile Number; Get OTP enabled | `LoginPage.enterMobile/requestOtp` | `LoginBL` | `LoginTest` | blocked-credentials, blocked-testid |
| OTP stage | Enter OTP; Resend OTP; Proceed | `LoginPage.enterOtp/proceed` | `LoginBL` | `LoginTest` | blocked-credentials, blocked-testid |
| PIN stage | Enter 4 digit PIN; Forgot PIN; Proceed | `LoginPage.enterPin` | `LoginBL` | `LoginTest` | blocked-credentials, blocked-testid |
| Set New PIN | Enter your PIN + Confirm New PIN; Proceed | `LoginPage.setNewPin` | `LoginBL.completeNewPinSetup` | `LoginTest` | blocked-credentials, blocked-testid |
| Switch account / Create account / User ID | Secondary links | `LoginPage` | — | `LoginTest` | mapped |

## Dashboard

| Page / block | Visible action / assertion intent | Page / Component | BL | Test class | Status |
|---|---|---|---|---|---|
| Header nav | Home, Orders, Holdings, Positions, Funds, IPO, Research | `HeaderNavComponent` | `DashboardBL` | `DashboardTest` | mapped / skeleton |
| Header indices | NIFTY 50, SENSEX tickers | `HeaderNavComponent` | — | `DashboardTest` | mapped |
| Profile trigger | Open avatar menu | `ProfilePage` | `ProfileBL.openMenu` | `ProfileTest` | blocked-credentials |
| Watchlist | Search, tabs 1/2/3, open stock, Buy/Sell hover | `WatchlistComponent` | `DashboardBL.openWatchlistStock` | `DashboardTest` | blocked-credentials, blocked-testid |
| Available Funds | Value + Add | `FundsCardComponent` | — | `DashboardTest` | blocked-credentials |
| Holdings card | Value + Overall P&L | `HoldingsCardComponent` | — | `DashboardTest` | blocked-credentials |
| Positions card | Open count + Day P&L | `PositionsCardComponent` | — | `DashboardTest` | blocked-credentials |
| Portfolio panel | Positions/Holdings tabs, Day's P&L, Instant Exit | `PortfolioPanelComponent` | `ExitOrderBL` | `ExitOrderTest` | blocked-credentials |
| Recently Viewed | Open stock cards | `RecentlyViewedComponent` | — | `DashboardTest` | blocked-credentials |
| Screeners block | Cards + View All | `ScreenersBlockComponent` | `ScreenersBL.openFromDashboard` | `ScreenersTest` | blocked-credentials |
| Today's Top Stocks | Filters + rows + View All | `TopStocksComponent` | `ScreenersBL.openTopStocksFromDashboard` | `ScreenersTest` | blocked-credentials |
| Quick Trade | Option Chain, Trade with Chart, ranges | `QuickTradeComponent` | — | `DashboardTest` | blocked-credentials |
| Indices | Index cards | `IndicesComponent` | — | `DashboardTest` | blocked-credentials |

## Listings

| Page / block | Visible action / assertion intent | Page / Component | BL | Test class | Status |
|---|---|---|---|---|---|
| Screeners listing | Back; Top Gainers / Volume Spike / 52W / Losers table | `ScreenersPage` | `ScreenersBL` | `ScreenersTest` | blocked-credentials |
| Early signals | Today's Signals; Short/Mid/Long Term; View More | `EarlySignalsPage` | `EarlySignalsBL` | `EarlySignalsTest` | blocked-credentials (nav path TBD) |

## Profile / dialogs / toast

| Page / block | Visible action / assertion intent | Page / Component | BL | Test class | Status |
|---|---|---|---|---|---|
| Profile dropdown | Profile, Funds, Tradebook, P&L, Support, Contract Note, Logout | `ProfilePage` | `ProfileBL` | `ProfileTest` | blocked-credentials, blocked-testid |
| Exit Order dialog | Message; confirm / cancel | `ExitOrderPage` | `ExitOrderBL` | `ExitOrderTest` | blocked-credentials |
| Toast | e.g. Add cash successful / exit status | `ExitOrderPage` | `ExitOrderBL` | `ExitOrderTest` | blocked-credentials, blocked-testid |

## Stock detail

| Page / block | Visible action / assertion intent | Page / Component | BL | Test class | Status |
|---|---|---|---|---|---|
| Detail header | Title, LTP, Buy, Sell | `StockDetailHeaderComponent` | `StockDetailBL` | `StockDetailTest` | blocked-credentials |
| Tabs | Chart, Overview, Option Chain, Fundamentals, Technicals, News | `StockDetailTabsComponent` | `StockDetailBL.visitAllPrimaryTabs` | `StockDetailTest` | blocked-credentials, blocked-testid |
| Chart | Chart canvas | `ChartTabComponent` | `StockDetailBL.openChart` | `StockDetailTest` | blocked-credentials |
| Overview / Stock Score | Score widget | `StockScoreSection` | `StockDetailBL.openOverview` | `StockDetailTest` | blocked-credentials |
| Overview / Performance | Ranges + OHLCV | `PerformanceSection` | — | `StockDetailTest` | blocked-credentials |
| Overview / Market Depth | Bid/Offer | `MarketDepthSection` | — | `StockDetailTest` | blocked-credentials |
| Overview / Investment Return | Horizon cards | `InvestmentReturnSection` | — | `StockDetailTest` | blocked-credentials |
| Overview / Company Overview | Description + Read More + metadata | `CompanyOverviewSection` | — | `StockDetailTest` | blocked-credentials |
| Fundamentals / Insights | Insight cards | `InsightsSection` | `StockDetailBL.openFundamentals` | `StockDetailTest` | blocked-credentials |
| Fundamentals / Key Ratios | Ratio grid | `KeyRatiosSection` | — | `StockDetailTest` | blocked-credentials |
| Fundamentals / Financial Performance | Revenue/Net Profit chart | `FinancialPerformanceSection` | — | `StockDetailTest` | blocked-credentials |
| Fundamentals / Shareholding | Pattern chart + periods | `ShareholdingSection` | — | `StockDetailTest` | blocked-credentials |
| Fundamentals / Peer Comparison | Peer table | `PeerComparisonSection` | — | `StockDetailTest` | blocked-credentials |
| Technicals / Delivery Volume | Daily/Weekly/Monthly | `DeliveryVolumeSection` | `StockDetailBL.openTechnicals` | `StockDetailTest` | blocked-credentials |
| Technicals / Key Indicators | Bullish/Neutral/Bearish table | `KeyIndicatorsSection` | — | `StockDetailTest` | blocked-credentials |
| News | News cards | `NewsCardsSection` | `StockDetailBL.openNews` | `StockDetailTest` | blocked-credentials |
| Option Chain | Chain table/panel | `OptionChainSection` | `StockDetailBL.openOptionChain` | `StockDetailTest` | blocked-credentials |

## Pure unit tests (safe without browser)

| Class | Purpose | Status |
|---|---|---|
| `LocatorFactoryTest` | test-id resolve / anyMissing | runnable |
| `TestGatesTest` | credential / testid gate messages | runnable |
