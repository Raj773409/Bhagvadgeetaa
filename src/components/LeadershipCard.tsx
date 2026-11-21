import type { Leader } from '../data/types'
import { IconBadge } from './ui'
import { EmptyState } from './shared'

export function LeadershipCard({ leader }: { leader: Leader }) {
  return <div className="leadership-card">
    <IconBadge name="people" size={24}/>
    <h3>{leader.name}</h3>
    <p className="leadership-role">{leader.role} · {leader.country}</p>
    <p className="leadership-bio">{leader.bio}</p>
  </div>
}
export function LeadershipGroup({ heading, leaders, emptyTitle, emptyBody }: { heading: string; leaders: Leader[]; emptyTitle: string; emptyBody: string }) {
  return <div className="leadership-group">
    <h3 className="leadership-group-heading">{heading}</h3>
    {leaders.length === 0
      ? <EmptyState title={emptyTitle} body={emptyBody}/>
      : <div className="leadership-grid">{leaders.map(leader => <LeadershipCard key={leader.id} leader={leader}/>)}</div>}
  </div>
}
