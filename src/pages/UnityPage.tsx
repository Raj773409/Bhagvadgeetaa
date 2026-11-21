import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, EmptyState, InnerPageHero, PageCta, PremiumSectionHeading, ValueCard } from '../components/shared'
import { PrimaryButton } from '../components/ui'
import { useDocumentMeta } from '../utils/seo'

export default function UnityPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.unity
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  return <>
    <InnerPageHero lang={lang} eyebrow={p.eyebrow} heading={p.heading} breadcrumb={[{ label: t.nav.globalJourney, href: '/global-journey' }, { label: t.nav.unity }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.wisdom} heading={p.visionHeading} lede={p.visionBody} align="center"/>
      <div className="pillar-grid">{p.pillars.map(pillar => <ValueCard key={pillar.title} title={pillar.title} body={pillar.body}/>)}</div>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={p.eyebrow} heading={p.storiesHeading} align="center"/>
      <EmptyState title={p.storiesEmptyTitle} body={p.storiesEmptyBody}/>
    </EditorialSection>
    <EditorialSection>
      <PageCta heading={p.heading} body={p.intro}>
        <PrimaryButton href="/global-journey">{p.exploreCountriesCta}</PrimaryButton>
        <PrimaryButton href="/participate" secondary>{p.participateCta}</PrimaryButton>
      </PageCta>
    </EditorialSection>
  </>
}
