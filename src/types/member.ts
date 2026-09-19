export type MemberPreference =
  | 'everyday-banking'
  | 'direct-deposit'
  | 'smart-switch'
  | 'financial-insights'
  | 'cards-wallet'
  | 'security-learning'

export type IdentificationType =
  | 'drivers-license'
  | 'state-id'
  | 'passport'
  | 'military-id'
  | 'student-id'

export type OnboardingStage =
  | 'PROFILE'
  | 'MATCH'
  | 'RECOMMENDATION'
  | 'REVIEW'
  | 'TRUST'
  | 'PROCESSING'
  | 'MEMBERSHIP_READY'
  | 'ACTIVATE'
  | 'SWITCH'
  | 'COMPLETE'
  | 'NEEDS_REVIEW'

export type MembershipDecision = 'pending' | 'approved' | 'needs_review'

export type MemberProfile = {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  zip: string
  identificationType: IdentificationType | ''
  identificationLast4: string
  ssnLast4: string
}

export type SignUpProfile = MemberProfile & {
  password: string
}

export type FinancialBackground = {
  employmentStatus: '' | 'Student' | 'Employed' | 'Self-employed' | 'Unemployed' | 'Retired' | 'Other'
  annualIncomeMin: string
  annualIncomeMax: string
}
