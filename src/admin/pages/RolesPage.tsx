import { AdminCard, AdminPageHeader } from '../components/ui'
import { moduleCatalog, roles } from '../permissions'

export default function RolesPage() {
  return <>
    <AdminPageHeader title="Roles & Permission Matrix" description="The designed authorization model. Permissions, not role names, are the source of truth." trail={['Staff & Permissions', 'Roles']}/>
    <AdminCard title="Permission Matrix">
      <div className="admin-table-wrap" tabIndex={0} role="region" aria-label="Scrollable data table">
        <table className="admin-table admin-matrix">
          <thead><tr><th>Module</th>{roles.map(role => <th key={role.id} title={role.description}>{role.label}</th>)}</tr></thead>
          <tbody>{moduleCatalog.map(module => <tr key={module.permission}>
            <td>{module.label}</td>
            {roles.map(role => <td key={role.id} style={{ textAlign: 'center' }}>{role.permissions.includes(module.permission) ? 'âœ“' : 'â€”'}</td>)}
          </tr>)}</tbody>
        </table>
      </div>
      <p className="admin-hint" style={{ marginTop: 14 }}>
        Country Coordinators are additionally scoped to only their assigned countries in a real implementation, and no role can approve its own high-risk permission changes â€” both rules are documented here, not yet enforceable without a real authorization backend.
      </p>
    </AdminCard>
  </>
}
