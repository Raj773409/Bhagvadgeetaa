import { Link } from 'react-router-dom'
import { AdminCard, AdminPageHeader, AdminStatusBadge, KPIStatCard } from '../components/ui'
import { countries } from '../../data/countries'

export default function CountriesPage() {
  return <>
    <AdminPageHeader title="Global Country Control" description="Manage the 18 participating countries, content and programmes." trail={['Countries']}/>
    <div className="kpi-grid">
      <KPIStatCard label="Countries" value={String(countries.length)}/>
      <KPIStatCard label="Published Profiles" value={String(countries.length)} hint="All 18 country pages are live on the public site"/>
      <KPIStatCard label="Awaiting Coordinators" value={String(countries.length)} hint="No coordinators have been confirmed for any country yet"/>
    </div>
    <AdminCard title="Country Directory">
      <div className="admin-table-wrap" tabIndex={0} role="region" aria-label="Scrollable data table">
        <table className="admin-table">
          <thead><tr><th>Country</th><th>National Language(s)</th><th>Coordinator</th><th>Status</th><th/></tr></thead>
          <tbody>{countries.map(country => <tr key={country.id}>
            <td>{country.flag} {country.name.en}{country.isOrigin && <AdminStatusBadge label="Origin" tone="positive"/>}</td>
            <td>{country.nationalLanguages}</td>
            <td><AdminStatusBadge label="Unassigned" tone="warning"/></td>
            <td><AdminStatusBadge label="Published" tone="positive"/></td>
            <td><Link className="admin-link" to={'/admin/countries/' + country.slug}>View</Link></td>
          </tr>)}</tbody>
        </table>
      </div>
    </AdminCard>
  </>
}
