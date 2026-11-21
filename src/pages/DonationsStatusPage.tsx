import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero } from '../components/shared'
import { IntegrationPendingNotice } from '../components/participation'
import { useDocumentMeta } from '../utils/seo'

export default function DonationsStatusPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const d = t.pages.donate
  useDocumentMeta(d.statusHeading + ' · ' + t.title.join(' '), d.statusBody)
  return <>
    <InnerPageHero lang={lang} eyebrow={d.missionEyebrow} heading={d.statusHeading} breadcrumb={[{ label: d.missionHeading, href: '/support-the-mission' }, { label: d.statusHeading }]}/>
    <EditorialSection>
      <IntegrationPendingNotice title={d.statusHeading} body={d.statusBody}/>
    </EditorialSection>
  </>
}
