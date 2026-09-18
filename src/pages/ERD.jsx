import React from 'react';
import { DB } from '../data/db';
import Sidebar from '../components/Sidebar';
import { GitBranch } from 'lucide-react';

const ERDPage = () => {
  return (
    <div>
      <div className="page-header"><h1>Entity Relationship Diagram</h1><p>Diagram hubungan antar entity</p></div>
      <div className="card">
        <h3>ERD Visual</h3>
        <div className="erd-svg-container">
          <svg viewBox="0 0 1100 800" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', minHeight: 500, fontFamily: "'Segoe UI', sans-serif" }}>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#333"/></marker>
              <marker id="arrowP" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#4361ee"/></marker>
            </defs>

            {/* USER */}
            <rect x="30" y="20" width="180" height="130" rx="8" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2"/>
            <text x="120" y="45" textAnchor="middle" fontWeight="bold" fill="#1976d2" fontSize="14">USER</text>
            <text x="50" y="68" fontSize="11" fill="#333">user_id (PK)</text>
            <text x="50" y="88" fontSize="11" fill="#333">password</text>
            <text x="50" y="108" fontSize="11" fill="#333">name, role</text>

            {/* CUSTOMER */}
            <rect x="30" y="240" width="180" height="140" rx="8" fill="#fff3e0" stroke="#f57c00" strokeWidth="2"/>
            <text x="120" y="265" textAnchor="middle" fontWeight="bold" fill="#f57c00" fontSize="14">CUSTOMER</text>
            <text x="50" y="288" fontSize="11" fill="#333">customer_id (PK)</text>
            <text x="50" y="308" fontSize="11" fill="#333">name, phone</text>
            <text x="50" y="328" fontSize="11" fill="#333">address</text>

            {/* KEBAYA */}
            <rect x="30" y="470" width="180" height="130" rx="8" fill="#e8f5e9" stroke="#388e3c" strokeWidth="2"/>
            <text x="120" y="495" textAnchor="middle" fontWeight="bold" fill="#388e3c" fontSize="14">KEBAYA</text>
            <text x="50" y="518" fontSize="11" fill="#333">kebaya_id (PK)</text>
            <text x="50" y="538" fontSize="11" fill="#333">name, size</text>
            <text x="50" y="558" fontSize="11" fill="#333">price, status</text>

            {/* EMPLOYEE */}
            <rect x="30" y="690" width="180" height="100" rx="8" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="2"/>
            <text x="120" y="715" textAnchor="middle" fontWeight="bold" fill="#7b1fa2" fontSize="14">EMPLOYEE</text>
            <text x="50" y="738" fontSize="11" fill="#333">employee_id (PK)</text>
            <text x="50" y="758" fontSize="11" fill="#333">name, position</text>

            {/* ORDER */}
            <rect x="300" y="180" width="250" height="200" rx="8" fill="#e0f7fa" stroke="#0097a7" strokeWidth="2"/>
            <text x="425" y="205" textAnchor="middle" fontWeight="bold" fill="#0097a7" fontSize="14">ORDER</text>
            <text x="330" y="230" fontSize="11" fill="#333">order_id (PK)</text>
            <text x="330" y="250" fontSize="11" fill="#333">customer_id (FK)</text>
            <text x="330" y="270" fontSize="11" fill="#333">kebaya_id (FK)</text>
            <text x="330" y="290" fontSize="11" fill="#333">employee_id (FK)</text>
            <text x="330" y="310" fontSize="11" fill="#333">order_date, days</text>
            <text x="330" y="330" fontSize="11" fill="#333">total_price, status</text>

            {/* PAYMENT */}
            <rect x="640" y="80" width="220" height="160" rx="8" fill="#fce4ec" stroke="#c62828" strokeWidth="2"/>
            <text x="750" y="105" textAnchor="middle" fontWeight="bold" fill="#c62828" fontSize="14">PAYMENT</text>
            <text x="660" y="130" fontSize="11" fill="#333">payment_id (PK)</text>
            <text x="660" y="150" fontSize="11" fill="#333">order_id (FK)</text>
            <text x="660" y="170" fontSize="11" fill="#333">amount, date</text>
            <text x="660" y="190" fontSize="11" fill="#333">method</text>

            {/* JOURNAL */}
            <rect x="300" y="500" width="250" height="170" rx="8" fill="#f3e5f5" stroke="#6a1b9a" strokeWidth="2"/>
            <text x="425" y="525" textAnchor="middle" fontWeight="bold" fill="#6a1b9a" fontSize="14">JOURNAL</text>
            <text x="330" y="550" fontSize="11" fill="#333">journal_id (PK)</text>
            <text x="330" y="570" fontSize="11" fill="#333">date, description</text>
            <text x="330" y="590" fontSize="11" fill="#333">reference, status</text>

            {/* JOURNAL_DETAIL */}
            <rect x="300" y="750" width="250" height="100" rx="8" fill="#ede7f6" stroke="#4527a0" strokeWidth="2"/>
            <text x="425" y="775" textAnchor="middle" fontWeight="bold" fill="#4527a0" fontSize="14">JOURNAL_DETAIL</text>
            <text x="330" y="800" fontSize="11" fill="#333">journal_id (FK), account_code</text>
            <text x="330" y="820" fontSize="11" fill="#333">debit, credit</text>

            {/* COA */}
            <rect x="640" y="470" width="220" height="150" rx="8" fill="#fff8e1" stroke="#f9a825" strokeWidth="2"/>
            <text x="750" y="495" textAnchor="middle" fontWeight="bold" fill="#f9a825" fontSize="14">COA</text>
            <text x="660" y="520" fontSize="11" fill="#333">code (PK)</text>
            <text x="660" y="540" fontSize="11" fill="#333">name, type</text>
            <text x="660" y="560" fontSize="11" fill="#333">balance</text>

            {/* CONNECTIONS */}
            <line x1="210" y1="85" x2="300" y2="280" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)"/>
            <text x="255" y="180" textAnchor="middle" fontSize="10" fill="#333">1:M</text>

            <line x1="120" y1="150" x2="120" y2="690" stroke="#7b1fa2" strokeWidth="1.5" strokeDasharray="5,5" markerEnd="url(#arrowP)"/>
            <text x="90" y="420" textAnchor="middle" fontSize="10" fill="#7b1fa2">manages</text>

            <line x1="210" y1="310" x2="300" y2="310" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)"/>
            <text x="255" y="300" textAnchor="middle" fontSize="10" fill="#333">places</text>

            <line x1="210" y1="535" x2="300" y2="350" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)"/>
            <text x="255" y="440" textAnchor="middle" fontSize="10" fill="#333">rented</text>

            <line x1="210" y1="740" x2="300" y2="450" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)"/>
            <text x="255" y="590" textAnchor="middle" fontSize="10" fill="#333">serves</text>

            <line x1="450" y1="220" x2="640" y2="160" stroke="#c62828" strokeWidth="1.5" markerEnd="url(#arrowP)"/>
            <text x="545" y="130" textAnchor="middle" fontSize="10" fill="#c62828">generates</text>

            <line x1="550" y1="560" x2="300" y2="610" stroke="#6a1b9a" strokeWidth="1.5" markerEnd="url(#arrowP)"/>
            <text x="425" y="500" textAnchor="middle" fontSize="10" fill="#6a1b9a">creates</text>

            <line x1="425" y1="670" x2="425" y2="750" stroke="#4527a0" strokeWidth="1.5" markerEnd="url(#arrow)"/>
            <text x="455" y="710" textAnchor="middle" fontSize="10" fill="#4527a0">contains</text>

            <line x1="550" y1="800" x2="640" y2="545" stroke="#f9a825" strokeWidth="1.5" markerEnd="url(#arrowP)"/>
            <text x="595" y="670" textAnchor="middle" fontSize="10" fill="#f9a825">references</text>

            {/* Legend */}
            <rect x="900" y="20" width="180" height="100" rx="6" fill="white" stroke="#ccc" strokeWidth="1" opacity="0.95"/>
            <text x="990" y="42" textAnchor="middle" fontWeight="bold" fontSize="11" fill="#333">Legend</text>
            <circle cx="910" cy="60" r="4" fill="#1976d2"/><text x="920" y="64" fontSize="9" fill="#333">Entity</text>
            <line x1="910" y1="75" x2="930" y2="75" stroke="#333" strokeWidth="1.5"/><text x="935" y="79" fontSize="9" fill="#333">Relation</text>
            <line x1="910" y1="90" x2="930" y2="90" stroke="#7b1fa2" strokeDasharray="5,5"/><text x="935" y="94" fontSize="9" fill="#333">Manage</text>
          </svg>
        </div>
      </div>
      <div className="card erd-table">
        <h3>Penjelasan Relasi</h3>
        <table>
          <thead><tr><th>Relasi</th><th>Type</th><th>Deskripsi</th></tr></thead>
          <tbody>
            {[
              ['USER → ORDER', '1:M', 'User bisa membuat banyak order (sebagai sales)'],
              ['USER → EMPLOYEE', '1:M', 'User/Admin mengelola data pegawai'],
              ['CUSTOMER → ORDER', '1:M', 'Customer bisa membuat banyak order sewa'],
              ['KEBAYA → ORDER', '1:M', 'Satu kebaya bisa disewakan berkali-kali'],
              ['EMPLOYEE → ORDER', '1:M', 'Sales melayani banyak order'],
              ['ORDER → PAYMENT', '1:M', 'Order bisa memiliki banyak pembayaran'],
              ['ORDER → JOURNAL', '1:1', 'Setiap order menghasilkan satu jurnal'],
              ['JOURNAL → JOURNAL_DETAIL', '1:N', 'Satu jurnal memiliki banyak detail entri'],
              ['JOURNAL_DETAIL → COA', 'N:1', 'Setiap detail merujuk ke satu akun COA']
            ].map(([rel, type, desc]) => (
              <tr key={rel}><td><strong>{rel}</strong></td><td><span className="badge badge-info">{type}</span></td><td>{desc}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ERDPage;
