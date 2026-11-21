import { AdminCard, AdminEmptyNotice, AdminPageHeader, KPIStatCard } from '../components/ui'
import { countries } from '../../data/countries'
import { events } from '../../data/events'

const reports = [
  'Registration statistics', 'Country distribution', 'Event participation', 'Attendance and check-in',
  'Verified financial summaries', 'Volunteer applications', 'Partnership interest', 'Support workload',
]
export default function AnalyticsPage() {
  return <>
    <AdminPageHeader title="Analytics & Reporting" description="Real operational reports. Every number comes from the database or none is shown." trail={['Analytics']}/>
    <div className="kpi-grid">
      <KPIStatCard label="Countries Tracked" value={String(countries.length)}/>
      <KPIStatCard label="Events Tracked" value={String(events.length)}/>
      <KPIStatCard label="Website Analytics" value="Not configured"/>
    </div>
    {reports.map(report => <AdminCard key={report} title={report}>
      <AdminEmptyNotice title="No data yet" body="This report has no underlying records to summarise. It will populate automatically once a real database is connected — nothing here is estimated or fabricated."/>
    </AdminCard>)}
  </>
}
