import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PendingNote } from '../components/shared'
import { VerseDisplay } from '../components/VerseDisplay'
import { PrimaryButton } from '../components/ui'
import { useDocumentMeta } from '../utils/seo'

export default function PreparationVersesPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.preparation
  useDocumentMeta(p.versesHeading + ' · ' + t.title.join(' '), p.versesPendingBody)
  return <>
    <InnerPageHero lang={lang} eyebrow={p.eyebrow} heading={p.versesHeading} image="scripture"
      breadcrumb={[{ label: p.heading, href: '/participant/preparation' }, { label: p.versesHeading }]}/>
    <EditorialSection className="verse-showcase">
      <VerseDisplay lang={lang} chapterId={2}/>
      <PendingNote>{p.versesPendingBody}</PendingNote>
      <div className="flex justify-center"><PrimaryButton href="/participant/preparation" secondary>{p.heading}</PrimaryButton></div>
    </EditorialSection>
  </>
}
