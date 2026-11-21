import { Navigate, useParams } from 'react-router-dom'
import { AdminCard, AdminEmptyNotice, AdminPageHeader, AdminStatusBadge } from '../components/ui'
import { content, formatDate } from '../../content'
import { getEvent, getEventStatus } from '../../data/events'

export default function EventDetailAdminPage() {
  const { id } = useParams()
  const event = id ? getEvent(id) : undefined
  if (!event) return <Navigate to="/admin/events" replace/>
  return <>
    <AdminPageHeader title={content.en.nav[event.titleKey]} description={formatDate(event.dateISO, 'en')} trail={['Events & Check-in', content.en.nav[event.titleKey]]}
      action={<AdminStatusBadge label={getEventStatus(event)} tone="neutral"/>}/>
    <div className="admin-grid-2">
      <AdminCard title="Schedule & Sessions">
        <AdminEmptyNotice title="No session schedule published" body="Venue, timing and session details have not been officially confirmed. The public Events page shows the same honest state."/>
      </AdminCard>
      <AdminCard title="Staff Assignments">
        <AdminEmptyNotice title="No staff assigned" body="Staff assignment requires the Staff & Permissions module to be backed by real accounts."/>
      </AdminCard>
    </div>
    <AdminCard title="Registered Participants">
      <AdminEmptyNotice title="No registrations yet" body="Registration capacity and eligibility tracking will appear here once the registration backend is connected."/>
    </AdminCard>
  </>
}
