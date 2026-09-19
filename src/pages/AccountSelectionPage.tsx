import { useState } from 'react'
import { useNavigate } from 'react-router'
import { PageHeading } from '../components/layout/PageHeading'
import { FormActions } from '../components/forms/FormActions'
import { Button } from '../components/common/Button'
import { Modal } from '../components/common/Modal'
import { AccountCard } from '../components/accounts/AccountCard'
import { useOnboarding } from '../context/OnboardingContext'
import { useStepForm } from '../hooks/useStepForm'
import { accounts, productReferenceAccounts, productReferenceDate } from '../data/accounts'
import type { Account } from '../types/onboarding'

const accountTabs = ['Recommended', 'Checking', 'Savings', 'Money Market', 'CDs', 'IRAs'] as const
type AccountTab = typeof accountTabs[number]

const serviceLabels: Record<string, string> = {
  'everyday-banking': 'Everyday banking',
  'save-goals': 'Savings and goals',
  'larger-savings': 'Money Market and larger balances',
  'term-savings': 'Certificates and fixed-term savings',
  retirement: 'IRAs and retirement savings',
  'credit-cards': 'Credit cards and rewards',
  loans: 'Auto, home, personal, or other loans',
  overdraft: 'Overdraft protection',
  digital: 'Digital wallets, Zelle, PayPal, and mobile banking',
  business: 'Business banking',
  insurance: 'Insurance',
  investments: 'Investments',
}

type HelpAnswers = {
  situation: 'working' | 'student' | 'both' | ''
  income: 'lower' | 'steady' | 'higher' | ''
  balance: 'lower' | 'growing' | 'higher' | ''
  overdraft: 'protect' | 'occasionally' | 'not_concerned' | ''
  priority: 'simple' | 'flexible' | 'extras' | ''
  primaryGoal: ServiceId | ''
  services: string[]
  habits: string
}

type ServiceId = keyof typeof serviceLabels

const initialHelpAnswers: HelpAnswers = {
  situation: '', income: '', balance: '', overdraft: '', priority: '', primaryGoal: '', services: [], habits: '',
}

function recommendAccount(answers: HelpAnswers) {
  const scores = accounts.map(account => ({ account, score: 0 }))
  const product = (id: string) => productReferenceAccounts.find(item => item.id === id)
  const goalAccount: Record<ServiceId, string> = {
    'everyday-banking': 'free-checking',
    'save-goals': 'savings',
    'larger-savings': 'money-market',
    'term-savings': 'certificates',
    retirement: 'ira',
    'credit-cards': 'plus-checking',
    loans: 'plus-checking',
    overdraft: 'simply-u',
    digital: 'free-checking',
    business: 'free-checking',
    insurance: 'free-checking',
    investments: 'ira',
  }
  const score = (id: string, points: number) => {
    const match = scores.find(item => item.account.id === id)
    if (match) match.score += points
  }
  if (answers.primaryGoal) score(goalAccount[answers.primaryGoal], 20)
  if (answers.situation === 'student') score('simply-u', 2)
  if (answers.situation === 'working') score('free-checking', 1)
  if (answers.situation === 'both') score('free-checking', 2)
  if (answers.income === 'lower') score('simply-u', 2)
  if (answers.income === 'steady') score('free-checking', 2)
  if (answers.income === 'higher') score('plus-checking', 2)
  if (answers.balance === 'lower') score('simply-u', 2)
  if (answers.balance === 'growing') score('free-checking', 1)
  if (answers.balance === 'higher') score('plus-checking', 2)
  if (answers.overdraft === 'protect' && product('simply-u')?.overdraft.includes('none')) score('simply-u', 3)
  if (answers.overdraft === 'occasionally') score('free-checking', 2)
  if (answers.overdraft === 'not_concerned') score('plus-checking', 1)
  if (answers.priority === 'simple') score('simply-u', 3)
  if (answers.priority === 'flexible' && product('free-checking')?.monthly_fee_usd === 0) score('free-checking', 3)
  if (answers.priority === 'extras' && product('plus-checking')?.perks?.length) score('plus-checking', 3)
  answers.services.forEach(service => score(goalAccount[service as ServiceId], service === answers.primaryGoal ? 8 : 6))
  if (answers.services.includes('overdraft') && product('simply-u')?.overdraft.includes('none')) score('simply-u', 2)
  const habits = answers.habits.toLowerCase()
  if (habits.includes('overdraft') || habits.includes('avoid')) score('simply-u', 1)
  if (habits.includes('direct deposit') || habits.includes('paycheck')) score('free-checking', 1)
  if (habits.includes('save') || habits.includes('balance')) score('plus-checking', 1)
  return scores.sort((a, b) => b.score - a.score)[0].account
}

