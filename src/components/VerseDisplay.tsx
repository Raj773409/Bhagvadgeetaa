import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { content, type Language } from '../content'
import { getChapter } from '../data/chapters'
import { getVerse } from '../data/verses'
import { Icon } from './ui'

export function VerseDisplay({ lang, chapterId }: { lang: Language; chapterId: number }) {
  const t = content[lang]
  const cd = t.pages.chapterDetail
  const verse = getVerse(chapterId, 47)
  if (verse) {
    return <blockquote className="verse-display" cite={verse.source}>
      <p className="verse-exhibit-note">{cd.verseExampleNote}</p>
      <p lang="sa" className="sanskrit">{verse.sanskrit.split('\n').map((line, i) => <Fragment key={i}>{i > 0 && <br/>}{line}</Fragment>)}</p>
      <p className="verse-ref">{t.verseRef}</p>
      <p className="translation">{t.translation}</p>
      <p className="credit">{t.verseCredit}</p>
      <a className="text-link" href={verse.source}>{t.read}<Icon name="external" size={14}/></a>
    </blockquote>
  }
  return <div className="verse-display verse-pending">
    <Icon name="book" size={22}/>
    <p className="verse-pending-title">{cd.versePendingTitle}</p>
    <p className="verse-pending-body">{cd.versePendingBody}</p>
  </div>
}
export function VerseNavigator({ lang, chapterId }: { lang: Language; chapterId: number }) {
  const t = content[lang].pages.chapterDetail
  const prev = getChapter(chapterId - 1)
  const next = getChapter(chapterId + 1)
  return <nav className="verse-navigator" aria-label={t.prevChapter + ' / ' + t.nextChapter}>
    {prev ? <Link to={'/gita/chapters/' + prev.id} className="verse-nav-link prev"><Icon name="arrow" size={15} className="icon-reverse"/><span><small>{t.prevChapter}</small>{prev.titleEn}</span></Link> : <span/>}
    <Link to="/gita/chapters" className="verse-nav-all">{t.backToChapters}</Link>
    {next ? <Link to={'/gita/chapters/' + next.id} className="verse-nav-link next"><span><small>{t.nextChapter}</small>{next.titleEn}</span><Icon name="arrow" size={15}/></Link> : <span/>}
  </nav>
}
