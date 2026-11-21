import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { LeadershipGroup } from '../components/LeadershipCard'
import { distinguishedSpeakers, globalThoughtLeaders, spiritualAdvisors } from '../data/leadership'
import { useDocumentMeta } from '../utils/seo'

export default function LeadershipPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.leadership
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  return <>
    <InnerPageHero lang={lang} eyebrow={p.eyebrow} heading={p.heading} breadcrumb={[{ label: t.nav.leadership }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.wisdom} heading={p.heading} lede={p.intro} align="center"/>
    </EditorialSection>
    <EditorialSection tone="paper">
      <LeadershipGroup heading={p.advisorsHeading} leaders={spiritualAdvisors} emptyTitle={p.emptyTitle} emptyBody={p.emptyBody}/>
    </EditorialSection>
    <EditorialSection>
      <LeadershipGroup heading={p.speakersHeading} leaders={distinguishedSpeakers} emptyTitle={p.emptyTitle} emptyBody={p.emptyBody}/>
    </EditorialSection>
    <EditorialSection tone="paper">
      <LeadershipGroup heading={p.leadersHeading} leaders={globalThoughtLeaders} emptyTitle={p.emptyTitle} emptyBody={p.emptyBody}/>
    </EditorialSection>
  </>
}
