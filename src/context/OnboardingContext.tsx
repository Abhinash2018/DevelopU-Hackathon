import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { firstIncompleteStep } from '../lib/validation'
import { createInitialData, type ApplicationStatus, type OnboardingData } from '../types/onboarding'

type OnboardingContextValue = {
  data: OnboardingData
  status: ApplicationStatus
  update: <K extends keyof OnboardingData>(section: K, value: OnboardingData[K]) => void
  submit: () => boolean
  complete: () => void
  reset: () => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(createInitialData)
  const [status, setStatus] = useState<ApplicationStatus>('editing')
  const complete = useCallback(() => setStatus('complete'), [])

  function update<K extends keyof OnboardingData>(section: K, value: OnboardingData[K]) {
    setData(previous => ({
      ...previous,
      ...(section !== 'disclosuresAccepted' && section !== 'consentAccepted'
        ? { disclosuresAccepted: false, consentAccepted: false } : {}),
      [section]: value,
    }))
  }

  function submit() {
    if (firstIncompleteStep(data) !== undefined) return false
    setStatus('submitted')
    return true
  }

  return <OnboardingContext.Provider value={{
    data, status, update, submit,
    complete,
    reset: () => { setData(createInitialData()); setStatus('editing') },
  }}>{children}</OnboardingContext.Provider>
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) throw new Error('useOnboarding requires OnboardingProvider')
  return context
}
