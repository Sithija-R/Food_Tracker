'use client';

import React, { useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [cartItems, setCartItems] = useState([]); 

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const addToCart = () => {
    const newItem = { id: cartItems.length + 1, name: 'Food Item' };
    setCartItems([...cartItems, newItem]);
  };

  const navItems = ['Home', 'Restaurants', 'About Us'];

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
        <div className="text-3xl font-bold text-green-600">
          <h3>SpeedMan</h3>
        </div>
        <ul className="flex gap-6 text-xl text-gray-700 font-medium">
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setActiveLink(item)}
              className={`cursor-pointer hover:text-green-600 ${
                activeLink === item
                  ? 'text-green-600 font-semibold underline underline-offset-4'
                  : ''
              }`}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button className="relative text-gray-700 hover:text-green-600">
            <FaShoppingBasket size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
          {!isLoggedIn ? (
            <button
              onClick={handleLogin}
              className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition duration-200"
            >
              Login
            </button>
          ) : (
            <>
              <button className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition duration-200">
                Order
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700 transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;