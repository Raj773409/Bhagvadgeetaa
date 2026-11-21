import { useParams } from 'react-router-dom'
import { AdminCard, AdminEmptyNotice, AdminPageHeader } from '../components/ui'

export default function ParticipantDetailPage() {
  const { id } = useParams()
  return <>
    <AdminPageHeader title={'Participant ' + id} description="Participant detail, consent history and eligibility review." trail={['Participants', id ?? '']}/>
    <AdminCard title="Record">
      <AdminEmptyNotice title="No record found" body="No participant records exist because no backend is connected to persist registrations. Once one is, this page will show full participant details, consent history, eligibility review and approval actions."/>
    </AdminCard>
  </>
}
