import type { FundingMethod } from '../types/onboarding'

export const fundingMethods: { id: Exclude<FundingMethod, ''>; name: string; description: string; icon: 'bank' | 'document' | 'card' }[] = [
  { id: 'bank', name: 'Connect another bank', description: 'Try a simulated bank connection.', icon: 'bank' },
  { id: 'manual', name: 'Enter bank information manually', description: 'Preview a transfer with sample bank details.', icon: 'document' },
  { id: 'card', name: 'Fund with debit/credit card', description: 'Preview funding with a sample card.', icon: 'card' },
]

export const demoBanks = ['Demo Community Bank', 'Sample Credit Union']
export const demoPaymentDetails = {
  routing: '000000000', account: '000012345678', card: '4111 1111 1111 1111', expiry: '12/30',
}

export const formatMoney = (amount: string) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount))
