import { Link } from 'react-router-dom'
import { AdminCard, AdminPageHeader, KPIStatCard } from '../components/ui'

export default function FinancePage() {
  return <>
    <AdminPageHeader title="Donations & Finance" description="Track donations, transactions and financial reports." trail={['Donations & Finance']}/>
    <div className="kpi-grid">
      <KPIStatCard label="Total Donations" value="₹0"/>
      <KPIStatCard label="Successful Transactions" value="0"/>
      <KPIStatCard label="This Month" value="₹0"/>
      <KPIStatCard label="Refunds" value="0"/>
    </div>
    <AdminCard title="Payment Integration Status">
      <p>No payment gateway is configured. Secure server-side order creation, signature verification and webhook idempotency are documented in <code>src/data/backendSchema.ts</code> but not implemented, since that requires real gateway credentials this environment does not have.</p>
      <div className="admin-card-links">
        <Link className="admin-link" to="/admin/finance/donations">Donations</Link>
        <Link className="admin-link" to="/admin/finance/transactions">Transactions</Link>
        <Link className="admin-link" to="/admin/finance/receipts">Receipts</Link>
        <Link className="admin-link" to="/admin/finance/refunds">Refunds</Link>
      </div>
    </AdminCard>
  </>
}
