import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import StarRating from '../components/StarRating';
import './Orders.css';

function formatDateTime(isoString) {
  return new Date(isoString).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function OrdersPage() {
  const { orders, rateOrder } = useOrders();

  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      <p className="orders-subtitle">
        Every pickup order and payment you've made on Local Food Street.
      </p>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <p>No orders yet.</p>
          <Link to="/listing" className="orders-browse-link">
            Browse the menu →
          </Link>
        </div>
      ) : (
        <>
          <div className="orders-summary">
            <span>{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
            <span>Total spent: ₹{totalSpent}</span>
          </div>

          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-card-main">
                  <h3>{order.vendorName}</h3>
                  <p>
                    {order.quantity} × {order.item}
                  </p>
                  <span className="order-date">{formatDateTime(order.placedAt)}</span>

                  <div className="order-rating">
                    <span className="order-rating-label">
                      {order.rating ? 'Your rating:' : 'Rate this order:'}
                    </span>
                    <StarRating
                      value={order.rating || 0}
                      onChange={(rating) => rateOrder(order.id, rating)}
                      size={18}
                    />
                  </div>
                </div>
                <div className="order-card-side">
                  <span className="order-status">{order.status}</span>
                  <span className="order-total">₹{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
