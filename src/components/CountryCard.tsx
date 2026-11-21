import { Link } from 'react-router-dom'
import { content, type Language } from '../content'
import type { Country } from '../data/types'
import { CornerFrame, Icon } from './ui'

export function CountryNavigation({ lang, prev, next }: { lang: Language; prev: Country; next: Country }) {
  const c = content[lang].pages.country
  return <nav className="verse-navigator" aria-label={c.prevCountry + ' / ' + c.nextCountry}>
    <Link to={'/global-journey/' + prev.slug} className="verse-nav-link prev"><Icon name="arrow" size={15} className="icon-reverse"/><span><small>{c.prevCountry}</small>{prev.flag} {prev.name[lang]}</span></Link>
    <Link to="/global-journey" className="verse-nav-all">{c.allCountries}</Link>
    <Link to={'/global-journey/' + next.slug} className="verse-nav-link next"><span><small>{c.nextCountry}</small>{next.flag} {next.name[lang]}</span><Icon name="arrow" size={15}/></Link>
  </nav>
}

export function CountryCard({ lang, country }: { lang: Language; country: Country }) {
  const t = content[lang]
  return <Link to={'/global-journey/' + country.slug} className="country-card">
    <CornerFrame/>
    <span className="country-card-flag" aria-hidden="true">{country.flag}</span>
    {country.isOrigin && <span className="country-card-origin">{t.pages.country.originBadge}</span>}
    <h3>{country.name[lang]}</h3>
    <p className="country-card-languages">{country.nationalLanguages}</p>
    <p className="country-card-intro">{country.intro[lang]}</p>
    <span className="chapter-card-open">{t.pages.globalJourney.viewCountry}<Icon name="arrow" size={14}/></span>
  </Link>
}
