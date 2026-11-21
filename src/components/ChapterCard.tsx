import { Link } from 'react-router-dom'
import { content, type Language } from '../content'
import type { Chapter } from '../data/types'
import { CornerFrame, Icon } from './ui'

export function ChapterCard({ lang, chapter }: { lang: Language; chapter: Chapter }) {
  const t = content[lang]
  const theme = chapter.theme[lang]
  return <Link to={'/gita/chapters/' + chapter.id} className="chapter-card">
    <CornerFrame/>
    <span className="chapter-card-number">{String(chapter.id).padStart(2, '0')}</span>
    <h3>{lang === 'te' ? chapter.titleTe : lang === 'hi' ? chapter.sanskrit : chapter.transliteration}</h3>
    <p className="chapter-card-sub">{chapter.titleEn}</p>
    <p className="chapter-card-theme">{theme}</p>
    <div className="chapter-card-foot">
      <span>{chapter.verses} {t.pages.chapters.verseCountLabel}</span>
      <span className="chapter-card-open">{t.pages.chapters.openLabel}<Icon name="arrow" size={14}/></span>
    </div>
  </Link>
}
