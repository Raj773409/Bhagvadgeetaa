import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero } from '../components/shared'
import { IntegrationPendingNotice } from '../components/participation'
import { useDocumentMeta } from '../utils/seo'

export default function ApplicationsStatusPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const a = t.pages.applicationsStatus
  useDocumentMeta(a.heading + ' · ' + t.title.join(' '), a.body)
  return <>
    <InnerPageHero lang={lang} eyebrow={t.pages.partner.eyebrow} heading={a.heading} breadcrumb={[{ label: a.heading }]}/>
    <EditorialSection>
      <IntegrationPendingNotice title={a.heading} body={a.body}/>
    </EditorialSection>
  </>
}
