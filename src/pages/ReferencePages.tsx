import { Link } from 'react-router'
import { Button } from '../components/common/Button'
import { Icon } from '../components/common/Icon'
import { MemberSetupShell } from '../components/layout/MemberSetupShell'
import '../startsmart-flow.css'

const architectureStages = [
  ['01', 'Authenticate', 'Login and create a member profile.'],
  ['02', 'Match', 'Capture member priorities and recommend a journey.'],
  ['03', 'Review', 'Confirm personal details and consent.'],
  ['04', 'Decide', 'Process the local review with a manual-review branch.'],
  ['05', 'Activate', 'Prepare the card, optional setup, and dashboard.'],
]

const rubricRows = [
  ['Login-first entry', 'Root route opens at sign in, with create-account access.'],
  ['Personalization', 'Profile, date of birth, contact details, priorities, and recommendation flow.'],
  ['Trust and safety', 'Masked identity fields, consent, Learn AI, security reminders, and safe handoffs.'],
  ['Member tools', 'Dashboard, accounts, move money, Smart Switch, direct deposit, wallet, insights, and offers.'],
  ['Recovery paths', 'Manual review, editable information, optional setup, and dashboard resume behavior.'],
]

export function ArchitecturePage() {
  return <MemberSetupShell><section className="setup-card startsmart-flow-card" aria-labelledby="architecture-title"><div className="flow-progress"><span>UFCU StartSmart</span><strong>ARCHITECTURE</strong></div><div className="setup-heading"><p className="member-eyebrow">ONBOARDING ARCHITECTURE</p><h1 id="architecture-title">A guided path from sign in to member banking.</h1><p>Each step has a clear handoff, a visible status, and an intentional fallback when additional review is needed.</p></div><div className="architecture-stage-grid">{architectureStages.map(([number, title, description]) => <article className="architecture-stage" key={number}><span>{number}</span><div><strong>{title}</strong><p>{description}</p></div></article>)}</div><div className="flow-disclaimer"><Icon name="info" size={17} /> The frontend uses replaceable local adapters. It does not contact a credit bureau, open an account, or connect to payroll from this repository.</div><div className="setup-actions"><Link to="/dashboard" className="button button-text">Back to dashboard</Link><Link to="/rubric-proof" className="button button-primary">View feature proof <Icon name="arrow" size={18} /></Link></div></section></MemberSetupShell>
}

export function RubricProofPage() {
  return <MemberSetupShell><section className="setup-card startsmart-flow-card" aria-labelledby="rubric-title"><div className="flow-progress"><span>UFCU StartSmart</span><strong>FEATURE PROOF</strong></div><div className="setup-heading"><p className="member-eyebrow">PRODUCT COVERAGE</p><h1 id="rubric-title">Every major journey has a working surface.</h1><p>This map keeps the Figma feature set visible while the implementation stays modular.</p></div><div className="rubric-list">{rubricRows.map(([label, description]) => <div className="rubric-row" key={label}><Icon name="checkCircle" size={18} /><span><strong>{label}</strong><small>{description}</small></span></div>)}</div><div className="setup-actions"><Link to="/architecture" className="button button-text"><Icon name="back" size={18} /> Architecture</Link><Link to="/dashboard" className="button button-primary">Open dashboard <Icon name="arrow" size={18} /></Link></div></section></MemberSetupShell>
}

export function TrustNavPage() {
  const trustItems = [
    ['Secure access', 'Sign in begins the member journey and protected routes redirect back to login.', 'lock'],
    ['Masked details', 'Account numbers remain masked until the member explicitly reveals them.', 'eye'],
    ['Safe handoffs', 'Direct deposit never asks for an employer password inside UFCU.', 'building'],
    ['Security learning', 'Learn AI answers questions about fraud, impersonation, and account takeover.', 'shield'],
  ] as const
  return <div className="feature-page"><div className="feature-heading"><div><p className="member-eyebrow">TRUST NAVIGATION</p><h1>Security stays visible.</h1><p>Review the safety controls that connect the StartSmart screens.</p></div><span className="feature-heading-icon"><Icon name="shield" size={28} /></span></div><div className="trust-nav-grid">{trustItems.map(([title, description, icon]) => <article className="dashboard-panel trust-nav-card" key={title}><span><Icon name={icon} size={21} /></span><div><h2>{title}</h2><p>{description}</p></div></article>)}</div><div className="flow-disclaimer"><Icon name="info" size={17} /> These controls are frontend behaviors for this repository. Production identity, credit, and payroll actions require UFCU-approved services.</div><Button onClick={() => window.history.back()}>Back <Icon name="back" size={16} /></Button></div>
}
