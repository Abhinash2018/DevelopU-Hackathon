import { useMemo, useState } from 'react'
import { Button } from '../common/Button'
import { Icon } from '../common/Icon'

type Charge = { id: string; merchant: string; detail: string; amount: string; color: string }

const charges: Charge[] = [
  { id: 'netflix', merchant: 'Netflix', detail: 'Streaming', amount: '$15.49', color: '#e50914' },
  { id: 'spotify', merchant: 'Spotify', detail: 'Music', amount: '$11.99', color: '#1db954' },
  { id: 'planet', merchant: 'Planet Fitness', detail: 'Fitness', amount: '$24.99', color: '#4a2d86' },
  { id: 'icloud', merchant: 'iCloud+', detail: 'Storage', amount: '$2.99', color: '#6b92bd' },
]

const employers = ['Chartwell', 'Texas State University', 'Dining Services']

function DirectDepositSwitch() {
  const [employer, setEmployer] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [connected, setConnected] = useState(false)

  const canConnect = employer && username.trim() && password

  if (connected) return <section className="deposit-complete" aria-live="polite">
    <span className="switch-success"><Icon name="check" size={22} /></span>
    <div>
      <span className="eyebrow">DIRECT DEPOSIT REQUEST STARTED</span>
      <h3>Your paycheck is switching to UFCU</h3>
      <p>We sent your direct deposit update to {employer}. Changes typically reflect within 1–2 weeks. Keep your current deposit instructions active until the switch is confirmed.</p>
    </div>
  </section>

  return <section className="deposit-switch" aria-labelledby="direct-deposit-title">
    <div className="deposit-heading">
      <div>
        <span className="small-badge switch-badge">DIRECT DEPOSIT</span>
        <h3 id="direct-deposit-title">Send your paycheck to UFCU</h3>
        <p>Connect your employer once and we’ll submit your new UFCU direct deposit instructions for you.</p>
      </div>
      <span className="deposit-icon"><Icon name="card" size={23} /></span>
    </div>
    <form className="deposit-form" onSubmit={event => { event.preventDefault(); if (canConnect) setConnected(true) }}>
      <div className="deposit-grid">
        <label className="field"><span>Choose your employer</span><select className="input" value={employer} onChange={event => setEmployer(event.target.value)}><option value="">Select an employer</option>{employers.map(option => <option key={option} value={option}>{option}</option>)}</select></label>
        <label className="field"><span>Employer username</span><input className="input" value={username} onChange={event => setUsername(event.target.value)} autoComplete="username" placeholder="Enter your username" /></label>
        <label className="field"><span>Employer password</span><input className="input" type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" placeholder="Enter your password" /></label>
      </div>
      <div className="deposit-actions">
        <p className="switch-disclosure"><Icon name="shield" size={16} /> Your employer sign-in is used only to submit this change.</p>
        <Button type="submit" disabled={!canConnect}>Connect and switch <Icon name="arrow" size={17} /></Button>
      </div>
    </form>
  </section>
}

export function SmartSwitch() {
  const [bank, setBank] = useState('')
  const [bankUsername, setBankUsername] = useState('')
  const [bankPassword, setBankPassword] = useState('')
  const [bankAccountNumber, setBankAccountNumber] = useState('')
  const [connected, setConnected] = useState(false)
  const [selected, setSelected] = useState<string[]>(['netflix', 'spotify'])
  const [complete, setComplete] = useState(false)
  const selectedCharges = useMemo(() => charges.filter(charge => selected.includes(charge.id)), [selected])
  const total = selectedCharges.reduce((sum, charge) => sum + Number(charge.amount.replace('$', '')), 0)
  const toggle = (id: string) => setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  const canConnectBank = bank && bankUsername.trim() && bankPassword && bankAccountNumber.trim()

  if (complete) return <><section className="switch-complete" aria-live="polite"><span className="switch-success"><Icon name="check" size={22} /></span><div><span className="eyebrow">SWITCH REQUEST STARTED</span><h2>Your payments are on their way to UFCU</h2><p>{selectedCharges.length} recurring {selectedCharges.length === 1 ? 'payment' : 'payments'} will be moved to your new UFCU account. We’ll keep you updated in the UFCU app.</p></div></section><DirectDepositSwitch /></>

  return <section className="smart-switch" aria-labelledby="smart-switch-title">
    <div className="switch-heading"><div><span className="small-badge switch-badge">SMART SWITCH</span><h2 id="smart-switch-title">Bring your recurring payments with you</h2><p>Connect another bank to find subscriptions and recurring payments you can move to UFCU.</p></div><span className="switch-icon"><Icon name="bank" size={27} /></span></div>
    {!connected ? <form className="bank-connect" onSubmit={event => { event.preventDefault(); if (canConnectBank) setConnected(true) }}><label htmlFor="connected-bank">Connect the bank where your payments are today</label><div className="deposit-grid bank-credentials"><label className="field"><span>Bank</span><select id="connected-bank" className="input" value={bank} onChange={event => setBank(event.target.value)}><option value="">Choose a bank</option><option value="Chase">Chase</option><option value="Bank of America">Bank of America</option><option value="Wells Fargo">Wells Fargo</option><option value="Capital One">Capital One</option></select></label><label className="field"><span>Online banking username</span><input className="input" autoComplete="username" value={bankUsername} onChange={event => setBankUsername(event.target.value)} placeholder="Enter your username" /></label><label className="field"><span>Online banking password</span><input className="input" type="password" autoComplete="current-password" value={bankPassword} onChange={event => setBankPassword(event.target.value)} placeholder="Enter your password" /></label><label className="field"><span>Account number</span><input className="input" inputMode="numeric" value={bankAccountNumber} onChange={event => setBankAccountNumber(event.target.value)} placeholder="Enter account number" /></label></div><div className="connect-controls"><Button type="submit" disabled={!canConnectBank}>Connect securely <Icon name="arrow" size={17} /></Button></div><p className="switch-disclosure"><Icon name="shield" size={16} /> Your sign-in and account details are used only to find recurring payments.</p></form> : <div className="switch-review"><div className="connected-bank"><span className="bank-avatar">{bank.charAt(0)}</span><div><strong>{bank} connected</strong><span>We found {charges.length} recurring payments</span></div><button className="text-link" onClick={() => setConnected(false)}>Change</button></div><fieldset><legend>Choose payments to switch to UFCU</legend><div className="charge-list">{charges.map(charge => <label className={`charge-row ${selected.includes(charge.id) ? 'is-picked' : ''}`} key={charge.id}><input type="checkbox" checked={selected.includes(charge.id)} onChange={() => toggle(charge.id)} /><span className="merchant-mark" style={{ backgroundColor: charge.color }}>{charge.merchant.charAt(0)}</span><span className="charge-name"><strong>{charge.merchant}</strong><span>{charge.detail} · Monthly</span></span><strong className="charge-amount">{charge.amount}<span>/mo</span></strong></label>)}</div></fieldset><div className="switch-footer"><p><strong>{selected.length} selected</strong>{selected.length > 0 && <> · ${total.toFixed(2)}/month</>}</p><Button disabled={selected.length === 0} onClick={() => setComplete(true)}>Switch to UFCU <Icon name="arrow" size={17} /></Button></div></div>}
    <DirectDepositSwitch />
  </section>
}
