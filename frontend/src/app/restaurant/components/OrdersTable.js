const OrdersTable = ({ orders }) => {
  const statusColors = {
    'New': 'bg-blue-100 text-blue-800',
    'Preparing': 'bg-yellow-100 text-yellow-800',
    'Ready for Pickup': 'bg-green-100 text-green-800',
    'Completed': 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Current Orders</h2>
        <div className="flex space-x-2">
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="border rounded px-3 py-1 text-sm"
          />
          <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm">
            Filter
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-3">Order ID</th>
              <th className="text-left py-2 px-3">Customer</th>
              <th className="text-left py-2 px-3">Items</th>
              <th className="text-left py-2 px-3">Address</th>
              <th className="text-left py-2 px-3">Status</th>
              <th className="text-left py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-3 font-medium">#{order.id}</td>
                <td className="py-3 px-3">{order.customer}</td>
                <td className="py-3 px-3">{order.description}</td>
                <td className="py-3 px-3">{order.address}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-1 rounded text-xs ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-3">
                  {order.status === 'New' && (
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm mr-2">
                      Mark Preparing
                    </button>
                  )}
                  {order.status === 'Preparing' && (
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                      Mark Ready
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;