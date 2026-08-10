import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import VendorHeader from './components/VendorHeader';
import ParkingStatus from './components/ParkingStatus';
import SpecialMenu from './components/SpecialMenu';
import PickupOrderModal from './components/PickupOrderModal';
import { getVendorById, VENDORS, isVendorOpenNow } from '../../data/vendors';
import { useOrders } from '../../context/OrdersContext';
import FeedbackModal from '../../components/FeedbackModal';
import CrowdStatusMeter from '../5-reviews/components/CrowdStatusMeter';
import HygieneModal from '../5-reviews/components/HygieneModal';
import ReviewList from '../5-reviews/components/ReviewList';
import useReviews from '../5-reviews/useReviews';
import './Vendor.css';

// vendor.crowded uses 'Low' | 'Moderate' | 'Busy' (from src/data/vendors.js
// and the map module); CrowdStatusMeter expects 'Low' | 'Medium' | 'High'.
function toCrowdMeterLevel(crowded) {
  if (crowded === 'Busy') return 'High';
  if (crowded === 'Moderate') return 'Medium';
  return 'Low';
}

export default function VendorDetailsPage() {
  const { vendorId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [hygieneModalOpen, setHygieneModalOpen] = useState(false);
  const [feedbackVendor, setFeedbackVendor] = useState(null);
  const [pendingFeedbackVendor, setPendingFeedbackVendor] = useState(null);
  const { orders, addOrder } = useOrders();
  const { reviews } = useReviews();

  // Falls back to the first vendor so the page still renders something
  // sensible if it's opened without a valid :vendorId (e.g. during testing).
  const vendor = getVendorById(vendorId) || VENDORS[0];
  const isOpen = isVendorOpenNow(vendor.timing);

  function handleOrderSubmit(order) {
    addOrder({ ...order, vendorId: vendor.id, vendorName: vendor.name });

    // orders.length is the count *before* this order is added, so +1 is
    // the count this order brings it to. Only fire once, right on the 2nd
    // order — the modal itself opens after the pickup modal is closed, not
    // immediately, so the two overlays don't stack.
    if (orders.length + 1 === 2) {
      setPendingFeedbackVendor(vendor);
    }
  }

  function handlePickupModalClose() {
    setModalOpen(false);
    if (pendingFeedbackVendor) {
      setFeedbackVendor(pendingFeedbackVendor);
      setPendingFeedbackVendor(null);
    }
  }

  return (
    <div className="vendor-page">
      <Link to="/listing" className="back-link">
        ← Back to listing
      </Link>

      <VendorHeader vendor={vendor} />
      <ParkingStatus parking={vendor.parking} />
      <SpecialMenu special={vendor.special} />

      {!isOpen && (
        <p className="closed-note">
          Sorry, this shop is closed right now. Come back during {vendor.timing} to order.
        </p>
      )}

      {isOpen && (
        <CrowdStatusMeter crowdLevel={toCrowdMeterLevel(vendor.crowded)} />
      )}

      {isOpen && vendor.pickup && (
        <button
          className="pickup-modal-trigger"
          onClick={() => setModalOpen(true)}
        >
          Order for Pickup
        </button>
      )}

      <button
        className="hygiene-report-link"
        onClick={() => setHygieneModalOpen(true)}
      >
        ⚠️ Report a hygiene issue
      </button>

      <ReviewList reviews={reviews} />

      <PickupOrderModal
        isOpen={modalOpen}
        onClose={handlePickupModalClose}
        onSubmit={handleOrderSubmit}
        itemName={vendor.special?.name || 'Item'}
        unitPrice={vendor.special?.price || 0}
      />

      <HygieneModal
        isOpen={hygieneModalOpen}
        onClose={() => setHygieneModalOpen(false)}
      />

      <FeedbackModal vendor={feedbackVendor} onClose={() => setFeedbackVendor(null)} />
    </div>
  );
}
