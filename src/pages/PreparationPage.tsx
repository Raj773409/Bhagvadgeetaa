import { useEffect, useState } from 'react'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PendingNote, PremiumSectionHeading } from '../components/shared'
import { VerseDisplay } from '../components/VerseDisplay'
import { PrimaryButton } from '../components/ui'
import { useDocumentMeta } from '../utils/seo'

function usePractised(verseId: string) {
  const key = 'mahotsav-practice-' + verseId
  const [done, setDone] = useState(() => { try { return localStorage.getItem(key) === '1' } catch { return false } })
  useEffect(() => { try { if (done) localStorage.setItem(key, '1'); else localStorage.removeItem(key) } catch { /* local practice tracking is optional */ } }, [done, key])
  return [done, setDone] as const
}

export default function PreparationPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.preparation
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  const [done, setDone] = usePractised('gita-2-47')

  return <>
    <InnerPageHero lang={lang} eyebrow={p.eyebrow} heading={p.heading} breadcrumb={[{ label: p.heading }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={p.eyebrow} heading={p.heading} lede={p.intro} align="center"/>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={p.versesCount} heading={p.versesHeading} align="center"/>
      <PendingNote>{p.versesPendingBody}</PendingNote>
      <div style={{ marginTop: 10 }}><VerseDisplay lang={lang} chapterId={2}/></div>
      <div className="flex justify-center flex-wrap hero-actions" style={{ marginTop: 10 }}>
        <button type="button" className={'action ' + (done ? 'action-outline' : 'action-gold')} aria-pressed={done} onClick={() => setDone(d => !d)}>
          {done ? p.practised : p.markPractised}
        </button>
        <PrimaryButton href="/participant/preparation/verses" secondary>{p.startCta}</PrimaryButton>
      </div>
      <p className="form-hint" style={{ textAlign: 'center', marginTop: 16 }}>{p.disclaimer}</p>
    </EditorialSection>
  </>
}
