import React from 'react';
import { isVendorOpenNow } from '../../../data/vendors';

export default function VendorHeader({ vendor }) {
  const { name = 'Vendor Name', timing = '9:00 AM - 9:00 PM' } = vendor || {};
  const open = isVendorOpenNow(timing);

  return (
    <div className="vendor-header">
      <div>
        <h1>{name}</h1>
        <p>Timings: {timing}</p>
      </div>
      <span className={`status-badge ${open ? 'open' : 'closed'}`}>
        {open ? 'Open' : 'Closed'}
      </span>
    </div>
  );
}
