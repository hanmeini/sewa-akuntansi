import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const users = [
    { id: 'admin', password: 'admin', name: 'Administrator', role: 'admin' },
    { id: 'sales1', password: 'sales', name: 'Budi', role: 'sales' }
  ];

  const login = (userId, password) => {
    const user = users.find(u => u.id === userId && u.password === password);
    if (user) { setCurrentUser(user); return true; }
    return false;
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoggedIn: !!currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
