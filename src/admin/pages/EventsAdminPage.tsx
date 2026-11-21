import { Link } from 'react-router-dom'
import { AdminCard, AdminPageHeader, AdminStatusBadge } from '../components/ui'
import { content, formatDate } from '../../content'
import { events, getEventStatus } from '../../data/events'

export default function EventsAdminPage() {
  return <>
    <AdminPageHeader title="Events & Check-in" description="Manage events, schedules and on-ground verification." trail={['Events & Check-in']}/>
    <div className="admin-grid-2">
      {events.map(event => <AdminCard key={event.slug} title={content.en.nav[event.titleKey]}
        action={<AdminStatusBadge label={getEventStatus(event)} tone={getEventStatus(event) === 'upcoming' ? 'neutral' : 'positive'}/>}>
        <p>{formatDate(event.dateISO, 'en')}</p>
        <div className="admin-card-links">
          <Link className="admin-link" to={'/admin/events/' + event.slug}>Event Schedule</Link>
          <Link className="admin-link" to="/admin/participants">Participants</Link>
          <Link className="admin-link" to="/admin/checkin">Check-in</Link>
          <Link className="admin-link" to="/admin/passes">QR Passes</Link>
        </div>
      </AdminCard>)}
    </div>
  </>
}
