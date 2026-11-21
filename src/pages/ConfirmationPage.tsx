import { useLocation } from 'react-router-dom'
import { content, registration } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { RegistrationStepper } from '../components/participation'
import { PrimaryButton } from '../components/ui'
import { events } from '../data/events'
import type { RegistrationFormState } from '../data/participation'
import { useDocumentMeta } from '../utils/seo'

export default function ConfirmationPage() {
  const { lang } = useLanguage()
  const location = useLocation()
  const t = content[lang]
  const r = t.pages.register
  const form = (location.state as { form?: RegistrationFormState } | null)?.form
  useDocumentMeta(r.steps[3] + ' · ' + t.title.join(' '), r.pendingBody)
  const selectedEvent = form ? events.find(event => event.slug === form.eventSlug) : undefined

  return <>
    <InnerPageHero lang={lang} eyebrow={r.eyebrow} heading={r.steps[3]} breadcrumb={[{ label: t.register, href: '/participate' }, { label: r.steps[3] }]}/>
    <EditorialSection>
      <RegistrationStepper steps={r.steps} current={3}/>
      <PremiumSectionHeading eyebrow={r.eyebrow} heading={r.pendingTitle} lede={r.pendingBody} align="center"/>
      {form && <dl className="review-summary" aria-label={r.summaryHeading}>
        <div><dt>{r.fullName}</dt><dd>{form.fullName}</dd></div>
        <div><dt>{r.email}</dt><dd>{form.email}</dd></div>
        <div><dt>{r.eventLabel}</dt><dd>{selectedEvent ? t.nav[selectedEvent.titleKey] : '—'}</dd></div>
        <div><dt>{r.typeHeading}</dt><dd>{form.type === 'group' ? r.group : r.individual}</dd></div>
      </dl>}
      <div className="flex justify-center flex-wrap hero-actions" style={{ marginTop: 30 }}>
        <PrimaryButton href={registration}>{r.pendingCta}</PrimaryButton>
        <PrimaryButton href="/participate/register" secondary>{r.startOverCta}</PrimaryButton>
      </div>
    </EditorialSection>
  </>
}
