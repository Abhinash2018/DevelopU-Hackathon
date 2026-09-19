import type { Account } from '../types/onboarding'

// Illustrative product copy from the handover, not verified rates or terms.
export const accounts: Account[] = [
  {
    id: 'simply-u', name: 'Simply U Checking', category: 'KEEP IT SIMPLE',
    description: 'A straightforward account for your everyday essentials.',
    benefits: ['No monthly maintenance fee', 'Simple everyday banking', 'No overdraft spending beyond available funds'],
  },
  {
    id: 'free-checking', name: 'Free Checking', category: 'EVERYDAY FLEXIBILITY',
    description: 'Room to bank your way, wherever life takes you.',
    benefits: ['No monthly maintenance fee', 'Everyday checking', 'Early direct deposit', 'Additional checking flexibility'],
  },
  {
    id: 'plus-checking', name: 'Plus Checking', category: 'A LITTLE EXTRA',
    description: 'More possibilities for your day-to-day banking.',
    benefits: ['Premium checking features', 'Potential dividend benefits', 'Additional qualifying requirements', 'Extra banking benefits'],
  },
]
