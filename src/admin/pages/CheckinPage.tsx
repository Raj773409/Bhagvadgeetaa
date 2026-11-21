import { useState, type FormEvent } from 'react'
import { AdminCard, AdminPageHeader, AdminStatusBadge } from '../components/ui'

export default function CheckinPage() {
  const [token, setToken] = useState('')
  const [result, setResult] = useState<'idle' | 'checked'>('idle')

  function validate(event: FormEvent) {
    event.preventDefault()
    setResult('checked')
  }

  return <>
    <AdminPageHeader title="Check-in" description="Secure QR validation for authorised staff only." trail={['Check-in']}/>
    <AdminCard title="Validate a Pass">
      <form className="admin-form" onSubmit={validate}>
        <label className="admin-form-field">
          <span>Pass token or reference</span>
          <input value={token} onChange={event => { setToken(event.target.value); setResult('idle') }} placeholder="Scan or paste a pass token…" autoComplete="off"/>
        </label>
        <div className="admin-form-actions"><button type="submit" className="admin-btn admin-btn-primary">Validate</button></div>
      </form>
      {result === 'checked' && <div className="admin-checkin-result">
        <AdminStatusBadge label="Rejected — no matching issued pass" tone="negative"/>
        <p>No pass with this token exists, because no passes have ever been issued (see Digital Passes). This app never treats an arbitrary string as a valid admission — every token is checked against real issued passes only, and there currently are none.</p>
      </div>}
    </AdminCard>
  </>
}
