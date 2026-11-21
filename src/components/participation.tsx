import { useId, useState } from 'react'
import { Icon } from './ui'

export function RegistrationStepper({ steps, current }: { steps: string[]; current: number }) {
  return <ol className="registration-stepper" aria-label={steps[current]}>
    {steps.map((step, i) => <li key={step} className={i === current ? 'is-current' : i < current ? 'is-done' : ''} aria-current={i === current ? 'step' : undefined}>
      <span className="registration-stepper-dot">{i < current ? '✓' : i + 1}</span>
      <span className="registration-stepper-label">{step}</span>
    </li>)}
  </ol>
}
export function ParticipationTypeCard({ label, description, selected, onSelect }: { label: string; description?: string; selected: boolean; onSelect: () => void }) {
  return <button type="button" className={'participation-type-card' + (selected ? ' is-selected' : '')} aria-pressed={selected} onClick={onSelect}>
    <span className="participation-type-radio" aria-hidden="true"/>
    <span><strong>{label}</strong>{description && <small>{description}</small>}</span>
  </button>
}
export function StatusBadge({ status, label }: { status: 'upcoming' | 'completed' | 'cancelled' | 'pending'; label: string }) {
  const cls = status === 'pending' ? 'status-upcoming' : 'status-' + status
  return <span className={'status-badge ' + cls}>{label}</span>
}
export function IntegrationPendingNotice({ title, body, cta, ctaHref }: { title: string; body: string; cta?: string; ctaHref?: string }) {
  return <div className="integration-pending" role="status">
    <Icon name="external" size={20}/>
    <h3>{title}</h3>
    <p>{body}</p>
    {cta && ctaHref && <a className="text-link" href={ctaHref}>{cta}<Icon name="external" size={14}/></a>}
  </div>
}
export function DonationAmountSelector({ presets, value, onSelect, customLabel, currencyNote }: {
  presets: number[]; value: number | 'custom'; onSelect: (value: number | 'custom') => void; customLabel: string; currencyNote: string
}) {
  const [custom, setCustom] = useState('')
  const id = useId()
  return <div className="donation-selector">
    <div className="donation-amounts" role="group" aria-label={customLabel}>
      {presets.map(amount => <button key={amount} type="button" className={'donation-amount' + (value === amount ? ' is-selected' : '')} aria-pressed={value === amount} onClick={() => onSelect(amount)}>₹{amount.toLocaleString('en-IN')}</button>)}
    </div>
    <label className="form-field" htmlFor={id}>
      <span className="form-label">{customLabel}</span>
      <input id={id} type="number" min={1} inputMode="numeric" value={custom}
        onFocus={() => onSelect('custom')}
        onChange={event => { setCustom(event.target.value); onSelect('custom') }} placeholder="₹"/>
    </label>
    <p className="form-hint">{currencyNote}</p>
  </div>
}
export function DigitalPassPreview({ sampleLabel, name, eventLabel, dateLabel, reference }: {
  sampleLabel: string; name: string; eventLabel: string; dateLabel: string; reference: string
}) {
  return <div className="digital-pass" aria-label={sampleLabel} role="img">
    <span className="digital-pass-sample">{sampleLabel}</span>
    <div className="digital-pass-body">
      <div className="digital-pass-info">
        <strong>{name}</strong>
        <span>{eventLabel}</span>
        <span>{dateLabel}</span>
        <code>{reference}</code>
      </div>
      <div className="digital-pass-qr" aria-hidden="true">
        <svg viewBox="0 0 10 10" width="88" height="88"><rect width="10" height="10" fill="#f7f1e5"/>
          {[0,2,4,6,8].flatMap(x => [0,2,4,6,8].map(y => (x + y) % 3 === 0 ? <rect key={x + '-' + y} x={x} y={y} width="2" height="2" fill="#18272d"/> : null))}
        </svg>
        <span className="digital-pass-qr-watermark">SAMPLE</span>
      </div>
    </div>
  </div>
}
