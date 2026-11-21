import { useParams } from 'react-router-dom'
import { AdminCard, AdminEmptyNotice, AdminPageHeader, AdminStatusBadge } from '../components/ui'

export default function ContentPageDetailPage() {
  const { id } = useParams()
  return <>
    <AdminPageHeader title={'Page · ' + id} description="Draft, review, publish and version history for this page." trail={['Content Management', 'Pages', id ?? '']}/>
    <div className="admin-grid-2">
      <AdminCard title="Status">
        <p><AdminStatusBadge label="Published" tone="positive"/> — this page is real and live on the public site today.</p>
      </AdminCard>
      <AdminCard title="Version History">
        <AdminEmptyNotice title="No revision history" body="Draft/review/publish workflow and rollback require a connected CMS backend with stored revisions — none exist yet, so this page was edited directly in source control."/>
      </AdminCard>
    </div>
  </>
}
