import React from 'react';

// Same parsing logic as Gayathiri's isShopOpenNow() in InteractiveMap.jsx,
// so both modules calculate open/closed identically from one "timing" string
// like "6:00 AM - 6:00 PM".
function isVendorOpen(timing) {
  if (!timing || timing.toLowerCase().includes('closed')) {
    return false;
  }

  const [startStr, endStr] = timing.split(' - ');

  const parseTime = (timeStr) => {
    const match = timeStr.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return null;

    let [, hours, minutes, period] = match;
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
    if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const now = new Date();
  const startTime = parseTime(startStr);
  const endTime = parseTime(endStr);

  if (!startTime || !endTime) return false;

  if (endTime < startTime) {
    endTime.setDate(endTime.getDate() + 1);
    if (now < startTime) now.setDate(now.getDate() + 1);
  }

  return now >= startTime && now <= endTime;
}

export default function VendorHeader({ vendor }) {
  const { name = 'Vendor Name', timing = '9:00 AM - 9:00 PM' } = vendor || {};
  const open = isVendorOpen(timing);

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
