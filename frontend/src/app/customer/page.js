'use client';
import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "../globals.css";

const mockUser = {
  name: "Speed Man",
  type: "CUSTOMER",
};

export default function CustomerDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [expandedRestaurant, setExpandedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState({ name: "", address: "", phone: "" });
  const [view, setView] = useState("restaurants");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const res = await fetch("http://localhost:5000/api/restaurants"); // change URL to your backend
        if (!res.ok) throw new Error("Failed to fetch restaurants");
        const data = await res.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    }
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("customerOrders")) || [];
    setOrders(savedOrders);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedOrders = JSON.parse(localStorage.getItem("customerOrders")) || [];
      setOrders(updatedOrders);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleRestaurant = (restaurantId) => {
    setExpandedRestaurant(expandedRestaurant === restaurantId ? null : restaurantId);
  };

  const addToCart = (item, restaurantName) => {
    setCart([...cart, { ...item, restaurant: restaurantName }]);
  };

  const placeOrder = () => {
    if (!orderDetails.name || !orderDetails.address || !orderDetails.phone) {
      alert("Please fill all details.");
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cart,
      customer: orderDetails,
      status: "New",
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);

    localStorage.setItem("customerOrders", JSON.stringify(updatedOrders));

    setCart([]);
    setOrderDetails({ name: "", address: "", phone: "" });
    setView("orders");
  };

  const logout = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 bg-gradient-to-b from-sky-300 to-sky-100">
      <div className="flex justify-between items-center mb-6">
        <h1 onClick={() => setView("restaurants")} className="text-2xl font-bold cursor-pointer">
          Welcome, {mockUser.name}
        </h1>
        <div className="flex gap-3 items-center">
          <button onClick={() => setView("orders")} className="bg-yellow-600 text-white px-4 py-2 rounded-3xl">
            Orders
          </button>
          <button onClick={() => setView("cart")} className="relative bg-white p-2 rounded-full shadow-md">
            <FaShoppingCart className="text-xl text-sky-900" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-1 text-xs">
              {cart.length}
            </span>
          </button>
          <button onClick={logout} className="bg-sky-900 text-white px-4 py-2 rounded-3xl">
            Logout
          </button>
        </div>
      </div>

      {view === "restaurants" && (
        <div>
          <h2 className="text-lg font-bold mb-4">Available Restaurants</h2>
          <div className="flex flex-row gap-4 flex-wrap">
            {restaurants.length === 0 ? (
              <p>No restaurants available.</p>
            ) : (
              restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className={`flex flex-col bg-white shadow-md rounded-2xl p-4 w-64 cursor-pointer transition duration-200
                    ${expandedRestaurant === restaurant.id ? "border-2 border-sky-500 shadow-lg" : "hover:shadow-lg"}`}
                  onClick={() => toggleRestaurant(restaurant.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className={`font-semibold text-lg ${expandedRestaurant === restaurant.id ? "text-sky-600" : "text-gray-800"}`}>
                      {restaurant.name}
                    </h3>
                    <span>{expandedRestaurant === restaurant.id ? "▲" : "▼"}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {expandedRestaurant && (
            <div className="mt-6 bg-white shadow-md rounded-xl p-4">
              <h3 className="font-semibold text-xl mb-3">
                {restaurants.find((r) => r.id === expandedRestaurant)?.name} - Menu
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurants
                  .find((r) => r.id === expandedRestaurant)
                  ?.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500">Rs {item.price}</p>
                      </div>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          addToCart(item, restaurants.find((r) => r.id === expandedRestaurant)?.name);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {view === "cart" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-bold mb-4">Your Cart</h2>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between bg-white p-3 rounded mb-2">
                <p>{item.name} ({item.restaurant})</p>
                <p>Rs {item.price}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Enter Your Details</h2>
            <input
              type="text"
              placeholder="Name"
              value={orderDetails.name}
              onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={orderDetails.address}
              onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={orderDetails.phone}
              onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
              className="border p-2 w-full mb-4 rounded"
            />
            <button onClick={placeOrder} className="bg-green-600 text-white px-4 py-2 rounded">
              Place Order
            </button>
          </div>
        </div>
      )}

      {view === "orders" && (
        <div>
          <h2 className="text-lg font-bold mb-4">Your Orders</h2>
          {orders.length === 0 && <p>No orders yet.</p>}
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded mb-4">
              <p className="font-semibold">Order #{order.id}</p>
              <p>Status: {order.status}</p>
              <ul className="list-disc ml-4">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} ({item.restaurant}) - Rs {item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}