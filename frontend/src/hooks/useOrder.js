'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from './api';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

console.log("orders", orders);
  const getAuthHeaders = () => {
    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser)?.token : null;
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/order/getrelavant`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Fetch orders error:", error);
      alert("Failed to fetch orders: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/available`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch available orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Fetch available orders error:", error);
      alert("Failed to fetch available orders: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    console.log("Creating order with data:", orderData);
    try {
      const response = await fetch(`${API_BASE_URL}/api/order/place`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create order");
      }
      const newOrder = await response.json();
      setOrders((prev) => [...prev, newOrder]);
      return newOrder;
    } catch (error) {
      console.error("Create order error:", error);
      alert("Failed to create order: " + error.message);
    }
  };

  const updateOrderStatus = async (orderId, status, userId, role) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, userId, role }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update order status");
      }
      const updatedOrder = await response.json();
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? updatedOrder : order))
      );
      return updatedOrder;
    } catch (error) {
      console.error("Update order status error:", error);
      alert("Failed to update order status: " + error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    fetchOrders,
    fetchAvailableOrders,
    createOrder,
    updateOrderStatus,
  };
};
