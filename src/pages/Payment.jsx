import React from 'react';
import { DB, formatRupiah } from '../data/db';
import Sidebar from '../components/Sidebar';
import { DollarSign, FileText } from 'lucide-react';

const PaymentPage = () => {
  return (
    <div>
      <div className="page-header"><h1>Pembayaran</h1><p>Kelola pelunasan pembayaran</p></div>
      <div className="stats-grid">
        <div className="stat-card"><div className="label">Total Order</div><div className="value">{DB.orders.length}</div></div>
        <div className="stat-card"><div className="label">Lunas</div><div className="value">{DB.orders.filter(o => o.status === 'lunas').length}</div></div>
        <div className="stat-card"><div className="label">Menunggu</div><div className="value">{DB.orders.filter(o => o.status !== 'lunas').length}</div></div>
        <div className="stat-card"><div className="label">Total Dibayar</div><div className="value">{formatRupiah(DB.payments.reduce((s, p) => s + p.amount, 0))}</div></div>
      </div>
      <div className="card">
        <h3>Data Pembayaran</h3>
        {DB.orders.length === 0 ? <p className="empty-state">Belum ada data</p> :
        <table>
          <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Bayar</th><th>Sisa</th><th>Status</th></tr></thead>
          <tbody>
            {DB.orders.map(o => {
              const cust = DB.customer.find(c => c.id === o.customerId);
              const paid = o.totalPaid || 0;
              const sisa = o.totalPrice - paid;
              return <tr key={o.orderId}>
                <td><strong>{o.orderId}</strong></td><td>{cust?.name || '-'}</td>
                <td>{formatRupiah(o.totalPrice)}</td><td>{formatRupiah(paid)}</td>
                <td>{formatRupiah(sisa)}</td>
                <td><span className={`badge badge-${o.status === 'lunas' ? 'success' : o.status === 'bayar' ? 'warning' : 'info'}`}>
                  {o.status === 'lunas' ? 'Lunas' : o.status === 'bayar' ? 'Bayar' : 'Belum'}
                </span></td>
              </tr>;
            })}
          </tbody>
        </table>}
      </div>
      <div className="card">
        <h3>Riwayat Pembayaran</h3>
        {DB.payments.length === 0 ? <p className="empty-state">Belum ada pembayaran</p> :
        <table>
          <thead><tr><th>Payment ID</th><th>Order</th><th>Jumlah</th><th>Tanggal</th><th>Metode</th></tr></thead>
          <tbody>
            {DB.payments.map(p => <tr key={p.id}><td>{p.id}</td><td>{p.orderId}</td><td>{formatRupiah(p.amount)}</td><td>{formatDate(p.date)}</td><td>{p.method}</td></tr>)}
          </tbody>
        </table>}
      </div>
    </div>
  );
};

export default PaymentPage;
