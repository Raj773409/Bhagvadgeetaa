import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PendingNote, PremiumSectionHeading } from '../components/shared'
import { EventTimeline } from '../components/EventComponents'
import { events } from '../data/events'
import { useDocumentMeta } from '../utils/seo'

export default function GlobalTimelinePage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.timeline
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  return <>
    <InnerPageHero lang={lang} eyebrow={p.eyebrow} heading={p.heading} breadcrumb={[{ label: t.nav.globalJourney, href: '/global-journey' }, { label: t.nav.timeline }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.wisdom} heading={p.heading} lede={p.intro} align="center"/>
      <EventTimeline lang={lang} events={events}/>
      <PendingNote>{p.countryNote}</PendingNote>
    </EditorialSection>
  </>
}
