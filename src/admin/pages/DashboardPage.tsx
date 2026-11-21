import { AdminCard, AdminEmptyNotice, AdminPageHeader, KPIStatCard } from '../components/ui'
import { countries } from '../../data/countries'
import { events, getEventStatus } from '../../data/events'
import { content } from '../../content'

export default function DashboardPage() {
  const upcoming = events.filter(event => getEventStatus(event) === 'upcoming')
  return <>
    <AdminPageHeader title="Executive Dashboard" description="Global overview of the Mahotsav — every figure below is real, not simulated." trail={['Dashboard']}/>
    <div className="kpi-grid">
      <KPIStatCard label="Total Registrations" value="0" hint="No backend is connected, so no registrations have been persisted yet"/>
      <KPIStatCard label="Pending Review" value="0"/>
      <KPIStatCard label="Approved Participants" value="0"/>
      <KPIStatCard label="Countries (Global Participation)" value={String(countries.length)} hint="Real — from the published country directory"/>
      <KPIStatCard label="Confirmed Check-ins" value="0"/>
      <KPIStatCard label="Verified Donations" value="₹0" hint="No payment provider is connected"/>
      <KPIStatCard label="Upcoming Milestones" value={String(upcoming.length)} hint="Real — Curtain Raiser and Vishwa Mahotsav"/>
      <KPIStatCard label="Open Support Requests" value="0"/>
    </div>
    <div className="admin-grid-2">
      <AdminCard title="Registrations Trend">
        <AdminEmptyNotice title="No trend data yet" body="This chart will populate once registrations are recorded in a connected database."/>
      </AdminCard>
      <AdminCard title="Country-wise Participation">
        <AdminEmptyNotice title="No participation data yet" body={`The directory lists ${countries.length} confirmed countries, but no participant has registered against any of them yet.`}/>
      </AdminCard>
    </div>
    <AdminCard title="Upcoming Milestones">
      <ul className="admin-milestone-list">
        {events.map(event => <li key={event.slug}>
          <strong>{content.en.nav[event.titleKey]}</strong>
          <span>{new Date(event.dateISO + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</span>
          <span className="admin-badge admin-badge-neutral">{getEventStatus(event)}</span>
        </li>)}
      </ul>
    </AdminCard>
    <div className="admin-grid-2">
      <AdminCard title="Pending Approval Queue">
        <AdminEmptyNotice title="Queue is empty" body="Registration and application reviews will appear here once submissions are stored by a connected backend."/>
      </AdminCard>
      <AdminCard title="Recent Authorized Activity">
        <AdminEmptyNotice title="No activity recorded" body="Audit events will appear here once real administrator sessions and actions exist."/>
      </AdminCard>
    </div>
  </>
}
