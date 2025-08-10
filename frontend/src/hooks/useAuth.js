'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from './api';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Login failed: " + errorData.message || "An error occurred");
        throw new Error(errorData.message || "Failed to login");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
     

    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    }
  };

  const register = async ({ name, email, password, type }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
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