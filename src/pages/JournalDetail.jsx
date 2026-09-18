import React from 'react';
import { DB, formatRupiah } from '../data/db';
import Sidebar from '../components/Sidebar';
import { FileBarChart } from 'lucide-react';

const JournalDetailPage = () => {
  const summary = {};
  DB.journalDetails.forEach(d => {
    if (!summary[d.accountCode]) summary[d.accountCode] = { debit: 0, credit: 0 };
    summary[d.accountCode].debit += d.debit;
    summary[d.accountCode].credit += d.credit;
  });
  let totalDebit = 0, totalCredit = 0;

  return (
    <div>
      <div className="page-header"><h1>Detail Jurnal</h1><p>Entri detail jurnal dan trial balance</p></div>
      <div className="card">
        <h3>Semua Detail Jurnal</h3>
        {DB.journalDetails.length === 0 ? <p className="empty-state">Belum ada detail jurnal</p> :
        <table>
          <thead><tr><th>Journal ID</th><th>Kode Akun</th><th>Nama Akun</th><th>Debit</th><th>Kredit</th></tr></thead>
          <tbody>
            {DB.journalDetails.map(d => {
              const acc = DB.coa.find(c => c.code === d.accountCode);
              return <tr key={`${d.journalId}-${d.accountCode}`}><td>{d.journalId}</td><td>{d.accountCode}</td>
                <td>{acc?.name || 'N/A'}</td><td>{formatRupiah(d.debit)}</td><td>{formatRupiah(d.credit)}</td></tr>;
            })}
          </tbody>
        </table>}
      </div>
      <div className="card">
        <h3>Trial Balance</h3>
        <table>
          <thead><tr><th>Kode Akun</th><th>Nama Akun</th><th>Debit</th><th>Kredit</th></tr></thead>
          <tbody>
            {Object.keys(summary).map(code => {
              const acc = DB.coa.find(c => c.code === code);
              const d = summary[code].debit; const c = summary[code].credit;
              totalDebit += d; totalCredit += c;
              return <tr key={code}><td>{code}</td><td>{acc?.name || code}</td><td>{formatRupiah(d)}</td><td>{formatRupiah(c)}</td></tr>;
            })}
          </tbody>
        </table>
        {Object.keys(summary).length > 0 && <div style={{ fontWeight: 700, marginTop: 10, padding: 10, background: '#e8eef5', borderRadius: 8 }}>
          TOTAL: {formatRupiah(totalDebit)} | {formatRupiah(totalCredit)}
        </div>}
      </div>
    </div>
  );
};

export default JournalDetailPage;
