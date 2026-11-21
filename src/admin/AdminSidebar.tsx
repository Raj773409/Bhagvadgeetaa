import { NavLink } from 'react-router-dom'
import { Icon } from '../components/ui'
import { usePreviewRole } from './PreviewRoleContext'
import type { Permission } from './permissions'

type NavItem = { label: string; href: string; icon: string; permission: Permission }
const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: 'dashboard', permission: 'dashboard.view' },
  { label: 'Participants', href: '/admin/participants', icon: 'people', permission: 'participants.view' },
  { label: 'Registrations', href: '/admin/registrations', icon: 'list', permission: 'participants.view' },
  { label: 'Countries', href: '/admin/countries', icon: 'countries', permission: 'countries.view' },
  { label: 'Languages', href: '/admin/languages', icon: 'letters', permission: 'content.view' },
  { label: 'Events', href: '/admin/events', icon: 'events', permission: 'events.view' },
  { label: 'Digital Passes', href: '/admin/passes', icon: 'checkin', permission: 'events.view' },
  { label: 'Check-in', href: '/admin/checkin', icon: 'checkin', permission: 'checkin.operate' },
  { label: 'Content Management', href: '/admin/content', icon: 'content', permission: 'content.view' },
  { label: 'Media Library', href: '/admin/media', icon: 'media', permission: 'content.view' },
  { label: 'Spiritual Leadership', href: '/admin/leadership', icon: 'people', permission: 'content.view' },
  { label: 'Donations & Finance', href: '/admin/finance', icon: 'finance', permission: 'finance.view' },
  { label: 'Partnerships', href: '/admin/partnerships', icon: 'partnerships', permission: 'partnerships.view' },
  { label: 'Volunteers', href: '/admin/volunteers', icon: 'people', permission: 'volunteers.view' },
  { label: 'Notifications', href: '/admin/notifications', icon: 'mail', permission: 'communications.view' },
  { label: 'Support', href: '/admin/support', icon: 'support', permission: 'support.view' },
  { label: 'Analytics', href: '/admin/analytics', icon: 'analytics', permission: 'analytics.view' },
  { label: 'Audit Logs', href: '/admin/audit', icon: 'audit', permission: 'audit.view' },
  { label: 'Staff & Permissions', href: '/admin/staff', icon: 'staff', permission: 'staff.view' },
  { label: 'Settings', href: '/admin/settings', icon: 'settings', permission: 'settings.view' },
  { label: 'AI Intelligence Center', href: '/admin/ai-center', icon: 'analytics', permission: 'ai.view' },
]
export function AdminSidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const { can } = usePreviewRole()
  return <nav className={'admin-sidebar' + (open ? ' is-open' : '')} aria-label="Admin navigation">
    <div className="admin-sidebar-brand">
      <img src="/images/emblem-144.webp" width="32" height="32" alt=""/>
      <div><strong>BGVM 2027</strong><small>Admin Command Center</small></div>
    </div>
    <ul>{navItems.filter(item => can(item.permission)).map(item => <li key={item.href}>
      <NavLink to={item.href} end={item.href === '/admin'} onClick={onNavigate} className={({ isActive }) => isActive ? 'is-active' : ''}>
        <Icon name={item.icon} size={17}/>{item.label}
      </NavLink>
    </li>)}</ul>
  </nav>
}
