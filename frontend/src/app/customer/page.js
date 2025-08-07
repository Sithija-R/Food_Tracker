'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import OrderList from '@/components/OrderList';
import Notifications from '@/components/Notifications';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {user.name} (Customer)
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Orders</h2>
        <OrderList type="customer" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <Notifications type="customer" />
      </section>
    </div>
  );
};

export default CustomerDashboard;