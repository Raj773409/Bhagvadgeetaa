import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { Link } from 'react-router-dom'
import { EditorialSection, PremiumSectionHeading, ValueCard } from '../components/shared'
import { Icon } from '../components/ui'
import { MilestoneStrip } from '../components/EventComponents'
import { OmGlyph, PrimaryButton } from '../components/ui'
import { events } from '../data/events'
import { useDocumentMeta } from '../utils/seo'

export default function ParticipatePage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.participate
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  return <>
    <section className="hero participate-hero" aria-label={p.heading}>
      <picture className="hero-art">
        <source media="(max-width: 600px)" srcSet="/images/colonnade-720.webp"/>
        <img src="/images/colonnade-1920.webp" srcSet="/images/colonnade-1280.webp 1280w, /images/colonnade-1920.webp 1920w" sizes="100vw" width="1920" height="768" alt={t.heroAlt}/>
      </picture>
      <div className="hero-shade" aria-hidden="true"/>
      <div className="hero-center">
        <div className="hero-emblem"><OmGlyph/></div>
        <p className="eyebrow hero-eyebrow">{p.eyebrow}</p>
        <h1 className="hero-title">{p.heading}</h1>
        <p className="hero-subtitle">{p.intro}</p>
        <MilestoneStrip lang={lang} events={events}/>
        <div className="hero-actions flex justify-center flex-wrap">
          <PrimaryButton href="/participate/register">{p.beginCta}</PrimaryButton>
          <PrimaryButton href="#guidelines" secondary>{p.guidelinesCta}</PrimaryButton>
        </div>
      </div>
    </section>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.wisdom} heading={p.categoriesHeading} align="center"/>
      <div className="pillar-grid">
        {p.categories.map((category, i) => <ValueCard key={category.title} title={category.title} body={category.body}
          href={['/participate/register', '/participate/group', '/volunteer', '/partner-with-us'][i]}/>)}
      </div>
    </EditorialSection>
    <EditorialSection tone="paper" id="guidelines">
      <PremiumSectionHeading eyebrow={p.eyebrow} heading={p.guidelinesHeading} lede={p.guidelinesBody} align="center"/>
      <div className="flex justify-center"><Link className="text-link" to="/support-the-mission">{t.pages.donate.missionHeading}<Icon name="arrow" size={14}/></Link></div>
    </EditorialSection>
  </>
}
