import type { ReactNode } from 'react'

export function RadioCard({ id, label, description, checked, onChange, children, error }: { id: string; label: string; description: string; checked: boolean; onChange: () => void; children: ReactNode; error?: string }) {
  return <label className={`radio-card ${checked ? 'is-selected' : ''}`} htmlFor={`funding-${id}`}>
    <span className="option-icon">{children}</span>
    <span className="flex-1"><strong>{label}</strong><span className="option-description">{description}</span></span>
    <input type="radio" name="funding-method" id={`funding-${id}`} checked={checked} onChange={onChange} aria-invalid={error ? true : undefined} aria-describedby={error ? 'funding-method-error' : undefined} />
  </label>
}
