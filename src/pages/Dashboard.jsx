import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DB, formatRupiah } from '../data/db';
import Sidebar from '../components/Sidebar';
import { ShoppingCart, Layers, DollarSign, FileText, Users, Lock } from 'lucide-react';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const totalOrders = DB.orders.length;
  const lunas = DB.orders.filter(o => o.status === 'lunas').length;
  const belum = DB.orders.filter(o => o.status !== 'lunas').length;
  const totalPendapatan = DB.orders.filter(o => o.status === 'lunas').reduce((s, o) => s + o.totalPrice, 0);

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Selamat datang, {currentUser?.name}</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card"><div className="label">Total Order</div><div className="value">{totalOrders}</div></div>
        <div className="stat-card"><div className="label">Lunas</div><div className="value">{lunas}</div></div>
        <div className="stat-card"><div className="label">Belum Bayar</div><div className="value">{belum}</div></div>
        <div className="stat-card"><div className="label">Total Pendapatan</div><div className="value">{formatRupiah(totalPendapatan)}</div></div>
      </div>
      <div className="card">
        <h3>Order Terakhir</h3>
        {DB.orders.length === 0 ? <p className="empty-state"><p>Belum ada order</p></p> :
          DB.orders.slice(-5).reverse().map(o => {
            const cust = DB.customer.find(c => c.id === o.customerId);
            return <div key={o.orderId} style={{ padding: '10px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div><strong>{o.orderId}</strong> - {cust?.name || '-'}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>{formatRupiah(o.totalPrice)}</span>
                <span className={`badge badge-${o.status === 'lunas' ? 'success' : o.status === 'bayar' ? 'warning' : 'info'}`}>
                  {o.status === 'lunas' ? 'Lunas' : o.status === 'bayar' ? 'Bayar' : 'Belum'}
                </span>
              </div>
            </div>;
          })
        }
      </div>
    </div>
  );
};

export default Dashboard;
