# UFCU Products and Services Reference

Purpose: fact sheet for the UFCU OneStart hackathon prototype. Use it to fill `src/data/accounts.ts` and `backend/app/data/accounts.py`, and to write recommendation explanations.

## How to use this file (read first)

- Institution: UFCU, Austin, Texas (ufcu.org). Other credit unions also use the name "UFCU" (Unilever, Ukrainian, United Federal, University Federal). Ignore anything that is not from ufcu.org.
- Data was pulled from ufcu.org on 2026-09-19. Every section lists its source URL. Rates carry their own "effective" dates and change often.
- Only facts stated on the pages are recorded. A value of `null` or "not stated" means the pages did not say. Do not fill these in from general banking knowledge.
- Section "Conflicts and gaps" lists places where UFCU pages disagree or are silent. Check it before hardcoding a product attribute.
- This is public marketing and rate information. It is used only to make the mock data realistic. The prototype remains a simulation.

## Contents

1. Quick reference (machine-readable)
2. Institution facts
3. Checking accounts
4. Savings, Money Market, Certificates, IRAs
5. Overdraft services
6. Fees (selected)
7. Cards, wallets, digital services
8. Other services (credit cards, loans, insurance, investments, support)
9. Conflicts and gaps
10. Notes for the prototype
11. Sources

---

## 1. Quick reference (machine-readable)

