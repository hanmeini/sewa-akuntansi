import React, { useState } from 'react';
import { DB, formatRupiah, today } from '../data/db';
import Sidebar from '../components/Sidebar';
import { FileText, CheckCircle } from 'lucide-react';

const JournalPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const journals = filterStatus === 'all' ? DB.journals : DB.journals.filter(j => j.status === filterStatus);

  return (
    <div>
      <div className="page-header"><h1>Jurnal</h1><p>Catatan jurnal akuntansi</p></div>
      <div className="card">
        <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
          <button className={`btn btn-sm ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilterStatus('all')}>Semua</button>
          <button className={`btn btn-sm ${filterStatus === 'draft' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilterStatus('draft')}>Draft</button>
          <button className={`btn btn-sm ${filterStatus === 'posted' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilterStatus('posted')}>Posted</button>
        </div>
        {journals.length === 0 ? <p className="empty-state">Belum ada jurnal</p> :
        <table>
          <thead><tr><th>Journal ID</th><th>Tanggal</th><th>Deskripsi</th><th>Referensi</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {journals.map(j => <tr key={j.id}>
              <td><strong>{j.id}</strong></td><td>{formatDate(j.date)}</td><td>{j.description}</td><td>{j.reference || '-'}</td>
              <td><span className={`badge badge-${j.status === 'posted' ? 'success' : 'warning'}`}>{j.status === 'posted' ? 'Posted' : 'Draft'}</span></td>
              <td className="action-btns">
                <button className="btn btn-sm btn-info btn-outline" onClick={() => { const details = DB.journalDetails.filter(d => d.journalId === j.id); alert(j.description + '\n' + details.map(d => `${DB.coa.find(c => c.code === d.accountCode)?.name}: Debit ${formatRupiah(d.debit)} / Kredit ${formatRupiah(d.credit)}`).join('\n')); }}><FileText size={14} /></button>
                {j.status !== 'posted' && <button className="btn btn-sm btn-success btn-outline" onClick={() => { j.status = 'posted'; }}><CheckCircle size={14} /> Post</button>}
              </td>
            </tr>)}
          </tbody>
        </table>}
      </div>
    </div>
  );
};

export default JournalPage;
