import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sewa_user');
    return saved ? JSON.parse(saved) : null;
  });
  const users = [
    { id: 'admin', password: 'admin', name: 'Administrator', role: 'admin' },
    { id: 'sales1', password: 'sales', name: 'Budi', role: 'sales' }
  ];

  const login = (userId, password) => {
    const user = users.find(u => u.id === userId && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('sewa_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sewa_user');
  };

  useEffect(() => {
    localStorage.setItem('sewa_user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoggedIn: !!currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