```json
{
  "as_of": "2026-09-19",
  "institution": {
    "name": "UFCU",
    "routing_number": "314977405",
    "insured_by": "NCUA",
    "nsf_decline_fee_usd": 0
  },
  "checking": [
    {
      "id": "free-checking",
      "name": "Free Checking",
      "min_open_deposit_usd": 0,
      "monthly_fee_usd": 0,
      "min_balance_usd": 0,
      "apy_percent": 0.0,
      "overdraft": "Courtesy Pay available, fee per item; free Overdraft Protection Transfer available",
      "courtesy_pay_limit_after_90_days_usd": 400,
      "early_direct_deposit": "up to 2 days early, depends on employer",
      "daily_atm_cash_limit_usd": 2000,
      "check_writing": null,
      "eligibility": "membership required; age not restricted on page",
      "source": "https://ufcu.org/personal/checking/free"
    },
    {
      "id": "plus-checking",
      "name": "Plus Checking",
      "min_open_deposit_usd": 0,
      "monthly_fee_usd": 10,
      "fee_waiver": "combined month-end balances of $10,000+ OR $4,000+ in qualifying ACH electronic deposits per month",
      "min_balance_usd": null,
      "apy_percent": "0.01 base; 2.25 bonus on first $10,000 with 20+ eligible card transactions per month",
      "overdraft": "Courtesy Pay available, fee per item; free Overdraft Protection Transfer available",
      "courtesy_pay_limit_after_90_days_usd": 1000,
      "early_direct_deposit": "up to 2 days early per checking overview",
      "daily_atm_cash_limit_usd": null,
      "check_writing": null,
      "perks": [
        "bonus dividends",
        "0.25% auto loan rate discount (conditions apply)",
        "$200 mortgage fee credit (conditions apply)",
        "15% more points on UFCU Cash Back or Travel & Rewards Visa",
        "reimbursed international transaction fees",
        "free ATM transactions and money orders"
      ],
      "source": "https://ufcu.org/personal/checking/plus"
    },
    {
      "id": "simply-u",
      "name": "Simply U",
      "min_open_deposit_usd": 0,
      "monthly_fee_usd": 0,
      "min_balance_usd": null,
      "apy_percent": 0.0,
      "overdraft": "none: can only spend what is deposited, no overdraft fees",
      "courtesy_pay_limit_after_90_days_usd": null,
      "early_direct_deposit": "not stated on product page; checking overview says paydays up to 2 days early for all checking accounts",
      "daily_atm_cash_limit_usd": 1000,
      "check_writing": false,
      "eligibility": "fewer requirements to open than other accounts",
      "source": "https://ufcu.org/personal/checking/simply-u"
    },
    {
      "id": "teen-checking",
      "name": "Teen Checking",
      "min_open_deposit_usd": 0,
      "monthly_fee_usd": 0,
      "min_balance_usd": null,
      "apy_percent": "0.50 on balances under $500; 0.00 on $500 and more",
      "overdraft": "Courtesy Pay available (covers through savings per Teen page)",
      "courtesy_pay_limit_after_90_days_usd": 400,
      "early_direct_deposit": "not stated on product page",
      "daily_atm_cash_limit_usd": 500,
      "check_writing": null,
      "eligibility": "ages 13 to 17, needs SSN and a parent or guardian as co-owner, opened in branch; converts to Free Checking at 18",
      "source": "https://ufcu.org/personal/checking/teen"
    }
  ],
  "savings": [
    {
      "id": "savings",
      "name": "Savings",
      "min_open_deposit_usd": 1,
      "monthly_fee_usd": 0,
      "apy_percent": 0.01,
      "dividend_min_balance_usd": 100,
      "source": "https://ufcu.org/personal/savings/savings"
    },
    {
      "id": "teen-kidz-savings",
      "name": "Teen and Kidz Savings",
      "min_open_deposit_usd": 1,
      "monthly_fee_usd": 0,
      "apy_percent": 0.25,
      "eligibility": "Teen: ages 13 to 17. Kidz: age range not stated.",
      "source": "https://ufcu.org/personal/savings/savings"
    },
    {
      "id": "special-savings",
      "name": "Special Savings",
      "note": "Named on the account-selection screen only. No ufcu.org product page found. See Conflicts and gaps.",
      "description_from_screen": "Set aside and track funds for a special occasion or specific purpose"
    },
    {
      "id": "money-market",
      "name": "Money Market",
      "min_open_deposit_usd": 2500,
      "monthly_fee_usd": 0,
      "apy_percent": "0.01 up to $10,000; tiered up to 3.25 at $1,000,000+; bonus tier 0.06 on first $10,000",
      "source": "https://ufcu.org/personal/savings/money-market"
    },
    {
      "id": "certificates",
      "name": "Certificates (Web Certificates)",
      "min_open_deposit_usd": 1000,
      "terms_months": [3, 6, 12, 18, 24, 36, 48, 60],
      "extra_products": ["24 Month Step-Up", "Early Saver Certificate (17 and under)"],
      "apy_percent_range": "3.25 to 4.10 (fixed)",
      "rates_effective": "2026-09-03",
      "source": "https://ufcu.org/personal/savings/certificates"
    },
    {
      "id": "ira",
      "name": "IRAs",
      "min_open_deposit_usd": "100 to 1,000",
      "terms": "6 to 60 months fixed, or variable (withdraw anytime, IRS penalties apply)",
      "source": "https://ufcu.org/personal/savings/overview"
    }
  ]
}
```

---

## 2. Institution facts

- Name: UFCU. Mailing address: PO Box 9350, Austin, TX 78766-9350.
- Routing number: 314977405.
- Deposits are federally insured by NCUA. The Money Market page states coverage up to $250,000 per individual depositor.
- NMLS ID #441215. Equal Housing Lender.
- Member Services: (512) 467-8080 or (800) 252-8311. Hours: Mon to Fri 8 AM to 5:30 PM, Sat 10 AM to 2 PM.
- Membership: accounts require UFCU membership. The auto loan page says membership reaches beyond Austin and points to ufcu.org for current eligibility. Eligibility rules are not stated on the product pages.
- Open an account: https://ufcu.org/open-account. Online Banking enrollment: https://myaccounts.ufcu.org/self-enrollment.
- ATM network: the Rates & Fees page says 500 ATMs in Central Texas and Galveston County plus 55,000 locations worldwide through the Allpoint network are free. Non-UFCU, non-Allpoint ATMs cost $1.00.
- Free credit monitoring is included with all checking accounts through Credit Coach. Members must be 18 or older with a valid SSN.
- Free financial counseling (debt, credit, budgeting) is offered through GreenPath.
- Security resources: https://ufcu.org/resources/security-fraud

---

## 3. Checking accounts

