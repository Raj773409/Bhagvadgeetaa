import { AdminCard, AdminPageHeader, DataTable } from '../components/ui'
import type { NotificationDelivery } from '../../data/backendSchema'

export default function NotificationsAdminPage() {
  const rows: (NotificationDelivery & { id: string })[] = []
  return <>
    <AdminPageHeader title="Notifications" description="Delivery log for every transactional and announcement message." trail={['Communications', 'Notifications']}/>
    <AdminCard title="Delivery Log">
      <DataTable<NotificationDelivery & { id: string }>
        columns={[{ key: 'notificationId', label: 'Notification' }, { key: 'channel', label: 'Channel' }, { key: 'deliveredAt', label: 'Delivered' }, { key: 'error', label: 'Error' }]}
        rows={rows} emptyTitle="No notifications sent" emptyBody="No email provider is connected, so nothing has been sent — this log would never show a message as delivered unless the provider actually accepted it."
      />
    </AdminCard>
  </>
}
