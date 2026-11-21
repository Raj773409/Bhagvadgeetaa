import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PageCta, PremiumSectionHeading, ValueCard } from '../components/shared'
import { VerseDisplay } from '../components/VerseDisplay'
import { PrimaryButton } from '../components/ui'
import { useDocumentMeta } from '../utils/seo'

export default function GitaPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.gita
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  return <>
    <InnerPageHero lang={lang} eyebrow={p.eyebrow} heading={p.heading} image="scripture" breadcrumb={[{ label: t.nav.gita }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.wisdom} heading={p.contextHeading} lede={p.contextBody} align="center"/>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={p.eyebrow} heading={p.teachingsHeading} align="center"/>
      <div className="pillar-grid">{p.teachings.map(teaching => <ValueCard key={teaching.title} title={teaching.title + ' · ' + teaching.sanskrit} body={teaching.body}/>)}</div>
    </EditorialSection>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.vision} heading={p.relevanceHeading} lede={p.relevanceBody} align="center"/>
    </EditorialSection>
    <EditorialSection tone="paper" className="verse-showcase">
      <PremiumSectionHeading eyebrow={t.wisdom} heading={p.verseHeading} align="center"/>
      <VerseDisplay lang={lang} chapterId={2}/>
    </EditorialSection>
    <EditorialSection>
      <PageCta heading={p.chaptersTeaserHeading} body={p.chaptersTeaserBody}>
        <PrimaryButton href="/gita/chapters">{p.ctaChapters}</PrimaryButton>
        <PrimaryButton href="/participate" secondary>{t.participate}</PrimaryButton>
      </PageCta>
    </EditorialSection>
  </>
}
