# UFCU Hackathon Prototype — Codex Handover

## 1. Project Goal

Build the initial frontend template for a hackathon prototype that reimagines UFCU's new-member onboarding experience.

The first milestone is **not** to build every innovation yet. The goal is to create a clean, believable, reusable account-opening flow that closely follows the current UFCU onboarding structure so that redesigned features can be layered on top later.

This is a prototype only. Do not connect to real UFCU systems, banking systems, identity providers, debit-card systems, payroll providers, or payment networks.

## 2. Product Concept

The final prototype will improve UFCU onboarding in four areas:

1. **Understand Me**
   - Keep normal account selection for users who already know what they want.
   - Add a small optional "Not sure which account is right for you?" entry point.
   - Later this will open guided questions and an optional free-text AI-assisted account matcher.

2. **Activate Me**
   - After approval, help the user begin using the account immediately.
   - Later this will include a simulated digital debit card and Apple Wallet / Google Wallet setup.

3. **Move Me**
   - Later, help the user make UFCU their primary bank.
   - Simulate direct-deposit switching and recurring-payment switching.

4. **Remember Me**
   - Later, reuse information already known about the member when they apply for another UFCU product.

There is also one supporting UX improvement:
- While the account-creation step is processing, show short scam/security tips instead of only a loading spinner.

For this initial Codex task, build the foundation only.

## 3. Initial Scope

Create a polished React frontend that reproduces the visible structure of UFCU's current online account-opening journey.

The initial flow should include:

1. Welcome / Start
2. Personal Information
3. Contact Information
4. Address Information
5. Account Selection
6. Funding Method
7. Review / Disclosures
8. Account Creation / Processing
9. Account Created / Confirmation

All actions are mocked locally.

Do not implement real banking functionality.

## 4. Recommended Tech Stack

Use:

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Local React state or Context API
- No database for the initial version
- No real backend required initially
- Mock data stored in TypeScript files

Keep dependencies minimal.

Do not introduce Redux, microservices, authentication providers, databases, or complex architecture unless later requested.

## 5. Project Structure

Use a clean structure similar to:

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PageContainer.tsx
│   │   └── ProgressIndicator.tsx
│   ├── forms/
│   │   ├── FormField.tsx
│   │   ├── SelectField.tsx
│   │   ├── RadioCard.tsx
│   │   ├── CheckboxField.tsx
│   │   └── FormActions.tsx
│   ├── accounts/
│   │   ├── AccountCard.tsx
│   │   └── AccountComparison.tsx
│   └── common/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Alert.tsx
│       ├── Modal.tsx
│       └── LoadingState.tsx
├── pages/
│   ├── StartPage.tsx
│   ├── PersonalInfoPage.tsx
│   ├── ContactInfoPage.tsx
│   ├── AddressPage.tsx
│   ├── AccountSelectionPage.tsx
│   ├── FundingPage.tsx
│   ├── ReviewPage.tsx
│   ├── ProcessingPage.tsx
│   └── ConfirmationPage.tsx
├── context/
│   └── OnboardingContext.tsx
├── data/
│   ├── accounts.ts
│   └── securityTips.ts
├── types/
│   └── onboarding.ts
├── App.tsx
└── main.tsx
```

This can be adjusted if a cleaner equivalent is preferred.

## 6. Visual Direction

The app should feel like a professional credit-union onboarding application.

Use the UFCU walkthrough/screenshots supplied with the project as visual references.

Goals:
- Clean white background
- Strong visual hierarchy
- Conservative financial-services styling
- Clear progress indicator
- Comfortable spacing
- Accessible form controls
- Responsive desktop-first layout
- Mobile-friendly behavior
- Consistent button styles
- Minimal animation

Do not make the prototype look like a generic fintech startup.

Do not add excessive gradients, glassmorphism, neon effects, or flashy animations.

The redesign should still feel believable as something UFCU could adopt.

## 7. Global Layout

Every onboarding screen should use a consistent shell.

Suggested structure:

```text
------------------------------------------------
UFCU / Prototype Branding
------------------------------------------------

Step X of Y
Progress bar

Page title
Short plain-language explanation

[ Main form content ]

