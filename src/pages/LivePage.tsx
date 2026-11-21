import { content, formatDate } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PendingNote, PremiumSectionHeading } from '../components/shared'
import { OFFICIAL_LIVESTREAM_URL } from '../config'
import { events, getEventStatus } from '../data/events'
import { useDocumentMeta } from '../utils/seo'

export default function LivePage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const l = t.pages.live
  useDocumentMeta(l.heading + ' · ' + t.title.join(' '), l.intro)

  return <>
    <InnerPageHero lang={lang} eyebrow={l.eyebrow} heading={l.heading} breadcrumb={[{ label: t.nav.live }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={l.eyebrow} heading={l.heading} lede={l.intro} align="center"/>
      {OFFICIAL_LIVESTREAM_URL
        ? <div className="live-player"><iframe src={OFFICIAL_LIVESTREAM_URL} title={l.heading} allow="encrypted-media" allowFullScreen/></div>
        : <div className="live-unavailable">
            <span className="status-badge status-cancelled">{l.status.unavailable}</span>
            <h3>{l.unavailableTitle}</h3>
            <p>{l.unavailableBody}</p>
          </div>}
      <PendingNote>{l.questionsNote}</PendingNote>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={l.eyebrow} heading={l.upcomingHeading} align="center"/>
      <div className="live-session-list">
        {events.map(event => {
          const status = getEventStatus(event)
          return <div className="live-session-row" key={event.slug}>
            <strong>{t.nav[event.titleKey]}</strong>
            <span>{formatDate(event.dateISO, lang)}</span>
            <span className={'status-badge status-' + (status === 'upcoming' ? 'upcoming' : 'completed')}>{status === 'upcoming' ? l.status.upcoming : l.status.completed}</span>
          </div>
        })}
      </div>
    </EditorialSection>
  </>
}
