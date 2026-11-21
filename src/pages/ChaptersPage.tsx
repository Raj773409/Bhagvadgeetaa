import { useMemo, useState } from 'react'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { ChapterCard } from '../components/ChapterCard'
import { chapters } from '../data/chapters'
import { useDocumentMeta } from '../utils/seo'

export default function ChaptersPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.chapters
  const [query, setQuery] = useState('')
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return chapters
    return chapters.filter(chapter =>
      chapter.titleEn.toLowerCase().includes(needle) ||
      chapter.transliteration.toLowerCase().includes(needle) ||
      chapter.titleTe.includes(needle) ||
      chapter.sanskrit.includes(needle) ||
      String(chapter.id).includes(needle))
  }, [query])
  return <>
    <InnerPageHero lang={lang} eyebrow={p.eyebrow} heading={p.heading} image="scripture" breadcrumb={[{ label: t.nav.gita, href: '/gita' }, { label: t.nav.chapters }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.wisdom} heading={p.heading} lede={p.intro} align="center"/>
      <div className="chapter-search">
        <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={p.searchPlaceholder} aria-label={p.searchPlaceholder}/>
      </div>
      {filtered.length === 0
        ? <p className="section-lede" style={{ textAlign: 'center' }}>{p.noResults}</p>
        : <div className="chapter-grid">{filtered.map(chapter => <ChapterCard key={chapter.id} lang={lang} chapter={chapter}/>)}</div>}
    </EditorialSection>
  </>
}
