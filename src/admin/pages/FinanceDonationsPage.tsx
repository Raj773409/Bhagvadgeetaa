import { AdminCard, AdminPageHeader, DataTable } from '../components/ui'
import type { DonationRecord } from '../../data/backendSchema'

export default function FinanceDonationsPage() {
  const rows: (DonationRecord & { id: string })[] = []
  return <>
    <AdminPageHeader title="Donations" description="Verified, voluntary contributions — kept strictly separate from registration records." trail={['Donations & Finance', 'Donations']}/>
    <AdminCard title="Donation Records">
      <DataTable<DonationRecord & { id: string }>
        columns={[{ key: 'id', label: 'Reference' }, { key: 'amountMinor', label: 'Amount' }, { key: 'currency', label: 'Currency' }, { key: 'createdAt', label: 'Date' }]}
        rows={rows} emptyTitle="No donations yet" emptyBody="The public Donate page (Phase 04) intentionally stops at checkout initiation, since no payment gateway is connected — so there is truthfully nothing to reconcile here."
      />
    </AdminCard>
  </>
}