Back                          Continue
------------------------------------------------
Prototype / Hackathon disclaimer
------------------------------------------------
```

Include a subtle label such as:

> DevelopU Hackathon Prototype — Not a live banking application

This should be visible but unobtrusive.

## 8. Onboarding State

Create a shared onboarding state object.

Suggested shape:

```ts
type OnboardingData = {
  personalInfo: {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    ssnLast4?: string;
  };

  contactInfo: {
    email: string;
    phone: string;
  };

  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };

  selectedAccounts: string[];

  funding: {
    method: "bank" | "card" | "manual" | "";
    amount?: number;
  };

  disclosuresAccepted: boolean;
};
```

State should persist while the user moves backward and forward through the prototype.

No server persistence is required.

## 9. Account Selection Page

This page is important because future innovation will be added here.

For the initial version, build standard UFCU-style account cards.

Example mocked accounts:

### Simply U Checking
- No monthly maintenance fee
- Designed for simple everyday banking
- No overdraft spending beyond available funds

### Free Checking
- No monthly maintenance fee
- Everyday checking
- Early direct deposit
- Additional checking flexibility

### Plus Checking
- Premium checking features
- Potential dividend/interest benefits
- Additional qualifying requirements
- Extra banking benefits

Use mock descriptions only if exact product language is not already available in project materials.

Each account card should contain:
- Product name
- Short description
- 3–4 key benefits
- "Select" control
- "Learn more" placeholder

At the top or near the product list, reserve space for this future feature:

> **Not sure which account is right for you?**
> Answer a few quick questions and we'll help you compare your options.
>
> [Help me choose]

For the initial version:
- The button can open a placeholder modal or panel.
- Do not build the full recommendation engine yet.

## 10. Funding Page

Create three mocked funding methods:

1. Connect another bank
2. Enter bank information manually
3. Fund with debit/credit card

Each option should be visually represented as a selectable card.

No real bank connection should occur.

After selecting an option, show simple mocked fields.

## 11. Review / Disclosures Page

Display a summary of:
- Applicant name
- Contact information
- Address
- Selected account(s)
- Funding method

Add:
- Disclosure checkbox
- Consent checkbox
- "Submit Application" button

Use clearly marked placeholder disclosure text.

Do not copy large amounts of real UFCU legal language.

## 12. Processing Page

This is where one of the final UX improvements will live.

For now, implement:

- Loading/progress state
- "Creating your UFCU account..." message
- Rotating security/scam-prevention tips every few seconds

Use short tips such as:

- Never share one-time verification codes with someone who contacts you.
- Be cautious of urgent requests to move money to a "safe" account.
- UFCU will never need your password or PIN over text or email.
- Verify suspicious messages before clicking banking links.
- Caller ID can be spoofed.

Keep each tip short.

The loading state can be simulated for approximately 4–6 seconds and then automatically move to the confirmation screen.

## 13. Confirmation Page

For the initial version, show:

```text
Account Created Successfully

Welcome to UFCU.

Your new account is ready.

[Continue]
```

Also create clearly separated placeholder sections for later additions:

```text
Digital Debit Card
Coming in next prototype iteration

Make UFCU My Primary Bank
Coming in next prototype iteration
```

Do not implement those flows yet.

## 14. Validation

Implement basic frontend validation.

Examples:
- Required fields
- Valid email format
- Valid U.S. phone format
- ZIP code format
- DOB required
- Must select at least one account
- Must select a funding method
- Must accept disclosures before submission

Validation messages should:
- appear near the field
- use plain language
- preserve entered data
- not rely only on color

## 15. Accessibility

Implement basic accessibility from the start.

Requirements:
- Proper form labels
- Keyboard-accessible controls
- Visible focus states
- Sufficient contrast
- Semantic HTML
- ARIA only where appropriate
- Buttons must be actual buttons
- Form errors connected to inputs
- Responsive text sizing

## 16. Responsive Behavior

Primary demo target:
- Laptop / desktop browser

Also support:
- Tablet
- Mobile widths

On mobile:
- Cards should stack
- Buttons should remain easy to tap
- Form layout should collapse cleanly
- Progress indicator should remain readable

## 17. Mock Data

Create separate mock data files instead of hardcoding everything inside components.

Example:

```ts
export const accounts = [
  {
    id: "simply-u",
    name: "Simply U Checking",
    description: "...",
    benefits: [...]
  },
  {
    id: "free-checking",
    name: "Free Checking",
    description: "...",
    benefits: [...]
  },
  {
    id: "plus-checking",
    name: "Plus Checking",
    description: "...",
    benefits: [...]
  }
];
```

Do the same for security tips.

## 18. What NOT to Build Yet

Do not build any of the following in this first iteration:

- Real AI integration
- Real OpenAI API calls
- Real identity verification
- KYC / AML integrations
- Real UFCU API integration
- Real core banking connection
- Real Apple Wallet integration
- Real Google Wallet integration
- Payroll switching APIs
- Bill-switching APIs
- Plaid integration
- Real card provisioning
- Real authentication
- Database persistence
- Real SSN storage
- Credit checks
- Auto-loan applications
- Mortgage flows

These will be added or simulated later.

## 19. Future Features the Architecture Must Support

Design components so the following can be added later without rewriting the project.

### Future Feature A — Smart Account Match

From the Account Selection screen:

```text
Not sure which account is right for you?
[Help me choose]
```

Future questionnaire:
- Student / Working / Other
- Monthly income range
- Expected checking balance
- Overdraft preference
- Debit-card usage frequency
- Banking priorities
- Optional free-text banking description

Future architecture:

```text
User answers / free text
        ↓
