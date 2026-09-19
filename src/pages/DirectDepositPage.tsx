import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Button } from '../components/common/Button'
import { Icon } from '../components/common/Icon'
import { FormField, SelectField } from '../components/forms/FormField'
import { useMember } from '../context/MemberContext'

const employers = ['Texas State University', 'Target', 'Amazon', 'Walmart', 'Other employer']

export function DirectDepositPage() {
  const { profile } = useMember()
  const location = useLocation()
  const requestedView = new URLSearchParams(location.search).get('view')
  const [step, setStep] = useState(requestedView === 'paycheck' ? 3 : requestedView === 'setup' ? 1 : 0)
  const [employer, setEmployer] = useState('')
  const [memberName, setMemberName] = useState(profile ? `${profile.firstName} ${profile.lastName}` : '')
  const [workEmail, setWorkEmail] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [depositType, setDepositType] = useState('entire')
  const [percentage, setPercentage] = useState('100')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (profile) setMemberName(`${profile.firstName} ${profile.lastName}`)
  }, [profile])

  useEffect(() => {
    const view = new URLSearchParams(location.search).get('view')
    if (view === 'paycheck') setStep(3)
    else if (view === 'setup') setStep(1)
    else if (!view) setStep(0)
  }, [location.search])

  function continueToConnection() {
    if (employer && memberName.trim()) setStep(2)
  }

  return <div className="feature-page direct-deposit-page">
    <div className="feature-heading"><div><p className="member-eyebrow">PAYCHECK SETUP</p><h1>Direct Deposit</h1><p>Connect your employer or payroll provider and choose how your paycheck reaches UFCU.</p></div><span className="feature-heading-icon"><Icon name="building" size={28} /></span></div>
    <div className="deposit-progress" aria-label="Direct deposit setup progress"><span className={step >= 1 ? 'is-active' : ''}>1. Employer</span><span className={step >= 2 ? 'is-active' : ''}>2. Secure connection</span><span className={step >= 3 ? 'is-active' : ''}>3. Paycheck</span><span className={step >= 4 ? 'is-active' : ''}>4. Confirm</span></div>
    {submitted ? <section className="deposit-success"><span className="success-icon"><Icon name="check" size={28} /></span><p className="member-eyebrow">DIRECT DEPOSIT</p><h2>Direct deposit setup submitted.</h2><p>Your employer or payroll provider may require final confirmation. You can review your paycheck details from this page.</p><Button onClick={() => { setSubmitted(false); setStep(3) }}>View paycheck details <Icon name="arrow" size={17} /></Button></section> : <>
      {step <= 1 && <section className="deposit-card"><div className="deposit-card-heading"><span className="step-badge">1</span><div><p className="member-eyebrow">START HERE</p><h2>Choose your organization or employer</h2><p>Select the organization that manages your paycheck.</p></div></div><div className="member-form-grid"><SelectField id="employer" label="Organization or employer" value={employer} onChange={event => setEmployer(event.target.value)} required><option value="">Choose an organization</option>{employers.map(item => <option key={item}>{item}</option>)}</SelectField><FormField id="deposit-member-name" label="Your name" value={memberName} onChange={event => setMemberName(event.target.value)} required /><FormField id="work-email" label="Work email" type="email" value={workEmail} onChange={event => setWorkEmail(event.target.value)} optional /><FormField id="employee-id" label="Employee or payroll ID" value={employeeId} onChange={event => setEmployeeId(event.target.value)} optional /></div><div className="deposit-actions"><Button disabled={!employer || !memberName.trim()} onClick={continueToConnection}>Continue <Icon name="arrow" size={17} /></Button></div></section>}
      {step === 2 && <section className="deposit-card"><div className="deposit-card-heading"><span className="step-badge">2</span><div><p className="member-eyebrow">SECURE HANDOFF</p><h2>Connect securely to {employer}</h2><p>You will continue to your employer or payroll provider’s secure portal.</p></div></div><div className="secure-handoff"><Icon name="lock" size={22} /><div><strong>Keep your employer password private.</strong><p>UFCU does not collect or store your employer username or password. If the portal asks for credentials, enter them only on the secure external portal.</p></div></div><div className="deposit-actions"><button type="button" className="member-text-button" onClick={() => setStep(1)}><Icon name="back" size={17} /> Back</button><Button onClick={() => setStep(3)}>Continue to secure employer portal <Icon name="arrow" size={17} /></Button></div></section>}
      {step === 3 && <section className="deposit-card"><div className="deposit-card-heading"><span className="step-badge">3</span><div><p className="member-eyebrow">PAYCHECK DETAILS</p><h2>Your paycheck is ready to organize</h2><p>These details appear after your secure employer connection.</p></div></div><div className="paycheck-summary"><div><span>Employer</span><strong>{employer || 'Texas State University'}</strong></div><div><span>Pay frequency</span><strong>Bi-weekly</strong></div><div><span>Estimated paycheck</span><strong>$1,842.50</strong></div><div><span>Next paycheck</span><strong>Friday, Nov 29</strong></div></div><div className="deposit-choice"><p className="field-legend">How much should be deposited into UFCU?</p><label className={depositType === 'entire' ? 'is-selected' : ''}><input type="radio" name="deposit-type" checked={depositType === 'entire'} onChange={() => setDepositType('entire')} /> Entire paycheck</label><label className={depositType === 'percentage' ? 'is-selected' : ''}><input type="radio" name="deposit-type" checked={depositType === 'percentage'} onChange={() => setDepositType('percentage')} /> Percentage <input className="small-inline-input" aria-label="Deposit percentage" value={percentage} onChange={event => { setDepositType('percentage'); setPercentage(event.target.value) }} />%</label><label className={depositType === 'fixed' ? 'is-selected' : ''}><input type="radio" name="deposit-type" checked={depositType === 'fixed'} onChange={() => setDepositType('fixed')} /> Fixed amount</label><label className={depositType === 'split' ? 'is-selected' : ''}><input type="radio" name="deposit-type" checked={depositType === 'split'} onChange={() => setDepositType('split')} /> Split deposit</label></div><div className="deposit-actions"><button type="button" className="member-text-button" onClick={() => setStep(2)}><Icon name="back" size={17} /> Back</button><Button onClick={() => setStep(4)}>Review setup <Icon name="arrow" size={17} /></Button></div></section>}
      {step === 4 && <section className="deposit-card"><div className="deposit-card-heading"><span className="step-badge">4</span><div><p className="member-eyebrow">REVIEW AND CONFIRM</p><h2>Review your direct deposit setup</h2><p>Confirm the details before submitting your request.</p></div></div><div className="deposit-review"><div><span>Organization</span><strong>{employer}</strong></div><div><span>Member name</span><strong>{memberName}</strong></div><div><span>Deposit choice</span><strong>{depositType === 'entire' ? 'Entire paycheck' : depositType === 'percentage' ? `${percentage}% of paycheck` : depositType === 'fixed' ? 'Fixed amount' : 'Split deposit'}</strong></div><div><span>Destination</span><strong>UFCU Checking ••4821</strong></div></div><div className="secure-handoff"><Icon name="info" size={22} /><div><strong>What happens next</strong><p>Your employer or payroll provider may require final confirmation. UFCU cannot change your employer’s payroll instructions for you.</p></div></div><div className="deposit-actions"><button type="button" className="member-text-button" onClick={() => setStep(3)}><Icon name="back" size={17} /> Back</button><Button onClick={() => setSubmitted(true)}>Submit setup <Icon name="check" size={17} /></Button></div></section>}
    </>}
  </div>
}
