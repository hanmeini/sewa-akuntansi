import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Layers, Database, ShoppingCart, DollarSign, Users, FileText, FileBarChart, Lock, GitBranch, LayoutDashboard } from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/coa', icon: Layers, label: 'COA' },
  { path: '/master', icon: Database, label: 'Master Data' },
  { path: '/order', icon: ShoppingCart, label: 'Order Kebaya' },
  { path: '/payment', icon: DollarSign, label: 'Pembayaran' },
  { path: '/employee', icon: Users, label: 'Pegawai' },
  { path: '/journal', icon: FileText, label: 'Jurnal' },
  { path: '/journal-detail', icon: FileBarChart, label: 'Detail Jurnal' },
  { path: '/closing', icon: Lock, label: 'Tutup Buku' },
  { path: '/erd', icon: GitBranch, label: 'ERD' }
];

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const currentPath = window.location.pathname;

  return (
    <aside className="sidebar">
      <div className="logo">Sewa Kebaya</div>
      <nav>
        {navItems.map(item => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          return (
            <li key={item.path} className={isActive ? 'active' : ''}>
              <Icon size={18} />
              <span>{item.label}</span>
            </li>
          );
        })}
      </nav>
      <div className="user-info">
        <strong>{currentUser?.name}</strong><br/>
        <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{currentUser?.id}</span>
      </div>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </aside>
  );
};

export default Sidebar;