Preference extraction
        ↓
Structured profile
        ↓
Deterministic UFCU product rules
        ↓
Recommended account(s)
        ↓
Plain-language explanation
```

The LLM should eventually interpret natural language only.

The final product recommendation should be based on deterministic product rules, not arbitrary LLM output.

### Future Feature B — Instant Activation

After account creation:
- Simulated digital debit card
- Add to Apple Wallet
- Add to Google Wallet
- Set PIN
- Enable alerts

These should later appear as progressive next steps.

### Future Feature C — UFCU Switch

After activation:

```text
Want to make UFCU your primary bank?
[Set up UFCU]
```

Future sections:

#### Direct Deposit
- Employer
- Current bank
- UFCU destination account
- Simulated switch confirmation

#### Recurring Payments
- Mock recurring transactions
- Merchant
- Typical amount
- Select payments to move
- Simulated automatic/manual switch results

### Future Feature D — Remember Me

When an existing user later applies for another UFCU product:
- Reuse name
- Contact information
- Address
- Membership status
- Other already-known non-sensitive data

Only ask for information specific to the new product.

## 20. UX Principles

Follow these principles throughout the implementation:

### One primary action per screen
Avoid overwhelming the user with many equally prominent actions.

### Progressive disclosure
Only show information when it becomes relevant.

### Optional assistance
Do not force the account recommendation flow on users who already know what they want.

### Plain language
Avoid banking jargon whenever possible.

### Explain why
If sensitive information is requested later, explain why it is needed.

### No fake magic
If a future capability would depend on a third-party API, clearly model it as an integration rather than pretending AI performs the action.

### Preserve trust
This is a financial-services experience, so clarity and confidence are more important than flashy visuals.

## 21. Expected Initial Routes

Suggested routes:

```text
/
/apply
/apply/personal
/apply/contact
/apply/address
/apply/accounts
/apply/funding
/apply/review
/apply/processing
/apply/complete
```

Using a single route with step state is also acceptable if the implementation is cleaner.

## 22. Initial Acceptance Criteria

The first Codex iteration is complete when:

- [ ] App runs locally with a single command
- [ ] React + TypeScript project is cleanly structured
- [ ] User can move through the complete onboarding journey
- [ ] Back and Continue navigation works
- [ ] Form values are retained between steps
- [ ] Basic validation works
- [ ] Account-selection cards are reusable
- [ ] Funding options are mocked
- [ ] Review page summarizes entered information
- [ ] Processing screen rotates security tips
- [ ] Processing screen automatically advances
- [ ] Confirmation page renders successfully
- [ ] Layout works on desktop and mobile
- [ ] No real banking integration exists
- [ ] No real sensitive data is transmitted or stored
- [ ] "Help me choose" placeholder exists on account-selection page
- [ ] Future feature sections are easy to extend
- [ ] Prototype disclaimer is visible

## 23. Development Priorities

Build in this order:

1. Project scaffold
2. Global styles and layout
3. Shared onboarding state
4. Step navigation
5. Personal/contact/address forms
6. Account selection
7. Funding
8. Review
9. Processing/security tips
10. Confirmation
11. Responsive polish
12. Validation polish
13. Refactor reusable components

Do not start future innovation features until the base flow is stable.

## 24. Code Quality Expectations

- TypeScript throughout
- Small reusable components
- Avoid giant page components
- Avoid duplicated form markup
- Use descriptive names
- Add concise comments only where logic is non-obvious
- No dead code
- No placeholder libraries that are not used
- No unnecessary abstractions
- No premature backend architecture
- Keep mock services easy to replace later

## 25. Codex Working Instruction

Before making large changes:

1. Inspect the existing repository.
2. Preserve any working configuration already present.
3. Reuse existing components where appropriate.
4. Do not rewrite the entire project unless necessary.
5. Run the project after major changes.
6. Fix TypeScript/build errors before moving on.
7. Keep the app demo-safe and deterministic.

If screenshots or reference frames are included in the repository, use them as the primary visual reference.

## 26. First Codex Task

Use this handover as the source of truth.

Your first task is:

> Build the initial UFCU hackathon onboarding template described above. Focus only on the baseline account-opening flow, reusable structure, responsive design, mocked data, validation, the account-selection placeholder for "Help me choose," and the processing screen with rotating security tips. Do not implement AI, wallet provisioning, payroll switching, recurring-payment switching, or real banking integrations yet. The result should be a polished, believable, locally runnable prototype that future features can be added to incrementally.

After implementation:
- run the app
- fix build/runtime issues
- summarize the files created
- identify any assumptions made
- list the next recommended implementation step
