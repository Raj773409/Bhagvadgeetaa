import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AdminSidebar } from './AdminSidebar'
import { AdminTopbar } from './AdminTopbar'
import { PreviewRoleProvider } from './PreviewRoleContext'
import './admin.css'

function AdminShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  useEffect(() => { setSidebarOpen(false); window.scrollTo(0, 0) }, [location.pathname])
  return <div className="admin-shell">
    <AdminSidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)}/>
    {sidebarOpen && <button type="button" className="admin-sidebar-backdrop" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}/>}
    <div className="admin-main">
      <AdminTopbar onMenuToggle={() => setSidebarOpen(o => !o)}/>
      <div className="admin-notice" role="status">
        No authentication, database, payment or email provider is connected to this admin area — every screen reflects real site content where it exists and honest empty states everywhere else. Nothing shown here is fabricated.
      </div>
      <main className="admin-content"><Outlet/></main>
    </div>
  </div>
}
export function AdminLayout() {
  return <PreviewRoleProvider><AdminShell/></PreviewRoleProvider>
}
