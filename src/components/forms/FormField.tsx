import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'

type FieldProps = { label: string; id: string; error?: string; hint?: string; optional?: boolean }

function FieldShell({ label, id, error, hint, optional, children }: FieldProps & { children: ReactNode }) {
  return <div className="field">
    <label htmlFor={id}>{label}{optional && <span className="optional"> (optional)</span>}</label>
    {children}
    {hint && <p id={`${id}-hint`} className="field-hint">{hint}</p>}
    {error && <p id={`${id}-error`} className="field-error">{error}</p>}
  </div>
}

export function FormField({ label, id, error, hint, optional, ...props }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return <FieldShell {...{ label, id, error, hint, optional }}>
    <input id={id} className="input" aria-invalid={error ? true : undefined} aria-describedby={[hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined} {...props} />
  </FieldShell>
}

export function SelectField({ label, id, error, hint, optional, children, ...props }: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return <FieldShell {...{ label, id, error, hint, optional }}>
    <select id={id} className="input" aria-invalid={error ? true : undefined} aria-describedby={[hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined} {...props}>{children}</select>
  </FieldShell>
}
