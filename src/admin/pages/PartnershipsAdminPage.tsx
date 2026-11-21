import { AdminCard, AdminPageHeader, DataTable } from '../components/ui'
import type { PartnerApplicationRecord } from '../../data/backendSchema'

export default function PartnershipsAdminPage() {
  const rows: (PartnerApplicationRecord & { id: string })[] = []
  return <>
    <AdminPageHeader title="Partnerships" description="Review applications, track institutions and assign reviewers." trail={['Partnerships']}/>
    <AdminCard title="Partnership Applications (0)">
      <DataTable<PartnerApplicationRecord & { id: string }>
        columns={[{ key: 'reference', label: 'Reference' }, { key: 'orgName', label: 'Organisation' }, { key: 'interest', label: 'Interest' }, { key: 'status', label: 'Status' }]}
        rows={rows} emptyTitle="No applications yet"
        emptyBody="The public Partner form (Phase 04) validates and reviews entries client-side but does not persist them, since no backend is connected — so none appear here for review."
      />
    </AdminCard>
  </>
}
