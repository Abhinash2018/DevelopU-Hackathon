import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Button } from '../components/common/Button'
import { Icon } from '../components/common/Icon'
import { MemberSetupShell } from '../components/layout/MemberSetupShell'
import { useMember } from '../context/MemberContext'
import { securityTips } from '../data/securityTips'
import type { IdentificationType, MemberPreference } from '../types/member'
import '../startsmart-flow.css'

const identificationLabels: Record<IdentificationType, string> = {
  'drivers-license': "Driver's license",
  'state-id': 'State-issued ID',
  passport: 'Passport',
  'military-id': 'Military ID',
  'student-id': 'Student ID',
}

const preferenceLabels: Record<MemberPreference, string> = {
  'everyday-banking': 'Everyday banking',
  'direct-deposit': 'Direct deposit',
  'smart-switch': 'Recurring payments',
  'financial-insights': 'Spending insights',
  'cards-wallet': 'Digital card and wallet',
  'security-learning': 'Security learning',
}

const journeySteps = [
  { title: 'Everyday checking', description: 'A clear home base for your balance, activity, and upcoming payments.', icon: 'wallet' as const },
  { title: 'Digital card', description: 'Prepare a digital card and connect it to your mobile wallet when ready.', icon: 'card' as const },
  { title: 'Direct deposit', description: 'Choose your employer and hand off securely to the payroll provider.', icon: 'building' as const },
  { title: 'Smart Switch', description: 'Review recurring payments before deciding what to move.', icon: 'repeat' as const },
  { title: 'Learn AI', description: 'Get practical answers about fraud, impersonation, and account safety.', icon: 'shield' as const },
]

export function RecommendationPage() {
  const { profile, preferences, selectedCard, setSelectedCard, setOnboardingStage } = useMember()
  const navigate = useNavigate()

  if (!profile) return <Navigate to="/" replace />

  function continueToReview() {
    setOnboardingStage('REVIEW')
    navigate('/identity-review')
  }

  return <FlowShell step="02 of 04" eyebrow="SMART START RECOMMENDATION" title={`A clear starting point for you, ${profile.firstName}.`} description="We used the areas you selected to organize the first steps of your UFCU journey.">
    <div className="flow-selection-note"><Icon name="checkCircle" size={18} /><span><strong>Based on what you told us</strong><small>{preferences.map(preference => preferenceLabels[preference]).join(' · ')}</small></span></div>
    <section className="eligible-cards" aria-labelledby="eligible-cards-title">
      <div className="flow-section-heading"><p className="member-eyebrow">CARDS DESIGNED FOR U</p><h2 id="eligible-cards-title">You’re eligible to choose these card designs</h2><p>Make it yours. Pick your school spirit or keep it classic.</p></div>
      <p className="card-eligibility-note">Available in this demo with your recommended checking account. Final eligibility is confirmed when your account is approved.</p>
      <fieldset className="card-design-grid"><legend className="sr-only">Choose your debit card design</legend>{[
        { id: 'texas', name: 'The University of Texas', detail: 'Hook ’em, Horns!' },
        { id: 'texas-state', name: 'Texas State University', detail: 'Go Bobcats!' },
        { id: 'classic', name: 'UFCU Classic', detail: 'A classic. Unmistakably you.' },
      ].map(card => <label key={card.id} className={`card-design-option ${selectedCard === card.id ? 'is-selected' : ''}`}><img src={`/images/cards/${card.id}.png`} alt={`${card.name} debit card`} /><span className="card-design-name"><input type="radio" name="card-design" value={card.id} checked={selectedCard === card.id} onChange={() => setSelectedCard(card.id)} />{card.name}</span><small>{card.detail}</small><span className="card-design-status"><Icon name="checkCircle" size={15} />{selectedCard === card.id ? 'Selected for you' : 'Eligible design'}</span></label>)}</fieldset>
    </section>
    <div className="flow-section-heading"><p className="member-eyebrow">YOUR RECOMMENDED JOURNEY</p><h2>Start with the essentials</h2></div>
    <div className="journey-card-grid">{journeySteps.map(step => <article className="journey-card" key={step.title}><span className="journey-card-icon"><Icon name={step.icon} size={21} /></span><div><strong>{step.title}</strong><p>{step.description}</p></div><Icon name="checkCircle" size={17} className="journey-card-check" /></article>)}</div>
    <div className="secure-handoff flow-disclosure"><Icon name="shield" size={20} /><div><strong>Keep control of your setup</strong><p>You can skip optional steps, review every detail, and return to the dashboard whenever you are ready.</p></div></div>
    <div className="setup-actions"><button className="member-text-button" type="button" onClick={() => navigate('/preferences')}><Icon name="back" size={18} /> Back to choices</button><Button onClick={continueToReview}>Review my information <Icon name="arrow" size={18} /></Button></div>
  </FlowShell>
}

