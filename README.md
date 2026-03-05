# Gold Price Dashboard

A real-time gold price dashboard showing **world spot gold (XAU)** and **Vietnam gold** (SJC bar and 9999 ring) in a single view. Built with Next.js 16 and React 19.

---

## Business Roles

| Role | Description |
|------|-------------|
| **End user** | Views live gold prices (world + Vietnam) for quick reference; no login required. |
| **Developer** | Maintains API routes, hooks, and UI; can add new price sources or regions later. |

The app is **read-only**: no authentication, no user data, no transactions—focused on displaying up-to-date prices.

---

## Features

- **World gold (XAU)** – Spot price in USD from a global API.
- **Vietnam SJC gold** – Buy/sell prices for SJC bar (SJL1L10) in VND.
- **Vietnam gold ring 9999** – Buy/sell prices for 9999 ring (SJ9999) in VND.
- **Auto-refresh** – All prices refresh every 2 minutes (120s) via SWR.
- **Responsive layout** – Grid adapts for mobile and desktop.
- **Live indicator** – Green “Live” badge in the header.
- **Loading states** – “Loading...” while data is fetched.

---

## Libraries & Technologies

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19 |
| **Language** | TypeScript 5 |
| **Data fetching (client)** | SWR (stale-while-revalidate, 2 min refresh) |
| **HTTP client** | `fetch` (native), axios (dependency present) |
| **Styling** | Tailwind CSS v4, PostCSS |
| **Fonts** | Geist, Geist Mono (next/font) |
| **Lint** | ESLint 9, eslint-config-next |

---

## Project Directory Structure

```
gold-price-app-2026/
├── app/
│   ├── api/
│   │   └── gold/
│   │       ├── world/
│   │       │   └── route.ts          # GET – world XAU price
│   │       └── vietnam/
│   │           ├── sjc/
│   │           │   └── route.ts     # GET – Vietnam SJC bar
│   │           └── ring/
│   │               └── route.ts     # GET – Vietnam 9999 ring
│   ├── globals.css
│   ├── layout.tsx                   # Root layout, fonts, metadata
│   └── page.tsx                     # Dashboard UI (client)
├── hooks/
│   └── useGold.ts                   # useWorldGold, useGoldSJC, useGoldRing (SWR)
├── public/
│   ├── vercel.svg
│   ├── file.svg
│   └── window.svg
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

---

## APIs Used

### 1. World gold (XAU)

- **Purpose:** Spot gold price in USD.
- **External API:** `https://api.gold-api.com/price/XAU`
- **App route:** `GET /api/gold/world`
- **Response shape:** `{ price, currency, updated }`
- **Notes:** Used for the “World Gold” card.

### 2. Vietnam SJC gold

- **Purpose:** SJC bar (SJL1L10) buy/sell in VND.
- **External API:** `https://giavang.now/api/prices?type=SJL1L10`
- **App route:** `GET /api/gold/vietnam/sjc`
- **Response shape:** `{ name, buy, sell, time, date }`
- **Notes:** Fetched with `cache: "no-store"`.

### 3. Vietnam gold ring 9999

- **Purpose:** 9999 ring (SJ9999) buy/sell in VND.
- **External API:** `https://giavang.now/api/prices?type=SJ9999`
- **App route:** `GET /api/gold/vietnam/ring`
- **Response shape:** `{ name, buy, sell, time, date }`
- **Notes:** Fetched with `cache: "no-store"`; includes `res.ok` check.

All external calls are done **server-side** in Next.js API routes; the front end only calls the app’s `/api/gold/*` endpoints.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Build for production:

```bash
npm run build
npm start
```

---

## Future Scalability

- **More regions** – Add routes under `app/api/gold/{region}/` (e.g. india, uae) and new hooks in `useGold.ts`; reuse the same card layout on the dashboard.
- **More Vietnam types** – Support extra `giavang.now` types (e.g. PNJ, DOJI) via new routes and optional query params.
- **Caching & resilience** – Use Next.js `revalidate` or a small cache layer (e.g. Redis/Upstash) for world/vietnam routes to reduce load on external APIs and handle rate limits.
- **History & charts** – Store periodic snapshots (DB or file) and add a “History” view with a charting library (e.g. Recharts, Lightweight Charts).
- **Alerts** – Optional “price above X” / “price below X” alerts using a backend job + email/push (e.g. Resend, OneSignal).
- **i18n** – Add next-intl or similar for Vietnamese/English and locale-aware number formatting.
- **Monitoring** – Add error tracking (e.g. Sentry) and optional uptime checks on `/api/gold/*`.
- **API key handling** – If any provider moves to API keys, centralize secrets in env (e.g. `GOLD_API_KEY`, `GIAVANG_API_KEY`) and use them only in server routes.

Keeping **API routes thin** (fetch → normalize → JSON) and **hooks + UI generic** (e.g. a reusable `GoldCard` component) will make adding new sources and regions straightforward.
