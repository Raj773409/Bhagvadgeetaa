import { AdminCard, AdminPageHeader, AdminStatusBadge, KPIStatCard } from '../components/ui'
import { chapters } from '../../data/chapters'

export default function ChaptersAdminPage() {
  const published = chapters.filter(chapter => chapter.id === 2).length
  return <>
    <AdminPageHeader title="18 Chapters" description="Chapter directory sourced from the verified chapter data model." trail={['Content Management', '18 Chapters']}/>
    <div className="kpi-grid">
      <KPIStatCard label="Total Chapters" value="18"/>
      <KPIStatCard label="Verse Published" value={String(published)}/>
      <KPIStatCard label="Editorial Pending" value={String(chapters.length - published)}/>
    </div>
    <AdminCard title="Chapter Records">
      <div className="admin-table-wrap"><table className="admin-table">
        <thead><tr><th>#</th><th>Sanskrit Title</th><th>English Title</th><th>Verses</th><th>Verse Status</th></tr></thead>
        <tbody>{chapters.map(chapter => <tr key={chapter.id}>
          <td>{String(chapter.id).padStart(2, '0')}</td><td lang="sa">{chapter.transliteration}</td><td>{chapter.titleEn}</td><td>{chapter.verses}</td>
          <td><AdminStatusBadge label={chapter.id === 2 ? 'Published' : 'Editorial Pending'} tone={chapter.id === 2 ? 'positive' : 'warning'}/></td>
        </tr>)}</tbody>
      </table></div>
    </AdminCard>
  </>
}
