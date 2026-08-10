// src/components/TransitSelector.jsx
import React, { useState } from 'react'

export default function TransitSelector({ location, shop }) {
  const [selectedMode, setSelectedMode] = useState('walking')

  if (!location || !shop) return null

  // Define supported modes based on street type
  const isSmallStreet = shop.streetType === 'small_street'

  const availableModes = [
    { id: 'walking', label: 'Walk', icon: '🚶‍♂️', googleMode: 'walking' },
    { id: 'bicycling', label: 'Bike/Two-Wheeler', icon: '🛵', googleMode: 'two-wheeler' },
    // Only add Car driving mode if the shop is on a main road
    ...(!isSmallStreet
      ? [{ id: 'driving', label: 'Car/Cab', icon: '🚗', googleMode: 'driving' }]
      : []),
  ]

  const handleOpenDirections = () => {
    const modeObj = availableModes.find((m) => m.id === selectedMode) || availableModes[0]
    const url = `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${shop.lat},${shop.lng}&travelmode=${modeObj.googleMode}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="directions-box">
      <div className="street-badge-container">
        {isSmallStreet ? (
          <span className="badge badge-warning">
            ⚠️ Narrow Lane: Vehicle access restricted (Walk / Bike only)
          </span>
        ) : (
          <span className="badge badge-success">
            🛣️ Main Road: Accessible by Car, Bike & Walk
          </span>
        )}
      </div>

      <div className="mode-selector">
        <label className="field-label">Select Travel Mode:</label>
        <div className="mode-buttons">
          {availableModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={`mode-btn ${selectedMode === mode.id ? 'active' : ''}`}
              onClick={() => setSelectedMode(mode.id)}
            >
              <span className="mode-icon">{mode.icon}</span>
              <span className="mode-label">{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button type="button" className="directions-button" onClick={handleOpenDirections}>
        Open {selectedMode.toUpperCase()} route in Maps
      </button>
    </div>
  )
}