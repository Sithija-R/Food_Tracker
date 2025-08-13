"use client";

import Header from "./components/Header";
import StatsPanel from "./components/StatsPanel";
import OrdersTable from "./components/OrdersTable";
import QuickActions from "./components/QuickActions";
import { restaurantData } from "./data/dummyData";
import { useEffect } from "react";
import { useOrders } from "@/hooks/useOrder";
import { useAuth } from "@/hooks/useAuth";

const RestaurantDashboard = () => {
  const { orders, availableOrders, updateOrderStatus } = useOrders();
  const { user } = useAuth();

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header name={user?.name} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <StatsPanel orders={orders} availableOrders={availableOrders} />
          <QuickActions />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          <OrdersTable
            availableOrders={availableOrders}
            orders={orders}
            updateOrderStatus={updateOrderStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
