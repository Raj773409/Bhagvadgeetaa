import { content, official } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, OrnamentalDivider, PageCta, PendingNote, PremiumSectionHeading, ValueCard } from '../components/shared'
import { EventTimeline } from '../components/EventComponents'
import { PrimaryButton } from '../components/ui'
import { events } from '../data/events'
import { useDocumentMeta } from '../utils/seo'

export default function AboutPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.about
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  return <>
    <InnerPageHero lang={lang} eyebrow={p.eyebrow} heading={p.heading} breadcrumb={[{ label: t.nav.about }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.eyebrow} heading={p.introHeading} lede={p.introBody}/>
    </EditorialSection>
    <EditorialSection tone="paper">
      <div className="split-columns">
        <div><h2>{p.visionHeading}</h2><p className="section-lede" style={{ marginInline: 0 }}>{p.visionBody}</p></div>
        <div><h2>{p.missionHeading}</h2><p className="section-lede" style={{ marginInline: 0 }}>{p.missionBody}</p></div>
      </div>
    </EditorialSection>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.wisdom} heading={p.philosophyHeading} lede={p.philosophyBody} align="center"/>
      <div className="value-grid">{p.values.map(value => <ValueCard key={value.title} title={value.title} body={value.body}/>)}</div>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={t.vision} heading={p.pillarsHeading} align="center"/>
      <div className="pillar-grid">{p.pillars.map(pillar => <ValueCard key={pillar.title} title={pillar.title} body={pillar.body}/>)}</div>
    </EditorialSection>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.milestones} heading={p.journeyHeading} lede={p.journeyBody} align="center"/>
      <EventTimeline lang={lang} events={events}/>
      <PendingNote>{p.journeyPending}</PendingNote>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={t.pages.about.foundationHeading} heading={p.foundationHeading} lede={p.foundationBody} align="center"/>
    </EditorialSection>
    <EditorialSection>
      <PageCta heading={p.ctaHeading} body={p.ctaBody}>
        <PrimaryButton href="/gita">{t.pages.gita.ctaExplore}</PrimaryButton>
        <PrimaryButton href="/participate" secondary>{t.participate}</PrimaryButton>
      </PageCta>
    </EditorialSection>
    <OrnamentalDivider/>
    <a className="sr-only" href={official}>{official}</a>
  </>
}
