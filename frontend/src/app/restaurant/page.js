import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import OrdersTable from './components/OrdersTable';
import QuickActions from './components/QuickActions';
import { restaurantData } from './data/dummyData';

const RestaurantDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header name={restaurantData.name} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <StatsPanel stats={restaurantData.stats} />
          <QuickActions />
        
        </div>
        
        {/* Right Column */}
        <div className="lg:col-span-2">
          <OrdersTable orders={restaurantData.orders} />
        </div>
      </div>
      
     
    </div>
  );
};

export default RestaurantDashboard;