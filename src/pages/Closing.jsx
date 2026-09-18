import React from 'react';
import { DB, formatRupiah, today } from '../data/db';
import Sidebar from '../components/Sidebar';
import { Lock, Unlock } from 'lucide-react';

const ClosingPage = () => {
  const postedCount = DB.journals.filter(j => j.status === 'posted').length;
  const closingEntries = DB.journals.filter(j => j.reference === 'CLOSING');

  const closeBooks = () => {
    if (DB.isBookClosed) return;
    const posted = DB.journals.filter(j => j.status === 'posted');
    if (posted.length === 0) { alert('Tidak ada jurnal yang di-post!'); return; }
    if (!window.confirm('Yakin menutup buku? Data tidak bisa diubah.')) return;
    DB.isBookClosed = true;

    const revenueAcc = DB.coa.find(c => c.code === '4000');
    const modalAcc = DB.coa.find(c => c.code === '3000');
    if (revenueAcc && modalAcc && revenueAcc.balance > 0) {
      const jrnId = 'JRN-CLOSE-' + Date.now().toString(36);
      DB.journals.push({ id: jrnId, date: today(), description: 'Jurnal Penutup - Pendapatan', reference: 'CLOSING', status: 'posted', entries: [] });
      DB.journalDetails.push({ journalId: jrnId, accountCode: '4000', debit: revenueAcc.balance, credit: 0 });
      DB.journalDetails.push({ journalId: jrnId, accountCode: '3000', debit: 0, credit: revenueAcc.balance });
    }
    const expenses = DB.coa.filter(c => c.type === 'Expense').reduce((s, c) => s + c.balance, 0);
    if (expenses > 0 && modalAcc) {
      const jrnId2 = 'JRN-CLOSE2-' + Date.now().toString(36);
      DB.journals.push({ id: jrnId2, date: today(), description: 'Jurnal Penutup - Beban', reference: 'CLOSING', status: 'posted', entries: [] });
      DB.journalDetails.push({ journalId: jrnId2, accountCode: '3000', debit: expenses, credit: 0 });
      DB.journalDetails.push({ journalId: jrnId2, accountCode: '5000', debit: 0, credit: expenses });
    }
    alert('Buku berhasil ditutup!');
  };

  const openBooks = () => {
    DB.isBookClosed = false;
    alert('Buku dibuka!');
  };

  const revenue = DB.coa.find(c => c.code === '4000')?.balance || 0;
  const expenses = DB.coa.filter(c => c.type === 'Expense').reduce((s, c) => s + c.balance, 0);
  const netIncome = revenue - expenses;
  const totalAssets = DB.coa.filter(c => c.type === 'Asset').reduce((s, c) => s + c.balance, 0);
  const totalLiab = DB.coa.filter(c => c.type === 'Liability').reduce((s, c) => s + c.balance, 0);
  const equity = DB.coa.find(c => c.code === '3000')?.balance || 0;

  return (
    <div>
      <div className="page-header"><h1>Tutup Buku</h1><p>Finalisasi periode buku akuntansi</p></div>
      {DB.isBookClosed ? (
        <div>
          <div className="card">
            <h3>Status Buku</h3>
            <div className="notification notification-success">Buku sudah ditutup. Semua jurnal penutup telah dibuat.</div>
            <button className="btn btn-warning" onClick={openBooks}><Unlock size={16} /> Buka Buku</button>
          </div>
          <div className="card">
            <h3>Laporan Keuangan</h3>
            <h4 style={{ marginBottom: 10 }}>Laba Rugi</h4>
            <table><tbody>
              <tr><td>Pendapatan</td><td>{formatRupiah(revenue)}</td></tr>
              <tr><td>Beban</td><td>{formatRupiah(expenses)}</td></tr>
              <tr style={{ fontWeight: 700 }}><td>Laba/Rugi Bersih</td><td>{formatRupiah(netIncome)}</td></tr>
            </tbody></table>
            <h4 style={{ marginTop: 20, marginBottom: 10 }}>Neraca</h4>
            <table><tbody>
              <tr><td>Total Aset</td><td>{formatRupiah(totalAssets)}</td></tr>
              <tr><td>Total Liabilitas</td><td>{formatRupiah(totalLiab)}</td></tr>
              <tr><td>Total Ekuitas</td><td>{formatRupiah(equity + netIncome)}</td></tr>
            </tbody></table>
          </div>
        </div>
      ) : (
        <div className="card">
          <h3>Tutup Buku</h3>
          <div className="stats-grid">
            <div className="stat-card"><div className="label">Jurnal Posted</div><div className="value">{postedCount}</div></div>
            <div className="stat-card"><div className="label">Total Jurnal</div><div className="value">{DB.journals.length}</div></div>
          </div>
          <p style={{ margin: '15px 0', color: '#666' }}>Pastikan semua jurnal sudah di-post sebelum menutup buku.</p>
          <button className="btn btn-danger" onClick={closeBooks}><Lock size={16} /> Tutup Buku</button>
        </div>
      )}
    </div>
  );
};

export default ClosingPage;
