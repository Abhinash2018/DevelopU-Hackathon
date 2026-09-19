# UFCU StartSmart member experience

This repository contains the React/Vite implementation for the UFCU StartSmart member journey.

## Current member flow

The main application opens at the login page and follows the StartSmart architecture:

```text
Login
→ Create account
→ Personal information, date of birth, ID type, ID last four, and SSN last four
→ What are you looking for?
→ Smart Match recommendation
→ Review and consent
→ Membership processing
→ Membership ready / manual review
→ Card activation and optional setup
→ Member dashboard
```

The identity step intentionally collects only an identification type plus last-four values in this frontend. It does not accept a full SSN, full ID number, ID image, password, or real credit-bureau submission. The approval screen is a local membership-review state and must be replaced by UFCU-approved identity, eligibility, and account-opening services before production use.

The dashboard includes:

- Overview with balances, upcoming payments, activity, and setup progress
- Accounts
- Move Money
- Smart Switch
- Direct Deposit with employer selection and secure portal handoff
- Cards & Wallet
- Financial Insights
- Nearby Offers with optional one-time location or ZIP access
- Learn AI for fraud and security questions
- Profile with personal information and editable settings
- Notifications with unread/read state and “mark all read”
- Search for member features
- Move Money bottom sheet with transfer, send, receive, and direct-deposit paths
- Account detail slide-over with masked numbers, an explicit reveal toggle, and a Move Money shortcut
- Architecture and feature-proof reference routes

Goals has intentionally been removed from the member navigation.

## Data-layer audit

The starting repository does not contain a database, API server, migrations, ORM, authentication provider, or external financial integration. Existing product and onboarding data is stored in TypeScript files and React context.

The current member experience keeps its state in `MemberContext` for this frontend milestone. Direct Deposit, Smart Switch, wallet, offers, balances, account details, and membership decisions use local illustrative values. Direct Deposit deliberately uses a simulated secure employer handoff and never collects an employer password in the UFCU interface.

The architecture is ready for a later API/database adapter without coupling the UI to a specific provider.

## Run locally

Use Node.js 22.12 or later:

```sh
npm ci
npm run dev
```

Open the local address printed by Vite, normally `http://127.0.0.1:5173`.

Useful checks:

```sh
npm run build
npm test
npm run test:e2e
```

The browser tests require a locally installed Playwright browser. If it is not already available, run `npx playwright install chromium` in an environment with access to the Playwright download host.

## Version-control workflow

Feature work should be developed on a branch and merged through review:

```sh
git switch -c feature/<short-description>
npm test
npm run build
git diff --check
git add src tests README.md
git commit -m "Describe one cohesive change"
```

The current implementation was developed on `feature/login-profile-dashboard`; `main` was not modified directly.

## Structure

- `src/context/MemberContext.tsx` — in-memory signed-in member state
- `src/components/layout/MemberLayout.tsx` — protected dashboard shell and navigation
- `src/pages/AuthPages.tsx` — login and account creation
- `src/pages/PreferencesPage.tsx` — user priorities before recommendation
- `src/pages/StartSmartFlowPages.tsx` — recommendation, consent, processing, approval, and manual-review branches
- `src/pages/ReferencePages.tsx` — architecture, feature proof, and trust navigation surfaces
- `src/pages/DashboardPage.tsx` — member overview
- `src/pages/DirectDepositPage.tsx` — employer and paycheck setup flow
- `src/pages/LearnAIPage.tsx` — security and fraud education
- `src/pages/ProfilePage.tsx` — member information and profile settings
- `src/pages/MemberFeaturePages.tsx` — accounts, transfers, cards, insights, and offers
- `src/components/switching/SmartSwitch.tsx` — recurring-payment review flow
- `src/pages/*` legacy `/apply/*` files — original account-opening journey retained for compatibility
