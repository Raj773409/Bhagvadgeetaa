import { useLocation } from 'react-router-dom'
import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero } from '../components/shared'
import { IntegrationPendingNotice } from '../components/participation'
import { PrimaryButton } from '../components/ui'
import { useDocumentMeta } from '../utils/seo'

export default function AccountPage() {
  const { lang } = useLanguage()
  const location = useLocation()
  const t = content[lang]
  const a = t.pages.account
  const sectionLabel =
    location.pathname === '/participant/profile' ? t.pages.register.personalHeading :
    location.pathname === '/participant/registrations' ? t.pages.events.featuredHeading :
    location.pathname === '/participant/notifications' ? t.pages.legacy.storiesHeading :
    location.pathname === '/participant/support' ? a.supportCta :
    a.heading
  useDocumentMeta(sectionLabel + ' · ' + t.title.join(' '), a.pendingBody)
  return <>
    <InnerPageHero lang={lang} eyebrow={a.heading} heading={sectionLabel} breadcrumb={[{ label: a.heading, href: '/participant' }, { label: sectionLabel }]}/>
    <EditorialSection>
      <IntegrationPendingNotice title={a.pendingTitle} body={a.pendingBody}/>
      <div className="flex justify-center flex-wrap hero-actions" style={{ marginTop: 10 }}>
        <PrimaryButton href="/participate">{a.backCta}</PrimaryButton>
      </div>
    </EditorialSection>
  </>
}