function HelpMeChoose({ onChoose }: { onChoose: (account: Account) => void }) {
  const [answers, setAnswers] = useState(initialHelpAnswers)
  const [recommendation, setRecommendation] = useState<Account | null>(null)
  const update = <K extends keyof HelpAnswers>(key: K, value: HelpAnswers[K]) => setAnswers(previous => ({ ...previous, [key]: value }))
  const canRecommend = answers.situation && answers.income && answers.balance && answers.overdraft && answers.priority && answers.primaryGoal

  if (recommendation) {
    const explanation = recommendation.id === 'simply-u'
      ? 'Your answers point to straightforward spending with no overdraft fees and no spending beyond deposited funds.'
      : recommendation.id === 'free-checking'
        ? 'Your answers point to flexible everyday banking with no monthly fee and digital banking features.'
        : recommendation.id === 'plus-checking'
          ? 'Your answers point to premium checking perks that may fit your balances, deposits, and broader service goals.'
          : `Your answers point to ${recommendation.name} as a match for the savings goal you selected.`
    return <div className="chooser-result">
      <div className="recommendation-badge">YOUR MATCH</div>
      <h3>{recommendation.name}</h3>
      <p>{explanation}</p>
      <p className="reference-note">Matched against UFCU product information reviewed {productReferenceDate}. This is guidance for the prototype, not an eligibility or financial advice decision.</p>
      <div className="profile-summary">
        <strong>Structured profile</strong>
        <span>{answers.situation === 'student' ? 'Student' : answers.situation === 'both' ? 'Student and working' : 'Working'} · {answers.priority === 'simple' ? 'Simple banking' : answers.priority === 'flexible' ? 'Everyday flexibility' : 'Added features'}</span>
        {answers.primaryGoal && <span>Primary goal: {serviceLabels[answers.primaryGoal]}</span>}
        <span>{answers.balance === 'lower' ? 'Building a balance' : answers.balance === 'growing' ? 'Growing balance' : 'Higher average balance'} · {answers.overdraft === 'protect' ? 'Overdraft protection is important' : answers.overdraft === 'occasionally' ? 'Occasional overdraft concern' : 'Overdraft protection is not a priority'}</span>
        {answers.services.length > 0 && <span>Services of interest: {answers.services.map(service => serviceLabels[service]).join(', ')}</span>}
        {answers.habits && <span>Banking habits noted: “{answers.habits}”</span>}
      </div>
      <div className="comparison-list">
        <strong>Compare all accounts</strong>
        {accounts.map(account => <div className={`comparison-row ${account.id === recommendation.id ? 'is-match' : ''}`} key={account.id}>
          <span><b>{account.name}</b><small>{account.description}</small></span>
          <Button variant={account.id === recommendation.id ? 'primary' : 'secondary'} onClick={() => onChoose(account)}>{account.id === recommendation.id ? 'Choose this account' : 'Choose'}</Button>
        </div>)}
      </div>
    </div>
  }

  return <form className="chooser-form" onSubmit={event => { event.preventDefault(); if (canRecommend) setRecommendation(recommendAccount(answers)) }}>
    <p className="chooser-intro">Answer a few questions about your life, goals, and the UFCU services you may need. We’ll turn your answers into a simple profile and match it against the products in this prototype. Nothing is saved outside this demo.</p>
    <div className="chooser-question"><p className="field-legend">Which best describes you?</p><div className="chooser-options">
      <label><input type="radio" name="situation" checked={answers.situation === 'working'} onChange={() => update('situation', 'working')} /> Working</label>
      <label><input type="radio" name="situation" checked={answers.situation === 'student'} onChange={() => update('situation', 'student')} /> Student</label>
      <label><input type="radio" name="situation" checked={answers.situation === 'both'} onChange={() => update('situation', 'both')} /> Working and studying</label>
    </div></div>
    <div className="chooser-question"><p className="field-legend">What is your typical monthly income?</p><div className="chooser-options">
      <label><input type="radio" name="income" checked={answers.income === 'lower'} onChange={() => update('income', 'lower')} /> Under $2,500</label>
      <label><input type="radio" name="income" checked={answers.income === 'steady'} onChange={() => update('income', 'steady')} /> $2,500–$6,000</label>
      <label><input type="radio" name="income" checked={answers.income === 'higher'} onChange={() => update('income', 'higher')} /> More than $6,000</label>
    </div></div>
    <div className="chooser-question"><p className="field-legend">What is your average account balance?</p><div className="chooser-options">
      <label><input type="radio" name="balance" checked={answers.balance === 'lower'} onChange={() => update('balance', 'lower')} /> Usually under $1,000</label>
      <label><input type="radio" name="balance" checked={answers.balance === 'growing'} onChange={() => update('balance', 'growing')} /> Growing over time</label>
      <label><input type="radio" name="balance" checked={answers.balance === 'higher'} onChange={() => update('balance', 'higher')} /> Usually over $5,000</label>
    </div></div>
    <div className="chooser-question"><p className="field-legend">How do you feel about overdrafts?</p><div className="chooser-options">
      <label><input type="radio" name="overdraft" checked={answers.overdraft === 'protect'} onChange={() => update('overdraft', 'protect')} /> I want to avoid them</label>
      <label><input type="radio" name="overdraft" checked={answers.overdraft === 'occasionally'} onChange={() => update('overdraft', 'occasionally')} /> They happen occasionally</label>
      <label><input type="radio" name="overdraft" checked={answers.overdraft === 'not_concerned'} onChange={() => update('overdraft', 'not_concerned')} /> Not a concern</label>
    </div></div>
    <div className="chooser-question"><p className="field-legend">What matters most in your banking?</p><div className="chooser-options">
      <label><input type="radio" name="priority" checked={answers.priority === 'simple'} onChange={() => update('priority', 'simple')} /> Keeping it simple</label>
      <label><input type="radio" name="priority" checked={answers.priority === 'flexible'} onChange={() => update('priority', 'flexible')} /> Flexibility for everyday life</label>
      <label><input type="radio" name="priority" checked={answers.priority === 'extras'} onChange={() => update('priority', 'extras')} /> Extra features and benefits</label>
    </div></div>
    <div className="chooser-question"><p className="field-legend">What is your primary UFCU goal?</p><div className="chooser-options chooser-options-wide">
      {Object.entries(serviceLabels).map(([id, label]) => <label key={id}><input type="radio" name="primaryGoal" checked={answers.primaryGoal === id} onChange={() => update('primaryGoal', id as ServiceId)} /> {label}</label>)}
    </div></div>
    <div className="chooser-question"><p className="field-legend">Are you exploring any other UFCU services? <span className="optional">(select all that apply)</span></p><div className="chooser-options chooser-options-wide">
      {Object.entries(serviceLabels).map(([id, label]) => <label key={id}><input type="checkbox" checked={answers.services.includes(id)} onChange={() => update('services', answers.services.includes(id) ? answers.services.filter(service => service !== id) : [...answers.services, id])} /> {label}</label>)}
    </div></div>
    <label className="chooser-question chooser-textarea"><span className="field-legend">Tell us about your banking habits <span className="optional">(optional)</span></span><textarea className="input" value={answers.habits} onChange={event => update('habits', event.target.value)} placeholder="For example: I use my debit card for most purchases and get paid by direct deposit." rows={3} /></label>
    <Button type="submit" disabled={!canRecommend}>Show my recommendation</Button>
  </form>
}

