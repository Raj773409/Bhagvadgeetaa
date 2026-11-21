import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, EmptyState, InnerPageHero, PremiumSectionHeading, ValueCard } from '../components/shared'
import { useDocumentMeta } from '../utils/seo'

export default function LegacyPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.legacy
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  return <>
    <InnerPageHero lang={lang} eyebrow={p.eyebrow} heading={p.heading} breadcrumb={[{ label: t.nav.legacy }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.wisdom} heading={p.heading} lede={p.intro} align="center"/>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={p.eyebrow} heading={p.pillarsHeading} align="center"/>
      <div className="pillar-grid">{p.pillars.map(pillar => <ValueCard key={pillar.title} title={pillar.title} body={pillar.body}/>)}</div>
    </EditorialSection>
    <EditorialSection>
      <div className="split-columns">
        <div><h2>{p.youthHeading}</h2><p className="section-lede" style={{ marginInline: 0 }}>{p.youthBody}</p></div>
        <div><h2>{p.archiveHeading}</h2><p className="section-lede" style={{ marginInline: 0 }}>{p.archiveBody}</p></div>
      </div>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={t.vision} heading={p.futureHeading} align="center"/>
      <ul className="future-list">{p.futureItems.map(item => <li key={item}>{item}</li>)}</ul>
    </EditorialSection>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={p.eyebrow} heading={p.storiesHeading} align="center"/>
      <EmptyState title={p.storiesEmptyTitle} body={p.storiesEmptyBody}/>
    </EditorialSection>
  </>
}
