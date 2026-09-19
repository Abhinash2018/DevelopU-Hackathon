import type { ReactNode } from 'react'
import { Link } from 'react-router'
import ufcuLogo from '../../assets/ufcu-logo-oval.png'

export function MemberSetupShell({ children }: { children: ReactNode }) {
  return <div className="member-setup-shell">
    <header className="member-setup-header">
      <Link to="/" aria-label="UFCU sign in"><img src={ufcuLogo} alt="UFCU" /></Link>
      <span>Secure member setup</span>
    </header>
    <main className="member-setup-main">{children}</main>
    <footer className="member-setup-footer">UFCU will never ask for your password through an unsolicited message.</footer>
  </div>
}
