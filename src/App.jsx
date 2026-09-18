import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import COAPage from './pages/COA';
import MasterPage from './pages/Master';
import OrderPage from './pages/Order';
import PaymentPage from './pages/Payment';
import EmployeePage from './pages/Employee';
import JournalPage from './pages/Journal';
import JournalDetailPage from './pages/JournalDetail';
import ClosingPage from './pages/Closing';
import ERDPage from './pages/ERD';
import Sidebar from './components/Sidebar';

const AppContent = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coa" element={<COAPage />} />
          <Route path="/master" element={<MasterPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/journal-detail" element={<JournalDetailPage />} />
          <Route path="/closing" element={<ClosingPage />} />
          <Route path="/erd" element={<ERDPage />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
