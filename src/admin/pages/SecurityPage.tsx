import { AdminCard, AdminPageHeader, AdminStatusBadge } from '../components/ui'

const controls = [
  'Authentication (session-based, not a localStorage flag)',
  'Multi-factor authentication for privileged roles',
  'Role-based access control enforced server-side',
  'Country-level data scoping for coordinators',
  'Short-lived sessions with secure renewal',
  'Rate limiting on authentication and write endpoints',
  'CSRF protection on state-changing requests',
  'Secure, httpOnly, SameSite cookie configuration',
  'Server-side input validation on every endpoint',
  'Malware-scanned file uploads with private storage',
  'Managed secret storage (no secrets in the client bundle)',
  'Structured audit logging with sensitive-data redaction',
]
export default function SecurityPage() {
  return <>
    <AdminPageHeader title="Security" description="Required controls for production. None are implemented, because no backend exists to enforce them." trail={['Security']}/>
    <AdminCard title="Required Security Controls">
      <ul className="admin-checklist">
        {controls.map(control => <li key={control}><AdminStatusBadge label="Not implemented" tone="negative"/><span>{control}</span></li>)}
      </ul>
    </AdminCard>
    <AdminCard title="What This Preview Does Not Do">
      <ul className="admin-checklist">
        <li><AdminStatusBadge label="Confirmed" tone="positive"/><span>No hardcoded administrative bypass or demo credentials exist anywhere in this codebase.</span></li>
        <li><AdminStatusBadge label="Confirmed" tone="positive"/><span>The role switcher in the top bar changes only which nav items render in this browser tab — it checks no server and grants no real access.</span></li>
      </ul>
    </AdminCard>
  </>
}
