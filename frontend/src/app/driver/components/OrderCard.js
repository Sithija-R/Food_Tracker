'use client';
import { useState } from 'react';
import OrderDetailsModal from './OrderDetailsModal';

export default function OrderCard({ order }) {
  const [showModal, setShowModal] = useState(false);
  
  const getStatusColor = () => {
    switch(order.status) {
      case 'Ready for Pickup': return 'bg-yellow-100 text-yellow-800';
      case 'Preparing': return 'bg-blue-100 text-blue-800';
      case 'On the way': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div 
        className="border rounded-lg p-3 hover:shadow-md transition cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold">Order #{order.id}</p>
            <p className="text-gray-600 text-sm">{order.restaurant} → {order.customer}</p>
          </div>
          <span className={`px-2 py-1 rounded text-xs ${getStatusColor()}`}>
            {order.status}
          </span>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-600">ETA: {order.eta}</span>
          </div>
          <button 
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition text-sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            View Details
          </button>
        </div>
      </div>
      
      {showModal && (
        <OrderDetailsModal 
          order={order} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}