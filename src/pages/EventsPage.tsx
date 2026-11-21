import { content, official } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { EventCard, EventTimeline } from '../components/EventComponents'
import { Icon } from '../components/ui'
import { events } from '../data/events'
import { useDocumentMeta } from '../utils/seo'

export default function EventsPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.events
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  return <>
    <InnerPageHero lang={lang} eyebrow={p.eyebrow} heading={p.heading} breadcrumb={[{ label: t.nav.events }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.wisdom} heading={p.featuredHeading} lede={p.intro} align="center"/>
      <div className="milestone-grid">{events.map(event => <EventCard key={event.slug} lang={lang} event={event}/>)}</div>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={p.eyebrow} heading={p.timelineHeading} align="center"/>
      <EventTimeline lang={lang} events={events}/>
    </EditorialSection>
    <EditorialSection>
      <div className="split-columns">
        <div><h2>{p.participationHeading}</h2><p className="section-lede" style={{ marginInline: 0 }}>{p.participationBody}</p></div>
        <div><h2>{p.programmeHeading}</h2><p className="section-lede" style={{ marginInline: 0 }}>{p.programmePendingBody}</p>
          <a className="text-link" href={official + '/programme'}>{p.programmeLink}<Icon name="external" size={14}/></a>
        </div>
      </div>
    </EditorialSection>
  </>
}
