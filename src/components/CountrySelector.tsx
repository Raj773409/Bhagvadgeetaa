import { useId } from 'react'
import { type Language } from '../content'
import { countries } from '../data/countries'

export function CountrySelector({ label, value, onChange, error, required, lang }: {
  label: string; value: string; onChange: (value: string) => void; error?: string; required?: boolean; lang: Language
}) {
  const id = useId()
  const errorId = id + '-error'
  return <label className="form-field" htmlFor={id}>
    <span className="form-label">{label}{required && <span aria-hidden="true"> *</span>}</span>
    <select id={id} value={value} aria-invalid={!!error} aria-describedby={error ? errorId : undefined} required={required}
      onChange={event => onChange(event.target.value)}>
      <option value="" disabled>—</option>
      {countries.map(country => <option key={country.id} value={country.name.en}>{country.flag} {country.name[lang]}</option>)}
      <option value="other">{lang === 'hi' ? 'अन्य / सूची में नहीं' : lang === 'te' ? 'ఇతర / జాబితాలో లేదు' : 'Other / not listed'}</option>
    </select>
    {error && <p id={errorId} className="form-error" role="alert">{error}</p>}
  </label>
}
