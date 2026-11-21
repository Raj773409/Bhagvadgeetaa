import { Link } from 'react-router-dom'
import { AdminCard, AdminPageHeader, AdminStatusBadge } from '../components/ui'

const pages = [
  { id: 'home', title: 'Homepage', publicPath: '/', updated: 'Built in Phase 01' },
  { id: 'about', title: 'About the Mahotsav', publicPath: '/about', updated: 'Built in Phase 02' },
  { id: 'gita', title: 'The Bhagavad Gita', publicPath: '/gita', updated: 'Built in Phase 02' },
  { id: 'leadership', title: 'Spiritual Leadership', publicPath: '/leadership', updated: 'Built in Phase 02' },
  { id: 'legacy', title: 'Legacy & Impact', publicPath: '/legacy', updated: 'Built in Phase 02' },
  { id: 'events', title: 'Ceremonies & Events', publicPath: '/events', updated: 'Built in Phase 02' },
  { id: 'global-journey', title: 'Global Journey', publicPath: '/global-journey', updated: 'Built in Phase 03' },
  { id: 'participate', title: 'Participate', publicPath: '/participate', updated: 'Built in Phase 04' },
]
export default function ContentPagesPage() {
  return <>
    <AdminPageHeader title="Pages" description="Every page listed here is real and already live on the public site." trail={['Content Management', 'Pages']}/>
    <AdminCard title="Published Pages">
      <div className="admin-table-wrap" tabIndex={0} role="region" aria-label="Scrollable data table"><table className="admin-table">
        <thead><tr><th>Page</th><th>Public Route</th><th>Status</th><th>Note</th><th/></tr></thead>
        <tbody>{pages.map(page => <tr key={page.id}>
          <td>{page.title}</td><td><code>{page.publicPath}</code></td>
          <td><AdminStatusBadge label="Published" tone="positive"/></td><td>{page.updated}</td>
          <td><Link className="admin-link" to={'/admin/content/pages/' + page.id}>Manage</Link></td>
        </tr>)}</tbody>
      </table></div>
    </AdminCard>
  </>
}
