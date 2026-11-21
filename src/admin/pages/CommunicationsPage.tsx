import { Link } from 'react-router-dom'
import { AdminCard, AdminPageHeader } from '../components/ui'

export default function CommunicationsPage() {
  return <>
    <AdminPageHeader title="Communication Control" description="Email templates, announcements and delivery logs." trail={['Communications']}/>
    <div className="admin-grid-2">
      <AdminCard title="Notifications"><p>Transactional message logs and delivery failures.</p><Link className="admin-link" to="/admin/notifications">Open →</Link></AdminCard>
      <AdminCard title="Templates"><p>Draft and preview language-specific email templates.</p><Link className="admin-link" to="/admin/templates">Open →</Link></AdminCard>
    </div>
    <AdminCard title="Delivery Provider Status">
      <p>No transactional email provider (e.g. a service like Resend or SES) is connected. No send action anywhere in this admin area will report success unless a real provider accepts the request — bulk sends additionally require explicit confirmation and respect participant communication preferences.</p>
    </AdminCard>
  </>
}
