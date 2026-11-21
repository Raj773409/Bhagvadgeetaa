import { AdminCard, AdminPageHeader, AdminStatusBadge } from '../components/ui'
import { languageNames, languages } from '../../content'

export default function SettingsLocalizationPage() {
  return <>
    <AdminPageHeader title="Localization" description="Interface languages live on the public site today." trail={['Settings', 'Localization']}/>
    <AdminCard title="Interface Languages">
      <div className="admin-table-wrap"><table className="admin-table">
        <thead><tr><th>Language</th><th>Code</th><th>Coverage</th><th>Status</th></tr></thead>
        <tbody>{languages.map(code => <tr key={code}><td>{languageNames[code]}</td><td>{code.toUpperCase()}</td><td>Full site</td><td><AdminStatusBadge label="Live" tone="positive"/></td></tr>)}</tbody>
      </table></div>
    </AdminCard>
    <AdminCard title="Admin Interface Language">
      <p>This admin area itself is English-only for now — a deliberate scope decision for this phase, since it is an internal operations tool rather than public-facing content. It can be localized later using the same content-object pattern as the public site.</p>
    </AdminCard>
  </>
}
