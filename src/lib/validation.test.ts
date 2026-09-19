import { describe, expect, it } from 'vitest'
import { createInitialData } from '../types/onboarding'
import { firstIncompleteStep, validateStep } from './validation'

function validData() {
  const data = createInitialData()
  data.personalInfo = { firstName: 'Alex', middleName: '', lastName: 'Sample', dateOfBirth: '1995-06-15' }
  data.contactInfo = { email: 'alex@example.com', phone: '(512) 555-0123' }
  data.address = { street: '123 Sample Street', apartment: '', city: 'Austin', state: 'TX', zip: '78701' }
  data.selectedAccounts = ['free-checking']
  data.funding = { method: 'manual', amount: '25.00', demoBank: '' }
  data.disclosuresAccepted = true
  data.consentAccepted = true
  return data
}

describe('application validation', () => {
  it('requires all personal fields and ignores optional middle name', () => {
    expect(Object.keys(validateStep(1, createInitialData()))).toEqual(['firstName', 'lastName', 'dateOfBirth'])
    expect(validateStep(1, validData())).toEqual({})
  })
  it.each(['2023-02-29', '1999-04-31', '2999-01-01', '1899-01-01', 'invalid'])('rejects invalid or future date %s', dateOfBirth => {
    const data = validData()
    data.personalInfo.dateOfBirth = dateOfBirth
    expect(validateStep(1, data).dateOfBirth).toBeTruthy()
  })
  it('accepts leap dates', () => {
    const data = validData()
    data.personalInfo.dateOfBirth = '2000-02-29'
    expect(validateStep(1, data)).toEqual({})
  })
  it.each(['5125550123', '(512) 555-0123', '+1 512-555-0123', '1-512-555-0123'])('accepts U.S. phone format %s', phone => {
    const data = validData()
    data.contactInfo.phone = phone
    expect(validateStep(2, data)).toEqual({})
  })
  it.each(['512555012', '51255501234', 'call5125550123', '+44 5125550123', '0000000000'])('rejects invalid phone %s', phone => {
    const data = validData()
    data.contactInfo.phone = phone
    expect(validateStep(2, data).phone).toBeTruthy()
  })
  it('validates email, state and ZIP+4', () => {
    const data = validData()
    data.contactInfo.email = 'alex@invalid'
    expect(validateStep(2, data).email).toBeTruthy()
    data.address.zip = '78701-1234'
    expect(validateStep(3, data)).toEqual({})
    data.address.zip = '7870'
    data.address.state = 'INVALID'
    expect(Object.keys(validateStep(3, data))).toEqual(['state', 'zip'])
  })
  it('requires a known account and a demo bank for bank connections', () => {
    const data = validData()
    data.selectedAccounts = ['unknown']
    expect(validateStep(4, data).selectedAccounts).toBeTruthy()
    data.funding.method = 'bank'
    expect(validateStep(5, data).demoBank).toBeTruthy()
    data.funding.demoBank = 'Demo Community Bank'
    expect(validateStep(5, data)).toEqual({})
  })
  it.each(['', '0', '-1', '10001', '1.234', 'NaN', 'Infinity', '1e2'])('rejects invalid deposit %s', amount => {
    const data = validData()
    data.funding.amount = amount
    expect(validateStep(5, data).amount).toBeTruthy()
  })
  it('requires both acknowledgments, including consent', () => {
    const data = validData()
    data.consentAccepted = false
    expect(validateStep(6, data).consentAccepted).toBeTruthy()
    expect(firstIncompleteStep(data)).toBe(6)
    expect(firstIncompleteStep(validData())).toBeUndefined()
  })
  it('returns the earliest incomplete step without checking future steps', () => {
    expect(firstIncompleteStep(createInitialData(), 1)).toBeUndefined()
    expect(firstIncompleteStep(createInitialData(), 6)).toBe(1)
    const data = validData()
    data.address.street = ' '
    data.selectedAccounts = []
    expect(firstIncompleteStep(data)).toBe(3)
  })
})
