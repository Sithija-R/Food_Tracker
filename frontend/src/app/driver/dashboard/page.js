'use client';
import { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import OrderMap from '../components/OrderMap';
import Notifications from '../components/Notifications';
import { formatTime, formatDate } from '../utils/helpers';
import { fetchAvailableOrders, acceptOrder, markOrderDelivered } from '../utils/api';

export default function Dashboard() {
  const [availableOrders, setAvailableOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [driverLocation, setDriverLocation] = useState({ lat: 6.9271, lng: 79.8612 });
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial orders
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const orders = await fetchAvailableOrders();
        setAvailableOrders(orders.filter(order => order.status === 'NEW'));
        setActiveOrders(orders.filter(order => order.status === 'ACCEPTED' || order.status === 'IN_PROGRESS'));
        setCompletedOrders(orders.filter(order => order.status === 'DELIVERED'));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    };
    
    loadOrders();
    
    // Simulate WebSocket connection for real-time updates
    const ws = new WebSocket('ws://localhost:8080/ws');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'NEW_ORDER') {
        setNotifications(prev => [...prev, {
          id: Date.now(),
          type: 'info',
          message: `New order available: ${message.orderId}`
        }]);
        setAvailableOrders(prev => [...prev, message.order]);
      }
      else if (message.type === 'ORDER_ACCEPTED') {
        setNotifications(prev => [...prev, {
          id: Date.now(),
          type: 'success',
          message: `Order ${message.orderId} accepted`
        }]);
      }
    };
    
    return () => ws.close();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      const updatedOrder = await acceptOrder(orderId);
      setAvailableOrders(prev => prev.filter(order => order.id !== orderId));
      setActiveOrders(prev => [...prev, updatedOrder]);
      
      setNotifications(prev => [...prev, {
        id: Date.now(),
        type: 'success',
        message: `Order ${orderId} accepted!`
      }]);
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleDeliverOrder = async (orderId) => {
    try {
      const updatedOrder = await markOrderDelivered(orderId);
      setActiveOrders(prev => prev.filter(order => order.id !== orderId));
      setCompletedOrders(prev => [...prev, updatedOrder]);
      
      setNotifications(prev => [...prev, {
        id: Date.now(),
        type: 'success',
        message: `Order ${orderId} delivered!`
      }]);
    } catch (error) {
      console.error('Error delivering order:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Driver Dashboard</h1>
        <div className="text-sm text-gray-500">
          Today is {formatDate(new Date())}
        </div>
      </div>
      
      <Notifications notifications={notifications} setNotifications={setNotifications} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Available Orders */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Available Orders</h2>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {availableOrders.length} orders
            </span>
          </div>
          
          <div className="space-y-4">
            {availableOrders.length > 0 ? (
              availableOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  type="available"
                  onAction={() => handleAcceptOrder(order.id)}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No available orders</p>
            )}
          </div>
        </div>
        
        {/* Active Orders */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Active Orders</h2>
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
              {activeOrders.length} orders
            </span>
          </div>
          
          <div className="space-y-4">
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  type="active"
                  onAction={() => handleDeliverOrder(order.id)}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No active orders</p>
            )}
          </div>
        </div>
        
        {/* Map Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Map</h2>
          <div className="h-96 rounded-lg overflow-hidden">
            <OrderMap 
              driverLocation={driverLocation}
              orders={[...availableOrders, ...activeOrders]}
            />
          </div>
        </div>
      </div>
      
      {/* Completed Orders */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recently Completed</h2>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            {completedOrders.length} orders
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {completedOrders.slice(0, 3).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.restaurant}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatTime(order.deliveredTime || order.createdTime)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}