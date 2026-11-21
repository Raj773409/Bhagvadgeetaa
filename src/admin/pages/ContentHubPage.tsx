import { Link } from 'react-router-dom'
import { AdminCard, AdminPageHeader } from '../components/ui'

const sections = [
  { title: 'Pages', href: '/admin/content/pages', body: 'Homepage, About, Gita, Events, Legacy and Global Journey sections.' },
  { title: '18 Chapters', href: '/admin/content/chapters', body: 'Chapter directory and detail pages, sourced from the verified chapter data model.' },
  { title: 'Verses', href: '/admin/content/verses', body: 'Scripture records — Sanskrit, transliteration, translation and attribution.' },
]
export default function ContentHubPage() {
  return <>
    <AdminPageHeader title="Content Management (CMS)" description="Create, edit, review and publish website content." trail={['Content Management']}/>
    <div className="admin-grid-3">
      {sections.map(section => <AdminCard key={section.href} title={section.title}>
        <p>{section.body}</p>
        <Link className="admin-link" to={section.href}>Open →</Link>
      </AdminCard>)}
    </div>
  </>
}
