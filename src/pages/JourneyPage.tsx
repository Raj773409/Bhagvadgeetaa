import { useState } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { CornerFrame, Icon, IconBadge, PrimaryButton } from '../components/ui'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { clearLocalData, exportLocalData, useLocalCollection } from '../utils/localStore'
import { useDocumentMeta } from '../utils/seo'

const KEYS = ['mahotsav-bookmarks', 'mahotsav-chapters-read', 'mahotsav-reflections', 'mahotsav-practice-gita-2-47', 'mahotsav-reading-size']

export default function JourneyPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const j = t.pages.journey
  useDocumentMeta(j.heading + ' · ' + t.title.join(' '), j.intro)
  const [bookmarks] = useLocalCollection<number>('mahotsav-bookmarks')
  const [chaptersRead] = useLocalCollection<number>('mahotsav-chapters-read')
  const [reflections] = useLocalCollection<{ id: number; text: string; createdAt: string }>('mahotsav-reflections')
  const practised = (() => { try { return localStorage.getItem('mahotsav-practice-gita-2-47') === '1' } catch { return false } })()
  const [confirming, setConfirming] = useState(false)

  const stats = [
    { label: j.chaptersRead, value: chaptersRead.length, icon: 'book' as const },
    { label: j.versesPractised, value: practised ? 1 : 0, icon: 'letters' as const },
    { label: j.bookmarksCount, value: bookmarks.length, icon: 'globe' as const },
    { label: j.reflectionsCount, value: reflections.length, icon: 'people' as const },
  ]

  function doDelete() {
    clearLocalData(KEYS)
    setConfirming(false)
    window.location.reload()
  }

  return <>
    <InnerPageHero lang={lang} eyebrow={j.eyebrow} heading={j.heading} breadcrumb={[{ label: j.heading }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={j.eyebrow} heading={j.progressHeading} lede={j.intro} align="center"/>
      <dl className="vision-stats">{stats.map(stat => <div className="stat-card" key={stat.label}>
        <CornerFrame/><IconBadge name={stat.icon} size={24}/><dt>{stat.label}</dt><dd>{stat.value}</dd>
      </div>)}</dl>
      <p className="form-hint" style={{ textAlign: 'center' }}>{j.privacyNote}</p>
      <div className="flex justify-center flex-wrap hero-actions" style={{ marginTop: 10 }}>
        <PrimaryButton href="/gita/explorer">{j.continueCta}</PrimaryButton>
      </div>
    </EditorialSection>
    <EditorialSection tone="paper">
      <div className="split-columns">
        <div>
          <h2>{j.bookmarksHeading}</h2>
          {bookmarks.length === 0 ? <p className="section-lede" style={{ marginInline: 0 }}>{j.bookmarksEmpty}</p> : <ul className="future-list">
            {bookmarks.map(id => <li key={id}><Link className="text-link" to={'/gita/explorer'}>Chapter {id}</Link></li>)}
          </ul>}
        </div>
        <div>
          <h2>{j.reflectionsHeading}</h2>
          {reflections.length === 0 ? <p className="section-lede" style={{ marginInline: 0 }}>{j.reflectionsEmpty}</p> : <ul className="future-list">
            {reflections.slice(-3).map(entry => <li key={entry.id}>{entry.text}</li>)}
          </ul>}
          <Link className="text-link" to="/participant/reflections" style={{ marginTop: 10 }}>{j.addReflection}<Icon name="arrow" size={14}/></Link>
        </div>
      </div>
    </EditorialSection>
    <EditorialSection>
      <div className="flex justify-center flex-wrap" style={{ gap: 14 }}>
        <button type="button" className="action action-outline" onClick={() => exportLocalData(KEYS, 'my-mahotsav-journey.json')}>{j.exportCta}<Icon name="external" size={15}/></button>
        <button type="button" className="action action-outline" onClick={() => setConfirming(true)}>{j.deleteCta}<Icon name="close" size={15}/></button>
      </div>
      {confirming && <div className="empty-state" style={{ marginTop: 20 }}>
        <h3>{j.deleteConfirmTitle}</h3>
        <p>{j.deleteConfirmBody}</p>
        <div className="flex justify-center flex-wrap" style={{ gap: 10, marginTop: 14 }}>
          <button type="button" className="action action-outline" onClick={() => setConfirming(false)}>{j.cancel}</button>
          <button type="button" className="action action-gold" onClick={doDelete}>{j.deleteConfirmAction}</button>
        </div>
      </div>}
    </EditorialSection>
  </>
}
