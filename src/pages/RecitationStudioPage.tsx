import { useState } from 'react'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PendingNote, PremiumSectionHeading } from '../components/shared'
import { VerseDisplay } from '../components/VerseDisplay'
import { Icon } from '../components/ui'
import { useVoiceRecorder } from '../utils/useVoiceRecorder'
import { useDocumentMeta } from '../utils/seo'

type Tab = 'listen' | 'practise' | 'record' | 'feedback'

export default function RecitationStudioPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const r = t.pages.recitation
  useDocumentMeta(r.heading + ' · ' + t.title.join(' '), r.intro)
  const [tab, setTab] = useState<Tab>('listen')
  const recorder = useVoiceRecorder()

  const tabs: { id: Tab; label: string }[] = [
    { id: 'listen', label: r.listenTab }, { id: 'practise', label: r.practiseTab },
    { id: 'record', label: r.recordTab }, { id: 'feedback', label: r.feedbackTab },
  ]

  return <>
    <InnerPageHero lang={lang} eyebrow={r.eyebrow} heading={r.heading} image="scripture" breadcrumb={[{ label: t.nav.recitationStudio }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={r.eyebrow} heading={r.heading} lede={r.intro} align="center"/>
      <p className="eyebrow" style={{ textAlign: 'center' }}>{r.selectedVerseLabel} — {t.verseRef}</p>

      <div className="media-filters" role="tablist" aria-label={r.heading}>
        {tabs.map(tabItem => <button key={tabItem.id} type="button" role="tab" aria-selected={tab === tabItem.id} aria-pressed={tab === tabItem.id} onClick={() => setTab(tabItem.id)}>{tabItem.label}</button>)}
      </div>

      {tab === 'listen' && <PendingNote>{r.listenPendingNote}</PendingNote>}

      {tab === 'practise' && <VerseDisplay lang={lang} chapterId={2}/>}

      {tab === 'record' && <div className="recitation-studio">
        <div className="recitation-mic-consent">
          <Icon name="book" size={20}/>
          <div><strong>{r.micConsentTitle}</strong><p>{r.micConsentBody}</p></div>
        </div>
        {recorder.state === 'unsupported' && <PendingNote>{r.unsupportedNote}</PendingNote>}
        {recorder.state === 'denied' && <PendingNote>{r.micDenied}</PendingNote>}
        {(recorder.state === 'idle' || recorder.state === 'requesting') && <div className="flex justify-center">
          <button type="button" className="action action-gold" disabled={recorder.state === 'requesting'} onClick={recorder.start}>{r.micAllow}<Icon name="arrow" size={16}/></button>
        </div>}
        {recorder.state === 'recording' && <div className="flex justify-center">
          <button type="button" className="action action-outline recitation-recording" onClick={recorder.stop}>{r.recordStop}</button>
        </div>}
        {recorder.state === 'recorded' && recorder.audioUrl && <div className="recitation-playback">
          <audio controls src={recorder.audioUrl} aria-label={r.playback}/>
          <div className="flex justify-center flex-wrap" style={{ gap: 10, marginTop: 14 }}>
            <a className="action action-outline" href={recorder.audioUrl} download="recitation.webm">{r.download}<Icon name="external" size={15}/></a>
            <button type="button" className="action action-outline" onClick={recorder.reset}>{r.deleteRecording}<Icon name="close" size={15}/></button>
          </div>
        </div>}
      </div>}

      {tab === 'feedback' && <div className="recitation-studio">
        <PremiumSectionHeading eyebrow={r.feedbackTab} heading={r.analysisTitle} lede={r.analysisBody} align="center"/>
        <PremiumSectionHeading eyebrow={r.feedbackTab} heading={r.textAlternativeTitle} lede={r.textAlternativeBody} align="center"/>
      </div>}
    </EditorialSection>
  </>
}
