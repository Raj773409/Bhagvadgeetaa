import { useEffect, useState } from 'react'
import { AdminCard, AdminPageHeader, AdminStatusBadge } from '../components/ui'
import { languageNames, languages } from '../../content'

const templateKeys = [
  { id: 'registration_received', label: 'Registration Received' },
  { id: 'registration_approved', label: 'Registration Approved' },
  { id: 'event_reminder', label: 'Event Reminder' },
] as const
type TemplateId = typeof templateKeys[number]['id']

function storageKey(templateId: TemplateId, lang: string) { return `mahotsav-admin-template-${templateId}-${lang}` }

export default function TemplatesPage() {
  const [templateId, setTemplateId] = useState<TemplateId>('registration_received')
  const [lang, setLang] = useState<typeof languages[number]>('en')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    try {
      setSubject(localStorage.getItem(storageKey(templateId, lang) + '-subject') ?? '')
      setBody(localStorage.getItem(storageKey(templateId, lang) + '-body') ?? '')
    } catch { setSubject(''); setBody('') }
  }, [templateId, lang])

  function save() {
    try {
      localStorage.setItem(storageKey(templateId, lang) + '-subject', subject)
      localStorage.setItem(storageKey(templateId, lang) + '-body', body)
    } catch { /* local draft only, storage is optional */ }
  }

  return <>
    <AdminPageHeader title="Email Templates" description="Draft language-specific templates locally. No sending provider is connected." trail={['Communications', 'Templates']}/>
    <AdminCard title="Template Editor" action={<AdminStatusBadge label="Local draft only" tone="warning"/>}>
      <div className="admin-filter-toolbar">
        <select aria-label="Template" value={templateId} onChange={event => setTemplateId(event.target.value as TemplateId)}>
          {templateKeys.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
        <select aria-label="Language" value={lang} onChange={event => setLang(event.target.value as typeof lang)}>
          {languages.map(code => <option key={code} value={code}>{languageNames[code]}</option>)}
        </select>
      </div>
      <form className="admin-form" onSubmit={event => { event.preventDefault(); save() }}>
        <label className="admin-form-field"><span>Subject</span><input value={subject} onChange={event => setSubject(event.target.value)} placeholder="Subject line…"/></label>
        <label className="admin-form-field"><span>Body</span><textarea rows={8} value={body} onChange={event => setBody(event.target.value)} placeholder="Message body…"/></label>
        <p className="admin-hint">Saved only in this browser as a draft. Sending requires a connected transactional email provider, which this site does not have.</p>
        <div className="admin-form-actions"><button type="submit" className="admin-btn admin-btn-primary">Save Draft Locally</button></div>
      </form>
    </AdminCard>
  </>
}
