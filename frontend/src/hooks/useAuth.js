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
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, type }),
      });
      
  
      if (!response.ok) {
        const errorData = await response.json();
        alert("Registration failed: " + errorData.message || "An error occurred");
        throw new Error(errorData.message || "Failed to register");
      }
  
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
  
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed: " + error.message);
    }
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