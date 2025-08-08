'use client';
import '../globals.css'
import React from 'react';

const mockUser = {
  name: 'Speed Man',
  type: 'CUSTOMER',
};

const mockOrders = [
  { id: 1, item: 'Pizza', status: 'Delivered' },
  { id: 2, item: 'Burger', status: 'Preparing' },
];

const mockNotifications = [
  { id: 1, message: 'Your order #1 has been delivered.' },
  { id: 2, message: 'Your order #2 is being prepared.' },
];

const CustomerDashboard = () => {
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

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Orders</h2>
        <ul className= "bg-white shadow-md rounded p-4">
          {mockOrders.map((order) => (
            <li key={order.id} className="border-b last:border-b-0 py-2">
              <span className="font-medium">{order.item}</span> -{' '}
              <span className="text-sm text-gray-600">{order.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <ul className="bg-white shadow-md rounded p-4">
          {mockNotifications.map((notif) => (
            <li key={notif.id} className="border-b last:border-b-0 py-2">
              {notif.message}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CustomerDashboard;