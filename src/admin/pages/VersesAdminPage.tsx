import { AdminCard, AdminEmptyNotice, AdminPageHeader, AdminStatusBadge } from '../components/ui'
import { verses } from '../../data/verses'
import { content } from '../../content'

export default function VersesAdminPage() {
  return <>
    <AdminPageHeader title="Verses" description="Scripture records â€” only Scripture Reviewerâ€“approved verses may be published." trail={['Content Management', 'Verses']}/>
    <AdminCard title="Approved Verse Records">
      <div className="admin-table-wrap" tabIndex={0} role="region" aria-label="Scrollable data table"><table className="admin-table">
        <thead><tr><th>Chapter.Verse</th><th>Sanskrit (original)</th><th>Attribution</th><th>Approved By</th><th>Status</th></tr></thead>
        <tbody>{verses.map(verse => <tr key={verse.chapter + '.' + verse.verseNumber}>
          <td>{verse.chapter}.{verse.verseNumber}</td>
          <td lang="sa" style={{ whiteSpace: 'pre-line' }}>{verse.sanskrit}</td>
          <td>{verse.attribution}</td>
          <td>Scripture Reviewer</td>
          <td><AdminStatusBadge label="Published" tone="positive"/></td>
        </tr>)}</tbody>
      </table></div>
    </AdminCard>
    <AdminCard title="English Translation (on record)">
      <blockquote className="admin-quote" cite={verses[0]?.source}>{content.en.translation}</blockquote>
    </AdminCard>
    <AdminCard title="Pending Scripture Review">
      <AdminEmptyNotice title="17 of 18 chapters have no verse on record" body="No Sanskrit text, transliteration or translation has been fabricated for the remaining chapters. Adding one requires Scripture Reviewer approval and a verified, rights-cleared source."/>
    </AdminCard>
  </>
}
