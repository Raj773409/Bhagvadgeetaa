import { useEffect, useMemo, useState } from 'react'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PendingNote, PremiumSectionHeading } from '../components/shared'
import { VerseDisplay } from '../components/VerseDisplay'
import { Icon } from '../components/ui'
import { chapters, getChapter } from '../data/chapters'
import { useLocalCollection } from '../utils/localStore'
import { useDocumentMeta } from '../utils/seo'

type FontSize = 'small' | 'medium' | 'large'

export default function ExplorerPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const ex = t.pages.explorer
  useDocumentMeta(ex.heading + ' · ' + t.title.join(' '), ex.intro)

  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(2)
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    try { return (localStorage.getItem('mahotsav-reading-size') as FontSize) || 'medium' } catch { return 'medium' }
  })
  const [bookmarks, setBookmarks] = useLocalCollection<number>('mahotsav-bookmarks')
  const [, setChaptersRead] = useLocalCollection<number>('mahotsav-chapters-read')
  useEffect(() => { setChaptersRead(read => read.includes(selectedId) ? read : [...read, selectedId]) }, [selectedId, setChaptersRead])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return chapters
    return chapters.filter(chapter => chapter.titleEn.toLowerCase().includes(needle) || chapter.transliteration.toLowerCase().includes(needle) || chapter.theme.en.toLowerCase().includes(needle) || String(chapter.id).includes(needle))
  }, [query])

  const selected = getChapter(selectedId)!
  const isBookmarked = bookmarks.includes(selectedId)
  const related = chapters.filter(c => c.id !== selectedId).slice(Math.max(0, selectedId - 2), Math.max(0, selectedId - 2) + 2)

  function setSize(size: FontSize) {
    setFontSize(size)
    try { localStorage.setItem('mahotsav-reading-size', size) } catch { /* reading preference is optional */ }
  }
  function toggleBookmark() {
    setBookmarks(b => isBookmarked ? b.filter(id => id !== selectedId) : [...b, selectedId])
  }

  return <>
    <InnerPageHero lang={lang} eyebrow={ex.eyebrow} heading={ex.heading} image="scripture" breadcrumb={[{ label: t.nav.gita, href: '/gita' }, { label: t.nav.explorer }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={ex.eyebrow} heading={ex.heading} lede={ex.intro} align="center"/>
      <div className="chapter-search"><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={ex.searchPlaceholder} aria-label={ex.searchPlaceholder}/></div>

      <div className="explorer-grid">
        <ul className="explorer-list" aria-label={ex.heading}>
          {filtered.map(chapter => <li key={chapter.id}>
            <button type="button" className={'explorer-list-item' + (chapter.id === selectedId ? ' is-active' : '')} onClick={() => setSelectedId(chapter.id)} aria-current={chapter.id === selectedId ? 'true' : undefined}>
              <strong>Ch. {chapter.id}</strong><span>{chapter.transliteration}</span><small>{chapter.verses} {t.pages.chapters.verseCountLabel}</small>
            </button>
          </li>)}
        </ul>

        <div className={'explorer-detail reading-' + fontSize}>
          <div className="explorer-detail-head">
            <span className="chapter-card-number">Ch. {String(selected.id).padStart(2, '0')}</span>
            <button type="button" className={'explorer-bookmark-btn' + (isBookmarked ? ' is-active' : '')} onClick={toggleBookmark}>
              <Icon name="book" size={15}/>{isBookmarked ? ex.bookmarked : ex.bookmark}
            </button>
          </div>
          <h2 style={{ marginTop: 4 }}>{selected.transliteration} — {selected.titleEn}</h2>
          <p className="section-lede" style={{ marginInline: 0 }}>{selected.theme[lang]}</p>

          <VerseDisplay lang={lang} chapterId={selected.id}/>

          <div className="explorer-settings">
            <span className="form-label">{ex.settingsHeading}: {ex.fontSizeLabel}</span>
            <div className="flex" style={{ gap: 8 }}>
              {(['small', 'medium', 'large'] as FontSize[]).map(size => <button key={size} type="button" className={'explorer-size-btn' + (fontSize === size ? ' is-active' : '')} onClick={() => setSize(size)}>
                {size === 'small' ? ex.fontSmall : size === 'medium' ? ex.fontMedium : ex.fontLarge}
              </button>)}
            </div>
          </div>

          <PendingNote>{ex.commentaryPendingNote}</PendingNote>
          <PendingNote>{ex.audioPendingNote}</PendingNote>

          <h3>{ex.relatedHeading}</h3>
          <div className="flex flex-wrap" style={{ gap: 10 }}>
            {related.map(chapter => <button key={chapter.id} type="button" className="text-link" onClick={() => setSelectedId(chapter.id)}>Ch. {chapter.id} · {chapter.transliteration}</button>)}
          </div>
        </div>
      </div>
    </EditorialSection>
  </>
}
