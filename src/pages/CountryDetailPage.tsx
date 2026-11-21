import { Navigate, useParams } from 'react-router-dom'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, EmptyState, PendingNote, PremiumSectionHeading, SacredBreadcrumb } from '../components/shared'
import { CountryNavigation } from '../components/CountryCard'
import { MediaGallery } from '../components/MediaGallery'
import { MilestoneStrip } from '../components/EventComponents'
import { PrimaryButton } from '../components/ui'
import { countries, getCountry, getCountryIndex } from '../data/countries'
import { events } from '../data/events'
import { mediaItems } from '../data/globalMedia'
import { useDocumentMeta } from '../utils/seo'

export default function CountryDetailPage() {
  const { lang } = useLanguage()
  const { countrySlug } = useParams()
  const t = content[lang]
  const c = t.pages.country
  const country = countrySlug ? getCountry(countrySlug) : undefined
  useDocumentMeta(country ? country.name[lang] + ' · ' + t.nav.globalJourney : t.notFound.title,
    country ? country.intro[lang] : t.notFound.body)
  if (!country) return <Navigate to="/global-journey" replace/>
  const index = getCountryIndex(country.slug)
  const prev = countries[(index - 1 + countries.length) % countries.length]
  const next = countries[(index + 1) % countries.length]
  const countryMedia = mediaItems.filter(item => item.countryId === country.id)

  return <>
    <section className="inner-hero country-hero">
      <div className="inner-hero-shade global-hero-shade" aria-hidden="true"/>
      <div className="inner-hero-content container-width">
        <SacredBreadcrumb lang={lang} trail={[{ label: t.nav.globalJourney, href: '/global-journey' }, { label: country.name[lang] }]}/>
        <p className="eyebrow inner-hero-eyebrow">{country.flag} {t.nav.globalJourney}</p>
        <h1 className="inner-hero-title">{country.name[lang]}</h1>
        {country.isOrigin && <p className="country-origin-badge">{c.originBadge}</p>}
      </div>
    </section>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={c.programmeHeading} heading={country.name[lang]} lede={country.intro[lang]} align="center"/>
      <PendingNote>{c.programmePending}</PendingNote>
    </EditorialSection>
    <EditorialSection tone="paper">
      <div className="split-columns">
        <div>
          <h2>{c.languagesHeading}</h2>
          <dl className="event-detail-meta" style={{ marginTop: 14 }}>
            <div><dt>{c.nationalLanguagesLabel}</dt><dd style={{ fontSize: 16 }}>{country.nationalLanguages}</dd></div>
          </dl>
        </div>
        <div>
          <h2>{c.journeyHeading}</h2>
          <PendingNote>{c.journeyPending}</PendingNote>
        </div>
      </div>
    </EditorialSection>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.milestones} heading={c.datesHeading} align="center"/>
      <MilestoneStrip lang={lang} events={events}/>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={c.coordinatorsHeading} heading={c.coordinatorsHeading} align="center"/>
      <EmptyState title={c.coordinatorsPendingTitle} body={c.coordinatorsPendingBody}/>
    </EditorialSection>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={c.galleryHeading} heading={c.galleryHeading} align="center"/>
      <MediaGallery items={countryMedia} emptyTitle={c.galleryPendingTitle} emptyBody={c.galleryPendingBody} allLabel={t.pages.gallery.filterAll}/>
      <PendingNote>{c.videoPendingBody}</PendingNote>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={t.wisdom} heading={c.resourcesHeading} lede={c.resourcesBody} align="center"/>
      <div className="flex justify-center"><PrimaryButton href="/gita">{c.resourcesCta}</PrimaryButton></div>
    </EditorialSection>
    <EditorialSection>
      <div className="flex justify-center" style={{ marginBottom: 34 }}><PrimaryButton href="/participate">{c.participateCta}</PrimaryButton></div>
      <CountryNavigation lang={lang} prev={prev} next={next}/>
    </EditorialSection>
  </>
}
