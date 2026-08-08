import React from 'react';

export default function ParkingStatus({ parking }) {
  const { available = true, spotsLeft = 0 } = parking || {};

  return (
    <div className="parking-status">
      <span className={`dot ${available ? 'available' : 'full'}`} />
      <span>
        {available
          ? `Parking available (${spotsLeft} spots left)`
          : 'Parking full'}
      </span>
    </div>
  );
}
