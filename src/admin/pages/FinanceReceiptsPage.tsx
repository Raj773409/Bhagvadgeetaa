import { AdminCard, AdminPageHeader, DataTable } from '../components/ui'
import type { ReceiptRecord } from '../../data/backendSchema'

export default function FinanceReceiptsPage() {
  const rows: (ReceiptRecord & { id: string })[] = []
  return <>
    <AdminPageHeader title="Receipts" description="Issued only for verified, completed transactions." trail={['Donations & Finance', 'Receipts']}/>
    <AdminCard title="Receipt Records">
      <DataTable<ReceiptRecord & { id: string }>
        columns={[{ key: 'number', label: 'Receipt No.' }, { key: 'donationId', label: 'Donation' }, { key: 'issuedAt', label: 'Issued' }]}
        rows={rows} emptyTitle="No receipts issued" emptyBody="A receipt is only generated for a verified, completed transaction. None exist, so none are shown — no tax-exemption claim is ever made without one."
      />
    </AdminCard>
  </>
}
