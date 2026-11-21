import { AdminCard, AdminEmptyNotice, AdminPageHeader } from '../components/ui'

export default function CheckinHistoryPage() {
  return <>
    <AdminPageHeader title="Check-in History" description="Audit trail of every check-in attempt, successful or rejected." trail={['Check-in', 'History']}/>
    <AdminCard title="Check-in Log">
      <AdminEmptyNotice title="No check-ins recorded" body="No events have occurred yet, and no passes exist to be scanned, so this log is genuinely empty."/>
    </AdminCard>
  </>
}
