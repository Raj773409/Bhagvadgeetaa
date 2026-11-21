import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero } from '../components/shared'
import { IntegrationPendingNotice } from '../components/participation'
import { useDocumentMeta } from '../utils/seo'

export default function DonationsReceiptsPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const d = t.pages.donate
  useDocumentMeta(d.receiptsHeading + ' · ' + t.title.join(' '), d.receiptsBody)
  return <>
    <InnerPageHero lang={lang} eyebrow={d.missionEyebrow} heading={d.receiptsHeading} breadcrumb={[{ label: d.missionHeading, href: '/support-the-mission' }, { label: d.receiptsHeading }]}/>
    <EditorialSection>
      <IntegrationPendingNotice title={d.receiptsHeading} body={d.receiptsBody}/>
    </EditorialSection>
  </>
}
