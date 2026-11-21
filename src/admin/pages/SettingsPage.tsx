import { Link } from 'react-router-dom'
import { AdminCard, AdminPageHeader } from '../components/ui'

export default function SettingsPage() {
  return <>
    <AdminPageHeader title="Platform Settings" description="Branding, integrations, localization and legal configuration." trail={['Settings']}/>
    <div className="admin-grid-3">
      <AdminCard title="Branding"><p>Colour tokens and brand assets in active use.</p><Link className="admin-link" to="/admin/settings/branding">Open →</Link></AdminCard>
      <AdminCard title="Integrations"><p>Real connection status for every required external service.</p><Link className="admin-link" to="/admin/settings/integrations">Open →</Link></AdminCard>
      <AdminCard title="Localization"><p>Interface languages and translation completeness.</p><Link className="admin-link" to="/admin/settings/localization">Open →</Link></AdminCard>
    </div>
  </>
}
