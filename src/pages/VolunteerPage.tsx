import { useState, type FormEvent } from 'react'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { CheckboxField, SelectField, TextAreaField, TextField } from '../components/forms'
import { CountrySelector } from '../components/CountrySelector'
import { IntegrationPendingNotice } from '../components/participation'
import { emptyVolunteerApplication } from '../data/participation'
import { isRequired, isValidEmail, isValidPhone } from '../utils/validation'
import { useDocumentMeta } from '../utils/seo'

export default function VolunteerPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const v = t.pages.volunteer
  const vt = t.pages.register
  useDocumentMeta(v.heading + ' · ' + t.title.join(' '), v.intro)
  const [form, setForm] = useState(emptyVolunteerApplication)
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const set = <K extends keyof typeof form>(key: K, value: typeof form[K]) => setForm(f => ({ ...f, [key]: value }))

  function submit(event: FormEvent) {
    event.preventDefault()
    const next: typeof errors = {}
    if (!isRequired(form.name)) next.name = vt.errorRequired
    if (!isValidEmail(form.email)) next.email = vt.errorEmail
    if (!isValidPhone(form.phone)) next.phone = vt.errorPhone
    if (!isRequired(form.country)) next.country = vt.errorRequired
    if (!isRequired(form.availability)) next.availability = vt.errorRequired
    if (!isRequired(form.preferredFunction)) next.preferredFunction = vt.errorRequired
    if (!form.consent) next.consent = vt.errorConsent
    setErrors(next)
    if (Object.keys(next).length === 0) setSubmitted(true)
  }

  return <>
    <InnerPageHero lang={lang} eyebrow={v.eyebrow} heading={v.heading} breadcrumb={[{ label: v.heading }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={v.eyebrow} heading={v.heading} lede={v.intro} align="center"/>
      {submitted
        ? <IntegrationPendingNotice title={v.pendingTitle} body={v.pendingBody}/>
        : <form className="registration-form" onSubmit={submit}>
          <div className="form-grid">
            <TextField label={v.name} required value={form.name} error={errors.name} onChange={e => set('name', e.target.value)}/>
            <TextField label={v.email} required type="email" value={form.email} error={errors.email} onChange={e => set('email', e.target.value)}/>
            <TextField label={v.phone} required type="tel" value={form.phone} error={errors.phone} onChange={e => set('phone', e.target.value)}/>
            <CountrySelector label={v.country} required lang={lang} value={form.country} onChange={val => set('country', val)} error={errors.country}/>
            <TextField label={v.availabilityLabel} required value={form.availability} error={errors.availability} onChange={e => set('availability', e.target.value)}/>
            <SelectField label={v.functionLabel} required value={form.preferredFunction} error={errors.preferredFunction} onChange={e => set('preferredFunction', e.target.value)}>
              <option value="" disabled>—</option>
              {v.functionOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </SelectField>
          </div>
          <TextAreaField label={v.skillsLabel} placeholder={v.skillsPlaceholder} value={form.skills} onChange={e => set('skills', e.target.value)}/>
          <CheckboxField label={v.consentLabel} checked={form.consent} error={errors.consent} onChange={val => set('consent', val)}/>
          <div className="flex justify-center"><button type="submit" className="action action-gold">{v.submitCta}</button></div>
        </form>}
    </EditorialSection>
  </>
}
