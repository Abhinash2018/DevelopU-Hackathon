import type { FundingMethod } from '../types/onboarding'

export const fundingMethods: { id: Exclude<FundingMethod, ''>; name: string; description: string; icon: 'bank' | 'document' | 'card' }[] = [
  { id: 'bank', name: 'Connect another bank', description: 'Use an external bank account for your opening deposit.', icon: 'bank' },
  { id: 'manual', name: 'Enter bank information manually', description: 'Provide routing and account details.', icon: 'document' },
  { id: 'card', name: 'Fund with debit/credit card', description: 'Use a debit or credit card for your opening deposit.', icon: 'card' },
]

export const demoBanks = ['Demo Community Bank', 'Sample Credit Union']
export const demoPaymentDetails = {
  routing: '000000000', account: '000012345678', card: '4111 1111 1111 1111', expiry: '12/30',
}

export const formatMoney = (amount: string) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount))
