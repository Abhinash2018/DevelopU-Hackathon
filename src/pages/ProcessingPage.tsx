import { useEffect, useState } from 'react'
import { useOnboarding } from '../context/OnboardingContext'
import { Icon } from '../components/common/Icon'
import { PROCESSING_DURATION_MS, securityTips, TIP_INTERVAL_MS } from '../data/securityTips'

export function ProcessingPage() {
  const { complete } = useOnboarding()
  const [tipIndex, setTipIndex] = useState(0)
  useEffect(() => {
    const tips = window.setInterval(() => setTipIndex(index => (index + 1) % securityTips.length), TIP_INTERVAL_MS)
    const finish = window.setTimeout(complete, PROCESSING_DURATION_MS)
    return () => { window.clearInterval(tips); window.clearTimeout(finish) }
  }, [complete])

  return <div className="processing-page">
    <div className="loading-ring" aria-hidden="true"><Icon name="bank" size={32} /></div>
    <p className="eyebrow">YOUR NEXT CHAPTER IS ALMOST HERE</p>
    <h1>Creating your UFCU account...</h1>
    <p role="status">We’re putting the finishing touches on your new account.</p>
    <div className="security-tip"><span className="feature-icon"><Icon name="shield" size={25} /></span><p className="eyebrow">A MOMENT FOR YOUR SECURITY</p><p className="tip-text" aria-live="polite" aria-atomic="true">{securityTips[tipIndex]}</p><div className="tip-dots" aria-hidden="true">{securityTips.map((_, index) => <span key={index} className={index === tipIndex ? 'active' : ''} />)}</div></div>
    <p className="fine-print">This takes about six seconds. Please keep this window open.</p>
  </div>
}
