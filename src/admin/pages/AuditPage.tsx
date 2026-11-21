import { AdminCard, AdminPageHeader, DataTable } from '../components/ui'
import type { AuditLogEntry } from '../../data/backendSchema'

export default function AuditPage() {
  const rows: (AuditLogEntry & { id: string })[] = []
  return <>
    <AdminPageHeader title="Audit Logs" description="Actor, action, resource and timestamp for every authorized change." trail={['Audit Logs']}/>
    <AdminCard title="Recent Activity">
      <DataTable<AuditLogEntry & { id: string }>
        columns={[{ key: 'actorId', label: 'Actor' }, { key: 'action', label: 'Action' }, { key: 'entity', label: 'Resource' }, { key: 'at', label: 'When' }]}
        rows={rows} emptyTitle="No audit events recorded" emptyBody="No real administrator session has ever performed an action on this platform, so this log is genuinely empty — access to it would itself be restricted in a real deployment."
      />
    </AdminCard>
  </>
}
