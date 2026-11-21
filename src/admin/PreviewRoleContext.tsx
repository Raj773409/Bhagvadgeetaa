import { createContext, useContext, useState, type ReactNode } from 'react'
import { type Permission, type RoleId, roleHasPermission, roles } from './permissions'

const PreviewRoleContext = createContext<{ roleId: RoleId; setRoleId: (id: RoleId) => void; can: (p: Permission) => boolean } | null>(null)

function initialRole(): RoleId {
  try {
    const stored = localStorage.getItem('mahotsav-admin-preview-role') as RoleId | null
    if (stored && roles.some(role => role.id === stored)) return stored
  } catch { /* preview role defaults without storage */ }
  return 'super_administrator'
}
export function PreviewRoleProvider({ children }: { children: ReactNode }) {
  const [roleId, setRoleIdState] = useState<RoleId>(initialRole)
  const setRoleId = (id: RoleId) => {
    setRoleIdState(id)
    try { localStorage.setItem('mahotsav-admin-preview-role', id) } catch { /* preview role works without storage */ }
  }
  return <PreviewRoleContext.Provider value={{ roleId, setRoleId, can: p => roleHasPermission(roleId, p) }}>{children}</PreviewRoleContext.Provider>
}
export function usePreviewRole() {
  const ctx = useContext(PreviewRoleContext)
  if (!ctx) throw new Error('usePreviewRole must be used within PreviewRoleProvider')
  return ctx
}
