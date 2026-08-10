// PickupOrderModal.jsx
// Req #13: Lets a customer place an express pickup order when the stall is
// crowded, then pay for it online — no real payment gateway exists, so this
// simulates one (short "processing" delay, then success) the same way
// LoginForm/RegisterForm in 6-user fake their auth delay.
//
// Each shop only sells its one listed special right now, so there's nothing
// for the customer to type in or price themselves — just pick a quantity.

import React, { useState } from 'react';

const STAGE_FORM = 'form';
const STAGE_PAYMENT = 'payment';
const STAGE_PROCESSING = 'processing';
const STAGE_SUCCESS = 'success';

export default function PickupOrderModal({ isOpen, onClose, onSubmit, itemName, unitPrice = 0 }) {
  const [quantity, setQuantity] = useState(1);
  const [stage, setStage] = useState(STAGE_FORM);

  if (!isOpen) {
    return null;
  }

  const total = unitPrice * quantity;

  function handleFormSubmit(e) {
    e.preventDefault();
    setStage(STAGE_PAYMENT);
  }

  function handleConfirmPayment() {
    setStage(STAGE_PROCESSING);
    setTimeout(() => {
      setStage(STAGE_SUCCESS);
      onSubmit?.({ item: itemName, quantity, unitPrice, total });
    }, 1200);
  }

  function handleClose() {
    setQuantity(1);
    setStage(STAGE_FORM);
    onClose?.();
  }

  return (
    <div className="pickup-modal-overlay" onClick={handleClose}>
      <div className="pickup-modal" onClick={(e) => e.stopPropagation()}>
        {stage === STAGE_FORM && (
          <>
            <h2>Express Pickup Order</h2>
            <p className="order-item-line">
              {itemName} — ₹{unitPrice} each
            </p>
            <form onSubmit={handleFormSubmit}>
              <label>
                Quantity
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  required
                />
              </label>
              <p className="order-total-line">Total: ₹{total}</p>
              <button type="submit" className="pickup-modal-trigger">
                Continue to Payment
              </button>
            </form>
          </>
        )}

        {stage === STAGE_PAYMENT && (
          <div className="pickup-payment">
            <h2>Confirm Payment</h2>
            <p className="payment-summary">
              {quantity} × {itemName} — <strong>₹{total}</strong>
            </p>
            <p className="payment-note">Pay ₹{total} automatically from your account?</p>
            <div className="payment-actions">
              <button className="pickup-modal-trigger" onClick={handleConfirmPayment}>
                Yes, Pay Now
              </button>
              <button className="payment-cancel" onClick={() => setStage(STAGE_FORM)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {stage === STAGE_PROCESSING && (
          <div className="pickup-payment">
            <h2>Processing Payment…</h2>
            <p className="payment-note">Please wait a moment.</p>
          </div>
        )}

        {stage === STAGE_SUCCESS && (
          <div className="pickup-confirmation">
            <div className="pickup-confirmation-icon">✅</div>
            <h2>Payment Successful</h2>
            <p>
              {quantity} × {itemName} (₹{total}) will be ready for pickup shortly.
            </p>
            <button className="pickup-modal-trigger" onClick={handleClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
