'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, createContext, useContext } from 'react';
import { loginAPI, registerAPI } from '@/services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginAPI(email, password);
      setUser(res);
      localStorage.setItem('user', JSON.stringify(res));
      const path = res?.type === 'CUSTOMER' ? '/customer' : '/driver';
      router.push(path);
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed');
    }
  };

  const register = async (name, email, password, type) => {
    try {
      const res = await registerAPI(name, email, password, type);
      setUser(res);
      localStorage.setItem('user', JSON.stringify(res));
      const path = res?.type === 'CUSTOMER' ? '/customer' : '/driver';
      router.push(path);
    } catch (err) {
      console.error('Register error:', err);
      alert('Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);