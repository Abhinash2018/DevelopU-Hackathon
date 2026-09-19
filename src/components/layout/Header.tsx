import { Link } from 'react-router'
import ufcuLogo from '../../assets/ufcu-logo-oval.png'

export function Header() {
  return <header className="site-header">
    <div className="header-inner">
      <Link to="/" className="brand" aria-label="UFCU prototype home"><img className="brand-logo" src={ufcuLogo} alt="UFCU" /></Link>
      <div className="header-label"><span>Open an account</span><span className="prototype-badge">PROTOTYPE</span></div>
    </div>
  </header>
}
