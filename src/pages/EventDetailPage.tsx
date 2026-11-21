import { Navigate, useParams } from 'react-router-dom'
import { content, formatDate } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { PrimaryButton } from '../components/ui'
import { getEvent, getEventStatus } from '../data/events'
import { useDocumentMeta } from '../utils/seo'

export default function EventDetailPage() {
  const { lang } = useLanguage()
  const { eventSlug } = useParams()
  const t = content[lang]
  const event = eventSlug ? getEvent(eventSlug) : undefined
  const ed = t.pages.eventDetail
  useDocumentMeta(event ? t.nav[event.titleKey] + ' · ' + t.title.join(' ') : t.notFound.title,
    event ? ed.descriptionFallback[event.titleKey] : t.notFound.body)
  if (!event) return <Navigate to="/events" replace/>
  const status = getEventStatus(event)
  return <>
    <InnerPageHero lang={lang} eyebrow={t.pages.events.eyebrow} heading={t.nav[event.titleKey]}
      breadcrumb={[{ label: t.nav.events, href: '/events' }, { label: t.nav[event.titleKey] }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={ed.dateLabel} heading={t.nav[event.titleKey]} lede={ed.descriptionFallback[event.titleKey]} align="center"/>
      <dl className="event-detail-meta">
        <div><dt>{ed.dateLabel}</dt><dd>{formatDate(event.dateISO, lang)}</dd></div>
        <div><dt>{ed.statusLabel}</dt><dd><span className={'status-badge status-' + status}>{t.pages.events.status[status]}</span></dd></div>
        <div><dt>{ed.venueLabel}</dt><dd>{ed.venuePending}</dd></div>
      </dl>
      <div className="flex justify-center flex-wrap hero-actions" style={{ marginTop: 28 }}>
        <PrimaryButton href="/participate">{ed.registerCta}</PrimaryButton>
        <PrimaryButton href="/events" secondary>{ed.backToEvents}</PrimaryButton>
      </div>
    </EditorialSection>
  </>
}
