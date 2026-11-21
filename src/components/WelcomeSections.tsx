import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { content, dates, formatDate, official, verseSource, type Language } from '../content'
import { Brand } from './SiteHeader'
import { CornerFrame, DecorativeOrnament, Icon, IconBadge, SectionReveal } from './ui'
import { GlobalStats } from './shared'

type Props = { lang: Language }
function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="eyebrow section-label"><span aria-hidden="true"/>{children}</p>
}
export function SacredVerseSection({ lang }: Props) {
  const t = content[lang]
  return <section id="gita" className="verse-section section-pad" aria-labelledby="verse-heading">
    <SectionReveal className="container-width verse-grid">
      <div className="book-frame">
        <img loading="lazy" decoding="async" width="960" height="640" src="/images/scripture-960.webp" srcSet="/images/scripture-480.webp 480w, /images/scripture-960.webp 960w" sizes="(max-width: 760px) 90vw, 43vw" alt={t.bookAlt}/>
        <CornerFrame/>
      </div>
      <div className="verse-copy">
        <SectionLabel>{t.wisdom}</SectionLabel>
        <h2 id="verse-heading">{t.verseTitle}</h2>
        <blockquote cite={verseSource} lang="sa" className="sanskrit">कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।<br/>मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥</blockquote>
        <p className="verse-ref">{t.verseRef}</p>
        <p className="translation">{t.translation}</p>
        <p className="credit">{t.verseCredit}</p>
        <a className="text-link" href={verseSource}>{t.read}<Icon name="external" size={14}/></a>
      </div>
    </SectionReveal>
  </section>
}
export function GlobalVisionPreview({ lang }: Props) {
  const t = content[lang]
  return <section id="mahotsav" className="vision-section section-pad" aria-labelledby="vision-heading">
    <SectionReveal className="container-width">
      <DecorativeOrnament/><p className="eyebrow">{t.vision}</p>
      <h2 id="vision-heading">{t.visionTitle}</h2>
      <p className="section-lede">{t.visionText}</p>
      <GlobalStats lang={lang}/>
      <Link className="text-link" to="/global-journey">{t.journey}<Icon name="arrow" size={15}/></Link>
    </SectionReveal>
  </section>
}
export function EventMilestonePreview({ lang }: Props) {
  const t = content[lang]
  return <section id="events" className="milestones section-pad" aria-labelledby="events-heading">
    <SectionReveal className="container-width">
      <SectionLabel>{t.milestones}</SectionLabel>
      <h2 id="events-heading">{t.milestoneTitle}</h2>
      <div className="milestone-grid">{dates.map((date, i) => <a key={date} href={official + '/programme/' + ['curtain-raiser','mega-mahotsav'][i]} className="milestone">
        <CornerFrame/>
        <time dateTime={date}><IconBadge name="calendar" size={15} className="icon-badge-sm"/>{formatDate(date, lang)}</time>
        <h3>{t.dates[i]}</h3><p>{t.milestoneText[i]}</p><span className="round-arrow"><Icon name="external" size={17}/></span>
      </a>)}</div>
      <div className="programme-note"><p>{t.venue}</p><a className="text-link" href={official + '/programme'}>{t.programme}<Icon name="external" size={14}/></a></div>
    </SectionReveal>
  </section>
}
export function SiteFooter({ lang }: Props) {
  const t = content[lang]
  return <footer id="about"><div className="container-width">
    <div className="footer-grid"><Brand lang={lang}/><div><h2>{t.about}</h2><p>{t.aboutText}</p>
    <a className="text-link" href={official + '/about'}>{t.aboutLink}<Icon name="external" size={14}/></a></div></div>
    <div className="footer-bottom"><span>{t.title.join(' ')} 2027</span><a href="#welcome">{t.top}<Icon name="up" size={14}/></a></div>
  </div></footer>
}
