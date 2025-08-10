"use client";

import { useState, useEffect } from 'react';
import { formatTime } from '../utils/helpers';

export default function ManageOrder() {
  // Sri Lankan orders with detailed information
  const allOrders = [
    {
      id: 'ORD-00125',
      customerName: 'Dinesh Jayawardena',
      customerContact: '+94 71 234 5678',
      restaurant: 'Upali\'s by Nawaloka',
      description: '1 Chicken Curry, 2 Parathas, 1 Watalappan',
      pickupLocationName: 'Upali\'s, Nawaloka Hospital, Colombo 02',
      status: 'Pending',
      createdTime: '2023-08-10T16:15:00',
      acceptedTime: null,
      deliveredTime: null,
      eta: '15 min',
      total: '1,850 LKR'
    },
    {
      id: 'ORD-00126',
      customerName: 'Priyanka Bandara',
      customerContact: '+94 76 345 6789',
      restaurant: 'Barefoot Garden Cafe',
      description: '1 Seafood Platter, 2 Fresh Lime Juices',
      pickupLocationName: 'Barefoot Garden Cafe, Galle Road, Colombo 04',
      status: 'Pending',
      createdTime: '2023-08-10T16:00:00',
      acceptedTime: null,
      deliveredTime: null,
      eta: '25 min',
      total: '3,200 LKR'
    },
    {
      id: 'ORD-00127',
      customerName: 'Rajiv Fernando',
      customerContact: '+94 77 456 7890',
      restaurant: 'Ministry of Crab',
      description: '1 Chili Crab (1kg), 2 Garlic Butter Prawns',
      pickupLocationName: 'Ministry of Crab, Old Dutch Hospital, Colombo 01',
      status: 'In Progress',
      createdTime: '2023-08-10T15:45:00',
      acceptedTime: '2023-08-10T16:00:00',
      deliveredTime: null,
      eta: '10 min',
      total: '8,750 LKR'
    },
    {
      id: 'ORD-00128',
      customerName: 'Nimal Perera',
      customerContact: '+94 78 567 8901',
      restaurant: 'Galle Face Hotel',
      description: '2 Lamprais, 1 Wood Apple Juice',
      pickupLocationName: 'Galle Face Hotel, Galle Road, Colombo 03',
      status: 'In Progress',
      createdTime: '2023-08-10T17:30:00',
      acceptedTime: '2023-08-10T17:45:00',
      deliveredTime: null,
      eta: '5 min',
      total: '2,950 LKR'
    },
    {
      id: 'ORD-00129',
      customerName: 'Samanthi Silva',
      customerContact: '+94 76 678 9012',
      restaurant: 'The Gallery Cafe',
      description: '1 Pasta Carbonara, 1 Iced Coffee',
      pickupLocationName: 'The Gallery Cafe, Paradise Road, Colombo 03',
      status: 'Completed',
      createdTime: '2023-08-10T15:00:00',
      acceptedTime: '2023-08-10T15:15:00',
      deliveredTime: '2023-08-10T15:45:00',
      eta: '0 min',
      total: '1,650 LKR'
    },
    {
      id: 'ORD-00130',
      customerName: 'Lakshan Fernando',
      customerContact: '+94 77 789 0123',
      restaurant: 'Nuga Gama Restaurant',
      description: '1 Traditional Rice & Curry Platter',
      pickupLocationName: 'Nuga Gama, Cinnamon Grand, Colombo 03',
      status: 'Completed',
      createdTime: '2023-08-10T14:30:00',
      acceptedTime: '2023-08-10T14:45:00',
      deliveredTime: '2023-08-10T15:20:00',
      eta: '0 min',
      total: '1,200 LKR'
    }
  ];

  // State for orders and filters
  const [orders, setOrders] = useState(allOrders);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter orders based on status and search term
  useEffect(() => {
    let filtered = allOrders;
    
    // Apply status filter
    if (filter !== 'All') {
      filtered = filtered.filter(order => 
        filter === 'Pending' ? order.status === 'Pending' :
        filter === 'In Progress' ? order.status === 'In Progress' :
        order.status === 'Completed'
      );
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term) ||
        order.restaurant.toLowerCase().includes(term)
      );
    }
    
    setOrders(filtered);
  }, [filter, searchTerm]);

  // Handle order actions
  const handleOrderAction = (orderId, action) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        if (action === 'accept') {
          return {
            ...order,
            status: 'In Progress',
            acceptedTime: new Date().toISOString()
          };
        } else if (action === 'deliver') {
          return {
            ...order,
            status: 'Completed',
            deliveredTime: new Date().toISOString()
          };
        }
      }
      return order;
    }));
  };

  // Simulate refreshing orders
  const refreshOrders = () => {
    setIsRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsRefreshing(false);
      setOrders([...allOrders]); // Reset to original orders
    }, 1000);
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Orders</h1>
        <div className="mt-3 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="border rounded-lg pl-10 pr-4 py-2 text-sm w-full sm:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm flex items-center"
            onClick={refreshOrders}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Refreshing...
              </>
            ) : 'Refresh Orders'}
          </button>
        </div>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {['All', 'Pending', 'In Progress', 'Completed'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-sm ${
              filter === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                      <div className="text-xs text-gray-500">
                        {formatTime(order.createdTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{order.description}</div>
                      <div className="text-xs text-gray-500">{order.total}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.customerContact}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{order.restaurant}</div>
                      <div className="text-xs text-gray-500">{order.pickupLocationName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {order.status === 'Pending' && (
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 mr-2"
                          onClick={() => handleOrderAction(order.id, 'accept')}
                        >
                          Accept
                        </button>
                      )}
                      {order.status === 'In Progress' && (
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                          onClick={() => handleOrderAction(order.id, 'deliver')}
                        >
                          Mark Delivered
                        </button>
                      )}
                      {order.status === 'Completed' && (
                        <span className="text-green-600">Completed</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-xl font-bold">
                {allOrders.filter(o => o.status === 'Pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-xl font-bold">
                {allOrders.filter(o => o.status === 'In Progress').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed Today</p>
              <p className="text-xl font-bold">
                {allOrders.filter(o => o.status === 'Completed').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}