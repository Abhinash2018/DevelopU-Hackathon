import { accounts } from '../data/accounts'
import { demoBanks, fundingMethods } from '../data/funding'
import { states } from '../data/states'
import type { FormErrors, OnboardingData } from '../types/onboarding'

export function validateStep(step: number, data: OnboardingData): FormErrors {
  const errors: FormErrors = {}
  if (step === 1) {
    const { firstName, lastName, dateOfBirth } = data.personalInfo
    if (!firstName.trim()) errors.firstName = 'Enter your first name.'
    if (!lastName.trim()) errors.lastName = 'Enter your last name.'
    const birth = new Date(`${dateOfBirth}T00:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (!dateOfBirth) errors.dateOfBirth = 'Enter your date of birth.'
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) || Number.isNaN(birth.getTime()) ||
      birth.getFullYear() !== Number(dateOfBirth.slice(0, 4)) ||
      birth.getMonth() + 1 !== Number(dateOfBirth.slice(5, 7)) ||
      birth.getDate() !== Number(dateOfBirth.slice(8, 10)) || birth > today || birth.getFullYear() < 1900) {
      errors.dateOfBirth = 'Enter a valid date from 1900 through today.'
    }
  }
  if (step === 2) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactInfo.email.trim())) errors.email = 'Enter a valid email, such as alex@example.com.'
    const phone = data.contactInfo.phone.trim()
    const digits = phone.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '')
    if (!/^\+?[\d\s().-]+$/.test(phone) || !/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) errors.phone = 'Enter a 10-digit U.S. phone number, including area code.'
  }
  if (step === 3) {
    if (!data.address.street.trim()) errors.street = 'Enter your street address.'
    if (!data.address.city.trim()) errors.city = 'Enter your city.'
    if (!states.some(([code]) => code === data.address.state)) errors.state = 'Choose your state.'
    if (!/^\d{5}(-\d{4})?$/.test(data.address.zip.trim())) errors.zip = 'Enter a 5-digit ZIP code or ZIP+4.'
  }
  if (step === 4 && (!data.selectedAccounts.length || data.selectedAccounts.some(id => !accounts.some(account => account.id === id)))) {
    errors.selectedAccounts = 'Select at least one account to continue.'
  }
  if (step === 5) {
    if (!fundingMethods.some(method => method.id === data.funding.method)) errors.method = 'Choose a funding method.'
    if (data.funding.method === 'bank' && !demoBanks.includes(data.funding.demoBank)) errors.demoBank = 'Choose a bank.'
    if (!/^\d+(\.\d{1,2})?$/.test(data.funding.amount) || Number(data.funding.amount) <= 0 || Number(data.funding.amount) > 10000) {
      errors.amount = 'Enter an amount from $0.01 to $10,000, with up to two decimal places.'
    }
  }
  if (step === 6) {
    if (!data.disclosuresAccepted) errors.disclosuresAccepted = 'Accept the sample disclosures to continue.'
    if (!data.consentAccepted) errors.consentAccepted = 'Confirm your consent to submit your application.'
  }
  return errors
}

export function firstIncompleteStep(data: OnboardingData, before = 7): number | undefined {
  for (let step = 1; step < before; step++) {
    if (Object.keys(validateStep(step, data)).length) return step
  }
}
