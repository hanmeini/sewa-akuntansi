import React, { useState } from 'react';
import { DB, formatRupiah } from '../data/db';
import Sidebar from '../components/Sidebar';
import { Plus, Trash2, Edit, Layers } from 'lucide-react';

const COAPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('Asset');

  const addCOA = () => {
    if (!code || !name) return;
    if (DB.coa.find(c => c.code === code)) { alert('Kode akun sudah ada!'); return; }
    DB.coa.push({ code, name, type, balance: 0 });
    setShowModal(false); setCode(''); setName(''); setType('Asset');
  };

  const deleteCOA = (c) => { DB.coa = DB.coa.filter(a => a.code !== c); };

  return (
    <div>
      <div className="page-header">
        <h1>Chart of Accounts</h1>
        <p>Kelola daftar akun akuntansi</p>
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <h3>Daftar Akun</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}><Plus size={16} /> Tambah Akun</button>
        </div>
        <table>
          <thead><tr><th>Kode</th><th>Nama Akun</th><th>Tipe</th><th>Saldo</th><th>Aksi</th></tr></thead>
          <tbody>
            {DB.coa.map(acc => (
              <tr key={acc.code}>
                <td><strong>{acc.code}</strong></td><td>{acc.name}</td>
                <td><span className="badge badge-neutral">{acc.type}</span></td>
                <td>{formatRupiah(acc.balance)}</td>
                <td><button className="btn btn-sm btn-danger" onClick={() => deleteCOA(acc.code)}><Trash2 size={14} /> Hapus</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3><Layers size={20} /> Tambah Akun COA</h3>
            <div className="form-group"><label>Kode Akun</label><input value={code} onChange={e => setCode(e.target.value)} /></div>
            <div className="form-group"><label>Nama Akun</label><input value={name} onChange={e => setName(e.target.value)} /></div>
            <div className="form-group"><label>Tipe</label><select value={type} onChange={e => setType(e.target.value)}>
              <option value="Asset">Asset</option><option value="Liability">Liability</option>
              <option value="Equity">Equity</option><option value="Revenue">Revenue</option>
              <option value="Expense">Expense</option>
            </select></div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Batal</button>
              <button className="btn btn-primary" onClick={addCOA}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default COAPage;
