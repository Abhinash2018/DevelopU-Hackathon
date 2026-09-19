import { Link } from 'react-router'
import { Icon } from '../components/common/Icon'
import { useMember } from '../context/MemberContext'

const payments = [
  { name: 'Paycheck', detail: 'Acme Corporation · Bi-weekly', date: 'Nov 29', amount: '+$1,842.50', tone: 'income', status: 'Incoming', icon: 'arrowDown' as const },
  { name: 'Netflix', detail: 'Monthly subscription', date: 'Nov 30', amount: '-$15.49', tone: 'payment', status: 'Review needed', icon: 'repeat' as const },
  { name: 'Spotify', detail: 'Monthly subscription', date: 'Dec 1', amount: '-$11.99', tone: 'payment', status: 'Moved to UFCU', icon: 'repeat' as const },
  { name: 'Phone bill', detail: 'Monthly payment', date: 'Dec 3', amount: '-$65.00', tone: 'payment', status: 'Review needed', icon: 'card' as const },
  { name: 'Rent', detail: 'Monthly payment', date: 'Dec 1', amount: '-$1,200.00', tone: 'payment', status: 'Manual action', icon: 'building' as const },
  { name: 'Austin Energy', detail: 'Variable payment', date: 'Dec 5', amount: '-$89.00', tone: 'payment', status: 'Review needed', icon: 'transfer' as const },
]

const activity = [
  ['H-E-B Grocery', 'Nov 25 · Food', '$48.32'],
  ['Acme Corporation', 'Nov 22 · Income', '+$1,842.50'],
  ["Torchy's Tacos", 'Nov 21 · Food', '$14.90'],
  ['Shell Gas', 'Nov 20 · Transport', '$41.00'],
  ['Amazon', 'Nov 19 · Shopping', '$32.18'],
]

const quickActions = [
  { to: '/dashboard?sheet=move-money', label: 'Move Money', icon: 'transfer' as const },
  { to: '/smart-switch', label: 'Smart Switch', icon: 'repeat' as const },
  { to: '/direct-deposit', label: 'Direct Deposit', icon: 'building' as const },
  { to: '/cards-wallet', label: 'Add to Wallet', icon: 'wallet' as const },
  { to: '/financial-insights', label: 'Financial Insights', icon: 'chart' as const },
  { to: '/nearby-offers', label: 'Nearby Offers', icon: 'pin' as const },
  { to: '/learn-ai', label: 'Learn AI', icon: 'shield' as const },
]

