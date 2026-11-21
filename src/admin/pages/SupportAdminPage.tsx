import { AdminCard, AdminPageHeader, DataTable } from '../components/ui'
import type { SupportRequest } from '../../data/backendSchema'

export default function SupportAdminPage() {
  const rows: (SupportRequest & { id: string })[] = []
  return <>
    <AdminPageHeader title="Support" description="Participant support ticket inbox, priority and resolution tracking." trail={['Support']}/>
    <AdminCard title="Open Tickets">
      <DataTable<SupportRequest & { id: string }>
        columns={[{ key: 'subject', label: 'Subject' }, { key: 'email', label: 'From' }, { key: 'status', label: 'Status' }, { key: 'createdAt', label: 'Opened' }]}
        rows={rows} emptyTitle="Inbox is empty" emptyBody="No support channel is connected to this site yet, so no ticket has ever been created."
      />
    </AdminCard>
  </>
}
