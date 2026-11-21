import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PageCta, PremiumSectionHeading, ValueCard } from '../components/shared'
import { PrimaryButton } from '../components/ui'
import { useDocumentMeta } from '../utils/seo'

export default function SupportMissionPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const d = t.pages.donate
  useDocumentMeta(d.missionHeading + ' · ' + t.title.join(' '), d.missionIntro)
  return <>
    <InnerPageHero lang={lang} eyebrow={d.missionEyebrow} heading={d.missionHeading} breadcrumb={[{ label: d.missionHeading }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={d.missionEyebrow} heading={d.missionHeading} lede={d.missionIntro} align="center"/>
      <p className="section-lede" style={{ textAlign: 'center' }}>{d.missionBody}</p>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={d.missionEyebrow} heading={d.purposesHeading} align="center"/>
      <div className="pillar-grid">{d.purposes.map(purpose => <ValueCard key={purpose.title} title={purpose.title} body={purpose.body}/>)}</div>
    </EditorialSection>
    <EditorialSection>
      <PageCta heading={d.missionHeading} body={d.missionBody}>
        <PrimaryButton href="/donate">{d.proceedCta}</PrimaryButton>
      </PageCta>
    </EditorialSection>
  </>
}
