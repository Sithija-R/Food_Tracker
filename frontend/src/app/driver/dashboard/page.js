import OrderCard from '../components/OrderCard';
import { formatTime, formatDate } from '../utils/helpers';

export default function Dashboard() {
  // Stats data
  const stats = {
    totalFinishedOrders: 128,
    totalEarnings: '86,500 LKR',
    completedToday: 8,
    pendingOrders: 3,
  };

  // Chart data - weekly earnings
  const weeklyEarnings = [
    { day: 'Mon', amount: 12500 },
    { day: 'Tue', amount: 9800 },
    { day: 'Wed', amount: 15200 },
    { day: 'Thu', amount: 11000 },
    { day: 'Fri', amount: 17800 },
    { day: 'Sat', amount: 21000 },
    { day: 'Sun', amount: 18900 },
  ];
  
  // Find max for chart scaling
  const maxEarning = Math.max(...weeklyEarnings.map(item => item.amount));
  
  // Latest orders
  const latestOrders = [
    {
      id: 'ORD-00127',
      customer: 'Rajiv Fernando',
      restaurant: 'Ministry of Crab',
      amount: '8,750 LKR',
      status: 'Delivered',
      time: '2023-08-10T15:45:00'
    },
    {
      id: 'ORD-00126',
      customer: 'Priyanka Bandara',
      restaurant: 'Barefoot Garden Cafe',
      amount: '3,200 LKR',
      status: 'On the way',
      time: '2023-08-10T16:00:00'
    },
    {
      id: 'ORD-00125',
      customer: 'Dinesh Jayawardena',
      restaurant: 'Upali\'s by Nawaloka',
      amount: '1,850 LKR',
      status: 'Preparing',
      time: '2023-08-10T16:15:00'
    },
    {
      id: 'ORD-00124',
      customer: 'Sandaruwan Silva',
      restaurant: 'Bambalapitiya Bake House',
      amount: '850 LKR',
      status: 'Delivered',
      time: '2023-08-10T14:45:00'
    },
    {
      id: 'ORD-00123',
      customer: 'Nimesh Perera',
      restaurant: 'The Mango Tree - Colombo',
      amount: '1,250 LKR',
      status: 'Ready for Pickup',
      time: '2023-08-10T15:30:00'
    },
  ];

  // Sri Lankan locations and details
  const activeOrders = [
    {
      id: 'ORD-00123',
      customerName: 'Nimesh Perera',
      customerContact: '+94 77 123 4567',
      restaurant: 'The Mango Tree - Colombo',
      description: '1 Large Kottu Roti, 2 Chicken Rolls, 1 Fruit Juice',
      pickupLocationName: 'The Mango Tree, Galle Road, Colombo 03',
      pickupLocationCoords: { lat: 6.9271, lng: 79.8612 },
      deliveryLocationName: '23 Flower Road, Colombo 07',
      deliveryLocationCoords: { lat: 6.9000, lng: 79.8600 },
      status: 'Ready for Pickup',
      createdTime: '2023-08-10T15:30:00',
      acceptedTime: null,
      deliveredTime: null,
      eta: '20 min',
      total: '1,250 LKR'
    },
    {
      id: 'ORD-00124',
      customerName: 'Sandaruwan Silva',
      customerContact: '+94 76 987 6543',
      restaurant: 'Bambalapitiya Bake House',
      description: '2 Fish Buns, 1 Chicken Pie, 1 Chocolate Cake',
      pickupLocationName: 'Bambalapitiya Bake House, Galle Road',
      pickupLocationCoords: { lat: 6.8910, lng: 79.8570 },
      deliveryLocationName: '45 Marine Drive, Dehiwala',
      deliveryLocationCoords: { lat: 6.8400, lng: 79.8700 },
      status: 'On the way',
      createdTime: '2023-08-10T14:45:00',
      acceptedTime: '2023-08-10T15:00:00',
      deliveredTime: null,
      eta: '8 min',
      total: '850 LKR'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { 
            title: 'Total Finished Orders', 
            value: stats.totalFinishedOrders, 
            color: 'bg-blue-500',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )
          },
          { 
            title: 'Total Earnings', 
            value: stats.totalEarnings, 
            color: 'bg-green-500',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )
          },
          { 
            title: 'Orders Completed Today', 
            value: stats.completedToday, 
            color: 'bg-yellow-500',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            )
          },
          { 
            title: 'Pending Orders', 
            value: stats.pendingOrders, 
            color: 'bg-purple-500',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center">
            <div className={`${stat.color} p-3 rounded-lg mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chart and Latest Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Earnings Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Earnings</h2>
          <div className="flex items-end h-48 space-x-2 mt-6">
            {weeklyEarnings.map((day, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                <div 
                  className="w-full bg-blue-200 rounded-t hover:bg-blue-300 transition"
                  style={{ height: `${(day.amount / maxEarning) * 80}%` }}
                >
                  <div className="text-xs text-center mt-1 font-medium">
                    {day.amount.toLocaleString()} LKR
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Latest Orders Table */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Latest Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {latestOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">{order.amount}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'On the way'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatTime(order.time)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Active Orders and Recent Deliveries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Active Orders */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Active Orders</h2>
            <button className="text-blue-600 font-medium text-sm">View All</button>
          </div>
          
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
        
        {/* Recent Deliveries */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Deliveries</h2>
            <button className="text-blue-600 font-medium text-sm">View History</button>
          </div>
          
          <div className="space-y-3">
            {[
              {
                id: 'ORD-00122',
                restaurant: 'Galle Face Hotel',
                customer: 'Kamal Fernando',
                amount: '2,150 LKR',
                rating: 5,
                deliveredTime: '2023-08-10T13:20:00'
              },
              {
                id: 'ORD-00121',
                restaurant: 'Nuga Gama Restaurant',
                customer: 'Samantha Rathnayake',
                amount: '3,450 LKR',
                rating: 4,
                deliveredTime: '2023-08-10T12:45:00'
              },
              {
                id: 'ORD-00120',
                restaurant: 'Paradise Road Cafe',
                customer: 'Dilshan Perera',
                amount: '1,850 LKR',
                rating: 5,
                deliveredTime: '2023-08-10T11:30:00'
              },
            ].map((delivery) => (
              <div key={delivery.id} className="flex items-center justify-between p-3 border-b">
                <div>
                  <p className="font-medium">#{delivery.id}</p>
                  <p className="text-gray-600 text-sm">{delivery.restaurant} → {delivery.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{delivery.amount}</p>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(delivery.rating)}
                    </div>
                    <span className="ml-1 text-xs text-gray-500">
                      {formatTime(delivery.deliveredTime)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center py-6">
        <p className="text-xl">Welcome to the driver dashboard</p>
        <p className="text-gray-600">Today is {formatDate(new Date())}</p>
      </div>
    </div>
  );
}