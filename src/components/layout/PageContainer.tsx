import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { steps } from '../../data/steps'
import { Header } from './Header'
import { Footer } from './Footer'
import { ProgressIndicator } from './ProgressIndicator'

export function PageContainer() {
  const { pathname } = useLocation()
  const currentStep = Math.max(0, steps.findIndex(step => step.path === pathname))
  const mainRef = useRef<HTMLElement>(null)
  useEffect(() => {
    document.title = `${steps[currentStep].label} | UFCU`
    mainRef.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, currentStep])

  return <div className="app-shell">
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <Header />
    <div className="workspace">
      <div className="breadcrumb">PERSONAL BANKING <span>/</span> NEW MEMBERSHIP</div>
      <div className="application-layout">
        <ProgressIndicator currentStep={currentStep} />
        <main id="main-content" ref={mainRef} tabIndex={-1} className="main-content">
          <div className="progress-header"><span>Step {currentStep + 1} of {steps.length}</span><span>{currentStep === 8 ? 'You’re all set' : steps[currentStep].label}</span></div>
          <div className="progress-track" role="progressbar" aria-label="Application progress" aria-valuemin={1} aria-valuemax={9} aria-valuenow={currentStep + 1} aria-valuetext={`Step ${currentStep + 1} of 9: ${steps[currentStep].label}`}>
            <div style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
          </div>
          <div className="page-card"><Outlet /></div>
          <p className="session-note">Your progress is saved while you complete your application.</p>
        </main>
      </div>
    </div>
    <Footer />
  </div>
}
