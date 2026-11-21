import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { AdminCard, AdminEmptyNotice, AdminPageHeader } from '../components/ui'
import { getCountry } from '../../data/countries'

export default function CountryEditPage() {
  const { countryId } = useParams()
  const country = countryId ? getCountry(countryId) : undefined
  const [intro, setIntro] = useState(country?.intro.en ?? '')
  if (!country) return <Navigate to="/admin/countries" replace/>
  return <>
    <AdminPageHeader title={'Edit · ' + country.name.en} description="Changes require editorial approval before publishing." trail={['Countries', country.name.en, 'Edit']}/>
    <AdminCard title="Editable Fields">
      <form className="admin-form" onSubmit={event => event.preventDefault()}>
        <label className="admin-form-field">
          <span>English introduction</span>
          <textarea rows={3} value={intro} onChange={event => setIntro(event.target.value)}/>
        </label>
        <label className="admin-form-field">
          <span>National language(s)</span>
          <input defaultValue={country.nationalLanguages}/>
        </label>
        <AdminEmptyNotice title="Saving is not yet connected" body="This form edits real seed data in memory only, for preview. Publishing requires the CMS backend described in the Phase 05 architecture notes — no change here is persisted or visible to site visitors."/>
        <div className="admin-form-actions">
          <button type="button" className="admin-btn admin-btn-ghost" disabled>Save Draft</button>
          <button type="button" className="admin-btn admin-btn-primary" disabled>Publish</button>
        </div>
      </form>
    </AdminCard>
  </>
}
