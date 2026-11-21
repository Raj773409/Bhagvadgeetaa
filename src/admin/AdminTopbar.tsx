import { Link } from 'react-router-dom'
import { Icon } from '../components/ui'
import { usePreviewRole } from './PreviewRoleContext'
import { getRole, roles } from './permissions'

export function AdminTopbar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { roleId, setRoleId } = usePreviewRole()
  return <header className="admin-topbar">
    <button type="button" className="admin-menu-toggle" aria-label="Toggle navigation" onClick={onMenuToggle}><Icon name="menu" size={20}/></button>
    <div className="admin-topbar-title">
      <strong>Executive Command Center</strong>
      <span>Preview mode — no authentication connected</span>
    </div>
    <label className="admin-role-preview">
      <span>Preview as role</span>
      <select value={roleId} onChange={event => setRoleId(event.target.value as typeof roleId)}>
        {roles.map(role => <option key={role.id} value={role.id}>{role.label}</option>)}
      </select>
    </label>
    <Link to="/" className="admin-btn admin-btn-ghost admin-exit">Exit to public site</Link>
    <span className="admin-account-chip" title={getRole(roleId).description}>{getRole(roleId).label}</span>
  </header>
}
