import { Link } from 'react-router-dom'
import { AdminCard, AdminEmptyNotice, AdminPageHeader, KPIStatCard } from '../components/ui'
import { roles } from '../permissions'

export default function StaffPage() {
  return <>
    <AdminPageHeader title="Staff & Permissions" description="Manage users, access rights and platform security." trail={['Staff & Permissions']}
      action={<Link className="admin-btn admin-btn-primary" to="/admin/roles">View Role Matrix</Link>}/>
    <div className="kpi-grid">
      <KPIStatCard label="Designed Roles" value={String(roles.length)}/>
      <KPIStatCard label="Active Staff Accounts" value="0" hint="No authentication provider is connected — no real accounts exist"/>
      <KPIStatCard label="Audit Coverage" value="0 events logged"/>
    </div>
    <AdminCard title="Staff Accounts">
      <AdminEmptyNotice title="No staff accounts exist" body="This platform has no authentication backend, so there are no real administrator or staff logins — not even for the person previewing this page. The role switcher in the top bar demonstrates the navigation-filtering logic only; it never grants real access to anything."/>
    </AdminCard>
  </>
}
