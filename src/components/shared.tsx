import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { content, type Language } from '../content'
import { CornerFrame, DecorativeOrnament, Icon, IconBadge, SectionReveal } from './ui'

export const ScrollReveal = SectionReveal

export function InnerPageHero({ lang, eyebrow, heading, image = 'colonnade', breadcrumb }: {
  lang: Language; eyebrow: string; heading: string; image?: 'colonnade' | 'scripture'; breadcrumb: { label: string; href?: string }[]
}) {
  const t = content[lang]
  return <section className="inner-hero" aria-label={heading}>
    <picture className="inner-hero-art">
      {image === 'colonnade'
        ? <img loading="eager" fetchPriority="high" width="1920" height="640" src="/images/colonnade-1920.webp" srcSet="/images/colonnade-1280.webp 1280w, /images/colonnade-1920.webp 1920w" sizes="100vw" alt={t.heroAlt}/>
        : <img loading="eager" fetchPriority="high" width="960" height="640" src="/images/scripture-960.webp" alt={t.bookAlt}/>}
    </picture>
    <div className="inner-hero-shade" aria-hidden="true"/>
    <div className="inner-hero-content container-width">
      <SacredBreadcrumb lang={lang} trail={breadcrumb}/>
      <p className="eyebrow inner-hero-eyebrow">{eyebrow}</p>
      <h1 className="inner-hero-title">{heading}</h1>
    </div>
  </section>
}
export function SacredBreadcrumb({ lang, trail }: { lang: Language; trail: { label: string; href?: string }[] }) {
  const t = content[lang]
  return <nav aria-label={t.breadcrumbHome} className="breadcrumb">
    <ol>
      <li><Link to="/">{t.breadcrumbHome}</Link></li>
      {trail.map((item, index) => <li key={index} aria-current={index === trail.length - 1 ? 'page' : undefined}>
        {item.href ? <Link to={item.href}>{item.label}</Link> : <span>{item.label}</span>}
      </li>)}
    </ol>
  </nav>
}
export function OrnamentalDivider() {
  return <div className="flex justify-center"><DecorativeOrnament/></div>
}
export function PremiumSectionHeading({ eyebrow, heading, lede, align = 'left' }: { eyebrow: string; heading: string; lede?: string; align?: 'left' | 'center' }) {
  return <header className={align === 'center' ? 'text-center' : ''}>
    <p className="eyebrow section-label"><span aria-hidden="true"/>{eyebrow}</p>
    <h2>{heading}</h2>
    {lede && <p className="section-lede" style={align === 'left' ? { marginInline: 0 } : undefined}>{lede}</p>}
  </header>
}
export function EditorialSection({ children, tone = 'ivory', className = '', id }: { children: ReactNode; tone?: 'ivory' | 'paper'; className?: string; id?: string }) {
  return <section id={id} className={`editorial-section section-pad ${tone === 'paper' ? 'is-paper' : ''} ${className}`}>
    <ScrollReveal className="container-width">{children}</ScrollReveal>
  </section>
}
export function EmptyState({ title, body }: { title: string; body: string }) {
  return <div className="empty-state">
    <DecorativeOrnament variant="diamond"/>
    <h3>{title}</h3>
    <p>{body}</p>
  </div>
}
export function ValueCard({ title, body, href }: { title: string; body: string; href?: string }) {
  const inner = <><h3>{title}</h3><p>{body}</p>{href && <span className="value-card-arrow" aria-hidden="true"><Icon name="arrow" size={15}/></span>}</>
  if (href) return <Link to={href} className="value-card value-card-link">{inner}</Link>
  return <div className="value-card">{inner}</div>
}
export function PageCta({ heading, body, children }: { heading: string; body: string; children: ReactNode }) {
  return <div className="page-cta">
    <OrnamentalDivider/>
    <h2>{heading}</h2>
    <p className="section-lede">{body}</p>
    <div className="flex justify-center flex-wrap hero-actions">{children}</div>
  </div>
}
export function PendingNote({ children }: { children: ReactNode }) {
  return <p className="pending-note"><Icon name="calendar" size={14}/>{children}</p>
}
export function GlobalStats({ lang }: { lang: Language }) {
  const t = content[lang]
  const stats = [...t.stats, t.target]
  const icons = ['book', 'globe', 'letters', 'people'] as const
  return <dl className="vision-stats">{stats.map((label, i) => <div className="stat-card" key={i}>
    <CornerFrame/><IconBadge name={icons[i]} size={24}/><dt>{label}</dt><dd>{i < 3 ? '18' : '50,000+'}</dd>
  </div>)}</dl>
}
