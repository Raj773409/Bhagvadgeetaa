import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Language } from '../content'
import type { Country } from '../data/types'

/** Equirectangular projection of each country's real coordinates onto a 360×180 locator.
 * This is a schematic locator (graticule + markers), not a literal satellite map — chosen
 * over a heavy 3D globe so the directory stays fast and fully keyboard-accessible. */
function project([lat, lon]: [number, number]) {
  return { x: (lon + 180) / 360 * 360, y: (90 - lat) / 180 * 180 }
}
export function WorldLocator({ countries, label, lang }: { countries: Country[]; label: string; lang: Language }) {
  const [active, setActive] = useState<string | null>(null)
  const navigate = useNavigate()
  const meridians = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150]
  const parallels = [-60, -30, 0, 30, 60]
  return <div className="world-locator">
    <svg viewBox="0 0 360 180" role="img" aria-label={label} className="world-locator-svg">
      <rect x="0" y="0" width="360" height="180" rx="4" className="world-locator-bg"/>
      {meridians.map(lon => <line key={lon} x1={project([0, lon]).x} y1="0" x2={project([0, lon]).x} y2="180" className="world-locator-grid"/>)}
      {parallels.map(lat => <line key={lat} x1="0" y1={project([lat, 0]).y} x2="360" y2={project([lat, 0]).y} className="world-locator-grid"/>)}
      <line x1="180" y1="0" x2="180" y2="180" className="world-locator-grid world-locator-prime"/>
      <line x1="0" y1="90" x2="360" y2="90" className="world-locator-grid world-locator-prime"/>
      {countries.map(country => {
        const { x, y } = project(country.coordinates)
        return <g key={country.id} className={'world-locator-marker' + (active === country.id ? ' is-active' : '')}>
          <circle cx={x} cy={y} r={active === country.id ? 5 : 3.4} tabIndex={0} role="link"
            aria-label={country.name[lang]}
            onMouseEnter={() => setActive(country.id)} onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(country.id)} onBlur={() => setActive(null)}
            onClick={() => navigate('/global-journey/' + country.slug)}
            onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); navigate('/global-journey/' + country.slug) } }}/>
          {active === country.id && <text x={x} y={y - 9} textAnchor="middle" className="world-locator-label">{country.flag} {country.name[lang]}</text>}
        </g>
      })}
    </svg>
  </div>
}
