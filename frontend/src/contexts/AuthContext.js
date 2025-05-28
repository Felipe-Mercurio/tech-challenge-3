import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Exemplo simples: buscar token do localStorage e validar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Pode adicionar lógica para validar token aqui
      setUser({ token }); 
    }
  }, []);

  function login(token) {
    localStorage.setItem('token', token);
    setUser({ token });
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
