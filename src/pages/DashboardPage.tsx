import { useState } from 'react'
import { Link } from 'react-router'
import ufcuLogo from '../assets/ufcu-logo-oval.png'

const navigation = ['Overview', 'Accounts', 'Move Money', 'Smart Switch', 'Direct Deposit', 'Cards & Wallet', 'Financial Insights', 'Nearby Offers', 'Goals', 'Learn', 'Profile']
const actions = ['Move Money', 'Smart Switch', 'Direct Deposit', 'Apple Wallet', 'Insights', 'Nearby Offers', 'Ask TrustNav']
const payments = [
  ['Paycheck — Acme Corp', 'Nov 29 · Bi-weekly', '+$1,842.50', 'Incoming'],
  ['Netflix', 'Nov 30 · Monthly', '-$15.99', 'Review needed'],
  ['Spotify', 'Dec 1 · Monthly', '-$10.99', 'Moved to UFCU'],
  ['Phone Bill — AT&T', 'Dec 3 · Monthly', '-$65.00', 'Review needed'],
  ['Rent', 'Dec 1 · Monthly', '-$1,250.00', 'Manual required'],
  ['Austin Energy', 'Dec 5 · Monthly', '-$89.00', 'Review needed'],
  ['Planet Fitness', 'Dec 7 · Monthly', '-$30.00', 'Review needed'],
]
const activity = [['HEB Grocery', 'Nov 25 · Food', '$48.32'], ['Acme Corp', 'Nov 22 · Income', '+$1842.50'], ["Torchy’s Tacos", 'Nov 21 · Food', '$14.90'], ['Shell Gas', 'Nov 20 · Transport', '$41.00'], ['Amazon', 'Nov 19 · Shopping', '$32.99']]

function Glyph({ children }: { children: string }) { return <span className="dash-glyph" aria-hidden="true">{children}</span> }

export function DashboardPage() {
  const [active, setActive] = useState('Overview')
  const [notice, setNotice] = useState('')
  return <div className="dashboard-shell">
    <aside className="dashboard-sidebar">
      <Link to="/" className="dashboard-logo"><img src={ufcuLogo} alt="UFCU" /></Link>
      <nav aria-label="Dashboard navigation">{navigation.map((item, index) => <button key={item} className={active === item ? 'dashboard-nav active' : 'dashboard-nav'} onClick={() => setActive(item)}><Glyph>{['▦', '▣', '↔', '⟳', '▥', '▭', '⌁', '⌖', '◎', '▯', '♙'][index]}</Glyph>{item}</button>)}</nav>
      <button className="member-card" onClick={() => setActive('Profile')}><span>AP</span><strong>Ayush Patel<small>Member #00124</small></strong><b>›</b></button>
    </aside>
    <main className="dashboard-main">
      <header className="dashboard-topbar"><div><span>Good morning,</span><strong>Ayush Patel</strong></div><div className="topbar-tools"><button aria-label="Search">⌕</button><button aria-label="Notifications">♧<i /></button><button className="avatar" aria-label="Profile">AP</button></div></header>
      <div className="dashboard-content">
        <section className="dashboard-welcome"><h1>Good morning, Ayush.</h1><p>Here are your next best steps.</p></section>
        <section className="metric-grid" aria-label="Account overview">
          <Metric label="Total Balance" value="$8,214.53" note="↗ +2.4%" accent /><Metric label="Checking" value="$3,842.10" note="Everyday Checking •• 4821" /><Metric label="Savings" value="$4,372.43" note="Smart Savings •• 6104" />
          <Metric label="Safe to Spend" value="$1,240.00" note="After bills & goals" /><Metric label="Next Paycheck" value="$1,842.50" note="Expected Nov 29" /><div className="metric-card journey"><span>Journey</span><strong>74%</strong><small>4 of 5 steps done</small><div><i /></div></div>
        </section>
        <section className="quick-actions"><h2>Quick actions</h2><div>{actions.map((action, index) => <button key={action} onClick={() => setNotice(`${action} is ready for your dashboard flow.`)}><span>{['↗', '⟳', '▥', '▭', '⌁', '⌖', '◯'][index]}</span>{action}</button>)}</div></section>
        {notice && <p className="dashboard-notice" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss message">×</button></p>}
        <section className="dashboard-lower"><div className="upcoming panel"><div className="panel-heading"><h2>Upcoming payments</h2><button onClick={() => setNotice('Payment management opened.')}>Manage all</button></div>{payments.map((payment, index) => <div className="payment-row" key={payment[0]}><span className={index === 0 ? 'payment-icon incoming' : 'payment-icon'}>{index === 0 ? '↙' : '▭'}</span><div><strong>{payment[0]}</strong><small>{payment[1]}</small></div><div className={index === 0 ? 'payment-value positive' : 'payment-value'}><strong>{payment[2]}</strong><span className={payment[3] === 'Moved to UFCU' || payment[3] === 'Incoming' ? 'good' : 'warning'}>{payment[3]}</span></div></div>)}</div>
          <div className="side-panels"><section className="panel setup"><h2>Setup progress</h2>{['Account opened', 'Digital card issued', 'Direct deposit submitted', 'Smart Switch started', 'Apple Wallet connected'].map((item, index) => <p key={item} className={index === 4 ? 'incomplete' : ''}><span>{index === 4 ? '•' : '✓'}</span>{item}</p>)}</section><section className="panel recent"><div className="panel-heading"><h2>Recent activity</h2><button aria-label="View recent activity">›</button></div>{activity.map((item, index) => <div key={item[0]}><p><strong>{item[0]}</strong><small>{item[1]}</small></p><b className={index === 1 ? 'positive' : ''}>{item[2]}</b></div>)}</section></div>
        </section>
        <aside className="security-banner">♢ <span>UFCU will never ask for your password or full account number by phone or email. Call <strong>(800) 555-UFCU</strong> if you receive a suspicious request.</span></aside>
      </div>
    </main>
  </div>
}

function Metric({ label, value, note, accent = false }: { label: string; value: string; note: string; accent?: boolean }) { return <div className="metric-card"><span>{label}</span><strong>{value}</strong><small className={accent ? 'positive' : ''}>{note}</small></div> }
