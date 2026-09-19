import { Link } from 'react-router'
import ufcuLogo from '../../assets/ufcu-logo-oval.png'

export function Header() {
  return <header className="site-header">
    <div className="header-inner">
      <Link to="/" className="brand" aria-label="UFCU home"><img className="brand-logo" src={ufcuLogo} alt="UFCU" /></Link>
      <div className="header-label"><strong>Open an account</strong><small>PERSONAL BANKING</small></div>
    </div>
  </header>
}
