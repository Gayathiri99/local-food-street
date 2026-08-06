import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, Circle } from 'react-leaflet'
import L from 'leaflet'
import { useGeoLocation } from '../useGeoLocation'
import TasmacFilter from './TasmacFilter'
import 'leaflet/dist/leaflet.css'
import '../Map.css'

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const activeIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const tasmacLocations = [
  { id: 'tasmac-1', name: 'TASMAC Center 1', lat: 12.9722, lng: 77.5952 },
  { id: 'tasmac-2', name: 'TASMAC Center 2', lat: 12.9734, lng: 77.5938 },
  { id: 'tasmac-3', name: 'TASMAC Center 3', lat: 12.9711, lng: 77.5968 },
]

const tasmacIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const baseShops = [
  {
    id: 'spicy-tiffin',
    name: 'Spicy Tiffin Corner',
    category: 'Breakfast',
    x: 32,
    y: 42,
    note: 'Fast breakfast and tea',
    open: true,
    timing: '6:00 AM - 10:00 PM',
    crowded: 'Moderate',
    pickup: true,
    latOffset: 0.0008,
    lngOffset: 0.0007,
  },
  {
    id: 'street-bites',
    name: 'Street Bites Hub',
    category: 'Lunch',
    x: 68,
    y: 30,
    note: 'North Indian wraps and juices',
    open: true,
    timing: '11:00 AM - 11:00 PM',
    crowded: 'Busy',
    pickup: true,
    latOffset: -0.0004,
    lngOffset: 0.0009,
  },
  {
    id: 'night-market',
    name: 'Night Market Grill',
    category: 'Dinner',
    x: 58,
    y: 72,
    note: 'Tandoor snacks and grills',
    open: false,
    timing: 'Closed for the day',
    crowded: 'Low',
    pickup: false,
    latOffset: 0.0004,
    lngOffset: -0.0008,
  },
  {
    id: 'family-bites',
    name: 'Family Bites Kitchen',
    category: 'Dinner',
    x: 46,
    y: 64,
    note: 'South Indian meals and sweets',
    open: true,
    timing: '10:00 AM - 10:00 PM',
    crowded: 'Moderate',
    pickup: true,
    latOffset: -0.0002,
    lngOffset: -0.0003,
  },
  {
    id: 'tiffin-stop',
    name: 'Tiffin Stop',
    category: 'Breakfast',
    x: 26,
    y: 56,
    note: 'Quick breakfast and coffee',
    open: true,
    timing: '7:00 AM - 9:00 PM',
    crowded: 'Low',
    pickup: true,
    latOffset: 0.0005,
    lngOffset: -0.0006,
  },
  {
    id: 'samosa-hub',
    name: 'Samosa Hub',
    category: 'Snacks',
    x: 74,
    y: 62,
    note: 'Street snacks and juices',
    open: true,
    timing: '8:00 AM - 11:00 PM',
    crowded: 'Busy',
    pickup: true,
    latOffset: -0.0006,
    lngOffset: 0.0004,
  },
]

function haversineDistance(origin, destination) {
  const toRad = (value) => (value * Math.PI) / 180
  const earthRadiusKm = 6371
  const dLat = toRad(destination.lat - origin.lat)
  const dLng = toRad(destination.lng - origin.lng)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(origin.lat)) * Math.cos(toRad(destination.lat)) * Math.sin(dLng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return earthRadiusKm * c
}

function buildNearbyShops(location) {
  if (!location) {
    return []
  }

  return baseShops
    .map((shop, index) => {
      const latOffset = shop.latOffset ?? (((index % 3) - 1) * 0.008 + (index % 2 === 0 ? 0.002 : -0.001))
      const lngOffset = shop.lngOffset ?? (((index % 4) - 1.5) * 0.008 + (index % 2 === 0 ? -0.001 : 0.002))
      const lat = location.lat + latOffset
      const lng = location.lng + lngOffset
      const distanceKm = haversineDistance(location, { lat, lng })

      return {
        ...shop,
        lat,
        lng,
        distanceKm,
      }
    })
    .filter((shop) => shop.distanceKm <= 3)
    .sort((a, b) => a.distanceKm - b.distanceKm)
}

function formatLocation(location) {
  return `${location.lat.toFixed(3)}, ${location.lng.toFixed(3)}`
}

function getStepLabel(origin, destination) {
  const latDiff = destination.lat - origin.lat
  const lngDiff = destination.lng - origin.lng

  if (Math.abs(latDiff) > Math.abs(lngDiff)) {
    return latDiff >= 0 ? 'Head north toward the shop' : 'Head south toward the shop'
  }

  return lngDiff >= 0 ? 'Head east toward the shop' : 'Head west toward the shop'
}

function getDirections(origin, destination) {
  const distanceKm = Math.max(0.8, Math.abs(destination.lat - origin.lat) * 111 + Math.abs(destination.lng - origin.lng) * 85) / 100

  return [
    { title: 'Start', detail: `From ${formatLocation(origin)} to ${destination.name}` },
    { title: 'Route', detail: `${getStepLabel(origin, destination)} and follow the food street lane.` },
    { title: 'Arrival', detail: `Reach ${destination.name} in about ${Math.max(4, Math.round(distanceKm))} minutes.` },
  ]
}

