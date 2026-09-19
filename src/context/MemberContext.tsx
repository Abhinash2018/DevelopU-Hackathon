import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import type { MemberPreference, MemberProfile, MembershipDecision, OnboardingStage, SignUpProfile } from '../types/member'

type MemberContextValue = {
  profile: MemberProfile | null
  preferences: MemberPreference[]
  signedIn: boolean
  onboardingStage: OnboardingStage
  membershipDecision: MembershipDecision
  consentAccepted: boolean
  selectedCard: string
  setSelectedCard: (card: string) => void
  cardActivated: boolean
  signIn: (email: string, password: string) => boolean
  createAccount: (profile: SignUpProfile) => void
  updateProfile: (profile: MemberProfile) => void
  setPreferences: (preferences: MemberPreference[]) => void
  setOnboardingStage: (stage: OnboardingStage) => void
  setConsentAccepted: (accepted: boolean) => void
  startProcessing: () => void
  approveMembership: () => void
  requestManualReview: () => void
  activateMember: () => void
  signOut: () => void
}

const MemberContext = createContext<MemberContextValue | null>(null)

const defaultProfile: MemberProfile = {
  firstName: 'Ayush',
  lastName: 'Khadka',
  dateOfBirth: '2001-04-12',
  email: 'ayush@example.com',
  phone: '(512) 555-0147',
  street: '123 Sample Street',
  city: 'San Marcos',
  state: 'TX',
  zip: '78666',
  identificationType: 'drivers-license',
  identificationLast4: '4821',
  ssnLast4: '0000',
}

export function MemberProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<MemberProfile | null>(null)
  const [preferences, setPreferencesState] = useState<MemberPreference[]>([])
  const [signedIn, setSignedIn] = useState(false)
  const [onboardingStage, setOnboardingStage] = useState<OnboardingStage>('PROFILE')
  const [membershipDecision, setMembershipDecision] = useState<MembershipDecision>('pending')
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [selectedCard, setSelectedCard] = useState('classic')
  const [cardActivated, setCardActivated] = useState(false)

  const signIn = useCallback((email: string, password: string) => {
    if (!email.trim() || password.trim().length < 4) return false
    setProfile(previous => previous ?? { ...defaultProfile, email: email.trim() })
    setSignedIn(true)
    return true
  }, [])

  const createAccount = useCallback((newProfile: SignUpProfile) => {
    const { password: _password, ...memberProfile } = newProfile
    setProfile(memberProfile)
    setSelectedCard('classic')
    setPreferencesState([])
    setOnboardingStage('MATCH')
    setMembershipDecision('pending')
    setConsentAccepted(false)
    setCardActivated(false)
    setSignedIn(true)
  }, [])

  const updateProfile = useCallback((nextProfile: MemberProfile) => setProfile(nextProfile), [])
  const setPreferences = useCallback((nextPreferences: MemberPreference[]) => setPreferencesState(nextPreferences), [])
  const setStage = useCallback((stage: OnboardingStage) => setOnboardingStage(stage), [])
  const acceptConsent = useCallback((accepted: boolean) => setConsentAccepted(accepted), [])
  const startProcessing = useCallback(() => setOnboardingStage('PROCESSING'), [])
  const approveMembership = useCallback(() => {
    setMembershipDecision('approved')
    setOnboardingStage('MEMBERSHIP_READY')
  }, [])
  const requestManualReview = useCallback(() => {
    setMembershipDecision('needs_review')
    setOnboardingStage('NEEDS_REVIEW')
  }, [])
  const activateMember = useCallback(() => {
    setCardActivated(true)
    setOnboardingStage('COMPLETE')
  }, [])
  const signOut = useCallback(() => setSignedIn(false), [])

  return <MemberContext.Provider value={{
    profile,
    preferences,
    signedIn,
    onboardingStage,
    membershipDecision,
    consentAccepted,
    selectedCard,
    setSelectedCard,
    cardActivated,
    signIn,
    createAccount,
    updateProfile,
    setPreferences,
    setOnboardingStage: setStage,
    setConsentAccepted: acceptConsent,
    startProcessing,
    approveMembership,
    requestManualReview,
    activateMember,
    signOut,
  }}>{children}</MemberContext.Provider>
}

export function useMember() {
  const context = useContext(MemberContext)
  if (!context) throw new Error('useMember requires MemberProvider')
  return context
}
