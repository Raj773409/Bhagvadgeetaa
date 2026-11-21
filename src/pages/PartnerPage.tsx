import { useState, type FormEvent } from 'react'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { CheckboxField, SelectField, TextAreaField, TextField } from '../components/forms'
import { CountrySelector } from '../components/CountrySelector'
import { IntegrationPendingNotice } from '../components/participation'
import { emptyPartnerApplication } from '../data/participation'
import { isRequired, isValidEmail, isValidPhone } from '../utils/validation'
import { useDocumentMeta } from '../utils/seo'

export default function PartnerPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.partner
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  const [form, setForm] = useState(emptyPartnerApplication)
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const set = <K extends keyof typeof form>(key: K, value: typeof form[K]) => setForm(f => ({ ...f, [key]: value }))

  const vt = t.pages.register
  function submit(event: FormEvent) {
    event.preventDefault()
    const next: typeof errors = {}
    if (!isRequired(form.orgName)) next.orgName = vt.errorRequired
    if (!isRequired(form.contactPerson)) next.contactPerson = vt.errorRequired
    if (!isValidEmail(form.email)) next.email = vt.errorEmail
    if (!isValidPhone(form.phone)) next.phone = vt.errorPhone
    if (!isRequired(form.country)) next.country = vt.errorRequired
    if (!isRequired(form.interest)) next.interest = vt.errorRequired
    if (!form.consent) next.consent = vt.errorConsent
    setErrors(next)
    if (Object.keys(next).length === 0) setSubmitted(true)
  }

  return <>
    <InnerPageHero lang={lang} eyebrow={p.eyebrow} heading={p.heading} breadcrumb={[{ label: p.heading }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={p.eyebrow} heading={p.heading} lede={p.intro} align="center"/>
      {submitted
        ? <IntegrationPendingNotice title={p.pendingTitle} body={p.pendingBody}/>
        : <form className="registration-form" onSubmit={submit}>
          <div className="form-grid">
            <TextField label={p.orgName} required value={form.orgName} error={errors.orgName} onChange={e => set('orgName', e.target.value)}/>
            <TextField label={p.contactPerson} required value={form.contactPerson} error={errors.contactPerson} onChange={e => set('contactPerson', e.target.value)}/>
            <TextField label={p.email} required type="email" value={form.email} error={errors.email} onChange={e => set('email', e.target.value)}/>
            <TextField label={p.phone} required type="tel" value={form.phone} error={errors.phone} onChange={e => set('phone', e.target.value)}/>
            <CountrySelector label={p.country} required lang={lang} value={form.country} onChange={v => set('country', v)} error={errors.country}/>
            <SelectField label={p.interestLabel} required value={form.interest} error={errors.interest} onChange={e => set('interest', e.target.value)}>
              <option value="" disabled>—</option>
              {p.interestOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </SelectField>
          </div>
          <TextAreaField label={p.messageLabel} placeholder={p.messagePlaceholder} value={form.message} onChange={e => set('message', e.target.value)}/>
          <CheckboxField label={p.consentLabel} checked={form.consent} error={errors.consent} onChange={v => set('consent', v)}/>
          <div className="flex justify-center"><button type="submit" className="action action-gold">{p.submitCta}</button></div>
        </form>}
    </EditorialSection>
  </>
}
