import type { Account } from '../types/onboarding'
import productReference from '../../skills/UFCU_products.md?raw'

type ProductReferenceAccount = {
  id: string
  name: string
  monthly_fee_usd: number
  fee_waiver?: string
  overdraft: string
  courtesy_pay_limit_after_90_days_usd: number | null
  early_direct_deposit: string
  daily_atm_cash_limit_usd: number | null
  check_writing: boolean | null
  eligibility: string
  perks?: string[]
}

const referenceJson = productReference.match(/```json\s*([\s\S]*?)```/)?.[1]
if (!referenceJson) throw new Error('UFCU product reference is missing its machine-readable data block.')
const reference = JSON.parse(referenceJson) as { as_of: string; checking: ProductReferenceAccount[] }
export const productReferenceDate = reference.as_of
export const productReferenceAccounts = reference.checking

export const accounts: Account[] = [
  {
    id: 'free-checking', name: 'Free Checking', category: 'CHECKING',
    description: 'Free everyday checking with flexibility for your routine.',
    benefits: ['No monthly fee', 'Up to 2-day early direct deposit', '55,000+ fee-free ATMs', '$2,000 daily ATM cash limit'],
  },
  {
    id: 'plus-checking', name: 'Plus Checking', category: 'CHECKING',
    description: 'Premium perks for a busy life, with qualifying requirements.',
    benefits: ['$10 monthly fee, waivable', 'Bonus dividends on first $10,000', 'Loan, mortgage, card, and international perks'],
  },
  {
    id: 'simply-u', name: 'Simply U Checking', category: 'CHECKING',
    description: 'Hassle-free banking for spending only what you have deposited.',
    benefits: ['No monthly fee', 'No overdraft fees', 'Cannot spend beyond deposited funds'],
  },
  {
    id: 'teen-checking', name: 'Teen Checking', category: 'CHECKING',
    description: 'A checking account for teens ages 13 to 17 with a guardian.',
    benefits: ['No monthly fee', '$500 daily ATM cash limit', 'Converts to Free Checking at 18'],
  },
  {
    id: 'savings', name: 'Savings', category: 'SAVINGS',
    description: 'Fee-free savings for building balances and organizing goals.',
    benefits: ['$1 minimum to open', 'No monthly fee', 'Withdraw any time', 'Automated transfers and balance alerts'],
  },
  {
    id: 'teen-kidz-savings', name: 'Teen and Kidz Savings', category: 'SAVINGS',
    description: 'Savings with a higher dividend rate for younger members.',
    benefits: ['$1 minimum to open', 'No monthly fee', '0.25% APY on $1 and more', 'Teen eligibility ages 13 to 17'],
  },
  {
    id: 'special-savings', name: 'Special Savings', category: 'SAVINGS',
    description: 'Set aside and track funds for a special occasion or purpose.',
    benefits: ['Goal-focused savings', 'Name and track additional accounts', 'Product details are not stated on UFCU.org'],
  },
  {
    id: 'money-market', name: 'Money Market', category: 'MONEY MARKET',
    description: 'A flexible savings account for larger balances.',
    benefits: ['$2,500 minimum to open', 'No monthly fee', 'Withdraw any time without penalty', 'Tiered dividends with bonus opportunity'],
  },
  {
    id: 'certificates', name: 'Certificates', category: 'CDS',
    description: 'Fixed-term savings with rates from 3 to 60 months.',
    benefits: ['$1,000 minimum to open', 'Terms from 3 to 60 months', 'Fixed or variable returns', 'Early withdrawal penalty may apply'],
  },
  {
    id: 'ira', name: 'IRAs', category: 'IRAS',
    description: 'Retirement savings with fixed or variable term options.',
    benefits: ['$100 to $1,000 minimum to open', 'Terms from 6 to 60 months', 'Fixed or variable options', 'IRS penalties may apply to withdrawals'],
  },
]
