import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, GlobalStats, PageCta, PremiumSectionHeading } from '../components/shared'
import { CountryCard } from '../components/CountryCard'
import { WorldLocator } from '../components/WorldLocator'
import { OmGlyph, PrimaryButton } from '../components/ui'
import { countries } from '../data/countries'
import { useDocumentMeta } from '../utils/seo'

export default function GlobalJourneyPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.globalJourney
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  return <>
    <section className="hero global-hero" aria-label={p.heading}>
      <div className="inner-hero-shade global-hero-shade" aria-hidden="true"/>
      <div className="hero-center">
        <div className="hero-emblem"><OmGlyph/></div>
        <p className="eyebrow hero-eyebrow">{p.eyebrow}</p>
        <h1 className="hero-title">{p.heading}</h1>
        <p className="hero-subtitle">{p.intro}</p>
        <div className="hero-actions flex justify-center flex-wrap">
          <PrimaryButton href="#locator">{p.exploreWorld}</PrimaryButton>
          <PrimaryButton href="#countries" secondary>{p.exploreCountries}</PrimaryButton>
        </div>
      </div>
    </section>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.wisdom} heading={p.storyHeading} lede={p.storyBody} align="center"/>
      <GlobalStats lang={lang}/>
    </EditorialSection>
    <EditorialSection tone="paper" id="locator">
      <WorldLocator countries={countries} label={p.locatorLabel} lang={lang}/>
    </EditorialSection>
    <EditorialSection id="countries">
      <PremiumSectionHeading eyebrow={p.eyebrow} heading={p.directoryHeading} lede={p.directoryIntro} align="center"/>
      <div className="country-grid">{countries.map(country => <CountryCard key={country.id} lang={lang} country={country}/>)}</div>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PageCta heading={t.pages.unity.heading} body={t.pages.unity.intro}>
        <PrimaryButton href="/global-journey/unity">{t.nav.unity}</PrimaryButton>
        <PrimaryButton href="/participate" secondary>{t.participate}</PrimaryButton>
      </PageCta>
    </EditorialSection>
  </>
}
