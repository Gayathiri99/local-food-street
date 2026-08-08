import React, { useState } from 'react';
import VendorHeader from './components/VendorHeader';
import ParkingStatus from './components/ParkingStatus';
import SpecialMenu from './components/SpecialMenu';
import PickupOrderModal from './components/PickupOrderModal';
import './Vendor.css';

// Using one of Gayathiri's real shops from 3-map/components/InteractiveMap.jsx
// (baseShops array) so vendor data lines up with what's shown on the map.
// Once routing exists, this whole object will be passed in as a prop / route
// param instead of hardcoded here.
const mockVendor = {
  id: 'spicy-tiffin',
  name: 'Spicy Tiffin Corner',
  timing: '6:00 AM - 6:00 PM',
  crowded: 'Moderate',
  pickup: true,
};

const mockParking = {
  available: true,
  spotsLeft: 5,
};

const mockSpecial = {
  name: 'Filter Coffee & Idli Combo',
  price: 40,
};

export default function VendorDetailsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  function handleOrderSubmit(order) {
    console.log('Pickup order submitted:', order);
  }

  return (
    <div className="vendor-page">
      <VendorHeader vendor={mockVendor} />
      <ParkingStatus parking={mockParking} />
      <SpecialMenu special={mockSpecial} />

      {mockVendor.pickup && (
        <>
          <p className="crowd-note">
            Crowd level: <strong>{mockVendor.crowded}</strong>
            {mockVendor.crowded === 'Busy' ? ' — order ahead to skip the line' : ''}
          </p>
          <button
            className="pickup-modal-trigger"
            onClick={() => setModalOpen(true)}
          >
            Order for Pickup
          </button>
        </>
      )}

      <PickupOrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
}
