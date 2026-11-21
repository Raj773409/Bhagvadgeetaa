import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { CinematicHero } from '../components/CinematicHero'
import { EventMilestonePreview, GlobalVisionPreview, SacredVerseSection } from '../components/WelcomeSections'
import { useDocumentMeta } from '../utils/seo'

export default function HomePage() {
  const { lang } = useLanguage()
  const t = content[lang]
  useDocumentMeta(t.title.join(' ') + ' 2027', t.eyebrow + ' — ' + t.visionText)
  return <>
    <CinematicHero lang={lang}/>
    <SacredVerseSection lang={lang}/>
    <GlobalVisionPreview lang={lang}/>
    <EventMilestonePreview lang={lang}/>
  </>
}
