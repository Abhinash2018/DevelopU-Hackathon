import type { ReactNode } from 'react'

export function CheckboxField({ id, checked, onChange, children, error }: { id: string; checked: boolean; onChange: (checked: boolean) => void; children: ReactNode; error?: string }) {
  return <div>
    <label className="checkbox-field" htmlFor={id}>
      <input type="checkbox" id={id} checked={checked} onChange={event => onChange(event.target.checked)} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} />
      <span>{children}</span>
    </label>
    {error && <p id={`${id}-error`} className="field-error">{error}</p>}
  </div>
}
