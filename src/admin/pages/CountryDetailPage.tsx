import { Link, Navigate, useParams } from 'react-router-dom'
import { AdminCard, AdminEmptyNotice, AdminPageHeader, AdminStatusBadge } from '../components/ui'
import { getCountry } from '../../data/countries'

export default function CountryDetailPage() {
  const { countryId } = useParams()
  const country = countryId ? getCountry(countryId) : undefined
  if (!country) return <Navigate to="/admin/countries" replace/>
  return <>
    <AdminPageHeader title={country.flag + ' ' + country.name.en} description="Published country profile and programme status."
      trail={['Countries', country.name.en]}
      action={<Link className="admin-btn admin-btn-primary" to={'/admin/countries/' + country.slug + '/edit'}>Edit Profile</Link>}/>
    <div className="admin-grid-2">
      <AdminCard title="Profile">
        <dl className="admin-dl">
          <div><dt>English name</dt><dd>{country.name.en}</dd></div>
          <div><dt>Hindi name</dt><dd lang="hi">{country.name.hi}</dd></div>
          <div><dt>Telugu name</dt><dd lang="te">{country.name.te}</dd></div>
          <div><dt>National language(s)</dt><dd>{country.nationalLanguages}</dd></div>
          <div><dt>Coordinates</dt><dd>{country.coordinates[0]}, {country.coordinates[1]}</dd></div>
          <div><dt>Publication status</dt><dd><AdminStatusBadge label="Published" tone="positive"/></dd></div>
        </dl>
      </AdminCard>
      <AdminCard title="Coordinators">
        <AdminEmptyNotice title="No coordinators assigned" body="Country coordinator records are not invented — none have been confirmed for this country yet."/>
      </AdminCard>
    </div>
    <AdminCard title="Country Gallery">
      <AdminEmptyNotice title="Gallery is empty" body="No approved media exists for this country yet (matches the public Global Gallery, which is genuinely empty)."/>
    </AdminCard>
  </>
}
