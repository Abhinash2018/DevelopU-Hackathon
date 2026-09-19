# UFCU onboarding prototype

A local DevelopU Hackathon demo implementing **Section 26** of [UFCU_Codex_Handover.md](UFCU_Codex_Handover.md). The handover remains the source of truth.

## Run locally

Use Node.js 22.12 or later. Install dependencies once:

```sh
npm ci
```

Start the app with one command:

```sh
npm run dev
```

Open the local address printed by Vite (normally http://127.0.0.1:5173).

```sh
npm run build     # TypeScript checks and production build
npm run preview   # Serve the production build locally
npm test          # Validation tests
npm run test:e2e  # Browser flow tests
```

Browser tests use installed Microsoft Edge on Windows. On other systems, install the test browser with `npx playwright install chromium` first. Tests start the dev server automatically if needed.

## Included flow

Welcome → Personal information → Contact information → Address → Account selection → Funding → Review/disclosures → Processing → Confirmation.

- Back and Continue retain values in React context. Direct links cannot skip incomplete steps.
- Required fields, email, U.S. phone, date, ZIP, account selection, funding, and both acknowledgments are validated with linked inline errors.
- Choose one or more accounts from Recommended, Checking, Savings, Money Market, CDs, and IRAs tabs. The account catalog is populated from the machine-readable product data in `skills/UFCU_products.md`, including Free Checking, Plus Checking, Simply U, Teen Checking, Savings, Teen and Kidz Savings, Special Savings, Money Market, Certificates, and IRAs. “Help me choose” opens a local guided questionnaire covering work/student status, income, balance, overdraft concerns, banking priorities, free-form habits, and interests across UFCU services: savings goals, money market, certificates, IRAs, credit cards, loans, overdraft protection, digital wallets and payments, business banking, insurance, and investments. The answers become a structured profile and are scored against the reference data to provide a recommendation and comparison choices. “Learn more” opens a keyboard-accessible product-detail placeholder dialog.
- All three funding methods are simulated. Bank connections use fictional choices; manual and card details are fixed, read-only samples.
- The processing screen rotates security tips every two seconds and completes after six seconds.
- Confirmation contains only placeholders for digital debit cards and making UFCU a primary bank. Continue clears the demo and returns to Welcome.
- All state lives in memory. Refreshing clears it. No API calls, analytics, database, cookies, browser storage, authentication, or financial integrations are used.

Use fictional information throughout. No SSN, real account number, card credential, or bank login is requested. Do not deploy this as a real application.

## File organization

- `src/components/`: shared layout, accessible form controls, buttons, dialogs, icons, and account cards.
- `src/pages/`: the nine onboarding screens.
- `src/context/OnboardingContext.tsx`: application data, submission status, and reset behavior.
- `src/data/`: illustrative products, funding samples, security tips, U.S. states, and step metadata.
- `src/lib/validation.ts` and `src/hooks/useStepForm.ts`: validation and error-focus behavior.
- `src/types/onboarding.ts`: typed application model and defaults.
- `src/App.tsx`: routes and step guards; `src/main.tsx`: React entry point.
- `src/styles.css`: responsive design, focus states, and reduced-motion support; Tailwind utilities are available through the Vite plugin.
- `src/lib/validation.test.ts` and `tests/onboarding.spec.ts`: validation and browser coverage, including mobile layouts, all funding paths, navigation, mock timing, reset, and absence of external requests.
- Root configuration: Vite, TypeScript, Vitest, Playwright, package manifest/lockfile, HTML entry, and `.gitignore`.

## Implementation assumptions

- The starting repository contained only a README and the handover; no screenshots or official brand assets were supplied. The blue/white design and text-based prototype branding are an interpretation, not an exact reproduction of the live UFCU site.
- Product copy follows the handover's sample descriptions. No current rates, eligibility, fees, or legal terms are asserted.
- Dates must be valid, from 1900 through today. No age or membership eligibility decisions are simulated.
- Addresses cover the 50 U.S. states and Washington, DC. ZIP+4 is accepted.
- The illustrative total deposit defaults to $25 and accepts $0.01–$10,000. These are demo limits, not UFCU requirements; there is no real allocation or transfer.
- Editing application details clears both review acknowledgments so the revised information is reviewed again.
- A refresh intentionally starts over. Submitted/completed applications cannot be edited by browser Back; finishing the demo offers a clean restart.

## Prototype boundaries

The account recommendation is deterministic and runs entirely in the browser; it is an AI-guided interaction prototype, not a connection to a live AI service.
