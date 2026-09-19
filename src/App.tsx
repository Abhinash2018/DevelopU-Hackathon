import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router'
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext'
import { PageContainer } from './components/layout/PageContainer'
import { steps } from './data/steps'
import { firstIncompleteStep } from './lib/validation'
import { StartPage } from './pages/StartPage'
import { PersonalInfoPage } from './pages/PersonalInfoPage'
import { ContactInfoPage } from './pages/ContactInfoPage'
import { AddressPage } from './pages/AddressPage'
import { AccountSelectionPage } from './pages/AccountSelectionPage'
import { FundingPage } from './pages/FundingPage'
import { ReviewPage } from './pages/ReviewPage'
import { ProcessingPage } from './pages/ProcessingPage'
import { ConfirmationPage } from './pages/ConfirmationPage'
import { DashboardPage } from './pages/DashboardPage'

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
  return <OnboardingProvider><Routes><Route path="/dashboard" element={<DashboardPage />} /><Route element={<StepGuard />}><Route element={<PageContainer />}>
    <Route path="/" element={<StartPage />} />
    <Route path="/apply" element={<Navigate to="/apply/personal" replace />} />
    <Route path="/apply/personal" element={<PersonalInfoPage />} />
    <Route path="/apply/contact" element={<ContactInfoPage />} />
    <Route path="/apply/address" element={<AddressPage />} />
    <Route path="/apply/accounts" element={<AccountSelectionPage />} />
    <Route path="/apply/funding" element={<FundingPage />} />
    <Route path="/apply/review" element={<ReviewPage />} />
    <Route path="/apply/processing" element={<ProcessingPage />} />
    <Route path="/apply/complete" element={<ConfirmationPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route></Route></Routes></OnboardingProvider>
}
