import React, { useState } from 'react';
import { DB, formatRupiah, today, formatDate } from '../data/db';
import Sidebar from '../components/Sidebar';
import { Plus, Eye, CreditCard } from 'lucide-react';

const OrderPage = () => {
  const [showModal, setShowModal] = useState(false);

  const addOrder = () => {
    const customerId = parseInt(prompt('Customer ID:'));
    const kebayaId = parseInt(prompt('Kebaya ID:'));
    const employeeId = parseInt(prompt('Employee ID (Sales):'));
    const days = parseInt(prompt('Lama Sewa (hari):', '1'));
    if (!customerId || !kebayaId || !employeeId) { alert('Semua field wajib diisi!'); return; }
    const cust = DB.customer.find(c => c.id === customerId);
    const kebaya = DB.kebaya.find(k => k.id === kebayaId);
    const emp = DB.employee.find(e => e.id === employeeId);
    if (!cust || !kebaya || !emp) { alert('Data tidak ditemukan!'); return; }
    if (kebaya.status !== 'tersedia') { alert('Kebaya sudah disewa!'); return; }
    const totalPrice = kebaya.price * days;
    const orderId = 'ORD-' + Date.now().toString(36);
    kebaya.status = 'disewa';
    DB.orders.push({ orderId, customerId, kebayaId, employeeId, orderDate: today(), days, totalPrice, totalPaid: 0, status: 'belum' });
    setShowModal(false);
    alert(`Order ${orderId} berhasil! Total: ${formatRupiah(totalPrice)}`);
  };

  return (
    <div>
      <div className="page-header"><h1>Order Kebaya</h1><p>Buat order sewa kebaya</p></div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
          <h3>Daftar Order</h3>
          <button className="btn btn-primary btn-sm" onClick={addOrder}><Plus size={16} /> Buat Order</button>
        </div>
        {DB.orders.length === 0 ? <p className="empty-state">Belum ada order</p> :
        <table>
          <thead><tr><th>Order ID</th><th>Customer</th><th>Kebaya</th><th>Sales</th><th>Tgl Sewa</th><th>Total</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {DB.orders.map(o => {
              const cust = DB.customer.find(c => c.id === o.customerId);
              const kebaya = DB.kebaya.find(k => k.id === o.kebayaId);
              const emp = DB.employee.find(e => e.id === o.employeeId);
              return <tr key={o.orderId}>
                <td><strong>{o.orderId}</strong></td><td>{cust?.name || '-'}</td><td>{kebaya?.name || '-'}</td>
                <td>{emp?.name || '-'}</td><td>{formatDate(o.orderDate)}</td><td>{formatRupiah(o.totalPrice)}</td>
                <td><span className={`badge badge-${o.status === 'lunas' ? 'success' : o.status === 'bayar' ? 'warning' : 'info'}`}>
                  {o.status === 'lunas' ? 'Lunas' : o.status === 'bayar' ? 'Bayar' : 'Belum'}
                </span></td>
                <td className="action-btns">
                  <button className="btn btn-sm btn-info btn-outline" onClick={() => alert(`Order: ${o.orderId}\nCustomer: ${cust?.name}\nTotal: ${formatRupiah(o.totalPrice)}\nStatus: ${o.status}`)}><Eye size={14} /></button>
                  <button className="btn btn-sm btn-success btn-outline" onClick={() => { const amt = parseFloat(prompt('Jumlah pembayaran:', o.totalPrice)); if (!isNaN(amt) && amt > 0) { DB.payments.push({ id: 'PAY-' + Date.now().toString(36), orderId: o.orderId, amount: amt, date: today(), method: 'Tunai' }); o.totalPaid += amt; if (o.totalPaid >= o.totalPrice) { o.status = 'lunas'; const k = DB.kebaya.find(k => k.id === o.kebayaId); if (k) k.status = 'tersedia'; } } }}><CreditCard size={14} /> Bayar</button>
                </td>
              </tr>;
            })}
          </tbody>
        </table>}
      </div>
      {showModal && <div className="modal-overlay"><div className="modal">Isi data melalui prompt.</div></div>}
    </div>
  );
};

export default OrderPage;
