import { AdminCard, AdminEmptyNotice, AdminPageHeader } from '../components/ui'

export default function FinanceRefundsPage() {
  return <>
    <AdminPageHeader title="Refunds" description="Authorised refunds, with a correction record for every adjustment." trail={['Donations & Finance', 'Refunds']}/>
    <AdminCard title="Refund Records">
      <AdminEmptyNotice title="No refunds" body="No settled transaction exists to refund. A real implementation would never allow editing a settled transaction's value directly — only an auditable correction record."/>
    </AdminCard>
  </>
}
