'use client';
import '../globals.css';
import React, { useState } from 'react';
import OrderList from '@/components/OrderList';
import Notifications from '@/components/Notifications';
import SimpleMap from '@/components/SimpleMap';

const mockUser = {
  name: 'Speed Man',
  type: 'CUSTOMER',
};

const mockOrders = [
  { id: 1, description: 'Pizza', status: 'Delivered' },
  { id: 2, description: 'Burger', status: 'Preparing' },
];

const mockNotification = 'Your order #1 has been delivered.';

const CustomerDashboard = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [notification, setNotification] = useState(mockNotification);
  const user = mockUser;

  const logout = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 bg-gradient-to-b from-sky-300 to-sky-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {user.name}
        </h1>
        <button
          onClick={logout}
          className="bg-sky-900 text-white px-4 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>

      <Notifications message={notification} />

      <OrderList orders={orders} />

      <SimpleMap />
    </div>
  );
};

export default CustomerDashboard;