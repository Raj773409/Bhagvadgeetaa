import { AdminCard, AdminEmptyNotice, AdminPageHeader } from '../components/ui'
import { distinguishedSpeakers, globalThoughtLeaders, spiritualAdvisors } from '../../data/leadership'

export default function LeadershipAdminPage() {
  const total = spiritualAdvisors.length + distinguishedSpeakers.length + globalThoughtLeaders.length
  return <>
    <AdminPageHeader title="Spiritual Leadership" description="Advisors, speakers and thought leaders shown on the public Leadership page." trail={['Spiritual Leadership']}/>
    <AdminCard title={`Roster (${total})`}>
      <AdminEmptyNotice title="No leaders confirmed yet" body="Matches the public site exactly: no spiritual advisor, speaker or thought leader has been confirmed, so none are invented here either."/>
    </AdminCard>
  </>
}
