import { AdminCard, AdminPageHeader, DataTable } from '../components/ui'
import type { RegistrationRecord } from '../../data/backendSchema'

export default function RegistrationsPage() {
  const rows: (RegistrationRecord & { id: string })[] = []
  return <>
    <AdminPageHeader title="Registrations" description="Individual and group registration records, duplicate detection and cancellations." trail={['Registrations']}/>
    <AdminCard title="Registration Records">
      <DataTable<RegistrationRecord & { id: string }>
        columns={[{ key: 'reference', label: 'Reference' }, { key: 'type', label: 'Type' }, { key: 'status', label: 'Status' }, { key: 'createdAt', label: 'Submitted' }]}
        rows={rows}
        emptyTitle="No registrations yet" emptyBody="Duplicate detection, waitlist management and cancellation handling activate automatically once real registration rows exist in a connected database."
      />
    </AdminCard>
  </>
}
