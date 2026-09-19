import { startTransition } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../components/common/Button'
import { Icon } from '../components/common/Icon'
import { useOnboarding } from '../context/OnboardingContext'
import { accounts } from '../data/accounts'

export function ConfirmationPage() {
  const { data, reset } = useOnboarding()
  const navigate = useNavigate()
  return <>
    <div className="confirmation-heading"><span className="success-icon"><Icon name="check" size={32} /></span><p className="eyebrow">HERE’S TO WHAT’S NEXT</p><h1>Account Created Successfully</h1><p>Welcome to UFCU, {data.personalInfo.firstName.trim()}.<br />Your new demo account is ready.</p></div>
    <div className="confirmation-summary"><span className="small-badge">SIMULATED APPROVAL</span><h2>Your selected accounts</h2>{accounts.filter(account => data.selectedAccounts.includes(account.id)).map(account => <p key={account.id}><Icon name="check" size={18} />{account.name}</p>)}<p className="fine-print">This completes the prototype. No real account has been opened or funded.</p></div>
    <h2 className="next-heading">A glimpse of what’s next</h2>
    <div className="future-grid"><section className="future-card"><Icon name="card" size={25} /><h3>Digital Debit Card</h3><p>Coming in next prototype iteration</p></section><section className="future-card"><Icon name="bank" size={25} /><h3>Make UFCU My Primary Bank</h3><p>Coming in next prototype iteration</p></section></div>
    <div className="completion-actions"><Button onClick={() => startTransition(() => { reset(); navigate('/', { replace: true }) })}>Continue<Icon name="arrow" size={18} /></Button><p>Return to the welcome screen and start a fresh demo.</p></div>
  </>
}
