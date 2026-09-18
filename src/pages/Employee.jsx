import React from 'react';
import { DB, formatRupiah } from '../data/db';
import Sidebar from '../components/Sidebar';
import { Users, DollarSign } from 'lucide-react';

const EmployeePage = () => {
  const totalRevenue = DB.orders.filter(o => o.status === 'lunas').reduce((s, o) => s + o.totalPrice, 0);
  return (
    <div>
      <div className="page-header"><h1>Pegawai / Sales</h1><p>Kelola data pegawai dan laporan komisi</p></div>
      <div className="card">
        <h3>Daftar Pegawai</h3>
        {DB.employee.length === 0 ? <p className="empty-state">Belum ada pegawai</p> :
        <table>
          <thead><tr><th>ID</th><th>Nama</th><th>Jabatan</th><th>Komisi</th><th>Aksi</th></tr></thead>
          <tbody>
            {DB.employee.map(e => <tr key={e.id}>
              <td>{e.id}</td><td>{e.name}</td><td>{e.position}</td><td>{(e.commission * 100).toFixed(0)}%</td>
              <td><button className="btn btn-sm btn-info btn-outline" onClick={() => { const n = prompt('Nama:', e.name); if (n) e.name = n; }}><Users size={14} /> Edit</button></td>
            </tr>)}
          </tbody>
        </table>}
      </div>
      <div className="card">
        <h3><DollarSign size={18} /> Laporan Komisi</h3>
        {DB.employee.filter(e => e.position === 'Sales').length === 0 ? <p className="empty-state">Belum ada sales</p> :
        <table>
          <thead><tr><th>Nama</th><th>Jumlah Order</th><th>Total Komisi</th></tr></thead>
          <tbody>
            {DB.employee.filter(e => e.position === 'Sales').map(e => {
              const orders = DB.orders.filter(o => o.employeeId === e.id && o.status === 'lunas');
              const commission = orders.reduce((s, o) => s + o.totalPrice * e.commission, 0);
              return <tr key={e.id}><td>{e.name}</td><td>{orders.length}</td><td>{formatRupiah(commission)}</td></tr>;
            })}
          </tbody>
        </table>}
      </div>
    </div>
  );
};

export default EmployeePage;
