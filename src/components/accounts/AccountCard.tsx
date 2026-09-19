import type { Account } from '../../types/onboarding'
import { Icon } from '../common/Icon'

export function AccountCard({ account, selected, onToggle, onLearnMore, error }: { account: Account; selected: boolean; onToggle: () => void; onLearnMore: () => void; error?: string }) {
  return <article className={`account-card ${selected ? 'is-selected' : ''}`}>
    <p className="eyebrow">{account.category}</p>
    <h2>{account.name}</h2>
    <p className="account-description">{account.description}</p>
    <ul>{account.benefits.map(benefit => <li key={benefit}><Icon name="check" size={17} /><span>{benefit}</span></li>)}</ul>
    <label className="account-select" htmlFor={account.id}>
      <input id={account.id} type="checkbox" checked={selected} onChange={onToggle} aria-invalid={error ? true : undefined} aria-describedby={error ? 'accounts-error' : undefined} />
      <span>{selected ? 'Selected' : 'Select account'}<span className="sr-only">: {account.name}</span></span>
    </label>
    <button type="button" className="text-link" onClick={onLearnMore}>Learn more<span className="sr-only"> about {account.name}</span></button>
  </article>
}
