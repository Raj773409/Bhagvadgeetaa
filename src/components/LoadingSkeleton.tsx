export function LoadingSkeleton({ label }: { label: string }) {
  return <div className="route-skeleton" role="status" aria-label={label}>
    <div className="route-skeleton-bar" style={{ width: '38%' }}/>
    <div className="route-skeleton-bar" style={{ width: '62%' }}/>
    <div className="route-skeleton-bar" style={{ width: '48%' }}/>
  </div>
}
