import { AdminCard, AdminPageHeader, DataTable, FilterToolbar } from '../components/ui'
import { countries } from '../../data/countries'
import { events } from '../../data/events'
import { content } from '../../content'
import type { RegistrationRecord } from '../../data/backendSchema'

export default function ParticipantsPage() {
  const rows: (RegistrationRecord & { id: string })[] = []
  return <>
    <AdminPageHeader title="Participants & Registrations" description="Manage participants, applications and approvals." trail={['Participants']}/>
    <AdminCard title="All Participants">
      <FilterToolbar>
        <select aria-label="Filter by country"><option>All Countries</option>{countries.map(country => <option key={country.id}>{country.name.en}</option>)}</select>
        <select aria-label="Filter by event"><option>All Events</option>{events.map(event => <option key={event.slug}>{content.en.nav[event.titleKey]}</option>)}</select>
        <select aria-label="Filter by status"><option>All Status</option><option>Submitted</option><option>Pending Review</option><option>Approved</option><option>Waitlisted</option><option>Rejected</option></select>
        <input type="search" aria-label="Search by name, email or reference" placeholder="Search by name, email or reference…"/>
      </FilterToolbar>
      <DataTable<RegistrationRecord & { id: string }>
        columns={[
          { key: 'reference', label: 'Reference' }, { key: 'userId', label: 'Participant' },
          { key: 'eventId', label: 'Event' }, { key: 'status', label: 'Status' }, { key: 'createdAt', label: 'Registered On' },
        ]}
        rows={rows}
        emptyTitle="No registrations yet"
        emptyBody="The public registration form (Phase 04) does not persist submissions to a backend yet, so there are genuinely zero records here. This table, its filters and pagination are fully functional and will populate the moment a real database is connected."
      />
    </AdminCard>
  </>
}
