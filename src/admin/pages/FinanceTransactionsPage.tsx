import { AdminCard, AdminPageHeader, DataTable } from '../components/ui'
import type { PaymentTransaction } from '../../data/backendSchema'

export default function FinanceTransactionsPage() {
  const rows: (PaymentTransaction & { id: string })[] = []
  return <>
    <AdminPageHeader title="Transactions" description="Gateway order references, status and webhook reconciliation." trail={['Donations & Finance', 'Transactions']}/>
    <AdminCard title="Transaction Records">
      <DataTable<PaymentTransaction & { id: string }>
        columns={[{ key: 'providerOrderId', label: 'Gateway Reference' }, { key: 'status', label: 'Status' }, { key: 'idempotencyKey', label: 'Idempotency Key' }, { key: 'createdAt', label: 'Date' }]}
        rows={rows} emptyTitle="No transactions yet" emptyBody="No payment gateway is configured, so no order has ever been created and there is nothing to verify or reconcile."
      />
    </AdminCard>
  </>
}
