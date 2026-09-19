export type FundingMethod = '' | 'bank' | 'manual' | 'card'

export type OnboardingData = {
  personalInfo: { firstName: string; middleName: string; lastName: string; dateOfBirth: string }
  contactInfo: { email: string; phone: string }
  address: { street: string; apartment: string; city: string; state: string; zip: string }
  selectedAccounts: string[]
  funding: { method: FundingMethod; amount: string; demoBank: string }
  disclosuresAccepted: boolean
  consentAccepted: boolean
}

export type ApplicationStatus = 'editing' | 'submitted' | 'complete'
export type FormErrors = Record<string, string>
export type Account = { id: string; name: string; category: string; description: string; benefits: string[] }

export function createInitialData(): OnboardingData {
  return {
    personalInfo: { firstName: '', middleName: '', lastName: '', dateOfBirth: '' },
    contactInfo: { email: '', phone: '' },
    address: { street: '', apartment: '', city: '', state: '', zip: '' },
    selectedAccounts: [],
    funding: { method: '', amount: '25.00', demoBank: '' },
    disclosuresAccepted: false,
    consentAccepted: false,
  }
}