Source pages: [overview](https://ufcu.org/personal/checking/overview), [Free](https://ufcu.org/personal/checking/free), [Plus](https://ufcu.org/personal/checking/plus), [Simply U](https://ufcu.org/personal/checking/simply-u), [Teen](https://ufcu.org/personal/checking/teen).

### 3.1 Comparison table

| | Free Checking | Plus Checking | Simply U | Teen Checking |
|---|---|---|---|---|
| Open with | $0 | $0 | $0 | $0 |
| Monthly fee | None | $10, waivable | None | None |
| Minimum balance | None | Not stated (fee waiver uses balances) | Not stated | Not stated |
| Dividends | None (0.00% APY) | Bonus up to 2.25% APY on first $10,000 | None | 0.50% APY under $500 |
| Overdraft fees | Courtesy Pay, $35 per item at $5+ overdrawn | Courtesy Pay, $35 per item at $5+ overdrawn | None, cannot overdraw | Courtesy Pay, $35 per item at $5+ overdrawn |
| Courtesy Pay limit (after 90 days) | $400 | $1,000 | Not applicable | $400 |
| Daily ATM cash limit | $2,000 | Not stated | $1,000 | $500 |
| Check writing | Not stated | Not stated | Not included | Not stated |
| Fee-free ATMs | 55,000+ | Free ATM transactions | "over 500 ATMs" (see gaps) | Not stated |
| Age | Adults (page does not state) | Adults (page does not state) | Not stated | 13 to 17 |
| Credit card and loan perks | None stated | Yes, see below | None stated | None stated |

The checking overview page lists Courtesy Pay limits as $400 for Free and $1,000 for Plus. The Overdraft FAQ adds that a new account starts at a $100 limit and rises after 90 days.

### 3.2 Free Checking

- Tagline: Free Checking That Fits Everyday Life.
- $0 to open, no monthly service fee, no minimum balance, no minimum deposit.
- Early direct deposit: eligible direct deposits can arrive up to two days early. Depends on employer participation.
- 55,000+ fee-free ATMs and a $2,000 daily ATM cash limit.
- Security: alerts, card locking, UFCU and Visa Zero Liability protection, managed in the Mobile app.
- Debit card: instant issue in a branch, or mailed. Replacement cards can also be issued in branch. Replacement fee is $5.
- Opening: online or in a branch, "in just a few steps". Digital banking access is available right away once the account is set up.
- Free credit monitoring (Credit Coach), Mobile app, Online Banking.

### 3.3 Plus Checking

- Tagline: premium perks for a busy life.
- $0 to open. $10 monthly service fee. Waived when either is true:
  - combined month-end balances are $10,000 or more (savings, checking, money market, certificate, and IRA accounts combined under one account number), or
  - monthly qualifying electronic deposits are $4,000 or more.
- Qualifying electronic deposit: ACH deposits such as salary, government benefits, or other income. These do NOT count: transfers between accounts, mobile deposits, RTP or FedNow instant payments, third-party push-to-card credits over Visa or Mastercard, and branch or ATM deposits.
- Bonus dividend: 2.25% APY on the first $10,000 (rate 2.227%), credited monthly. Requirements:
  - at least 20 eligible card transactions per month, any mix of Plus debit card and credit card transactions on the same account,
  - purchases only (cash withdrawals, transfers, cash advances, balance transfers excluded),
  - transactions must fully post within the month,
  - balance must exceed the $1 par value of one share.
  - Base rate without the bonus is 0.010% (0.01% APY). Balances over $10,000 also earn 0.010%.
- Auto loan discount: 0.25% off the standard rate. Conditions: Plus share on the same UFCU account number as the loan, consumer auto loan opened after 10/1/2024, new-to-UFCU (purchase or external refinance), no internal refinances or business loans, member must qualify. Not applicable to the 4.99% APR rate on 1 to 48 month terms.
- Mortgage fee credit: $200 after funding a first-lien residential purchase mortgage (primary, secondary, investment property, or parcel of land). Paid to Plus Checking within 60 days. Taxable as a dividend. Refinances, home equity, second-lien, construction, and home improvement loans do not qualify.
- Credit card rewards: 15% more points on the UFCU Cash Back Visa or Travel & Rewards Visa. Bonus points are issued quarterly (spring points in July, summer in October, fall in January, winter in April).
- International fees: international transaction fees on the Plus debit card are reimbursed within 24 hours.
- Free ATM transactions and free money orders.
- Full terms PDF: https://ufcu.org/docs/default-source/legal/plus-checking-benefits---terms-and-conditions_phase2_-updatedlogo-final.pdf?sfvrsn=4e22974f_7

### 3.4 Simply U

- Tagline: Freedom from Fees and Worries. Hassle-free banking with zero overdraft fees.
- $0 to open, no monthly fee, no dividends. Depositing is free with no limit on deposit frequency.
- Spend only what you have deposited. The account cannot go below zero, so there are no overdraft or interest fees.
- $1,000 daily ATM cash limit.
- Features: instant-issue contactless Visa debit card, Online Banking, Mobile app, free Bill Pay, expanded shared-branch network, Visa Zero Liability.
- Not a credit card. Does not include check writing.
- How it works per UFCU FAQ:
  - fund it by direct deposit, cash or check at a UFCU ATM that accepts deposits or at a branch, mobile deposit, or transfers to the card,
  - get the debit card at any branch or by mail,
  - use it online, in store, or at any ATM or branch.
- Description on the account page says it is designed for people with few extra funds.
- FAQ: https://ufcu.org/resources/faqs/simply-u

### 3.5 Teen Checking

- Ages 13 to 17. Requires an SSN and a guardian. Minors need an additional adult owner. Opened at a branch.
- $0 to open, no monthly fee, $500 daily ATM cash limit.
- Converts to Free Checking on the 18th birthday.
- Instant-issue contactless Visa debit card, can be added to a mobile wallet.
- Dividend: 0.50% APY when balance is under $500, 0.00% at $500 and more.
- Courtesy Pay can cover purchases through savings.

### 3.6 Features common to all checking accounts (per overview page)

- Free credit monitoring and easy money transfers.
- Paydays up to two days early with Direct Deposit.
- Replace a debit card on the spot at any branch.
- 24/7 access through Online Banking and the Mobile app.
- Visa Zero Liability protection on UFCU Visa purchases.
- When a checking account opens, Savings is automatically set up as the overdraft account.

---

## 4. Savings, Money Market, Certificates, IRAs

Source pages: [overview](https://ufcu.org/personal/savings/overview), [Savings](https://ufcu.org/personal/savings/savings), [Money Market](https://ufcu.org/personal/savings/money-market), [Certificates](https://ufcu.org/personal/savings/certificates), [Rates & Fees](https://ufcu.org/resources/tools/rates-fees).

Savings and Money Market give unlimited free transactions per the overview page. Both can be used as overdraft funding sources for checking.

### 4.1 Savings

- $1 minimum deposit to open. $0 monthly fee. Withdraw any time. Fee-free.
- Dividends: 0.010% rate, 0.01% APY on balances of $100 and more. A $100 minimum balance is needed to accrue dividends. Rates effective January 2, 2024.
- Teen and Kidz Savings: 0.250% rate, 0.25% APY on $1 and more. Teen is for ages 13 to 17. Kidz age range is not stated.
- Members can request additional savings accounts, nickname them for goals, and track them in Online Banking and the Mobile app.
- Automated transfers from UFCU checking and balance-target alerts are supported.

### 4.2 Special Savings

- No product page found on ufcu.org. The account-selection screen describes it as: "Set aside and track funds for a special occasion or specific purpose".
- The savings overview page says members can request additional savings accounts and nickname them for goals. This may be the same feature, but the pages do not confirm it.
- Fees, minimum, and rate: not captured.

### 4.3 Money Market

- $2,500 to open. $0 monthly fee. Withdraw any time without penalty.
- Access through Online Banking, Mobile app, phone banking, or any location.
- Insured by NCUA up to $250,000 per individual depositor.
- Dividends posted monthly (shown as "dividend" on statements).
- A zero balance closes the account automatically. A balance of $0.01 or more can stay open.
- Bonus dividend: applies to the first $10,000 when the same member's checking account has at least 10 qualifying transactions in the month, including debit card purchases.
- Tiered rates (effective February 3, 2025). The stated rate is paid only on the balance inside each tier.

| Tier | Rate | APY range | APY range with bonus |
|---|---|---|---|
| $0 to $10,000 | 0.010% | 0.01% | 0.01% |
| $0 to $10,000 with bonus | 0.060% | 0.06% | 0.06% |
| $10,000 to $49,999.99 | 0.150% | 0.01 to 0.12% | 0.06 to 0.13% |
| $50,000 to $99,999.99 | 0.499% | 0.12 to 0.31% | 0.13 to 0.32% |
| $100,000 to $499,999.99 | 0.995% | 0.31 to 0.86% | 0.32 to 0.86% |
| $500,000 to $999,999.99 | 2.472% | 0.86 to 1.68% | 0.86 to 1.68% |
| $1,000,000 and greater | 3.203% | 1.68 to 3.25% | 1.68 to 3.25% |

### 4.4 Certificates

- $1,000 minimum to open. Easy to open online. Terms 3 to 60 months. Fixed or variable returns.
- Must have a Savings account to buy a certificate.
- Dividends compound daily and are credited monthly, subject to conditions.
- Early withdrawal penalty will or may apply.
- Step Up Certificate: a 24-month certificate that lets you capture one future rate increase and add to principal.
- Early Saver Certificate: for members 17 and under with a Kidz or Teen Savings account. $100 minimum, 12-month auto-renewable term, additional deposits allowed any time. Variable rate.
- Apply through Online Banking.

Fixed-rate certificates (effective September 3, 2026):

| Term | Rate | APY |
|---|---|---|
| 3 Month | 3.203% | 3.25% |
| 6 Month | 3.639% | 3.70% |
| 12 Month | 3.445% | 3.50% |
| 18 Month | 3.494% | 3.55% |
| 24 Month | 4.025% | 4.10% |
| 24 Month Step-Up | 3.880% | 3.95% |
| 36 Month | 3.542% | 3.60% |
| 48 Month | 3.639% | 3.70% |
| 60 Month | 3.639% | 3.70% |

Variable-rate Early Saver Certificate (effective November 18, 2025):

| Term | Rate | APY |
|---|---|---|
| 12 Month, up to $20,000 | 3.445% | 3.50% |
| 12 Month, over $20,000 | 0.250% | 0.25% |

### 4.5 IRAs

The dedicated IRA page was not fetched. Data below is from the savings overview and Rates & Fees pages.

- Open with $100 to $1,000. Terms 6 to 60 months, or a variable option that can be withdrawn anytime (IRS penalties apply). $0 monthly fee. Dividends paid monthly.
- Fixed-rate IRA (effective September 3, 2026): 6 Month 3.70% APY, 12 Month 3.50%, 24 Month 4.10%, 24 Month Step-Up 3.95%, 36 Month 3.60%, 48 Month 3.70%, 60 Month 3.70%.
- Variable-rate IRA (effective October 1, 2021): 0.010% rate, 0.01% APY.
- UFCU says it does not provide tax or legal advice.

---

## 5. Overdraft services

Source: https://ufcu.org/resources/faqs/overdraft-services

UFCU does not charge a fee when a transaction is declined for non-sufficient funds. Simply U cannot overdraw, so these services do not apply to it.

| Service | What it does | Fee |
|---|---|---|
| Overdraft Protection Transfer | Moves funds from linked accounts to cover the shortfall | None |
| Line of Credit (LOC) | Draws from an overdraft line of credit, lines start at $500, subject to credit approval, fixed rate set at application | No fee to access, interest on the amount used |
| Courtesy Pay | UFCU pays the item and lets the account go negative | $35 per item, none if overdrawn by less than $5 |

Details:

- Overdraft Protection Transfer: link up to 3 accounts (savings, money market, line of credit, or another UFCU checking). Online Banking can designate savings and money market only. Another checking account needs a call or branch visit. Linked account owners must match. Enroll online, by phone, or in a branch.
- Order of use: if a transfer source is set up, UFCU tries it before Courtesy Pay.
- Courtesy Pay limits: $100 when the account opens. After 90 days: Free and Teen $400, Plus $1,000, Business $1,500.
- Courtesy Pay coverage: checks, ACH, and recurring transactions are covered automatically. Debit card signature-based (non-PIN) transactions need an opt-in, at no cost to opt in. Items may be paid but are not guaranteed.
- Repayment: 45 days to repay the amount plus fees.
- Tips UFCU gives to avoid fees: use Online Banking and the Mobile app, set an automatic transfer to Savings, add Direct Deposit.

---

## 6. Fees (selected)

Source: https://ufcu.org/resources/tools/rates-fees (fees subject to change). The page has the full schedule, including safe deposit box fees.

| Fee | Amount |
|---|---|
| Plus Checking monthly fee | $10.00 per month (waivable) |
| Par value of share | $1.00 |
| ATM transaction at non-UFCU, non-Allpoint, non-Austin or Galveston Alliance ATM | $1.00 |
| Courtesy Pay item (any type) | $35.00 |
| Replacement debit card | $5.00 |
| International transaction fee (debit) | 1% of transaction |
| Stop payment | $30.00 |
| Deposited item returned | $5.00 |
| Charge back item | $30.00 |
| Inactive account | $5.00 per month, starting 12 months after inactivity |
| Cashier's check | $2.00 (non-member $5.00) |
| Money order | $1.00 |
| Wire, outgoing domestic | $20.00 |
| Wire, incoming domestic or international | Free |
| Check copy or statement copy | $2.00 |
| Temporary checks | $0.50 each |

Free services include: Online Banking, Phone Banking, Bill Pay, debit card instant issue, debit card and ATM point-of-sale transactions, overdraft transfers, PIN replacement, NSF declines, notary, signature guarantee, and credit card balance transfers.

---

## 7. Cards, wallets, digital services

- Debit cards are Visa. Contactless. Instant-issue in branch, or mailed.
- Digital wallets: from the UFCU Mobile app, members can add a UFCU debit or credit card to Apple Pay or Google Pay with a button tap. Samsung Pay and Garmin Pay are also listed. Wallets use biometrics and tokenization, and the card number is not shared with merchants. Terms: https://ufcu.org/policies-legal/disclosures/digital-wallet-terms-and-conditions
- Card activation: 1-866-928-5450, Online Banking, or the Mobile app.
- Other digital payments: Zelle and PayPal.
- Mobile app: iPhone, iPad, and Android. Pay bills, deposit checks (mobile deposit), check balances, transfers, card controls, alerts.
- Online Banking self-enrollment: https://myaccounts.ufcu.org/self-enrollment
- Direct deposit form: https://ufcu.org/resources/tools/forms#dd
- Credit Coach: credit monitoring and personalized recommendations, free with checking for members 18+ with an SSN.
- Sources: [Digital payment services](https://ufcu.org/resources/member-services/banking/digital-payment-solutions), [Simply U page](https://ufcu.org/personal/checking/simply-u), [Free Checking page](https://ufcu.org/personal/checking/free)

---

## 8. Other services

These are on the site navigation. Only the items marked "fetched" were read in detail.

### 8.1 Credit cards (APR from Rates & Fees page)

APR depends on credit and risk score.

| Card | Excellent | Good | Average | Fair | Marginal | Low or no score |
|---|---|---|---|---|---|---|
| Great Rate Visa | 9.49% | 11.49% | 13.49% | 16.49% | 17.90% | 17.90% |
| Travel Rewards Visa | 13.90% | 14.90% | 15.90% | 16.90% | 17.90% | 17.90% |
| Cash Back Visa | 14.90% | 15.90% | 16.90% | 17.49% | 17.90% | 17.90% |

Card fees: late fee $25 (not more than the minimum payment), returned payment $20, cash advance 1% or $5 (greater), balance transfer fee $0, international transaction fee 1%.

Pages: [compare](https://ufcu.org/personal/credit-cards/compare), [Great Rate](https://ufcu.org/personal/credit-cards/great-rate-card), [Cash Back](https://ufcu.org/personal/credit-cards/cash-back-card), [Travel & Rewards](https://ufcu.org/personal/credit-cards/travel-rewards).

### 8.2 Auto loans (fetched)

Source: https://ufcu.org/personal/loans/auto. Relevant to the "Remember Me" Auto Loan screen.

- Rates as low as 4.99% APR. New, used, and refinance loans. Preapproval is offered, including for members unsure of their credit.
- Application asks for proof of identity, proof of income, and vehicle details if a car is picked. The page says applying online takes minutes and can start before choosing a vehicle.
- Rates do not apply to loans of $100,000 or more (call (512) 498-CARS).
- Plus Checking members get a 0.25% discount under the conditions in section 3.3.

| Term | Excellent | Good | Average | Fair | Marginal | Low or no score |
|---|---|---|---|---|---|---|
| 1 to 48 months | 4.99% | 6.24% | 7.49% | 9.39% | 14.65% | 17.25% |
| 49 to 66 months | 5.64% | 6.64% | 7.89% | 9.64% | 15.10% | 17.70% |
| 67+ months | 5.89% | 6.89% | 8.14% or 7.89%* | 9.89% or 9.64%* | 15.35% | 17.90% |

*Lower rate applies to vehicles under 10 years old with fewer than 100,000 miles.

- Vehicle Services: extended warranty or Major Mechanical Protection, Guaranteed Asset Protection, and debt cancellation. https://ufcu.org/resources/member-services/vehicle-services

### 8.3 Other loans (from Rates & Fees page)

- Boat, RV, motorcycle and other secured: APR from 8.55% (excellent, up to 36 months) to 17.90%.
- Signature loan: 12.90% to 17.90% APR, up to 60 months. $22.70 monthly payment per $1,000 borrowed.
- Personal line of credit: 12.90% to 17.90% APR.
- Share secured and certificate secured loans: 3% over the dividend rate of the instrument securing the loan.
- Credit Builder Loan: 3.00% APR, $500 to $2,500, 6 to 24 months. https://ufcu.org/personal/loans/credit-builder
- Home loans: https://ufcu.org/personal/loans/home (not fetched). UFCU says it offers mortgages.
- UT Golf Club membership loans: 4% over the secured loan rate for term and score.

### 8.4 Insurance, investments, support

- Insurance: https://ufcu.org/personal/insurance/general and https://ufcu.org/personal/insurance/speciality (not fetched).
- Investments: offered through LPL Financial. Not NCUA insured, not credit union guaranteed, may lose value. UFCU itself is not a broker-dealer or investment advisor. https://ufcu.org/personal/investments/investments
- Premier Banking: https://ufcu.org/resources/member-services/premier-banking
- Business accounts (checking, savings, money market, certificates, cards, loans): https://ufcu.org/business
- Locations, shared branches, mobile branch: https://ufcu.org/locations

---

## 9. Conflicts and gaps

Resolve these before treating the related fields as final.

1. **Early direct deposit for Simply U.** The checking overview says all checking accounts get paydays up to two days early. The Free Checking page states it explicitly. The Simply U page lists direct deposit as a funding method but does not mention early pay. The handover spec's example sets `earlyDirectDeposit: false` for Simply U. That is not confirmed by the pages.
2. **ATM network size.** Free Checking page: 55,000+ fee-free ATMs. Checking overview: more than 50,000. Simply U page: "over 500 ATMs" with "thousands of locations nationwide" mentioned elsewhere on the same page. The Rates & Fees page says 500 UFCU ATMs plus 55,000 Allpoint locations. Whether Simply U gets Allpoint access is unclear.
3. **Savings dividend frequency.** The savings overview card says "Monthly dividends up to 0.01% APY". A bullet on the same page says dividends are paid quarterly. Footnote dates there (January and August 2024) are older than the Rates page. The Savings page itself does not state a frequency.
4. **IRA rates.** The savings overview says IRAs earn up to 3.55% APY. The Rates & Fees page (effective September 3, 2026) shows up to 4.10% APY. Use the Rates & Fees numbers.
5. **Plus Checking auto loan discount.** The Plus page excludes the 4.99% APR rate on 1 to 48 month terms. The checking overview footnote does not mention that exclusion. Use the Plus page.
6. **Teen Checking rate date.** The Teen page dates its rates October 1, 2021. The Rates & Fees page dates the same values October 1, 2024. Values match.
7. **Special Savings.** No page found on ufcu.org. Only the name and one-line description from the account-selection screen exist. Get the details from the actual account-opening flow or a UFCU representative.
8. **Kidz Savings.** Age range not stated.
9. **Membership eligibility.** Not stated on product pages.
10. **Free and Plus minimum age.** Not stated. Teen is 13 to 17. The Credit Coach benefit requires 18 or older with an SSN.
11. **Check writing.** Only stated for Simply U (not included).
12. **Minimum balance.** Only stated for Free Checking (none), Savings (dividends need $100), and Money Market (balance above $0 keeps it open).
13. **Recurring payments and direct deposit switching.** The pages give no information about UFCU support for switch providers. That part of the prototype stays a mock, as the spec says.

---

## 10. Notes for the prototype

These are facts that affect the account-matching rules. Rule design stays with the team.

- **Simply U vs the no-fee goal.** Free Checking and Simply U both have no monthly fee and no minimum balance. What separates them in the data is overdraft behavior. Simply U cannot overdraft and has no overdraft fees. Free Checking allows Courtesy Pay at $35 per item once overdrawn by $5 or more, up to a $400 limit after 90 days. It can be avoided with Overdraft Protection Transfer from savings, which is free.
- **Dividends.** Only Plus Checking (bonus) and Teen Checking (small balance) earn dividends among checking accounts. Free and Simply U earn none.
- **Sarah persona (student, $1,800 monthly income, about $1,000 balance).** Her income is below the $4,000 monthly electronic deposit waiver threshold and her balance is below $10,000, so Plus would carry the $10 monthly fee. The 2.25% bonus applies only to balances up to $10,000 with 20+ eligible card transactions, and she is described as a heavy debit user. This is arithmetic from the published thresholds, not a recommendation.
- **Product IDs.** Suggested IDs: `free-checking`, `plus-checking`, `simply-u`, `teen-checking`, `savings`, `special-savings`, `money-market`, `certificate-{term}m`, `ira`. Teen Checking is age-gated (13 to 17), so a general adult flow should not recommend it.
- **Wallet mock.** UFCU really supports adding cards through the Mobile app to Apple Pay and Google Pay. The prototype still must not claim real provisioning.
- **Auto Loan "Remember Me" screen.** Real applications ask for identity, income, and vehicle details. The mock fields (employment, annual income, vehicle price) are consistent with that.

---

## 11. Sources

All fetched from ufcu.org on 2026-09-19.

- Free Checking: https://ufcu.org/personal/checking/free
- Plus Checking: https://ufcu.org/personal/checking/plus
- Simply U: https://ufcu.org/personal/checking/simply-u
- Teen Checking: https://ufcu.org/personal/checking/teen
- Checking overview: https://ufcu.org/personal/checking/overview
- Savings overview: https://ufcu.org/personal/savings/overview
- Savings: https://ufcu.org/personal/savings/savings
- Money Market: https://ufcu.org/personal/savings/money-market
- Certificates: https://ufcu.org/personal/savings/certificates
- Overdraft services FAQ: https://ufcu.org/resources/faqs/overdraft-services
- Personal Banking Rates & Fees: https://ufcu.org/resources/tools/rates-fees
- Digital payment services: https://ufcu.org/resources/member-services/banking/digital-payment-solutions
- Auto loans: https://ufcu.org/personal/loans/auto
- Plus Checking terms (PDF): https://ufcu.org/docs/default-source/legal/plus-checking-benefits---terms-and-conditions_phase2_-updatedlogo-final.pdf?sfvrsn=4e22974f_7