export function IdentityReviewPage() {
  const { profile, preferences, selectedCard, consentAccepted, setConsentAccepted, setOnboardingStage } = useMember()
  const navigate = useNavigate()
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState('')

  if (!profile) return <Navigate to="/" replace />

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!confirmed || !consentAccepted) {
      setError('Confirm your information and consent to continue.')
      return
    }
    setOnboardingStage('TRUST')
    navigate('/membership-processing')
  }

  return <FlowShell step="03 of 04" eyebrow="SECURE INFORMATION REVIEW" title="Review before we continue." description="Check the information you entered and choose what happens next.">
    <div className="review-warning"><Icon name="lock" size={19} /><div><strong>Only masked identity details are shown</strong><p>We only keep the identification type and last-four values in this local experience. A live credit union application uses secure identity verification.</p></div></div>
    <section className="flow-review-card" aria-labelledby="personal-review-title"><div className="flow-card-title"><div><p className="member-eyebrow">PERSONAL INFORMATION</p><h2 id="personal-review-title">Your member profile</h2></div><button type="button" className="member-text-button" onClick={() => navigate('/signup')}>Edit</button></div><div className="flow-detail-grid"><ReviewDetail label="Full name" value={`${profile.firstName} ${profile.lastName}`} /><ReviewDetail label="Date of birth" value={formatDate(profile.dateOfBirth)} /><ReviewDetail label="Email" value={profile.email} /><ReviewDetail label="Phone" value={profile.phone} /><ReviewDetail label="Address" value={`${profile.street}, ${profile.city}, ${profile.state} ${profile.zip}`} /><ReviewDetail label="Identification" value={`${profile.identificationType ? identificationLabels[profile.identificationType] : 'Not provided'} · •••• ${profile.identificationLast4}`} /><ReviewDetail label="SSN" value={`•••• ${profile.ssnLast4}`} /><ReviewDetail label="Debit card design" value={({ texas: "The University of Texas", "texas-state": "Texas State University", classic: "UFCU Classic" } as Record<string, string>)[selectedCard]} /><ReviewDetail label="Selected priorities" value={preferences.map(preference => preferenceLabels[preference]).join(' · ')} /></div></section>
    <form className="flow-consent-card" onSubmit={submit}>
      <label className="flow-checkbox"><input type="checkbox" checked={confirmed} onChange={event => { setConfirmed(event.target.checked); setError('') }} /><span><strong>I confirm the information above is accurate.</strong><small>For a live application, UFCU may ask for additional verified documentation.</small></span></label>
      <label className="flow-checkbox"><input type="checkbox" checked={consentAccepted} onChange={event => { setConsentAccepted(event.target.checked); setError('') }} /><span><strong>I consent to continue this member setup review.</strong><small>This button advances the local onboarding flow; it does not submit a real credit application.</small></span></label>
      {error && <p className="member-form-error" role="alert">{error}</p>}
      <div className="setup-actions"><button className="member-text-button" type="button" onClick={() => navigate('/recommendation')}><Icon name="back" size={18} /> Back</button><Button type="submit">Continue to review <Icon name="arrow" size={18} /></Button></div>
    </form>
  </FlowShell>
}

export function MembershipProcessingPage() {
  const { profile, startProcessing, approveMembership, requestManualReview } = useMember()
  const navigate = useNavigate()
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    startProcessing()
    const tips = window.setInterval(() => setTipIndex(index => (index + 1) % securityTips.length), 2000)
    const finish = window.setTimeout(() => {
      approveMembership()
      navigate('/membership-ready', { replace: true })
    }, 4200)
    return () => { window.clearInterval(tips); window.clearTimeout(finish) }
  }, [approveMembership, navigate, startProcessing])

  if (!profile) return <Navigate to="/" replace />

  function chooseManualReview() {
    requestManualReview()
    navigate('/membership-needs-review', { replace: true })
  }

  return <FlowShell step="04 of 04" eyebrow="MEMBERSHIP REVIEW" title="Reviewing your UFCU setup." description="We are checking that your information is ready for the next step.">
    <div className="processing-hero"><div className="loading-ring" aria-hidden="true"><Icon name="bank" size={30} /></div><p role="status">Preparing your membership experience…</p></div>
    <div className="flow-timeline" aria-label="Membership setup progress"><TimelineItem label="Information reviewed" done /><TimelineItem label="Security checks" active /><TimelineItem label="Membership decision" /></div>
    <div className="security-tip flow-security-tip"><span className="feature-icon"><Icon name="shield" size={24} /></span><p className="member-eyebrow">A SECURITY REMINDER</p><p className="tip-text" aria-live="polite" aria-atomic="true">{securityTips[tipIndex]}</p><div className="tip-dots" aria-hidden="true">{securityTips.map((_, index) => <span key={index} className={index === tipIndex ? 'active' : ''} />)}</div></div>
    <div className="flow-disclaimer"><Icon name="info" size={17} /> This local flow does not contact a credit bureau or open a real account. Live eligibility and identity verification happen through UFCU&apos;s secure systems.</div>
    <button type="button" className="manual-review-button" onClick={chooseManualReview}>Request manual review instead</button>
  </FlowShell>
}

