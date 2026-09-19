import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../components/common/Button'
import { Icon } from '../components/common/Icon'
import { MemberSetupShell } from '../components/layout/MemberSetupShell'
import { useMember } from '../context/MemberContext'
import type { MemberPreference } from '../types/member'

const preferenceOptions: { id: MemberPreference; title: string; description: string; icon: 'wallet' | 'building' | 'repeat' | 'chart' | 'card' | 'shield' }[] = [
  { id: 'everyday-banking', title: 'Everyday banking', description: 'See accounts, balances, and your next best steps.', icon: 'wallet' },
  { id: 'direct-deposit', title: 'Direct deposit', description: 'Connect your employer or payroll provider securely.', icon: 'building' },
  { id: 'smart-switch', title: 'Move recurring payments', description: 'Review subscriptions and bills before switching them.', icon: 'repeat' },
  { id: 'financial-insights', title: 'Track my spending', description: 'Understand cash flow and recurring commitments.', icon: 'chart' },
  { id: 'cards-wallet', title: 'Digital card and wallet', description: 'Manage your card and wallet setup.', icon: 'card' },
  { id: 'security-learning', title: 'Learn about security', description: 'Ask questions about fraud, privacy, and safer banking.', icon: 'shield' },
]

export function PreferencesPage() {
  const { profile, preferences, setPreferences, setOnboardingStage } = useMember()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<MemberPreference[]>(preferences)
  const [error, setError] = useState('')

  function toggle(id: MemberPreference) {
    setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
    setError('')
  }

  function submit() {
    if (!selected.length) {
      setError('Choose at least one area to continue.')
      return
    }
    setPreferences(selected)
    setOnboardingStage('RECOMMENDATION')
    navigate('/recommendation', { replace: true })
  }

  return <RequireMemberShell>
    <section className="setup-card preferences-card" aria-labelledby="preferences-title">
      <div className="setup-heading">
        <p className="member-eyebrow">PERSONALIZE YOUR EXPERIENCE</p>
        <h1 id="preferences-title">What are you looking for{profile?.firstName ? `, ${profile.firstName}` : ''}?</h1>
        <p>Choose what matters most so your UFCU dashboard starts with the right next steps.</p>
      </div>
      <div className="preference-grid">
        {preferenceOptions.map(option => <button key={option.id} type="button" className={`preference-card ${selected.includes(option.id) ? 'is-selected' : ''}`} aria-pressed={selected.includes(option.id)} onClick={() => toggle(option.id)}>
          <span className="preference-icon"><Icon name={option.icon} size={22} /></span>
          <span className="preference-copy"><strong>{option.title}</strong><small>{option.description}</small></span>
          <span className="preference-check" aria-hidden="true"><Icon name="check" size={15} /></span>
        </button>)}
      </div>
      {error && <p className="member-form-error" role="alert">{error}</p>}
      <div className="setup-actions"><button className="member-text-button" type="button" onClick={() => navigate('/signup')}><Icon name="back" size={18} /> Back</button><Button onClick={submit}>Continue to my recommendation <Icon name="arrow" size={18} /></Button></div>
      <p className="setup-progress"><span className="setup-progress-dot is-done" /> Account information <span className="setup-progress-line" /><span className="setup-progress-dot is-current" /> What you need <span className="setup-progress-line" /><span className="setup-progress-dot" /> Review</p>
    </section>
  </RequireMemberShell>
}

function RequireMemberShell({ children }: { children: ReactNode }) {
  const { signedIn } = useMember()
  if (!signedIn) return null
  return <MemberSetupShell>{children}</MemberSetupShell>
}
