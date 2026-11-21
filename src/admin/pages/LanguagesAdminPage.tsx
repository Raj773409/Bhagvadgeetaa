import { AdminCard, AdminPageHeader, AdminStatusBadge } from '../components/ui'
import { languageNames, languages } from '../../content'
import { scriptureLanguages } from '../../data/languages'

export default function LanguagesAdminPage() {
  return <>
    <AdminPageHeader title="Languages" description="Interface languages and scripture translation coverage." trail={['Languages']}/>
    <div className="admin-grid-2">
      <AdminCard title="Website Interface Languages">
        <div className="admin-table-wrap"><table className="admin-table">
          <thead><tr><th>Language</th><th>Code</th><th>Status</th></tr></thead>
          <tbody>{languages.map(code => <tr key={code}><td>{languageNames[code]}</td><td>{code.toUpperCase()}</td><td><AdminStatusBadge label="Live" tone="positive"/></td></tr>)}</tbody>
        </table></div>
      </AdminCard>
      <AdminCard title="Scripture Translation Languages">
        <div className="admin-table-wrap"><table className="admin-table">
          <thead><tr><th>Language</th><th>Script</th><th>Status</th></tr></thead>
          <tbody>{scriptureLanguages.map(language => <tr key={language.id}><td>{language.nativeName} ({language.name})</td><td>{language.script}</td>
            <td><AdminStatusBadge label={language.verified ? 'Verified' : 'Pending'} tone={language.verified ? 'positive' : 'warning'}/></td></tr>)}</tbody>
        </table></div>
      </AdminCard>
    </div>
  </>
}
