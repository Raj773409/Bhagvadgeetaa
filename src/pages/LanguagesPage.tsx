import { content, languageNames, languages, verseSource } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PendingNote, PremiumSectionHeading } from '../components/shared'
import { Icon } from '../components/ui'
import { scriptureLanguages } from '../data/languages'
import { useDocumentMeta } from '../utils/seo'

export default function LanguagesPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.languages
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  return <>
    <InnerPageHero lang={lang} eyebrow={p.eyebrow} heading={p.heading} breadcrumb={[{ label: t.nav.globalJourney, href: '/global-journey' }, { label: t.nav.languages }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.wisdom} heading={p.heading} lede={p.intro} align="center"/>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={p.eyebrow} heading={p.interfaceHeading} lede={p.interfaceBody} align="center"/>
      <div className="language-grid">{languages.map(code => <div className="language-card" key={code}>
        <span className="language-card-native">{languageNames[code]}</span>
        <span className="language-card-code">{code.toUpperCase()}</span>
      </div>)}</div>
    </EditorialSection>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={p.eyebrow} heading={p.scriptureHeading} lede={p.scriptureBody} align="center"/>
      <div className="language-grid">{scriptureLanguages.map(language => <div className="language-card" key={language.id}>
        <span className="language-card-native">{language.nativeName}</span>
        <span className="language-card-name">{language.name}</span>
        <span className="language-card-script">{language.script}</span>
      </div>)}</div>
      <div className="flex justify-center" style={{ marginTop: 26 }}>
        <a className="text-link" href={verseSource}>{p.readVerseCta}<Icon name="external" size={14}/></a>
      </div>
    </EditorialSection>
    <EditorialSection tone="paper">
      <PremiumSectionHeading eyebrow={p.eyebrow} heading={p.recitationHeading} align="center"/>
      <PendingNote>{p.recitationPending}</PendingNote>
    </EditorialSection>
  </>
}
