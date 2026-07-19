# 💰 InvestTrack

Track stocks, mutual funds, savings & daily expenses — synced to Google Sheets for free.

![Mobile-first PWA](https://img.shields.io/badge/Mobile--first-PWA-purple) ![Google Sheets Sync](https://img.shields.io/badge/Google%20Sheets-Sync-green) ![Free](https://img.shields.io/badge/100%25-Free-blue)

## ✨ Features

- 📈 **Stocks** — Track P&L with live NSE/BSE price fetching
- 🏦 **Mutual Funds** — Track NAV, units, returns
- 💰 **Savings** — Bank, FD, RD, PPF, NPS, EPF, Gold
- 💸 **Expenses** — 12 categories, daily/bills/other
- 📊 **Dashboard** — Portfolio allocation, expense trends, charts
- 🎯 **Budget** — Monthly budget tracking
- ☁️ **Google Sheets Sync** — 100% FREE, no cloud console needed
- 📱 **PWA** — Install as app on your phone
- 💾 **Offline** — Works without internet

## 🚀 Deploy on GitHub Pages (2 minutes)

### Step 1: Create Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `investtrack` (or anything you like)
3. Set to **Public** (required for free GitHub Pages)
4. ✅ Check "Add a README file"
5. Click **Create repository**

### Step 2: Upload Files

1. In your new repo, click **"Add file" → "Upload files"**
2. **Upload all these files** from this project:

| File | Purpose |
|------|---------|
| `index.html` | Main app |
| `manifest.json` | PWA config |
| `sw.js` | Offline support |
| `README.md` | This file |
| `apps-script-code.js` | Google Sheets sync script |

3. Click **Commit changes**

### Step 3: Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under "Source", select:
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `root`
3. Click **Save**
4. Wait 1-2 minutes
5. Your app will be live at: **`https://YOUR_USERNAME.github.io/investtrack/`**

### Step 4: Add to Phone Home Screen

**Android (Chrome):**
1. Open your GitHub Pages URL in Chrome
2. Tap ⋮ menu → **"Add to Home screen"**

**iPhone (Safari):**
1. Open URL in Safari
2. Tap Share → **"Add to Home Screen"**

That's it! It works like a native app. 🎉

---

## ☁️ Google Sheets Sync Setup (FREE)

> No Google Cloud Console. No paid services. Just 2 minutes.

### Quick Setup

1. Open [sheets.google.com](https://sheets.google.com) → Create new spreadsheet
2. Click **Extensions → Apps Script**
3. Delete existing code → Paste code from `apps-script-code.js`
4. Click **Deploy → New deployment**
5. Gear icon ⚙️ → Select **"Web app"**
6. Execute as: **Me** | Access: **Anyone**
7. Click **Deploy** → Copy the **Web App URL**
8. In InvestTrack app → **Settings → Sync Status** → Paste URL → **Save**

### What Gets Synced

| Sheet Tab | Content |
|-----------|---------|
| **Stocks** | Symbol, Qty, Buy/Current Price, P&L, Broker |
| **MutualFunds** | Fund Name, Type, Units, NAV, P&L |
| **Savings** | Name, Type, Amount, Interest Rate |
| **Expenses** | Date, Category, Description, Amount |
| **Summary** | Net Worth, Totals, Last Synced |

Data auto-syncs on every add/edit/delete!

---

## 📱 Screenshots

- **Dashboard** — Net worth, allocation bars, expense trends
- **Stocks** — Live prices, P&L badges, gainers/losers filter
- **Funds** — NAV tracking, fund type, platform
- **Savings** — All accounts in one place
- **Expenses** — Category icons, date grouping, filters
- **Settings** — Google Sheets sync, budget, backup

## 🛠️ Tech

- Pure HTML/CSS/JS — No frameworks
- IndexedDB — Browser database
- Google Apps Script — Free sync backend
- Yahoo Finance API — Live stock prices
- MF API (mfapi.in) — Mutual fund NAVs
- GitHub Pages — Free hosting

## 📋 Supported Platforms

**Brokers:** Zerodha, Groww, Upstox, Angel One, ICICI Direct, HDFC Securities
**MF Platforms:** Groww, Zerodha Coin, Kuvera, ETMoney, Direct AMC

---

Made with ❤️ for personal finance
