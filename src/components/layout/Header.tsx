import { Link } from 'react-router'

export function Header() {
  return <header className="site-header">
    <div className="header-inner">
      <Link to="/" className="brand" aria-label="UFCU prototype home"><span className="brand-mark" aria-hidden="true">U</span><span>UFCU<span className="brand-caption">UNIVERSITY FEDERAL CREDIT UNION</span></span></Link>
      <div className="header-label"><span>Open an account</span><span className="prototype-badge">PROTOTYPE</span></div>
    </div>
  </header>
}
