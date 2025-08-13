"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "./api";

export const useAuth = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); 
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errorMessage = "Login failed";
        try {
          const errorData = await response.json();
          if (errorData.message) {
            const msg = errorData.message.toLowerCase();
            if (
              msg.includes("incorrect") ||
              msg.includes("invalid") ||
              (msg.includes("email") && msg.includes("password"))
            ) {
              errorMessage = errorData.message;
            } else {
              errorMessage = "An error occurred during login.";
            }
          }
        } catch {}
        alert(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      alert("Login successful!");

 
      if (data.type?.toUpperCase() === "DRIVER") {
        router.replace("/driver/dashboard");
      } else if (data.type?.toUpperCase() === "CUSTOMER") {
        router.replace("/customer");
      }else if(data.type?.toUpperCase() === "RESTAURANT") {
        router.replace("/restaurant");
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  };

  const register = async ({ name, email, password, type }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, type }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Registration failed: " + (errorData.message || "An error occurred"));
        throw new Error(errorData.message || "Failed to register");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      alert("Registration successful!");

 
      if (data.type?.toUpperCase() === "DRIVER") {
        router.replace("/driver/dashboard");
      } else if (data.type?.toUpperCase() === "CUSTOMER") {
        router.replace("/customer");
      }else if(data.type?.toUpperCase() === "RESTAURANT") {
        router.replace("/restaurant");
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed: " + error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.replace("/"); 
  };

  return {
    user,
    loading, 
    login,
    register,
    logout,
  };
};
