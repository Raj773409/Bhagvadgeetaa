import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, OrnamentalDivider } from '../components/shared'
import { PrimaryButton } from '../components/ui'
import { useDocumentMeta } from '../utils/seo'

export default function NotFoundPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  useDocumentMeta(t.notFound.title + ' · ' + t.title.join(' '), t.notFound.body)
  return <EditorialSection className="not-found">
    <OrnamentalDivider/>
    <h1>{t.notFound.title}</h1>
    <p className="section-lede">{t.notFound.body}</p>
    <div className="flex justify-center"><PrimaryButton href="/">{t.notFound.cta}</PrimaryButton></div>
  </EditorialSection>
}
