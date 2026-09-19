import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../components/common/Button'
import { FormField, SelectField } from '../components/forms/FormField'
import { Icon } from '../components/common/Icon'
import { MemberSetupShell } from '../components/layout/MemberSetupShell'
import { useMember } from '../context/MemberContext'
import type { FinancialBackground, MemberPreference } from '../types/member'

const preferenceOptions: { id: MemberPreference; title: string; description: string; icon: 'wallet' | 'building' | 'repeat' | 'chart' | 'card' | 'shield' }[] = [
  { id: 'everyday-banking', title: 'Everyday banking', description: 'See accounts, balances, and your next best steps.', icon: 'wallet' },
  { id: 'direct-deposit', title: 'Direct deposit', description: 'Connect your employer or payroll provider securely.', icon: 'building' },
  { id: 'smart-switch', title: 'Move recurring payments', description: 'Review subscriptions and bills before switching them.', icon: 'repeat' },
  { id: 'financial-insights', title: 'Track my spending', description: 'Understand cash flow and recurring commitments.', icon: 'chart' },
  { id: 'cards-wallet', title: 'Digital card and wallet', description: 'Manage your card and wallet setup.', icon: 'card' },
  { id: 'security-learning', title: 'Learn about security', description: 'Ask questions about fraud, privacy, and safer banking.', icon: 'shield' },
]

export function PreferencesPage() {
  const { profile, financialBackground, setFinancialBackground, preferences, setPreferences, setOnboardingStage } = useMember()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<MemberPreference[]>(preferences)
  const [error, setError] = useState('')
  const [incomeError, setIncomeError] = useState('')

  function updateBackground(field: keyof FinancialBackground, value: string) {
    setFinancialBackground({ ...financialBackground, [field]: value })
    setIncomeError('')
  }

  function toggle(id: MemberPreference) {
    setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
    setError('')
  }

  function submit() {
    const { annualIncomeMin: min, annualIncomeMax: max } = financialBackground
    if ((min !== '' || max !== '') && (min === '' || max === '' || !Number.isFinite(Number(min)) || !Number.isFinite(Number(max)) || Number(min) < 0 || Number(max) < 0 || Number(min) > Number(max))) {
      setIncomeError('Enter both amounts, with a maximum at least as high as the minimum. Amounts must be zero or more.')
      return
    }

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
      <section className="financial-background" aria-labelledby="financial-background-title">
        <h2 id="financial-background-title">A little about your situation</h2>
        <p>Tell us about your work or studies and your estimated yearly income.</p>
        <SelectField id="employment-status" label="Employment or student status" optional value={financialBackground.employmentStatus} onChange={event => updateBackground('employmentStatus', event.target.value)}>
          <option value="">Select your status</option>
          {['Student', 'Employed', 'Self-employed', 'Unemployed', 'Retired', 'Other'].map(status => <option key={status} value={status}>{status}</option>)}
        </SelectField>
        <fieldset className="income-range"><legend>Annual income range <span>(optional)</span></legend><p>Estimated income before taxes, in US dollars. Enter 0 if you have no income.</p><div className="income-range-fields">
          <FormField id="annual-income-min" label="Minimum annual income ($)" type="number" min="0" step="0.01" inputMode="decimal" placeholder="e.g. 20000" value={financialBackground.annualIncomeMin} onChange={event => updateBackground('annualIncomeMin', event.target.value)} error={incomeError || undefined} />
          <FormField id="annual-income-max" label="Maximum annual income ($)" type="number" min="0" step="0.01" inputMode="decimal" placeholder="e.g. 40000" value={financialBackground.annualIncomeMax} onChange={event => updateBackground('annualIncomeMax', event.target.value)} aria-invalid={incomeError ? true : undefined} aria-describedby={incomeError ? 'annual-income-min-error' : undefined} />
        </div></fieldset>
      </section>
      <h2 className="preference-section-title">What would you like help with?</h2>
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