export function AccountSelectionPage() {
  const { data, update } = useOnboarding()
  const navigate = useNavigate()
  const { errors, onSubmit } = useStepForm(4, () => navigate('/apply/funding'))
  const [modal, setModal] = useState<'help' | Account | null>(null)
  const [activeTab, setActiveTab] = useState<AccountTab>('Recommended')
  const visibleAccounts = activeTab === 'Recommended'
    ? accounts.filter(account => ['free-checking', 'plus-checking', 'simply-u', 'savings'].includes(account.id))
    : accounts.filter(account => account.category === activeTab.toUpperCase())
  function toggle(id: string) {
    update('selectedAccounts', data.selectedAccounts.includes(id) ? data.selectedAccounts.filter(value => value !== id) : [...data.selectedAccounts, id])
  }
  return <>
    <PageHeading eyebrow="MADE FOR YOUR EVERYDAY" title="Find your fit." description="Choose one or more accounts for your next chapter. You can change your selections before submitting." />
    <div className="help-panel"><div><h2>Not sure which account is right for you?</h2><p>Answer a few questions and get a personalized starting point.</p></div><Button variant="secondary" onClick={() => setModal('help')}>Help me choose</Button></div>
    <form noValidate onSubmit={onSubmit}>
      <fieldset><legend className="sr-only">Choose one or more accounts</legend>
        <div className="account-tabs" role="tablist" aria-label="Account categories">
          {accountTabs.map(tab => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} className={`account-tab ${activeTab === tab ? 'is-active' : ''}`} onClick={() => setActiveTab(tab)}>{tab === 'Recommended' && <span aria-hidden="true">• </span>}{tab}</button>)}
        </div>
        <p className="account-count">{visibleAccounts.length} account{visibleAccounts.length === 1 ? '' : 's'} available</p>
        <div className="account-grid">{visibleAccounts.map(account => <AccountCard key={account.id} account={account} selected={data.selectedAccounts.includes(account.id)} onToggle={() => toggle(account.id)} onLearnMore={() => setModal(account)} error={errors.selectedAccounts} />)}</div>
        {errors.selectedAccounts && <p id="accounts-error" className="field-error">{errors.selectedAccounts}</p>}
      </fieldset>
      <p className="fine-print">Illustrative product information for this prototype. Features, eligibility, and terms are not verified offers.</p>
      <FormActions back="/apply/address" />
    </form>
    {modal && <Modal title={modal === 'help' ? 'Find an account that fits you.' : modal.name} onClose={() => setModal(null)}>
      {modal === 'help' ? <HelpMeChoose onChoose={account => { if (!data.selectedAccounts.includes(account.id)) update('selectedAccounts', [...data.selectedAccounts, account.id]); setModal(null) }} /> : <><p>{modal.description}</p><p>This is a product-detail placeholder. Full rates, qualifications, and disclosures would appear here in a future iteration.</p></>}
    </Modal>}
  </>
}
