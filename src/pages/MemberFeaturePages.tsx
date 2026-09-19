import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { Button } from '../components/common/Button'
import { Icon } from '../components/common/Icon'
import { Modal } from '../components/common/Modal'
import { SmartSwitch } from '../components/switching/SmartSwitch'
import { useMember } from '../context/MemberContext'

export function AccountsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedAccount = searchParams.get('account')
  const account = selectedAccount === 'savings' ? accountDetails.savings : selectedAccount ? accountDetails.checking : null

  function openAccount(accountId: 'checking' | 'savings') {
    setSearchParams({ account: accountId })
  }

  function closeAccount() {
    setSearchParams({})
  }

  return <div className="feature-page"><FeatureHeading eyebrow="YOUR MONEY" title="Accounts" description="See your UFCU accounts and the activity connected to your financial journey." icon="wallet" /><div className="account-summary-grid"><AccountBalance title="Everyday Checking" amount="$2,931.20" detail="Available balance · ••4821" onOpen={() => openAccount('checking')} /><AccountBalance title="Savings" amount="$1,355.54" detail="Available balance · ••1904" onOpen={() => openAccount('savings')} /><AccountBalance title="Total balance" amount="$4,286.74" detail="Across your UFCU accounts" onOpen={() => openAccount('checking')} /></div><section className="dashboard-panel feature-panel"><div className="panel-heading"><div><p className="member-eyebrow">RECENT ACTIVITY</p><h2>Transactions</h2></div><button type="button" className="panel-link">Download activity <Icon name="arrow" size={15} /></button></div><div className="activity-list account-activity"><Activity name="H-E-B Grocery" detail="Nov 25 · Food" amount="$48.32" /><Activity name="Acme Corporation" detail="Nov 22 · Income" amount="+$1,842.50" positive /><Activity name="Torchy's Tacos" detail="Nov 21 · Food" amount="$14.90" /><Activity name="Shell Gas" detail="Nov 20 · Transport" amount="$41.00" /></div></section>{account && <AccountDetailPanel account={account} onClose={closeAccount} />}</div>
}

export function MoveMoneyPage() {
  const [submitted, setSubmitted] = useState(false)
  return <div className="feature-page"><FeatureHeading eyebrow="TRANSFER CENTER" title="Move Money" description="Move money between your UFCU accounts with a clear review before anything is submitted." icon="transfer" />{submitted ? <section className="deposit-success"><span className="success-icon"><Icon name="check" size={28} /></span><p className="member-eyebrow">TRANSFER REVIEWED</p><h2>Your transfer is ready for review.</h2><p>Nothing has been sent. Review the transfer details in the UFCU app before submitting.</p><Button onClick={() => setSubmitted(false)}>Start another transfer <Icon name="arrow" size={17} /></Button></section> : <section className="deposit-card transfer-card"><div className="member-form-grid"><label className="field"><span>From account</span><select className="member-input"><option>Everyday Checking ••4821</option><option>Savings ••1904</option></select></label><label className="field"><span>To account</span><select className="member-input"><option>Savings ••1904</option><option>Everyday Checking ••4821</option></select></label><label className="field"><span>Amount</span><input className="member-input" inputMode="decimal" placeholder="$0.00" /></label><label className="field"><span>When</span><select className="member-input"><option>Today</option><option>Schedule for later</option></select></label></div><div className="secure-handoff"><Icon name="info" size={21} /><div><strong>Review before submitting</strong><p>This screen prepares a transfer review. It does not move money automatically.</p></div></div><div className="deposit-actions"><Button onClick={() => setSubmitted(true)}>Review transfer <Icon name="arrow" size={17} /></Button></div></section>}</div>
}

export function SmartSwitchPage() {
  return <div className="feature-page"><FeatureHeading eyebrow="MOVE YOUR BANKING" title="Smart Switch" description="Connect another bank, review recurring payments, and choose what you want to move to UFCU." icon="repeat" /><SmartSwitch /></div>
}

