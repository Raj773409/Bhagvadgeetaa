import { content, dates, formatDate, type Language } from '../content'
import { Icon, OmGlyph, PrimaryButton } from './ui'

export function EventDateStrip({ lang }: { lang: Language }) {
  return <div className="date-strip">{dates.map((date, i) => <div className="date-item" key={date}>
    <Icon name="calendar" size={17}/><span>{content[lang].dates[i]}</span><time dateTime={date}>{formatDate(date, lang, 'short')}</time>
  </div>)}</div>
}
export function HeroTitle({ lang }: { lang: Language }) {
  return <h1 className="hero-title"><span>{content[lang].title[0]} </span><span>{content[lang].title[1]} </span>
    <span className="hero-year"><i aria-hidden="true"/>2027<i aria-hidden="true"/></span></h1>
}
export function CinematicHero({ lang }: { lang: Language }) {
  const t = content[lang]
  return <section id="welcome" aria-label={t.home} className="hero">
    <picture className="hero-art">
      <source media="(max-width: 600px)" srcSet="/images/colonnade-720.webp"/>
      <img src="/images/colonnade-1920.webp" srcSet="/images/colonnade-1280.webp 1280w, /images/colonnade-1920.webp 1920w" sizes="100vw" fetchPriority="high" width="1920" height="768" alt={t.heroAlt}/>
    </picture>
    <div className="hero-shade" aria-hidden="true"/>
    <div className="hero-frame" aria-hidden="true"><i/><i/><i/><i/></div>
    <div className="hero-center">
      <div className="hero-emblem"><OmGlyph/></div>
      <p className="eyebrow hero-eyebrow">{t.eyebrow}</p>
      <HeroTitle lang={lang}/>
      <p className="hero-subtitle"><span>{t.subtitle[0]} </span><span>{t.subtitle[1]}</span></p>
      <EventDateStrip lang={lang}/>
      <div className="hero-actions flex justify-center flex-wrap">
        <PrimaryButton href="#mahotsav">{t.explore}</PrimaryButton>
        <PrimaryButton href="/participate" secondary>{t.participate}</PrimaryButton>
      </div>
    </div>
    <a href="#gita" className="scroll-link"><span>{t.scroll}</span><Icon name="down" size={16}/></a>
  </section>
}
