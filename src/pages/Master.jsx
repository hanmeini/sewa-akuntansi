import React, { useState } from 'react';
import { DB, formatRupiah } from '../data/db';
import Sidebar from '../components/Sidebar';
import { Plus, Trash2, Edit } from 'lucide-react';

const MasterPage = () => {
  const [tab, setTab] = useState('kebaya');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const tabs = [
    { key: 'kebaya', label: 'Kebaya' },
    { key: 'customer', label: 'Customer' },
    { key: 'employee', label: 'Pegawai' }
  ];

  const renderTable = () => {
    if (tab === 'kebaya') return DB.kebaya.map(k => (
      <tr key={k.id}>
        <td>{k.id}</td><td>{k.name}</td><td>{k.size}</td>
        <td>{formatRupiah(k.price)}</td>
        <td><span className={`badge badge-${k.status === 'tersedia' ? 'success' : 'warning'}`}>
          {k.status === 'tersedia' ? 'Tersedia' : 'Disewa'}
        </span></td>
        <td className="action-btns">
          <button className="btn btn-sm btn-info btn-outline" onClick={() => { const p = parseFloat(prompt('Harga baru:', k.price)); if (!isNaN(p)) { k.price = p; setFormData({}); } }}><Edit size={14} /></button>
          <button className="btn btn-sm btn-danger btn-outline" onClick={() => { DB.kebaya = DB.kebaya.filter(x => x.id !== k.id); setFormData({}); }}><Trash2 size={14} /></button>
        </td>
      </tr>
    ));
    if (tab === 'customer') return DB.customer.map(c => (
      <tr key={c.id}>
        <td>{c.id}</td><td>{c.name}</td><td>{c.phone}</td><td>{c.address}</td>
        <td><button className="btn btn-sm btn-danger btn-outline" onClick={() => { DB.customer = DB.customer.filter(x => x.id !== c.id); setFormData({}); }}><Trash2 size={14} /></button></td>
      </tr>
    ));
    return DB.employee.map(e => (
      <tr key={e.id}>
        <td>{e.id}</td><td>{e.name}</td><td>{e.position}</td>
        <td>{(e.commission * 100).toFixed(0)}%</td>
        <td className="action-btns">
          <button className="btn btn-sm btn-info btn-outline" onClick={() => { const n = prompt('Nama:', e.name); if (n) e.name = n; }}><Edit size={14} /></button>
          <button className="btn btn-sm btn-danger btn-outline" onClick={() => { DB.employee = DB.employee.filter(x => x.id !== e.id); setFormData({}); }}><Trash2 size={14} /></button>
        </td>
      </tr>
    ));
  };

  const openModal = () => {
    setFormData({});
    setShowModal(true);
  };

  const handleAdd = () => {
    if (tab === 'kebaya') {
      const name = prompt('Nama Kebaya:'); const size = prompt('Ukuran (S/M/L/XL):', 'M'); const price = parseFloat(prompt('Harga:'));
      if (name && !isNaN(price)) DB.kebaya.push({ id: DB.nextKebayaId++, name, size: size || 'M', price, status: 'tersedia' });
    } else if (tab === 'customer') {
      const name = prompt('Nama:'); const phone = prompt('HP:'); const address = prompt('Alamat:');
      if (name) DB.customer.push({ id: DB.nextCustomerId++, name, phone: phone || '-', address: address || '-' });
    } else {
      const name = prompt('Nama:'); const position = prompt('Jabatan:', 'Sales'); const commission = parseFloat(prompt('Komisi (%):', '5')) / 100;
      if (name) DB.employee.push({ id: DB.nextEmployeeId++, name, position: position || 'Sales', commission: isNaN(commission) ? 0.05 : commission });
    }
    setShowModal(false);
  };

  return (
    <div>
      <div className="page-header"><h1>Master Data</h1><p>Kelola data kebaya, customer, dan pegawai</p></div>
      <div className="card">
        <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
          {tabs.map(t => <button key={t.key} className={`btn btn-sm ${tab === t.key ? 'btn-primary' : 'btn-outline'}`} onClick={() => setTab(t.key)}>{t.label}</button>)}
          <button className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }} onClick={openModal}><Plus size={16} /> Tambah</button>
        </div>
        <table>
          <thead><tr>
            {tab === 'kebaya' ? <><th>ID</th><th>Nama</th><th>Ukuran</th><th>Harga</th><th>Status</th><th>Aksi</th></> :
            tab === 'customer' ? <><th>ID</th><th>Nama</th><th>HP</th><th>Alamat</th><th>Aksi</th></> :
            <><th>ID</th><th>Nama</th><th>Jabatan</th><th>Komisi</th><th>Aksi</th></>}
          </tr></thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Tambah {tabs.find(t => t.key === tab)?.label}</h3>
            <p style={{ color: '#888', marginBottom: 15, fontSize: '0.9rem' }}>Isi data melalui prompt.</p>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Batal</button>
              <button className="btn btn-primary" onClick={handleAdd}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterPage;
