import { content } from '../content'
import { useLanguage } from '../components/LanguageContext'
import { EditorialSection, InnerPageHero, PremiumSectionHeading } from '../components/shared'
import { MediaGallery } from '../components/MediaGallery'
import { mediaItems } from '../data/globalMedia'
import { useDocumentMeta } from '../utils/seo'

export default function GalleryPage() {
  const { lang } = useLanguage()
  const t = content[lang]
  const p = t.pages.gallery
  useDocumentMeta(p.heading + ' · ' + t.title.join(' '), p.intro)
  return <>
    <InnerPageHero lang={lang} eyebrow={p.eyebrow} heading={p.heading} breadcrumb={[{ label: t.nav.globalJourney, href: '/global-journey' }, { label: t.nav.gallery }]}/>
    <EditorialSection>
      <PremiumSectionHeading eyebrow={t.wisdom} heading={p.heading} lede={p.intro} align="center"/>
      <MediaGallery items={mediaItems} emptyTitle={p.emptyTitle} emptyBody={p.emptyBody} allLabel={p.filterAll}/>
    </EditorialSection>
  </>
}