export function CardsWalletPage() {
  const { profile, selectedCard, cardActivated, activateMember } = useMember()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const onboarding = searchParams.get('onboarding') === '1'
  const [activated, setActivated] = useState(cardActivated)
  const [walletAdded, setWalletAdded] = useState(false)
  function handleActivate() {
    setActivated(true)
    activateMember()
  }

  return <div className="feature-page"><FeatureHeading eyebrow="CARD SERVICES" title="Cards & Wallet" description="Manage your digital card and prepare it for your mobile wallet." icon="card" />{onboarding && <div className="flow-disclaimer card-onboarding-note"><Icon name="info" size={17} /> Your membership review is complete. Activate this illustrative digital card to finish the StartSmart path.</div>}<section className="card-wallet-layout"><figure className="selected-card-preview"><img src={`/images/cards/${selectedCard}.png`} alt="Your selected UFCU debit card design" /><figcaption>{profile ? `${profile.firstName} ${profile.lastName}` : 'Member'} · •••• 4821</figcaption></figure><div className="card-wallet-actions"><p className="member-eyebrow">DIGITAL CARD</p><h2>{activated ? 'Your card is active.' : 'Your digital card is ready.'}</h2><p>Use the controls below to manage your card setup.</p><div className="card-status-row"><span className="status-dot" /> {activated ? 'Active' : 'Ready to activate'}</div><Button onClick={handleActivate} disabled={activated}>{activated ? 'Card activated' : 'Activate card'} <Icon name="check" size={16} /></Button><Button variant="secondary" onClick={() => setWalletAdded(true)}>{walletAdded ? 'Added to Apple Wallet' : 'Add to Apple Wallet'} <Icon name={walletAdded ? 'check' : 'wallet'} size={16} /></Button>{walletAdded && <p className="success-inline"><Icon name="checkCircle" size={17} /> Your UFCU card was added successfully.</p>}{onboarding && activated && <Button variant="secondary" onClick={() => navigate('/dashboard')}>Continue to dashboard <Icon name="arrow" size={16} /></Button>}</div></section></div>
}

export function FinancialInsightsPage() {
  const bars = [42, 58, 48, 80, 62, 91, 72]
  return <div className="feature-page"><FeatureHeading eyebrow="SEE THE PATTERN" title="Financial Insights" description="Understand cash flow, spending categories, and recurring commitments at a glance." icon="chart" /><div className="insights-filter"><button className="is-active" type="button">This month</button><button type="button">Three months</button><button type="button">This year</button></div><div className="insights-grid"><section className="insight-chart-card"><div className="panel-heading"><div><p className="member-eyebrow">CASH FLOW</p><h2>Money in and money out</h2></div><span className="chart-legend"><i className="legend-in" /> Money in <i className="legend-out" /> Money out</span></div><div className="large-chart" aria-label="Cash flow chart"><div className="chart-y-labels"><span>$2k</span><span>$1k</span><span>$0</span></div><div className="chart-bars">{bars.map((height, index) => <span key={index} style={{ height: `${height}%` }}><i /></span>)}</div></div><p className="chart-caption">Money in is ahead of money out for this period.</p></section><section className="insight-chart-card"><div className="panel-heading"><div><p className="member-eyebrow">SPENDING OVERVIEW</p><h2>Where money goes</h2></div></div><div className="spending-list"><SpendingRow name="Housing" value="$1,289" percent="62%" /><SpendingRow name="Food" value="$324" percent="42%" /><SpendingRow name="Subscriptions" value="$89" percent="27%" /><SpendingRow name="Transportation" value="$171" percent="34%" /><SpendingRow name="Shopping" value="$145" percent="30%" /></div></section></div><section className="dashboard-panel commitments-panel"><div className="panel-heading"><div><p className="member-eyebrow">MONTHLY COMMITMENTS</p><h2>Recurring payments by month</h2></div><Link to="/smart-switch" className="panel-link">Review payments <Icon name="arrow" size={15} /></Link></div><div className="commitment-timeline"><span><b>Nov</b><i style={{ height: '50%' }} /></span><span><b>Dec</b><i style={{ height: '78%' }} /></span><span><b>Jan</b><i style={{ height: '61%' }} /></span><span><b>Feb</b><i style={{ height: '84%' }} /></span><span><b>Mar</b><i style={{ height: '70%' }} /></span></div></section></div>
}

