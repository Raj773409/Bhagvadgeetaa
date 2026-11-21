import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { content, languageNames, languages } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { CheckboxField, InternationalPhoneField, SelectField, TextAreaField, TextField } from '../components/forms'
import { CountrySelector } from '../components/CountrySelector'
import { ParticipationTypeCard, RegistrationStepper } from '../components/participation'
import { PrimaryButton } from '../components/ui'
import { emptyRegistration, type RegistrationFormState } from '../data/participation'
import { events } from '../data/events'
import { isRequired, isValidEmail, isValidGroupSize, isValidPhone } from '../utils/validation'
import { useDocumentMeta } from '../utils/seo'

type Errors = Partial<Record<keyof RegistrationFormState, string>>

export default function RegisterPage() {
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const t = content[lang]
  const r = t.pages.register
  useDocumentMeta(r.heading + ' · ' + t.title.join(' '), r.intro)

  const [step, setStep] = useState(0)
  const [form, setForm] = useState<RegistrationFormState>({
    ...emptyRegistration,
    type: searchParams.get('type') === 'group' ? 'group' : 'individual',
    preferredLanguage: lang,
  })
  const [errors, setErrors] = useState<Errors>({})
  const selectedEvent = events.find(event => event.slug === form.eventSlug)
  const set = <K extends keyof RegistrationFormState>(key: K, value: RegistrationFormState[K]) => setForm(f => ({ ...f, [key]: value }))

  function validatePersonal(): Errors {
    const next: Errors = {}
    if (!isRequired(form.fullName)) next.fullName = r.errorRequired
    if (!isValidEmail(form.email)) next.email = r.errorEmail
    if (!isValidPhone(form.phone)) next.phone = r.errorPhone
    if (!isRequired(form.country)) next.country = r.errorRequired
    if (!isRequired(form.city)) next.city = r.errorRequired
    if (!isRequired(form.preferredLanguage)) next.preferredLanguage = r.errorRequired
    if (!form.privacyConsent) next.privacyConsent = r.errorConsent
    return next
  }
  function validateParticipation(): Errors {
    const next: Errors = {}
    if (form.type === 'group' && !isValidGroupSize(form.groupSize)) next.groupSize = r.errorGroupSize
    if (!isRequired(form.eventSlug)) next.eventSlug = r.errorRequired
    if (!isRequired(form.recitationLanguage)) next.recitationLanguage = r.errorRequired
    return next
  }
  function goNext(validate: () => Errors) {
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) setStep(s => s + 1)
  }
  function submit() {
    if (!form.termsConsent) { setErrors({ termsConsent: r.errorConsent }); return }
    navigate('/participate/confirmation', { state: { form } })
  }

  return <>
    <InnerPageHero lang={lang} eyebrow={r.eyebrow} heading={r.heading} breadcrumb={[{ label: t.register, href: '/participate' }, { label: r.heading }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={r.eyebrow} heading={r.heading} lede={r.intro} align="center"/>
      <RegistrationStepper steps={r.steps} current={step}/>

      {step === 0 && <form className="registration-form" onSubmit={event => { event.preventDefault(); goNext(validatePersonal) }}>
        <h2>{r.personalHeading}</h2>
        <div className="form-grid">
          <TextField label={r.fullName} required value={form.fullName} error={errors.fullName} onChange={e => set('fullName', e.target.value)} autoComplete="name"/>
          <TextField label={r.email} required type="email" value={form.email} error={errors.email} onChange={e => set('email', e.target.value)} autoComplete="email"/>
          <InternationalPhoneField label={r.phone} required countryCode={form.phoneCountryCode} phone={form.phone}
            onCountryCode={v => set('phoneCountryCode', v)} onPhone={v => set('phone', v)} error={errors.phone}/>
          <CountrySelector label={r.country} required lang={lang} value={form.country} onChange={v => set('country', v)} error={errors.country}/>
          <TextField label={r.city} required value={form.city} error={errors.city} onChange={e => set('city', e.target.value)} autoComplete="address-level2"/>
          <SelectField label={r.language} required value={form.preferredLanguage} error={errors.preferredLanguage} onChange={e => set('preferredLanguage', e.target.value)}>
            <option value="" disabled>—</option>
            {languages.map(code => <option key={code} value={code}>{languageNames[code]}</option>)}
          </SelectField>
        </div>
        <CheckboxField label={r.consent} checked={form.privacyConsent} error={errors.privacyConsent} onChange={v => set('privacyConsent', v)}/>
        <div className="flex justify-end"><button type="submit" className="action action-gold">{r.continueCta}</button></div>
      </form>}

      {step === 1 && <form className="registration-form" onSubmit={event => { event.preventDefault(); goNext(validateParticipation) }}>
        <h2>{r.participationHeading}</h2>
        <p className="form-label" style={{ marginBottom: 10, display: 'block' }}>{r.typeHeading}</p>
        <div className="participation-type-grid">
          <ParticipationTypeCard label={r.individual} selected={form.type === 'individual'} onSelect={() => set('type', 'individual')}/>
          <ParticipationTypeCard label={r.group} selected={form.type === 'group'} onSelect={() => set('type', 'group')}/>
        </div>
        <div className="form-grid">
          {form.type === 'group' && <TextField label={r.groupSizeLabel} required type="number" min={2} max={500} value={form.groupSize} error={errors.groupSize} onChange={e => set('groupSize', e.target.value)}/>}
          <SelectField label={r.eventLabel} required value={form.eventSlug} error={errors.eventSlug} onChange={e => set('eventSlug', e.target.value)}>
            <option value="" disabled>—</option>
            {events.map(event => <option key={event.slug} value={event.slug}>{t.nav[event.titleKey]}</option>)}
          </SelectField>
          <TextField label={r.recitationLanguageLabel} required value={form.recitationLanguage} error={errors.recitationLanguage} onChange={e => set('recitationLanguage', e.target.value)}/>
        </div>
        <TextAreaField label={r.assistanceLabel} placeholder={r.assistancePlaceholder} value={form.assistance} onChange={e => set('assistance', e.target.value)}/>
        <div className="flex justify-between">
          <button type="button" className="action action-outline" onClick={() => setStep(0)}>{r.backCta}</button>
          <button type="submit" className="action action-gold">{r.continueCta}</button>
        </div>
      </form>}

      {step === 2 && <div className="registration-form">
        <h2>{r.reviewHeading}</h2>
        <dl className="review-summary">
          <div><dt>{r.fullName}</dt><dd>{form.fullName}</dd></div>
          <div><dt>{r.email}</dt><dd>{form.email}</dd></div>
          <div><dt>{r.phone}</dt><dd>{form.phoneCountryCode} {form.phone}</dd></div>
          <div><dt>{r.country}</dt><dd>{form.country}</dd></div>
          <div><dt>{r.city}</dt><dd>{form.city}</dd></div>
          <div><dt>{r.typeHeading}</dt><dd>{form.type === 'group' ? r.group + ' · ' + form.groupSize : r.individual}</dd></div>
          <div><dt>{r.eventLabel}</dt><dd>{selectedEvent ? t.nav[selectedEvent.titleKey] : '—'}</dd></div>
          <div><dt>{r.recitationLanguageLabel}</dt><dd>{form.recitationLanguage}</dd></div>
        </dl>
        <div className="flex justify-center" style={{ marginBottom: 10 }}>
          <button type="button" className="text-link" onClick={() => setStep(0)}>{r.editCta} · {r.personalHeading}</button>
        </div>
        <div className="flex justify-center" style={{ marginBottom: 26 }}>
          <button type="button" className="text-link" onClick={() => setStep(1)}>{r.editCta} · {r.participationHeading}</button>
        </div>
        <PremiumSectionHeading eyebrow={r.consentHeading} heading={r.donationHeading} lede={r.donationBody} align="center"/>
        <CheckboxField label={r.termsLabel} checked={form.termsConsent} error={errors.termsConsent} onChange={v => set('termsConsent', v)}/>
        <div className="flex justify-between">
          <button type="button" className="action action-outline" onClick={() => setStep(1)}>{r.backCta}</button>
          <button type="button" className="action action-gold" onClick={submit}>{r.submitCta}</button>
        </div>
      </div>}
    </EditorialSection>
  </>
}
