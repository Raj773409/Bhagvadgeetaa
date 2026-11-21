import { AdminCard, AdminEmptyNotice, AdminPageHeader } from '../components/ui'

export default function PassesAdminPage() {
  return <>
    <AdminPageHeader title="Digital Passes" description="Issued event passes, QR tokens and revocation status." trail={['Digital Passes']}/>
    <AdminCard title="Issued Passes">
      <AdminEmptyNotice title="No passes issued" body="A pass is only issued after a registration is reviewed and approved by a connected backend. Since no registrations exist yet (see Participants), no passes have been issued, and none are fabricated here."/>
    </AdminCard>
  </>
}
