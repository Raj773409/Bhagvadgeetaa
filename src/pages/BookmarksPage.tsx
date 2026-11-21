import { Link } from 'react-router-dom'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { Icon } from '../components/ui'
import { getChapter } from '../data/chapters'
import { useLocalCollection } from '../utils/localStore'
import { useDocumentMeta } from '../utils/seo'

export default function BookmarksPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const j = t.pages.journey
  useDocumentMeta(j.bookmarksHeading + ' · ' + t.title.join(' '), j.bookmarksEmpty)
  const [bookmarks, setBookmarks] = useLocalCollection<number>('mahotsav-bookmarks')

  return <>
    <InnerPageHero lang={lang} eyebrow={j.eyebrow} heading={j.bookmarksHeading} breadcrumb={[{ label: j.heading, href: '/participant/journey' }, { label: j.bookmarksHeading }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={j.eyebrow} heading={j.bookmarksHeading} align="center"/>
      {bookmarks.length === 0 ? <p className="section-lede" style={{ textAlign: 'center' }}>{j.bookmarksEmpty}</p> : <div className="chapter-grid">
        {bookmarks.map(id => {
          const chapter = getChapter(id)
          if (!chapter) return null
          return <div className="chapter-card" key={id}>
            <span className="chapter-card-number">Ch. {String(chapter.id).padStart(2, '0')}</span>
            <h3>{chapter.transliteration}</h3>
            <p className="chapter-card-sub">{chapter.titleEn}</p>
            <div className="chapter-card-foot">
              <Link className="chapter-card-open" to="/gita/explorer">{t.pages.chapters.openLabel}<Icon name="arrow" size={14}/></Link>
              <button type="button" className="text-link" onClick={() => setBookmarks(b => b.filter(x => x !== id))}>{j.removeBookmark}</button>
            </div>
          </div>
        })}
      </div>}
    </EditorialSection>
  </>
}
