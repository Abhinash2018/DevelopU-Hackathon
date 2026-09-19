import { useMemo, useState } from 'react'
import { Button } from '../common/Button'
import { Icon } from '../common/Icon'

type Charge = { id: string; merchant: string; detail: string; amount: string; color: string }

const charges: Charge[] = [
  { id: 'netflix', merchant: 'Netflix', detail: 'Streaming', amount: '$15.49', color: '#e50914' },
  { id: 'spotify', merchant: 'Spotify', detail: 'Music', amount: '$11.99', color: '#1db954' },
  { id: 'phone', merchant: 'Phone bill', detail: 'Utilities', amount: '$65.00', color: '#0c557d' },
  { id: 'gym', merchant: 'Gym membership', detail: 'Fitness', amount: '$39.00', color: '#4a2d86' },
  { id: 'electricity', merchant: 'Electricity', detail: 'Variable utility', amount: '$89.00', color: '#d99500' },
  { id: 'rent', merchant: 'Rent', detail: 'Housing', amount: '$1,200.00', color: '#63748c' },
]

const employers = ['Chartwell', 'Texas State University', 'Dining Services']

function DirectDepositSwitch() {
  const [employer, setEmployer] = useState('')
  const [connected, setConnected] = useState(false)

  const canConnect = employer

  if (connected) return <section className="deposit-complete" aria-live="polite">
    <span className="switch-success"><Icon name="check" size={22} /></span>
    <div>
      <span className="eyebrow">DIRECT DEPOSIT DEMO READY</span>
      <h3>Your paycheck switch walkthrough is ready</h3>
      <p>This prototype prepared a simulated direct deposit handoff for {employer}. Keep your current deposit instructions active until you complete any real changes through your employer’s secure portal.</p>
    </div>
  </section>

  return <section className="deposit-switch" aria-labelledby="direct-deposit-title">
    <div className="deposit-heading">
      <div>
        <span className="small-badge switch-badge">DIRECT DEPOSIT</span>
        <h3 id="direct-deposit-title">Send your paycheck to UFCU</h3>
        <p>Choose your employer to preview a simulated handoff to their secure payroll portal.</p>
      </div>
      <span className="deposit-icon"><Icon name="card" size={23} /></span>
    </div>
    <form className="deposit-form" onSubmit={event => { event.preventDefault(); if (canConnect) setConnected(true) }}>
      <div className="deposit-grid">
        <label className="field full-width" htmlFor="direct-deposit-employer"><span>Choose your employer</span><select id="direct-deposit-employer" className="input" value={employer} onChange={event => setEmployer(event.target.value)} required aria-required="true"><option value="">Select an employer</option>{employers.map(option => <option key={option} value={option}>{option}</option>)}</select></label>
      </div>
      <div className="secure-handoff"><Icon name="lock" size={20} /><div><strong>Continue through your employer’s secure site.</strong><p>This prototype does not collect or store your employer username or password.</p></div></div>
      <div className="deposit-actions">
        <p className="switch-disclosure"><Icon name="shield" size={16} /> No payroll credentials are collected in this demo.</p>
        <Button type="submit" disabled={!canConnect}>Continue to secure employer portal <Icon name="arrow" size={17} /></Button>
      </div>
    </form>
  </section>
}

export function SmartSwitch() {
  const [bank, setBank] = useState('')
  const [connected, setConnected] = useState(false)
  const [selected, setSelected] = useState<string[]>(['netflix', 'spotify'])
  const [complete, setComplete] = useState(false)
  const selectedCharges = useMemo(() => charges.filter(charge => selected.includes(charge.id)), [selected])
  const total = selectedCharges.reduce((sum, charge) => sum + Number(charge.amount.replace('$', '')), 0)
  const toggle = (id: string) => setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])

  if (complete) return <><section className="switch-complete" aria-live="polite"><span className="switch-success"><Icon name="check" size={22} /></span><div><span className="eyebrow">SWITCH REQUEST READY</span><h2>Your payment switch request is ready</h2><p>{selectedCharges.length} recurring {selectedCharges.length === 1 ? 'payment' : 'payments'} were selected. Some merchants may require separate confirmation before a payment moves to UFCU.</p></div></section><DirectDepositSwitch /></>

  return <section className="smart-switch" aria-labelledby="smart-switch-title">
    <div className="switch-heading"><div><span className="small-badge switch-badge">SMART SWITCH</span><h2 id="smart-switch-title">Bring your recurring payments with you</h2><p>Connect another bank to find subscriptions and recurring payments you can move to UFCU.</p></div><span className="switch-icon"><Icon name="bank" size={27} /></span></div>
    {!connected ? <div className="bank-connect"><label htmlFor="connected-bank">Where are your payments today?</label><div className="connect-controls"><select id="connected-bank" className="input" value={bank} onChange={event => setBank(event.target.value)}><option value="">Choose a bank</option><option value="Chase">Chase</option><option value="Bank of America">Bank of America</option><option value="Wells Fargo">Wells Fargo</option><option value="Capital One">Capital One</option></select><Button type="button" disabled={!bank} onClick={() => setConnected(true)}>Connect securely <Icon name="arrow" size={17} /></Button></div><p className="switch-disclosure"><Icon name="shield" size={16} /> Secure provider connection. UFCU never sees or stores your bank sign-in.</p></div> : <div className="switch-review"><div className="connected-bank"><span className="bank-avatar">{bank.charAt(0)}</span><div><strong>{bank} connected</strong><span>We found {charges.length} recurring payments</span></div><button type="button" className="text-link" onClick={() => setConnected(false)}>Change</button></div><fieldset><legend>Choose payments to switch to UFCU</legend><div className="charge-list">{charges.map(charge => <label className={`charge-row ${selected.includes(charge.id) ? 'is-picked' : ''}`} key={charge.id}><input type="checkbox" checked={selected.includes(charge.id)} onChange={() => toggle(charge.id)} /><span className="merchant-mark" style={{ backgroundColor: charge.color }}>{charge.merchant.charAt(0)}</span><span className="charge-name"><strong>{charge.merchant}</strong><span>{charge.detail} · Monthly</span></span><strong className="charge-amount">{charge.amount}<span>/mo</span></strong></label>)}</div></fieldset><div className="switch-footer"><p><strong>{selected.length} selected</strong>{selected.length > 0 && <> · ${total.toFixed(2)}/month</>}</p><Button type="button" disabled={selected.length === 0} onClick={() => setComplete(true)}>Switch to UFCU <Icon name="arrow" size={17} /></Button></div></div>}
  </section>
}
