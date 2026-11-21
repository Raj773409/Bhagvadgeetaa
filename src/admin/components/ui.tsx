import { useState, type ReactNode } from 'react'

export function KPIStatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return <div className="kpi-card">
    <span className="kpi-value">{value}</span>
    <span className="kpi-label">{label}</span>
    {hint && <span className="kpi-hint">{hint}</span>}
  </div>
}

export type Column<T> = { key: string; label: string; render?: (row: T) => ReactNode; align?: 'left' | 'right' }
export function DataTable<T extends { id: string }>({ columns, rows, emptyTitle, emptyBody }: {
  columns: Column<T>[]; rows: T[]; emptyTitle: string; emptyBody: string
}) {
  if (rows.length === 0) return <AdminEmptyNotice title={emptyTitle} body={emptyBody}/>
  return <div className="admin-table-wrap">
    <table className="admin-table">
      <thead><tr>{columns.map(col => <th key={col.key} style={col.align === 'right' ? { textAlign: 'right' } : undefined}>{col.label}</th>)}</tr></thead>
      <tbody>{rows.map(row => <tr key={row.id}>{columns.map(col => <td key={col.key} style={col.align === 'right' ? { textAlign: 'right' } : undefined}>
        {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '—')}
      </td>)}</tr>)}</tbody>
    </table>
  </div>
}

export function FilterToolbar({ children }: { children: ReactNode }) {
  return <div className="admin-filter-toolbar">{children}</div>
}

export function AdminStatusBadge({ label, tone }: { label: string; tone: 'neutral' | 'positive' | 'warning' | 'negative' }) {
  return <span className={'admin-badge admin-badge-' + tone}>{label}</span>
}

export function AdminEmptyNotice({ title, body }: { title: string; body: string }) {
  return <div className="admin-empty">
    <h3>{title}</h3>
    <p>{body}</p>
  </div>
}

export function ConfirmationDialog({ open, title, body, confirmLabel, cancelLabel, onConfirm, onCancel }: {
  open: boolean; title: string; body: string; confirmLabel: string; cancelLabel: string; onConfirm: () => void; onCancel: () => void
}) {
  if (!open) return null
  return <div className="admin-dialog-backdrop" role="presentation" onClick={onCancel}>
    <div className="admin-dialog" role="alertdialog" aria-modal="true" aria-labelledby="admin-dialog-title" onClick={event => event.stopPropagation()}>
      <h3 id="admin-dialog-title">{title}</h3>
      <p>{body}</p>
      <div className="admin-dialog-actions">
        <button type="button" className="admin-btn admin-btn-ghost" onClick={onCancel}>{cancelLabel}</button>
        <button type="button" className="admin-btn admin-btn-primary" onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </div>
  </div>
}

export function useConfirmation() {
  const [pending, setPending] = useState<(() => void) | null>(null)
  return {
    isOpen: pending !== null,
    request: (action: () => void) => setPending(() => action),
    confirm: () => { pending?.(); setPending(null) },
    cancel: () => setPending(null),
  }
}

export function AdminBreadcrumb({ trail }: { trail: string[] }) {
  return <nav className="admin-breadcrumb" aria-label="Breadcrumb">{trail.join(' / ')}</nav>
}

export function AdminPageHeader({ title, description, trail, action }: { title: string; description: string; trail: string[]; action?: ReactNode }) {
  return <div className="admin-page-head">
    <AdminBreadcrumb trail={trail}/>
    <div className="admin-page-head-row">
      <div><h1>{title}</h1><p>{description}</p></div>
      {action}
    </div>
  </div>
}
export function AdminCard({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return <section className="admin-card">
    <header className="admin-card-head"><h2>{title}</h2>{action}</header>
    <div className="admin-card-body">{children}</div>
  </section>
}
