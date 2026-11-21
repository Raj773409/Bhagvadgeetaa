import type { EventStatus, MahotsavEvent } from './types'

/** Only the two publicly announced Mahotsav milestones. No venue, session times or
 * programme details are included until the official programme confirms them. */
export const events: MahotsavEvent[] = [
  { slug: 'curtain-raiser', dateISO: '2026-12-20', titleKey: 'curtainRaiser' },
  { slug: 'vishwa-mahotsav', dateISO: '2027-02-27', titleKey: 'vishwaMahotsav' },
]
export function getEvent(slug: string) { return events.find(event => event.slug === slug) }
export function getEventStatus(event: MahotsavEvent, now: Date = new Date()): EventStatus {
  if (event.cancelled) return 'cancelled'
  return now.getTime() < new Date(event.dateISO + 'T23:59:59Z').getTime() ? 'upcoming' : 'completed'
}
