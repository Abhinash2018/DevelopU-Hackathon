import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router'
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext'
import { MemberProvider } from './context/MemberContext'
import { PageContainer } from './components/layout/PageContainer'
import { MemberLayout, RequireMember } from './components/layout/MemberLayout'
import { steps } from './data/steps'
import { firstIncompleteStep } from './lib/validation'
import { LoginPage, CreateAccountPage } from './pages/AuthPages'
import { PreferencesPage } from './pages/PreferencesPage'
import { DashboardPage } from './pages/DashboardPage'
import { LearnAIPage } from './pages/LearnAIPage'
import { ProfilePage } from './pages/ProfilePage'
import { DirectDepositPage } from './pages/DirectDepositPage'
import { AccountsPage, CardsWalletPage, FinancialInsightsPage, MoveMoneyPage, NearbyOffersPage, SmartSwitchPage } from './pages/MemberFeaturePages'
import { PersonalInfoPage } from './pages/PersonalInfoPage'
import { ContactInfoPage } from './pages/ContactInfoPage'
import { AddressPage } from './pages/AddressPage'
import { AccountSelectionPage } from './pages/AccountSelectionPage'
import { FundingPage } from './pages/FundingPage'
import { ReviewPage } from './pages/ReviewPage'
import { ProcessingPage } from './pages/ProcessingPage'
import { ConfirmationPage } from './pages/ConfirmationPage'
import { IdentityReviewPage, MembershipNeedsReviewPage, MembershipProcessingPage, MembershipReadyPage, RecommendationPage } from './pages/StartSmartFlowPages'
import { ArchitecturePage, RubricProofPage, TrustNavPage } from './pages/ReferencePages'

function StepGuard() {
  const { data, status } = useOnboarding()
  const { pathname } = useLocation()
  const index = steps.findIndex(step => step.path === pathname)
  if (status === 'complete' && index !== 8) return <Navigate to="/apply/complete" replace />
  if (status === 'submitted' && index !== 7) return <Navigate to="/apply/processing" replace />
  if (status === 'editing') {
    const incomplete = firstIncompleteStep(data, Math.min(index, 7))
    if (incomplete !== undefined) return <Navigate to={steps[incomplete].path} replace />
    if (index >= 7) return <Navigate to="/apply/review" replace />
  }
  return <Outlet />
}

export default function App() {
  return <OnboardingProvider><MemberProvider><Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/signup" element={<CreateAccountPage />} />
    <Route element={<RequireMember />}>
      <Route path="/preferences" element={<PreferencesPage />} />
      <Route path="/recommendation" element={<RecommendationPage />} />
      <Route path="/identity-review" element={<IdentityReviewPage />} />
      <Route path="/membership-processing" element={<MembershipProcessingPage />} />
      <Route path="/membership-ready" element={<MembershipReadyPage />} />
      <Route path="/membership-needs-review" element={<MembershipNeedsReviewPage />} />
      <Route path="/architecture" element={<ArchitecturePage />} />
      <Route path="/rubric-proof" element={<RubricProofPage />} />
      <Route element={<MemberLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/move-money" element={<MoveMoneyPage />} />
        <Route path="/smart-switch" element={<SmartSwitchPage />} />
        <Route path="/direct-deposit" element={<DirectDepositPage />} />
        <Route path="/cards-wallet" element={<CardsWalletPage />} />
        <Route path="/financial-insights" element={<FinancialInsightsPage />} />
        <Route path="/nearby-offers" element={<NearbyOffersPage />} />
        <Route path="/learn-ai" element={<LearnAIPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/trust-nav" element={<TrustNavPage />} />
      </Route>
    </Route>
    <Route element={<StepGuard />}><Route element={<PageContainer />}>
      <Route path="/apply" element={<Navigate to="/apply/personal" replace />} />
      <Route path="/apply/personal" element={<PersonalInfoPage />} />
      <Route path="/apply/contact" element={<ContactInfoPage />} />
      <Route path="/apply/address" element={<AddressPage />} />
      <Route path="/apply/accounts" element={<AccountSelectionPage />} />
      <Route path="/apply/funding" element={<FundingPage />} />
      <Route path="/apply/review" element={<ReviewPage />} />
      <Route path="/apply/processing" element={<ProcessingPage />} />
      <Route path="/apply/complete" element={<ConfirmationPage />} />
    </Route></Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></MemberProvider></OnboardingProvider>
}
