import { useState } from 'react'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { Icon } from '../components/ui'
import { useLocalCollection } from '../utils/localStore'
import { useDocumentMeta } from '../utils/seo'

type Reflection = { id: number; text: string; createdAt: string }

export default function ReflectionsPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const j = t.pages.journey
  useDocumentMeta(j.reflectionsHeading + ' · ' + t.title.join(' '), j.reflectionsEmpty)
  const [reflections, setReflections] = useLocalCollection<Reflection>('mahotsav-reflections')
  const [draft, setDraft] = useState('')

  function save() {
    const text = draft.trim()
    if (!text) return
    setReflections(r => [...r, { id: Date.now(), text, createdAt: new Date().toISOString() }])
    setDraft('')
  }

  return <>
    <InnerPageHero lang={lang} eyebrow={j.eyebrow} heading={j.reflectionsHeading} breadcrumb={[{ label: j.heading, href: '/participant/journey' }, { label: j.reflectionsHeading }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={j.eyebrow} heading={j.reflectionsHeading} lede={j.privacyNote} align="center"/>
      <div className="registration-form">
        <label className="form-field">
          <textarea rows={4} value={draft} onChange={event => setDraft(event.target.value)} placeholder={j.reflectionPlaceholder}/>
        </label>
        <div className="flex justify-center"><button type="button" className="action action-gold" onClick={save}>{j.addReflection}<Icon name="arrow" size={15}/></button></div>
      </div>

      {reflections.length === 0
        ? <p className="section-lede" style={{ textAlign: 'center', marginTop: 24 }}>{j.reflectionsEmpty}</p>
        : <ul className="future-list" style={{ marginTop: 30 }}>
            {[...reflections].reverse().map(entry => <li key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start' }}>
              <span>{entry.text}<br/><small style={{ color: 'var(--muted)' }}>{new Date(entry.createdAt).toLocaleDateString(lang + '-IN', { dateStyle: 'medium' })}</small></span>
              <button type="button" className="text-link" onClick={() => setReflections(r => r.filter(x => x.id !== entry.id))}>{j.deleteReflection}</button>
            </li>)}
          </ul>}
    </EditorialSection>
  </>
}