export function MembershipReadyPage() {
  const { profile, membershipDecision, setOnboardingStage } = useMember()
  const navigate = useNavigate()

  if (!profile) return <Navigate to="/" replace />
  if (membershipDecision !== 'approved') return <Navigate to="/membership-needs-review" replace />

  function activateCard() {
    setOnboardingStage('ACTIVATE')
    navigate('/cards-wallet?onboarding=1')
  }

  function openSwitch() {
    setOnboardingStage('SWITCH')
    navigate('/smart-switch')
  }

  function openDeposit() {
    setOnboardingStage('SWITCH')
    navigate('/direct-deposit?view=setup')
  }

  function openDashboard() {
    setOnboardingStage('COMPLETE')
    navigate('/dashboard', { replace: true })
  }

  return <FlowShell step="COMPLETE" eyebrow="MEMBERSHIP READY" title={`Congratulations, ${profile.firstName}. You can start your UFCU journey.`} description="Your local membership review is complete. Choose a next step or open your member dashboard.">
    <div className="ready-banner"><span className="success-icon"><Icon name="check" size={29} /></span><div><strong>Membership review passed</strong><p>UFCU setup is ready for the next step in this experience.</p></div></div>
    <div className="ready-grid"><ReadyCard title="Digital card" description="Activate your card and prepare Apple Wallet." icon="card" onClick={activateCard} action="Activate card" /><ReadyCard title="Direct deposit" description="Select your employer and review paycheck setup." icon="building" onClick={openDeposit} action="Set up direct deposit" /><ReadyCard title="Smart Switch" description="Review recurring payments before moving them." icon="repeat" onClick={openSwitch} action="Review payments" /><ReadyCard title="Learn AI" description="Ask questions about fraud and safer banking." icon="shield" onClick={() => { setOnboardingStage('COMPLETE'); navigate('/learn-ai') }} action="Learn security" /></div>
    <div className="flow-disclaimer"><Icon name="shield" size={17} /> This is not a real credit decision or account opening. Live applications use UFCU&apos;s secure systems and eligibility process.</div>
    <div className="setup-actions"><button className="member-text-button" type="button" onClick={openDashboard}>Go to dashboard</button><Button onClick={activateCard}>Continue with card setup <Icon name="arrow" size={18} /></Button></div>
  </FlowShell>
}

export function MembershipNeedsReviewPage() {
  const { profile, membershipDecision } = useMember()
  const navigate = useNavigate()

  if (!profile) return <Navigate to="/" replace />
  if (membershipDecision !== 'needs_review') return <Navigate to="/preferences" replace />

  return <FlowShell step="REVIEW" eyebrow="ADDITIONAL REVIEW" title="We need one more review step." description="Your information was not rejected. A manual review path is available when an automated check cannot finish.">
    <div className="manual-review-panel"><span className="manual-review-icon"><Icon name="clock" size={27} /></span><div><h2>Manual review requested</h2><p>The local flow is holding here so a credit union team could review the information securely. No real application has been submitted.</p></div></div>
    <div className="flow-review-list"><div><Icon name="checkCircle" size={18} /><span><strong>Nothing else is collected here</strong><small>Do not send a full SSN, full ID number, password, or account number through this screen.</small></span></div><div><Icon name="lock" size={18} /><span><strong>Your next step is clear</strong><small>Review your entered information or return to the dashboard experience.</small></span></div></div>
    <div className="setup-actions"><button className="member-text-button" type="button" onClick={() => navigate('/identity-review')}><Icon name="back" size={18} /> Review information</button><Button onClick={() => navigate('/dashboard')}>Return to dashboard <Icon name="arrow" size={18} /></Button></div>
  </FlowShell>
}

function FlowShell({ step, eyebrow, title, description, children }: { step: string; eyebrow: string; title: string; description: string; children: ReactNode }) {
  return <MemberSetupShell><section className="setup-card startsmart-flow-card" aria-labelledby="flow-title"><div className="flow-progress"><span>UFCU StartSmart</span><strong>{step}</strong></div><div className="setup-heading"><p className="member-eyebrow">{eyebrow}</p><h1 id="flow-title">{title}</h1><p>{description}</p></div>{children}</section></MemberSetupShell>
}

function ReviewDetail({ label, value }: { label: string; value: string }) {
  return <div className="flow-detail"><span>{label}</span><strong>{value}</strong></div>
}

function TimelineItem({ label, done = false, active = false }: { label: string; done?: boolean; active?: boolean }) {
  return <div className={`flow-timeline-item ${done ? 'is-done' : ''} ${active ? 'is-active' : ''}`}><span>{done ? <Icon name="check" size={14} /> : active ? <span className="timeline-pulse" /> : null}</span><small>{label}</small></div>
}

function ReadyCard({ title, description, icon, action, onClick }: { title: string; description: string; icon: 'card' | 'building' | 'repeat' | 'shield'; action: string; onClick: () => void }) {
  return <article className="ready-card"><span className="ready-card-icon"><Icon name={icon} size={21} /></span><div><h2>{title}</h2><p>{description}</p></div><button type="button" className="panel-link" onClick={onClick}>{action}<Icon name="arrow" size={15} /></button></article>
}

function formatDate(value: string) {
  const [year, month, day] = value.split('-')
  if (!year || !month || !day) return value
  return `${month}/${day}/${year}`
}
