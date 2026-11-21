import { Link } from 'react-router-dom'
import { content, formatDate, type Language } from '../content'
import { getEventStatus } from '../data/events'
import type { MahotsavEvent } from '../data/types'
import { CornerFrame, Icon } from './ui'

function StatusBadge({ event, lang }: { event: MahotsavEvent; lang: Language }) {
  const status = getEventStatus(event)
  const label = content[lang].pages.events.status[status]
  return <span className={'status-badge status-' + status}>{label}</span>
}
export function EventCard({ lang, event }: { lang: Language; event: MahotsavEvent }) {
  const t = content[lang]
  return <Link to={'/events/' + event.slug} className="milestone event-card">
    <CornerFrame/>
    <StatusBadge event={event} lang={lang}/>
    <time dateTime={event.dateISO}><Icon name="calendar" size={16}/>{formatDate(event.dateISO, lang)}</time>
    <h3>{t.nav[event.titleKey]}</h3>
    <p>{t.pages.eventDetail.descriptionFallback[event.titleKey]}</p>
    <span className="round-arrow"><Icon name="external" size={17}/></span>
  </Link>
}
export function EventTimeline({ lang, events }: { lang: Language; events: MahotsavEvent[] }) {
  const t = content[lang]
  return <ol className="event-timeline">{events.map(event => <li key={event.slug}>
    <span className="event-timeline-dot" aria-hidden="true"/>
    <Link to={'/events/' + event.slug}>
      <time dateTime={event.dateISO}>{formatDate(event.dateISO, lang)}</time>
      <strong>{t.nav[event.titleKey]}</strong>
      <StatusBadge event={event} lang={lang}/>
    </Link>
  </li>)}</ol>
}
export function MilestoneStrip({ lang, events }: { lang: Language; events: MahotsavEvent[] }) {
  return <div className="date-strip">{events.map(event => <div className="date-item" key={event.slug}>
    <Icon name="calendar" size={17}/><span>{content[lang].nav[event.titleKey]}</span><time dateTime={event.dateISO}>{formatDate(event.dateISO, lang, 'short')}</time>
  </div>)}</div>
}