export function DashboardPage() {
  const { profile } = useMember()
  const firstName = profile?.firstName || 'Member'
  return <div className="dashboard-page">
    <div className="dashboard-heading">
      <div><p className="member-eyebrow">MEMBER OVERVIEW</p><h1>Good morning, {firstName}.</h1><p>Here are your next best steps for a clear financial journey.</p></div>
      <Link to="/profile" className="dashboard-profile-link"><span className="member-avatar">{profile ? `${profile.firstName[0]}${profile.lastName[0]}` : 'M'}</span><span>View profile</span><Icon name="chevronRight" size={16} /></Link>
    </div>

    <section className="summary-grid" aria-label="Account summary">
      <Link to="/accounts?account=checking" className="summary-card summary-card-primary"><span className="summary-label">TOTAL BALANCE</span><strong>$4,286.74</strong><span className="summary-meta"><Icon name="checkCircle" size={15} /> Available across your accounts</span></Link>
      <Link to="/accounts?account=checking" className="summary-card"><span className="summary-label">CHECKING</span><strong>$2,931.20</strong><span className="summary-meta">Everyday Checking · ••4821</span></Link>
      <Link to="/accounts?account=savings" className="summary-card"><span className="summary-label">SAVINGS</span><strong>$1,355.54</strong><span className="summary-meta">Savings · ••1904</span></Link>
      <article className="summary-card summary-card-accent"><span className="summary-label">NEXT PAYCHECK</span><strong>$1,842.50</strong><span className="summary-meta"><Icon name="clock" size={15} /> Friday, Nov 29</span></article>
    </section>

    <section className="quick-actions-section"><div className="section-heading"><div><p className="member-eyebrow">QUICK ACTIONS</p><h2>Keep moving forward</h2></div></div><div className="quick-actions-grid">{quickActions.map(action => <Link to={action.to} className="quick-action" key={action.to}><span className="quick-action-icon"><Icon name={action.icon} size={20} /></span><span>{action.label}</span><Icon name="chevronRight" size={16} /></Link>)}</div></section>

    <div className="dashboard-content-grid">
      <section className="dashboard-panel upcoming-panel" aria-labelledby="upcoming-title"><div className="panel-heading"><div><p className="member-eyebrow">YOUR FINANCIAL JOURNEY</p><h2 id="upcoming-title">Upcoming payments</h2></div><Link to="/financial-insights" className="panel-link">Manage all <Icon name="arrow" size={15} /></Link></div><div className="payment-list">{payments.map(payment => <div className="payment-row" key={payment.name}><span className={`payment-icon payment-icon-${payment.tone}`}><Icon name={payment.icon} size={18} /></span><span className="payment-copy"><strong>{payment.name}</strong><small>{payment.date} · {payment.detail}</small></span><span className={`payment-amount ${payment.tone}`}>{payment.amount}<small className={`payment-status status-${payment.status.toLowerCase().replaceAll(' ', '-')}`}>{payment.status}</small></span></div>)}</div></section>
      <div className="dashboard-side-column">
        <section className="dashboard-panel progress-panel" aria-labelledby="progress-title"><div className="panel-heading"><div><p className="member-eyebrow">SETUP PROGRESS</p><h2 id="progress-title">Your next steps</h2></div><strong className="progress-percent">80%</strong></div><div className="member-progress-bar"><span style={{ width: '80%' }} /></div><ul className="setup-list"><li><Icon name="checkCircle" size={17} /> Account opened</li><li><Icon name="checkCircle" size={17} /> Digital card issued</li><li><Icon name="checkCircle" size={17} /> Direct deposit submitted</li><li><Icon name="checkCircle" size={17} /> Smart Switch started</li><li className="setup-pending"><span className="setup-pending-dot" /> Apple Wallet connected</li></ul><Link to="/cards-wallet" className="panel-link">Finish setup <Icon name="arrow" size={15} /></Link></section>
        <section className="dashboard-panel activity-panel" aria-labelledby="activity-title"><div className="panel-heading"><div><p className="member-eyebrow">RECENT ACTIVITY</p><h2 id="activity-title">Latest transactions</h2></div><Link to="/accounts" aria-label="View all transactions"><Icon name="chevronRight" size={18} /></Link></div><div className="activity-list">{activity.map(([name, detail, amount]) => <div className="activity-row" key={name}><span><strong>{name}</strong><small>{detail}</small></span><b className={amount.startsWith('+') ? 'positive' : ''}>{amount}</b></div>)}</div></section>
      </div>
    </div>

    <section className="dashboard-bottom-grid"><article className="security-card"><span className="security-card-icon"><Icon name="shield" size={23} /></span><div><p className="member-eyebrow">LEARN AI</p><h2>Know what to look for before you click.</h2><p>Ask questions about phishing, impersonation scams, account protection, and safer banking habits.</p><Link to="/learn-ai" className="panel-link">Ask a security question <Icon name="arrow" size={15} /></Link></div></article><article className="insight-card"><div><p className="member-eyebrow">CASH FLOW</p><h2>Money in is ahead of money out.</h2><p>Review your spending and recurring commitments to keep your next steps clear.</p></div><div className="mini-bars" aria-label="Illustrative cash flow trend"><span style={{ height: '35%' }} /><span style={{ height: '58%' }} /><span style={{ height: '46%' }} /><span style={{ height: '78%' }} /><span style={{ height: '64%' }} /><span style={{ height: '88%' }} /></div><Link to="/financial-insights" className="panel-link">View insights <Icon name="arrow" size={15} /></Link></article></section>
  </div>
}