const nearbyOffers = [
  { id: 'heb', merchant: 'H-E-B', category: 'Groceries', distance: '0.8 mi', expiration: 'Dec 15', color: '#0c557d', headline: '$5 back on groceries', description: 'Get $5 back on a grocery purchase of $50 or more.', redemption: 'Pay in store with your UFCU debit card in this example offer.', terms: 'One qualifying purchase per member. Minimum spend excludes taxes, gift cards, alcohol, and tobacco. Maximum reward: $5.' },
  { id: 'target', merchant: 'Target', category: 'Shopping', distance: '1.4 mi', expiration: 'Dec 20', color: '#d82d2d', headline: '10% back on your next shop', description: 'Get 10% back on a purchase of $30 or more, up to $10 back.', redemption: 'Use your UFCU debit card at checkout in store in this example offer.', terms: 'One purchase per member. Excludes gift cards, taxes, and shipping. Maximum reward: $10. Cannot be combined with another card-linked offer.' },
  { id: 'coffee', merchant: 'Local Coffee', category: 'Food & drink', distance: '2.1 mi', expiration: 'Dec 8', color: '#f47721', headline: '$2 off your coffee break', description: 'Save $2 when you spend $8 or more on drinks or food.', redemption: 'Mention the offer before paying with your UFCU debit card in this example.', terms: 'One use per member. In-store purchases only. Minimum spend excludes taxes and tips. Maximum discount: $2.' },
]

export function NearbyOffersPage() {
  const [permission, setPermission] = useState<'undecided' | 'allowed' | 'zip'>('undecided')
  const [zip, setZip] = useState('')
  const [selectedOffer, setSelectedOffer] = useState<typeof nearbyOffers[number] | null>(null)
  return <div className="feature-page"><FeatureHeading eyebrow="LOCAL DISCOVERY" title="Nearby Offers" description="Find available offers near you using one-time location access or a ZIP code." icon="pin" />{permission === 'undecided' ? <section className="location-consent"><span className="location-consent-icon"><Icon name="pin" size={26} /></span><h2>Use your location to find nearby offers?</h2><p>Location is optional. UFCU does not use continuous background tracking for this experience.</p><div className="location-actions"><Button onClick={() => setPermission('allowed')}>Allow once <Icon name="arrow" size={17} /></Button><button type="button" className="button button-secondary" onClick={() => setPermission('zip')}>Enter ZIP code instead</button><button type="button" className="member-text-button" onClick={() => setPermission('zip')}>Not now</button></div></section> : permission === 'zip' ? <section className="location-consent"><span className="location-consent-icon"><Icon name="pin" size={26} /></span><h2>Enter a ZIP code</h2><p>Use a ZIP code instead of sharing your location.</p><div className="location-zip-row"><input className="member-input" value={zip} onChange={event => setZip(event.target.value)} placeholder="78666" inputMode="numeric" /><Button disabled={!zip} onClick={() => setPermission('allowed')}>Show offers <Icon name="arrow" size={17} /></Button></div></section> : <section className="offers-layout"><div className="offers-map"><span className="map-label">Nearby offers around {zip || 'your location'}</span>{nearbyOffers.map((offer, index) => <button type="button" key={offer.id} className={`map-pin map-pin-${['one', 'two', 'three'][index]}`} aria-label={`View ${offer.merchant} offer on map`} onClick={() => setSelectedOffer(offer)} />)}</div><div className="offers-list"><div className="panel-heading"><div><p className="member-eyebrow">AVAILABLE OFFERS</p><h2>Near you</h2></div><button type="button" className="panel-link" onClick={() => setPermission('undecided')}>Location settings <Icon name="arrow" size={15} /></button></div>{nearbyOffers.map(offer => <OfferCard key={offer.id} offer={offer} onClick={() => setSelectedOffer(offer)} />)}</div></section>}{selectedOffer && <Modal title={`${selectedOffer.merchant} offer`} eyebrow="NEARBY OFFERS" closeLabel="Back to offers" onClose={() => setSelectedOffer(null)}>
      <div className="offer-detail-hero"><span className="merchant-logo" style={{ background: selectedOffer.color }}>{selectedOffer.merchant[0]}</span><div><strong>{selectedOffer.headline}</strong><p>{selectedOffer.category} · {selectedOffer.distance} away</p></div></div>
      <p className="offer-demo-label">Demo offer · Not redeemable</p>
      <p>{selectedOffer.description}</p>
      <dl className="offer-detail-meta"><div><dt>Example expiration</dt><dd>{selectedOffer.expiration}</dd></div><div><dt>Where to use it</dt><dd>In store</dd></div></dl>
      <h3>How to use this offer</h3><p>{selectedOffer.redemption}</p>
      <h3>Offer terms</h3><p>{selectedOffer.terms}</p>
      <p className="offer-detail-note">This is a sample offer for the walkthrough, not a live merchant promotion.</p>
    </Modal>}</div>
}