export default function InteractiveMap() {
  const { location, error, loading } = useGeoLocation()
  const [activeShop, setActiveShop] = useState(null)
  const [fromLabel, setFromLabel] = useState('Detecting your location...')
  const [pulseIndex, setPulseIndex] = useState(0)

  const handleOpenDirections = () => {
    if (!location || !activeShop) {
      return
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${activeShop.lat},${activeShop.lng}&travelmode=walking`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    if (location) {
      setFromLabel(`Current location • ${formatLocation(location)}`)
      return
    }

    if (error) {
      setFromLabel('Location unavailable')
    }
  }, [location, error])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPulseIndex((current) => (current + 1) % Math.max(1, baseShops.length))
    }, 1400)

    return () => window.clearInterval(timer)
  }, [])

  const nearbyShops = useMemo(() => buildNearbyShops(location), [location])

  useEffect(() => {
    if (!location) {
      return
    }

    if (nearbyShops.length === 0) {
      setActiveShop(null)
      return
    }

    if (!activeShop || !nearbyShops.some((shop) => shop.id === activeShop.id)) {
      setActiveShop(nearbyShops[0])
    }
  }, [activeShop, location, nearbyShops])

  const directions = useMemo(() => {
    if (!location || !activeShop) {
      return []
    }

    return getDirections(location, activeShop)
  }, [activeShop, location])

  return (
    <div className="map-page">
      <section className="map-shell">
        <div className="map-header">
          <div>
            <p className="eyebrow">Local food street</p>
            <h1>Find your next favorite stop</h1>
          </div>
          <div className="status-pill">{loading ? 'Locating...' : nearbyShops.length > 0 ? 'Shops within 3 km' : 'No nearby shops'}</div>
        </div>

        <div className="map-surface" role="img" aria-label="Leaflet-based food street map with nearby shop markers">
          <div className="map-overlay">
            <span className="overlay-badge">Live route mode</span>
            <span className="overlay-text">Tap a stall to change your destination</span>
          </div>

          {location ? (
            <MapContainer center={[location.lat, location.lng]} zoom={15} scrollWheelZoom className="leaflet-map">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Circle center={[location.lat, location.lng]} radius={3000} pathOptions={{ color: '#fb923c', fillColor: '#fdba74', fillOpacity: 0.16 }} />

              {tasmacLocations.map((location) => (
                <Marker key={location.id} position={[location.lat, location.lng]} icon={tasmacIcon}>
                  <Popup>
                    <strong>{location.name}</strong>
                    <br />
                    TASMAC outlet
                  </Popup>
                </Marker>
              ))}

              {nearbyShops.length > 0 ? (
                nearbyShops.map((shop) => (
                  <Marker
                    key={shop.id}
                    position={[shop.lat, shop.lng]}
                    icon={activeShop?.id === shop.id ? activeIcon : defaultIcon}
                    eventHandlers={{ click: () => setActiveShop(shop) }}
                  >
                    <Popup>
                      <strong>{shop.name}</strong>
                      <br />
                      {shop.category}
                      <br />
                      {shop.note}
                    </Popup>
                  </Marker>
                ))
              ) : null}

              {activeShop ? (
                <Marker position={[activeShop.lat, activeShop.lng]} icon={activeIcon}>
                  <Popup>{activeShop.name}</Popup>
                </Marker>
              ) : null}
            </MapContainer>
          ) : (
            <div className="map-empty-state">
              <strong>Waiting for location</strong>
              <span>Allow location access to load the nearby food street map.</span>
            </div>
          )}
        </div>
      </section>

      <aside className="route-panel">
        <div className="route-card">
          <p className="eyebrow">Directions</p>
          <h2>Route planner</h2>

          <label className="field">
            <span>From</span>
            <input value={fromLabel} readOnly />
          </label>

          <label className="field">
            <span>To</span>
            <input value={activeShop?.name || 'No nearby shop'} readOnly />
          </label>

          {error ? <p className="error-text">{error}</p> : null}

          {activeShop ? (
            <div className="shop-info">
              <h3>{activeShop.name}</h3>
              <p>{activeShop.category}</p>
              <p>{activeShop.note}</p>
              <p className="distance-text">About {activeShop.distanceKm.toFixed(1)} km away</p>
              <div className="status-grid">
                <div className={`pill ${activeShop.open ? 'pill-success' : 'pill-danger'}`}>
                  {activeShop.open ? 'Open now' : 'Closed'}
                </div>
                <div className={`pill ${activeShop.crowded === 'Busy' ? 'pill-danger' : 'pill-success'}`}>
                  {activeShop.crowded}
                </div>
              </div>
              <p className="meta-line">Timing: {activeShop.timing}</p>
              <p className={`meta-line ${activeShop.pickup ? 'meta-success' : 'meta-danger'}`}>
                {activeShop.pickup ? 'Pickup available online' : 'Pickup not available'}
              </p>
              <TasmacFilter shop={activeShop} />
              <button type="button" className="directions-button" onClick={handleOpenDirections} disabled={!location}>
                {location ? 'Open directions in Maps' : 'Enable location to open directions'}
              </button>
            </div>
          ) : (
            <div className="shop-info">
              <h3>No nearby shop selected</h3>
              <p>There are no food shops within 3 km of your current location right now.</p>
            </div>
          )}

          <ul className="steps">
            {directions.length > 0 ? (
              directions.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <span>{step.detail}</span>
                </li>
              ))
            ) : (
              <li>
                <strong>Waiting for location</strong>
                <span>Allow browser location access to see your route.</span>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </div>
  )
}
