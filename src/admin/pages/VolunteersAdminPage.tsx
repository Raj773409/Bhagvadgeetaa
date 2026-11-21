import { AdminCard, AdminPageHeader, DataTable } from '../components/ui'
import type { VolunteerApplicationRecord } from '../../data/backendSchema'

export default function VolunteersAdminPage() {
  const rows: (VolunteerApplicationRecord & { id: string })[] = []
  return <>
    <AdminPageHeader title="Volunteers" description="Review applications, assign activities and scope." trail={['Volunteers']}/>
    <AdminCard title="Volunteer Applications (0)">
      <DataTable<VolunteerApplicationRecord & { id: string }>
        columns={[{ key: 'reference', label: 'Reference' }, { key: 'name', label: 'Applicant' }, { key: 'preferredFunction', label: 'Preferred Function' }, { key: 'status', label: 'Status' }]}
        rows={rows} emptyTitle="No applications yet"
        emptyBody="The public Volunteer form (Phase 04) does not persist submissions without a connected backend, so none exist to assign or approve."
      />
    </AdminCard>
  </>
}
