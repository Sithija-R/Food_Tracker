'use client';

import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async ({ email, password }) => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      throw new Error('User not found');
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.email === email && parsedUser.password === password) {
      setUser(parsedUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async ({ name, email, password, type }) => {
    const newUser = { name, email, password, type };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return {
    user,
    login,
    register,
    logout,
  };
};