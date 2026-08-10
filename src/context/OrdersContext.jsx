// src/context/OrdersContext.jsx
//
// Tracks every pickup order placed across all vendors so there's a single
// "My Orders" history page. No backend exists, so this persists to
// localStorage the same way AuthContext does — survives a page refresh,
// resets if the browser storage is cleared.

import React, { createContext, useContext, useEffect, useState } from 'react';

const OrdersContext = createContext({
  orders: [],
  addOrder: () => {},
  rateOrder: () => {},
});

export function useOrders() {
  return useContext(OrdersContext);
}

export default function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const stored = localStorage.getItem('lfs_orders');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('lfs_orders', JSON.stringify(orders));
  }, [orders]);

  function addOrder(order) {
    const newOrder = {
      id: `order-${Date.now()}`,
      placedAt: new Date().toISOString(),
      status: 'Paid',
      rating: 0,
      ...order,
    };
    setOrders((current) => [newOrder, ...current]);
  }

  function rateOrder(orderId, rating) {
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, rating } : order))
    );
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder, rateOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}
