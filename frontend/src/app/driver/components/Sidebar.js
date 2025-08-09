// app/driver/components/Sidebar.js
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  
  const isActive = (path) => pathname.includes(path);
  
  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/driver/dashboard' },
    { name: 'Active Orders', icon: '🚚', path: '/driver/active-orders' },
    { name: 'Order History', icon: '📋', path: '/driver/order-history' },
    { name: 'Earnings', icon: '💰', path: '/driver/earnings' },
    { name: 'Vehicle', icon: '🚗', path: '/driver/vehicle' },
    { name: 'Profile', icon: '👤', path: '/driver/profile' },
    { name: 'Logout', icon: '🔒', path: '/logout' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg hidden md:block">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-gray-800">Driver Portal</h2>
      </div>
      
      <div className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path}>
                <div className={`flex items-center p-3 rounded-lg transition ${
                  isActive(item.path)
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}>
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Driver Rating</h3>
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {'★'.repeat(5)}
            </div>
            <span className="ml-2 text-sm">4.8/5.0</span>
          </div>
          <p className="mt-1 text-xs text-gray-600">98% positive feedback</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;