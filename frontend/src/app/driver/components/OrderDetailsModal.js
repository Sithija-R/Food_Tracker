'use client';
import { useState } from 'react';
import OrderMap from './OrderMap';

const OrderDetailsModal = ({ order, onClose }) => {
  const [showMap, setShowMap] = useState(false);

  // Format time function
  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Order #{order.id}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-2">Customer Details</h3>
              <p className="text-gray-600">{order.customerName}</p>
              <p className="text-sm text-gray-500">Contact: {order.customerContact}</p>
              <p className="text-sm text-gray-500 mt-2">Delivery Location:</p>
              <p className="text-sm">{order.deliveryLocationName}</p>
              <p className="text-xs text-gray-500">Coordinates: {order.deliveryLocationCoords.lat}, {order.deliveryLocationCoords.lng}</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-2">Restaurant Details</h3>
              <p className="text-gray-600">{order.restaurant}</p>
              <p className="text-sm text-gray-500 mt-2">Pickup Location:</p>
              <p className="text-sm">{order.pickupLocationName}</p>
              <p className="text-xs text-gray-500">Coordinates: {order.pickupLocationCoords.lat}, {order.pickupLocationCoords.lng}</p>
            </div>
          </div>

          {/* View Google Map Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowMap(true)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Google Map
            </button>
          </div>

          <div className="border rounded-lg p-4 mb-6">
            <h3 className="font-bold text-gray-800 mb-2">Order Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded text-xs ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Description:</span>
                <span className="text-right">{order.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Created:</span>
                <span>{formatTime(order.createdTime)}</span>
              </div>
              {order.acceptedTime && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Accepted Time:</span>
                  <span>{formatTime(order.acceptedTime)}</span>
                </div>
              )}
              {order.deliveredTime && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivered Time:</span>
                  <span>{formatTime(order.deliveredTime)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                <span className="text-gray-800">Total:</span>
                <span>{order.total} LKR</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Close
            </button>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => {
                // Handle order action
                alert(`Processing order ${order.id}`);
                onClose();
              }}
            >
              {order.status === 'Ready for Pickup' ? 'Start Delivery' : 'Mark as Delivered'}
            </button>
          </div>
        </div>
      </div>

      {/* Google Map Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Order Map - #{order.id}</h2>
                <button 
                  onClick={() => setShowMap(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <OrderMap 
                pickupCoords={order.pickupLocationCoords}
                deliveryCoords={order.deliveryLocationCoords}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function for status classes
const getStatusClass = (status) => {
  switch(status) {
    case 'Ready for Pickup': return 'bg-yellow-100 text-yellow-800';
    case 'Preparing': return 'bg-blue-100 text-blue-800';
    case 'On the way': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default OrderDetailsModal;