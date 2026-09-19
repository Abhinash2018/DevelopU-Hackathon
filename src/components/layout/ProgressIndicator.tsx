import { steps } from '../../data/steps'
import { Icon } from '../common/Icon'

export function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return <aside className="progress-sidebar" aria-label="Application progress">
    <p className="eyebrow">YOUR MEMBERSHIP JOURNEY</p>
    <ol className="step-list">
      {steps.map((step, index) => <li key={step.path} aria-current={index === currentStep ? 'step' : undefined} className={index < currentStep ? 'step-done' : index === currentStep ? 'step-current' : ''}>
        <span className="step-number">{index < currentStep ? <Icon name="check" size={14} /> : String(index + 1).padStart(2, '0')}</span>
        <span>{step.label}</span>
      </li>)}
    </ol>
    <div className="sidebar-note"><Icon name="shield" size={23} /><p>A practice run, just for you.<br /><span>Your information stays in this tab and clears on refresh.</span></p></div>
  </aside>
}
