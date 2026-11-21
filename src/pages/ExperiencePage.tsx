import { useState } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { PendingNote } from '../components/shared'
import { Icon, OmGlyph } from '../components/ui'
import { useDocumentMeta } from '../utils/seo'

export default function ExperiencePage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const e = t.pages.experience
  useDocumentMeta(e.heading + ' · ' + t.title.join(' '), e.intro)
  const [entered, setEntered] = useState(false)

  const sceneBodies: Record<string, string> = {
    origins: t.pages.gita.contextBody,
    kurukshetra: t.translation + ' — ' + t.verseRef,
    teachings: t.pages.gita.teachings.map(te => te.title + ': ' + te.body).join(' '),
    legacy: t.pages.legacy.pillars.map(p => p.title + ' — ' + p.body).join(' '),
  }

  if (!entered) {
    return <section className="hero experience-hero" aria-label={e.heading}>
      <picture className="hero-art">
        <source media="(max-width: 600px)" srcSet="/images/colonnade-720.webp"/>
        <img src="/images/colonnade-1920.webp" srcSet="/images/colonnade-1280.webp 1280w, /images/colonnade-1920.webp 1920w" sizes="100vw" width="1920" height="768" alt={t.heroAlt}/>
      </picture>
      <div className="hero-shade" aria-hidden="true"/>
      <div className="hero-center">
        <div className="hero-emblem"><OmGlyph/></div>
        <p className="eyebrow hero-eyebrow">{e.eyebrow}</p>
        <h1 className="hero-title">{e.heading}</h1>
        <p className="hero-subtitle">{e.intro}</p>
        <div className="hero-actions flex justify-center flex-wrap">
          <button type="button" className="action action-gold" onClick={() => setEntered(true)}>{e.enterCta}<Icon name="arrow" size={16}/></button>
        </div>
      </div>
    </section>
  }

  return <div className="exhibition">
    <button type="button" className="exhibition-exit" onClick={() => setEntered(false)}><Icon name="close" size={16}/>{e.exitCta}</button>
    {e.sections.map(section => <section className="exhibition-scene" key={section.key} aria-label={section.title}>
      <div className="exhibition-scene-inner">
        <p className="eyebrow">{e.eyebrow}</p>
        <h2>{section.title}</h2>
        <p className="exhibition-scene-body">{sceneBodies[section.key]}</p>
      </div>
    </section>)}
    <section className="exhibition-scene exhibition-scene-end" aria-label={e.exitCta}>
      <div className="exhibition-scene-inner">
        <PendingNote>{e.licensingNote}</PendingNote>
        <div className="flex justify-center flex-wrap hero-actions" style={{ marginTop: 20 }}>
          <Link className="action action-gold" to="/gita">{t.pages.gita.ctaExplore}<Icon name="arrow" size={16}/></Link>
          <button type="button" className="action action-outline" onClick={() => setEntered(false)}>{e.exitCta}<Icon name="close" size={16}/></button>
        </div>
      </div>
    </section>
  </div>
}
