import { Navigate, useParams } from 'react-router-dom'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { VerseDisplay, VerseNavigator } from '../components/VerseDisplay'
import { getChapter } from '../data/chapters'
import { useDocumentMeta } from '../utils/seo'

export default function ChapterDetailPage() {
  const { lang } = useLanguage()
  const { chapterId } = useParams()
  const id = Number(chapterId)
  const chapter = getChapter(id)
  const t = content[lang]
  const cd = t.pages.chapterDetail
  useDocumentMeta(chapter ? chapter.titleEn + ' · ' + t.nav.chapters : t.notFound.title, chapter ? chapter.theme[lang] : t.notFound.body)
  if (!chapter) return <Navigate to="/gita/chapters" replace/>
  const titleNative = lang === 'te' ? chapter.titleTe : lang === 'hi' ? chapter.sanskrit : chapter.transliteration
  return <>
    <InnerPageHero lang={lang} eyebrow={t.nav.chapters + ' · ' + String(chapter.id).padStart(2, '0')} heading={titleNative}
      image="scripture" breadcrumb={[{ label: t.nav.gita, href: '/gita' }, { label: t.nav.chapters, href: '/gita/chapters' }, { label: chapter.titleEn }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={cd.overviewHeading} heading={chapter.titleEn} lede={chapter.theme[lang]}/>
      <dl className="chapter-meta">
        <div><dt>{cd.themesHeading}</dt><dd>{chapter.transliteration}</dd></div>
        <div><dt>{t.pages.chapters.verseCountLabel}</dt><dd>{chapter.verses}</dd></div>
      </dl>
    </EditorialSection>
    <EditorialSection tone="paper">
      <VerseDisplay lang={lang} chapterId={chapter.id}/>
    </EditorialSection>
    <EditorialSection>
      <VerseNavigator lang={lang} chapterId={chapter.id}/>
    </EditorialSection>
  </>
}
