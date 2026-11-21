import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'

export function AccessibleFormError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null
  return <p id={id} className="form-error" role="alert">{children}</p>
}
type FieldProps = { label: string; error?: string; required?: boolean; hint?: string }
export function TextField({ label, error, required, hint, ...input }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId()
  const errorId = id + '-error'
  return <label className="form-field" htmlFor={id}>
    <span className="form-label">{label}{required && <span aria-hidden="true"> *</span>}</span>
    <input id={id} aria-invalid={!!error} aria-describedby={error ? errorId : undefined} required={required} {...input}/>
    {hint && !error && <span className="form-hint">{hint}</span>}
    <AccessibleFormError id={errorId}>{error}</AccessibleFormError>
  </label>
}
export function TextAreaField({ label, error, required, hint, ...input }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId()
  const errorId = id + '-error'
  return <label className="form-field" htmlFor={id}>
    <span className="form-label">{label}{required && <span aria-hidden="true"> *</span>}</span>
    <textarea id={id} aria-invalid={!!error} aria-describedby={error ? errorId : undefined} required={required} rows={4} {...input}/>
    {hint && !error && <span className="form-hint">{hint}</span>}
    <AccessibleFormError id={errorId}>{error}</AccessibleFormError>
  </label>
}
export function SelectField({ label, error, required, children, ...select }: FieldProps & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  const id = useId()
  const errorId = id + '-error'
  return <label className="form-field" htmlFor={id}>
    <span className="form-label">{label}{required && <span aria-hidden="true"> *</span>}</span>
    <select id={id} aria-invalid={!!error} aria-describedby={error ? errorId : undefined} required={required} {...select}>{children}</select>
    <AccessibleFormError id={errorId}>{error}</AccessibleFormError>
  </label>
}
export function CheckboxField({ label, error, checked, onChange }: { label: ReactNode; error?: string; checked: boolean; onChange: (checked: boolean) => void }) {
  const id = useId()
  const errorId = id + '-error'
  return <div className="form-field form-checkbox">
    <label htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} aria-invalid={!!error} aria-describedby={error ? errorId : undefined}
        onChange={event => onChange(event.target.checked)}/>
      <span>{label}</span>
    </label>
    <AccessibleFormError id={errorId}>{error}</AccessibleFormError>
  </div>
}
export function InternationalPhoneField({ label, countryCode, phone, onCountryCode, onPhone, error, required }: {
  label: string; countryCode: string; phone: string; onCountryCode: (value: string) => void; onPhone: (value: string) => void
  error?: string; required?: boolean
}) {
  const id = useId()
  const errorId = id + '-error'
  return <div className="form-field">
    <span className="form-label" id={id}>{label}{required && <span aria-hidden="true"> *</span>}</span>
    <div className="phone-field">
      <input aria-label="Country code" value={countryCode} onChange={event => onCountryCode(event.target.value)} className="phone-code" maxLength={4}/>
      <input aria-labelledby={id} value={phone} onChange={event => onPhone(event.target.value)} aria-invalid={!!error} aria-describedby={error ? errorId : undefined}
        type="tel" inputMode="tel" className="phone-number"/>
    </div>
    <AccessibleFormError id={errorId}>{error}</AccessibleFormError>
  </div>
}
