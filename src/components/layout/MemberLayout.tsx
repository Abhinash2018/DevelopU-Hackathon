import { useEffect, useState } from 'react'
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router'
import { Icon } from '../common/Icon'
import { useMember } from '../../context/MemberContext'
import ufcuLogo from '../../assets/ufcu-logo-oval.png'
import '../../member-interactions.css'

const navigation = [
  { to: '/dashboard', label: 'Overview', icon: 'grid' as const, end: true },
  { to: '/accounts', label: 'Accounts', icon: 'wallet' as const },
  { to: '/move-money', label: 'Move Money', icon: 'transfer' as const, launchSheet: true },
  { to: '/smart-switch', label: 'Smart Switch', icon: 'repeat' as const },
  { to: '/cards-wallet', label: 'Cards & Wallet', icon: 'card' as const },
  { to: '/financial-insights', label: 'Financial Insights', icon: 'chart' as const },
  { to: '/nearby-offers', label: 'Nearby Offers', icon: 'pin' as const },
  { to: '/learn-ai', label: 'Learn AI', icon: 'shield' as const },
]

function navClass(isActive: boolean) {
  return `member-nav-link ${isActive ? 'is-active' : ''}`
}

export function RequireMember() {
  const { signedIn } = useMember()
  const location = useLocation()
  return signedIn ? <Outlet /> : <Navigate to="/" replace state={{ from: location.pathname }} />
}

export function MemberLayout() {
  const { profile, signOut } = useMember()
  const location = useLocation()
  const navigate = useNavigate()
  const [depositOpen, setDepositOpen] = useState(location.pathname.startsWith('/direct-deposit'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moveMoneyOpen, setMoveMoneyOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [notifications, setNotifications] = useState([
    { title: 'Paycheck incoming', detail: 'Acme Corporation · Friday, Nov 29', icon: 'arrowDown' as const, unread: true },
    { title: 'Security reminder', detail: 'Review a new Learn AI safety topic', icon: 'shield' as const, unread: true },
    { title: 'New nearby offer', detail: 'An offer is available near your ZIP code', icon: 'pin' as const, unread: false },
  ])

  useEffect(() => {
    setDepositOpen(location.pathname.startsWith('/direct-deposit'))
    setMobileOpen(false)
    setSearchOpen(false)
    setNotificationsOpen(false)
    if (new URLSearchParams(location.search).get('sheet') === 'move-money') {
      setMoveMoneyOpen(true)
      navigate(location.pathname, { replace: true })
    }
  }, [location.pathname, location.search, navigate])

  if (!profile) return <Navigate to="/" replace />
  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase()

  function handleSignOut() {
    signOut()
    navigate('/', { replace: true })
  }

  function openMoveMoney() {
    setMoveMoneyOpen(true)
    setMobileOpen(false)
  }

  function closeMoveMoney() {
    setMoveMoneyOpen(false)
  }

  function markNotificationRead(index: number) {
    setNotifications(current => current.map((notification, notificationIndex) => notificationIndex === index ? { ...notification, unread: false } : notification))
  }

  const unreadNotifications = notifications.filter(notification => notification.unread).length
  const searchItems = [
    { label: 'Accounts', detail: 'Balances and transactions', to: '/accounts' },
    { label: 'Direct Deposit', detail: 'Employer and paycheck setup', to: '/direct-deposit' },
    { label: 'Learn AI', detail: 'Fraud and security answers', to: '/learn-ai' },
    { label: 'Profile', detail: 'Personal information and settings', to: '/profile' },
    { label: 'Smart Switch', detail: 'Recurring payment review', to: '/smart-switch' },
  ].filter(item => `${item.label} ${item.detail}`.toLowerCase().includes(searchTerm.toLowerCase()))

  return <div className="member-app-shell">
    <aside className={`member-sidebar ${mobileOpen ? 'is-open' : ''}`}>
      <div className="member-sidebar-top">
        <Link to="/dashboard" className="member-brand" aria-label="UFCU overview"><img src={ufcuLogo} alt="UFCU" /></Link>
        <button className="member-mobile-close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><Icon name="close" size={20} /></button>
      </div>
      <nav className="member-navigation" aria-label="Member navigation">
        {navigation.map(item => item.launchSheet ? <button key={item.to} type="button" className="member-nav-link" onClick={openMoveMoney}><Icon name={item.icon} size={19} /><span>{item.label}</span></button> : <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => navClass(isActive)}>
          <Icon name={item.icon} size={19} /><span>{item.label}</span>
        </NavLink>)}
        <button className={`member-nav-link member-nav-toggle ${depositOpen ? 'is-expanded' : ''}`} aria-expanded={depositOpen} onClick={() => { setDepositOpen(true); navigate('/direct-deposit') }}>
          <Icon name="building" size={19} /><span>Direct Deposit</span><Icon name="chevronDown" size={16} className="member-nav-chevron" />
        </button>
        {depositOpen && <div className="member-subnav">
          <NavLink to="/direct-deposit" end className={({ isActive }) => `member-subnav-link ${isActive ? 'is-active' : ''}`}>Overview</NavLink>
          <NavLink to="/direct-deposit?view=setup" className={({ isActive }) => `member-subnav-link ${isActive ? 'is-active' : ''}`}>Set up direct deposit</NavLink>
          <NavLink to="/direct-deposit?view=paycheck" className={({ isActive }) => `member-subnav-link ${isActive ? 'is-active' : ''}`}>Paycheck details</NavLink>
        </div>}
        <NavLink to="/profile" className={({ isActive }) => navClass(isActive)}><Icon name="user" size={19} /><span>Profile</span></NavLink>
      </nav>
      <div className="member-sidebar-footer">
        <Link to="/profile" className="member-profile-mini"><span className="member-avatar">{initials}</span><span><strong>{profile.firstName} {profile.lastName}</strong><small>Member profile</small></span><Icon name="chevronRight" size={16} /></Link>
        <button className="member-signout" onClick={handleSignOut}><Icon name="logout" size={17} />Sign out</button>
      </div>
    </aside>
    <div className="member-main-column">
      <header className="member-topbar">
        <button className="member-menu-button" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Icon name="menu" size={21} /></button>
        <div className="member-topbar-spacer" />
        <button className={`member-topbar-icon ${searchOpen ? 'is-active' : ''}`} aria-label="Search" aria-expanded={searchOpen} onClick={() => { setSearchOpen(current => !current); setNotificationsOpen(false) }}><Icon name="search" size={19} /></button>
        <button className={`member-topbar-icon member-notification ${notificationsOpen ? 'is-active' : ''}`} aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen(current => !current); setSearchOpen(false) }}><Icon name="bell" size={19} />{unreadNotifications > 0 && <span aria-label={`${unreadNotifications} unread notifications`} />}</button>
        <Link to="/profile" className="member-avatar member-avatar-top" aria-label="Open profile">{initials}</Link>
      </header>
      {searchOpen && <SearchPanel items={searchItems} term={searchTerm} onChange={setSearchTerm} onClose={() => setSearchOpen(false)} />}
      {notificationsOpen && <NotificationPanel notifications={notifications} unreadCount={unreadNotifications} onMarkRead={markNotificationRead} onMarkAllRead={() => setNotifications(current => current.map(notification => ({ ...notification, unread: false })))} />}
      <main className="member-main"><Outlet /></main>
    </div>
    {moveMoneyOpen && <MoveMoneySheet onClose={closeMoveMoney} onNavigate={path => { closeMoveMoney(); navigate(path) }} />}
  </div>
}