function FeatureHeading({ eyebrow, title, description, icon }: { eyebrow: string; title: string; description: string; icon: 'wallet' | 'transfer' | 'repeat' | 'card' | 'chart' | 'pin' }) {
  return <div className="feature-heading"><div><p className="member-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div><span className="feature-heading-icon"><Icon name={icon} size={28} /></span></div>
}

const accountDetails = {
  checking: { title: 'Everyday Checking', number: '1234564821', routing: '987654321', balance: '$2,931.20', type: 'Checking' },
  savings: { title: 'Savings', number: '1234561904', routing: '987654321', balance: '$1,355.54', type: 'Savings' },
}

function AccountBalance({ title, amount, detail, onOpen }: { title: string; amount: string; detail: string; onOpen: () => void }) {
  return <button type="button" className="account-balance-card account-balance-card-button" onClick={onOpen}><span className="summary-label">{title}</span><strong>{amount}</strong><small>{detail}</small><span className="panel-link">View account <Icon name="arrow" size={15} /></span></button>
}

function AccountDetailPanel({ account, onClose }: { account: typeof accountDetails.checking; onClose: () => void }) {
  const [revealed, setRevealed] = useState(false)
  return <div className="member-slide-backdrop" role="presentation" onMouseDown={onClose}><aside className="member-slide-panel" role="dialog" aria-modal="true" aria-labelledby="account-panel-title" onMouseDown={event => event.stopPropagation()}><div className="member-slide-heading"><div><p className="member-eyebrow">ACCOUNT DETAILS</p><h2 id="account-panel-title">{account.title}</h2></div><button type="button" className="member-topbar-icon" aria-label="Close account details" onClick={onClose}><Icon name="close" size={18} /></button></div><div className="account-panel-balance"><span>Available balance</span><strong>{account.balance}</strong></div><div className="account-panel-details"><div><span>Account type</span><strong>{account.type}</strong></div><div><span>Account number</span><strong>{revealed ? account.number : `•••• ${account.number.slice(-4)}`}</strong></div><div><span>Routing number</span><strong>{revealed ? account.routing : '•••••••••'}</strong></div></div><button type="button" className="account-reveal-button" onClick={() => setRevealed(current => !current)}><Icon name={revealed ? 'eyeOff' : 'eye'} size={16} /> {revealed ? 'Hide account details' : 'Reveal account details'}</button><Link to="/move-money" className="button button-primary account-panel-action" onClick={onClose}>Move money <Icon name="arrow" size={16} /></Link><p className="account-panel-note"><Icon name="lock" size={15} /> Numbers shown are illustrative and masked by default.</p></aside></div>
}

function Activity({ name, detail, amount, positive = false }: { name: string; detail: string; amount: string; positive?: boolean }) {
  return <div className="activity-row"><span><strong>{name}</strong><small>{detail}</small></span><b className={positive ? 'positive' : ''}>{amount}</b></div>
}

function SpendingRow({ name, value, percent }: { name: string; value: string; percent: string }) {
  return <div className="spending-row"><span><strong>{name}</strong><small>{value}</small></span><div><i style={{ width: percent }} /></div></div>
}

function OfferCard({ offer, onClick }: { offer: typeof nearbyOffers[number]; onClick: () => void }) {
  return <button type="button" className="offer-card offer-card-button" aria-label={`View ${offer.merchant} offer`} onClick={onClick}><span className="merchant-logo" style={{ background: offer.color }}>{offer.merchant[0]}</span><span className="offer-card-copy"><strong>{offer.merchant}</strong><small>{offer.category} · {offer.distance}</small><span className="offer-summary">{offer.headline} · Expires {offer.expiration}</span><span className="offer-terms">View demo offer and terms</span></span><Icon name="chevronRight" size={18} /></button>
}
