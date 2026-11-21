import { AdminCard, AdminPageHeader, AdminStatusBadge } from '../components/ui'

const integrations = [
  { name: 'Relational Database', need: 'Persists users, registrations, donations, events, audit logs and every other record in this admin area.' },
  { name: 'Authentication Provider', need: 'Session-based sign-in and MFA for staff; without it, no real login can exist anywhere on this site.' },
  { name: 'Payment Gateway', need: 'Server-side order creation and signature/webhook verification for donations.' },
  { name: 'Transactional Email Provider', need: 'Registration confirmations, status updates and announcement delivery.' },
  { name: 'File/Media Storage', need: 'Private, malware-scanned storage for uploaded media and application attachments.' },
  { name: 'Website Analytics', need: 'Real visitor and content-performance metrics for the Analytics module.' },
]
export default function SettingsIntegrationsPage() {
  return <>
    <AdminPageHeader title="Integration Health" description="The true connection status of every service this platform depends on." trail={['Settings', 'Integrations']}/>
    <AdminCard title="Required External Services">
      <ul className="admin-checklist">
        {integrations.map(integration => <li key={integration.name}>
          <AdminStatusBadge label="Not connected" tone="negative"/>
          <span><strong>{integration.name}</strong> — {integration.need}</span>
        </li>)}
      </ul>
      <p className="admin-hint" style={{ marginTop: 14 }}>No API keys or payment secrets are stored in this client application — there is nothing to leak because nothing has been configured. See <code>src/data/backendSchema.ts</code> for the data model these services would need to support.</p>
    </AdminCard>
  </>
}
