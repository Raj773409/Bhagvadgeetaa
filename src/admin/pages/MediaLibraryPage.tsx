import { AdminCard, AdminEmptyNotice, AdminPageHeader } from '../components/ui'
import { mediaItems } from '../../data/globalMedia'

export default function MediaLibraryPage() {
  return <>
    <AdminPageHeader title="Media Library" description="Approved photos and videos available for use across the public site." trail={['Media Library']}/>
    <AdminCard title={`Media (${mediaItems.length})`}>
      <AdminEmptyNotice title="No media uploaded" body="This mirrors the real state of the public Global Gallery — nothing has been submitted, rights-cleared and approved yet. Uploads here would require private storage and a malware/content review step before publication."/>
    </AdminCard>
  </>
}
