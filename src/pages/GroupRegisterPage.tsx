import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { PrimaryButton } from '../components/ui'
import { useDocumentMeta } from '../utils/seo'

export default function GroupRegisterPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const g = t.pages.groupRegister
  useDocumentMeta(g.heading + ' · ' + t.title.join(' '), g.intro)
  return <>
    <InnerPageHero lang={lang} eyebrow={t.pages.participate.eyebrow} heading={g.heading} breadcrumb={[{ label: t.register, href: '/participate' }, { label: g.heading }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.pages.participate.eyebrow} heading={g.heading} lede={g.intro} align="center"/>
      <p className="section-lede" style={{ textAlign: 'center' }}>{g.body}</p>
      <div className="flex justify-center" style={{ marginTop: 26 }}>
        <PrimaryButton href="/participate/register?type=group">{g.cta}</PrimaryButton>
      </div>
    </EditorialSection>
  </>
}
