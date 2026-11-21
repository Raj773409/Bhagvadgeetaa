/**
 * Reference RBAC model for the admin command center.
 *
 * No authentication backend is connected (see src/data/backendSchema.ts), so nothing here
 * grants real access — there is no session to authorize. This is the designed permission
 * model documented in code so a real auth/authorization layer can be built against it later.
 * The admin shell lets a visitor pick a "preview role" purely to demonstrate the nav-filtering
 * logic working correctly; it is clearly labeled as a demo, never presented as a real login.
 */
export type Permission =
  | 'dashboard.view'
  | 'participants.view' | 'participants.review'
  | 'countries.view' | 'countries.edit' | 'countries.publish'
  | 'content.view' | 'content.edit' | 'content.publish' | 'content.scripture.edit'
  | 'events.view' | 'events.edit' | 'checkin.operate'
  | 'finance.view' | 'finance.refund'
  | 'partnerships.view' | 'partnerships.review'
  | 'volunteers.view' | 'volunteers.review'
  | 'support.view' | 'support.respond'
  | 'communications.view' | 'communications.send'
  | 'analytics.view'
  | 'staff.view' | 'staff.manage' | 'roles.manage'
  | 'audit.view'
  | 'settings.view' | 'settings.manage'
  | 'ai.view'

export type RoleId =
  | 'super_administrator' | 'platform_administrator' | 'event_manager' | 'country_coordinator'
  | 'content_editor' | 'scripture_reviewer' | 'registration_reviewer' | 'finance_manager'
  | 'support_officer' | 'checkin_staff'

export type Role = { id: RoleId; label: string; description: string; permissions: Permission[] }

const all: Permission[] = [
  'dashboard.view', 'participants.view', 'participants.review', 'countries.view', 'countries.edit', 'countries.publish',
  'content.view', 'content.edit', 'content.publish', 'content.scripture.edit', 'events.view', 'events.edit', 'checkin.operate',
  'finance.view', 'finance.refund', 'partnerships.view', 'partnerships.review', 'volunteers.view', 'volunteers.review',
  'support.view', 'support.respond', 'communications.view', 'communications.send', 'analytics.view',
  'staff.view', 'staff.manage', 'roles.manage', 'audit.view', 'settings.view', 'settings.manage', 'ai.view',
]

export const roles: Role[] = [
  { id: 'super_administrator', label: 'Super Administrator', description: 'Full system access across every module.', permissions: all },
  { id: 'platform_administrator', label: 'Platform Administrator', description: 'Day-to-day operations without staff/role management.', permissions: all.filter(p => !['staff.manage', 'roles.manage'].includes(p)) },
  { id: 'event_manager', label: 'Event Manager', description: 'Manages events, schedules and check-in operations.', permissions: ['dashboard.view', 'events.view', 'events.edit', 'checkin.operate', 'participants.view', 'audit.view'] },
  { id: 'country_coordinator', label: 'Country Coordinator', description: 'Manages content and participants only within their assigned countries.', permissions: ['dashboard.view', 'countries.view', 'countries.edit', 'participants.view', 'content.view'] },
  { id: 'content_editor', label: 'Content Editor', description: 'Edits non-scriptural website content for review.', permissions: ['dashboard.view', 'content.view', 'content.edit', 'ai.view'] },
  { id: 'scripture_reviewer', label: 'Scripture Reviewer', description: 'The only role permitted to approve changes to verse records.', permissions: ['dashboard.view', 'content.view', 'content.scripture.edit', 'content.publish'] },
  { id: 'registration_reviewer', label: 'Registration Reviewer', description: 'Reviews and approves participant registrations.', permissions: ['dashboard.view', 'participants.view', 'participants.review', 'audit.view'] },
  { id: 'finance_manager', label: 'Finance Manager', description: 'Reconciles donations, transactions and approved refunds.', permissions: ['dashboard.view', 'finance.view', 'finance.refund', 'audit.view'] },
  { id: 'support_officer', label: 'Support Officer', description: 'Handles participant support tickets.', permissions: ['dashboard.view', 'support.view', 'support.respond'] },
  { id: 'checkin_staff', label: 'Check-in Staff', description: 'Operates on-site QR check-in only, no back-office access.', permissions: ['checkin.operate'] },
]
export function getRole(id: RoleId) { return roles.find(role => role.id === id)! }
export function roleHasPermission(id: RoleId, permission: Permission) { return getRole(id).permissions.includes(permission) }

export const moduleCatalog: { label: string; permission: Permission }[] = [
  { label: 'Dashboard', permission: 'dashboard.view' },
  { label: 'Participants', permission: 'participants.view' },
  { label: 'Countries', permission: 'countries.view' },
  { label: 'Content Management', permission: 'content.view' },
  { label: 'Events & Check-in', permission: 'events.view' },
  { label: 'Donations & Finance', permission: 'finance.view' },
  { label: 'Partnerships & Volunteers', permission: 'partnerships.view' },
  { label: 'Communications', permission: 'communications.view' },
  { label: 'Analytics', permission: 'analytics.view' },
  { label: 'Staff & Permissions', permission: 'staff.view' },
  { label: 'Audit Logs', permission: 'audit.view' },
  { label: 'Settings', permission: 'settings.view' },
  { label: 'AI Intelligence Center', permission: 'ai.view' },
]
