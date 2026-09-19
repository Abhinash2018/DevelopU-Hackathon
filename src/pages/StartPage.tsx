import { useNavigate } from 'react-router'
import { Button } from '../components/common/Button'
import { Icon } from '../components/common/Icon'
import { useOnboarding } from '../context/OnboardingContext'

export function StartPage() {
  const navigate = useNavigate()
  const { data } = useOnboarding()
  const started = Boolean(data.personalInfo.firstName || data.personalInfo.lastName)
  return <>
    <div className="welcome-intro">
      <p className="eyebrow">MORE THAN AN ACCOUNT. A MEMBERSHIP.</p>
      <h1>Good things start<br />with <span>membership.</span></h1>
      <p>Let’s take the first step together. Find an account that fits your everyday life and explore what comes next.</p>
    </div>
    <div className="welcome-details">
      <div className="welcome-detail"><span className="feature-icon"><Icon name="document" size={24} /></span><h2>A few simple steps</h2><p>Tell us about yourself, choose your accounts, and review your application.</p></div>
      <div className="welcome-detail"><span className="feature-icon"><Icon name="heart" size={24} /></span><h2>Go at your own pace</h2><p>Move back to make changes. Your answers stay with you along the way.</p></div>
    </div>
    <div className="demo-notice"><Icon name="info" size={22} /><div><strong>A little practice before the real thing.</strong><p>This is a simulated application. Use made-up contact and address information. No account will be opened and no money will move.</p></div></div>
    <div className="welcome-actions"><Button onClick={() => navigate('/apply/personal')}>{started ? 'Continue application' : 'Let’s get started'}<Icon name="arrow" size={18} /></Button><span><Icon name="clock" size={16} /> A few minutes to explore</span></div>
  </>
}