type SearchItem = { label: string; detail: string; to: string }

function SearchPanel({ items, term, onChange, onClose }: { items: SearchItem[]; term: string; onChange: (value: string) => void; onClose: () => void }) {
  return <section className="member-search-panel" aria-label="Search member features"><div className="member-search-heading"><div><p className="member-eyebrow">MEMBER SEARCH</p><h2>Find a feature</h2></div><button type="button" className="member-topbar-icon" aria-label="Close search" onClick={onClose}><Icon name="close" size={18} /></button></div><input className="member-input" value={term} onChange={event => onChange(event.target.value)} placeholder="Search accounts, Learn AI, profile…" autoFocus />{items.length ? <div className="member-search-results">{items.map(item => <Link key={item.to} to={item.to} onClick={onClose}><span><strong>{item.label}</strong><small>{item.detail}</small></span><Icon name="chevronRight" size={17} /></Link>)}</div> : <p className="member-search-empty">No member feature matched that search.</p>}</section>
}

type Notification = { title: string; detail: string; icon: 'arrowDown' | 'shield' | 'pin'; unread: boolean }

function NotificationPanel({ notifications, unreadCount, onMarkRead, onMarkAllRead }: { notifications: Notification[]; unreadCount: number; onMarkRead: (index: number) => void; onMarkAllRead: () => void }) {
  return <section className="member-notification-panel" aria-label="Notifications"><div className="member-notification-heading"><div><p className="member-eyebrow">ACCOUNT UPDATES</p><h2>Notifications</h2></div><button type="button" className="member-text-button" disabled={!unreadCount} onClick={onMarkAllRead}>Mark all read</button></div><div className="member-notification-list">{notifications.map((notification, index) => <button type="button" className={`member-notification-row ${notification.unread ? 'is-unread' : ''}`} key={notification.title} onClick={() => onMarkRead(index)}><span className="member-notification-icon"><Icon name={notification.icon} size={17} /></span><span><strong>{notification.title}</strong><small>{notification.detail}</small></span>{notification.unread && <i aria-label="Unread" />}</button>)}</div></section>
}

function MoveMoneySheet({ onClose, onNavigate }: { onClose: () => void; onNavigate: (path: string) => void }) {
  return <div className="member-sheet-backdrop" role="presentation" onMouseDown={onClose}><section className="member-bottom-sheet" role="dialog" aria-modal="true" aria-labelledby="move-money-sheet-title" onMouseDown={event => event.stopPropagation()}><div className="member-sheet-handle" /><div className="member-sheet-heading"><div><p className="member-eyebrow">MOVE MONEY</p><h2 id="move-money-sheet-title">What would you like to do?</h2></div><button type="button" className="member-topbar-icon" aria-label="Close Move Money" onClick={onClose}><Icon name="close" size={18} /></button></div><div className="member-sheet-grid"><SheetAction icon="transfer" label="Transfer" detail="Move money between UFCU accounts" onClick={() => onNavigate('/move-money')} /><SheetAction icon="arrow" label="Send money" detail="Prepare a reviewed payment" onClick={() => onNavigate('/move-money')} /><SheetAction icon="arrowDown" label="Receive money" detail="View incoming money options" onClick={() => onNavigate('/move-money')} /><SheetAction icon="building" label="Direct Deposit" detail="Set up employer payroll" onClick={() => onNavigate('/direct-deposit?view=setup')} /></div><p className="member-sheet-note"><Icon name="lock" size={15} /> Nothing moves automatically from this menu.</p></section></div>
}

function SheetAction({ icon, label, detail, onClick }: { icon: 'transfer' | 'arrow' | 'arrowDown' | 'building'; label: string; detail: string; onClick: () => void }) {
  return <button type="button" className="member-sheet-action" onClick={onClick}><span><Icon name={icon} size={19} /></span><strong>{label}</strong><small>{detail}</small><Icon name="chevronRight" size={16} /></button>
}
