import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero } from '../components/shared'
import { DigitalPassPreview, IntegrationPendingNotice } from '../components/participation'
import { PrimaryButton } from '../components/ui'
import { useDocumentMeta } from '../utils/seo'

export default function PassPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const a = t.pages.account
  useDocumentMeta(a.passHeading + ' · ' + t.title.join(' '), a.passBody)
  return <>
    <InnerPageHero lang={lang} eyebrow={a.heading} heading={a.passHeading} breadcrumb={[{ label: a.heading, href: '/participant' }, { label: a.passHeading }]}/>
    <EditorialSection>
      <div className="flex justify-center">
        <DigitalPassPreview sampleLabel={a.passSampleLabel} name="—" eventLabel="—" dateLabel="—" reference="SAMPLE-0000"/>
      </div>
      <IntegrationPendingNotice title={a.passHeading} body={a.passBody}/>
      <div className="flex justify-center"><PrimaryButton href="/participate">{a.backCta}</PrimaryButton></div>
    </EditorialSection>
  </>
}
