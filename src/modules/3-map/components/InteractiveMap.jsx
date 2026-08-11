import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, Circle } from 'react-leaflet'
import L from 'leaflet'
import { useGeoLocation } from '../useGeoLocation'
import TasmacFilter from './TasmacFilter'
import TransitSelector from './TransitSelector'
import 'leaflet/dist/leaflet.css'
import '../Map.css'

// 1. Icon Definitions with CDN URLs
const defaultIcon = L.icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@1.0.0/img/marker-icon-orange.png',
  iconRetinaUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@1.0.0/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const activeIcon = L.icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@1.0.0/img/marker-icon-red.png',
  iconRetinaUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@1.0.0/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const tasmacIcon = L.icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@1.0.0/img/marker-icon-blue.png',
  iconRetinaUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@1.0.0/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// 2. Pure helper function (No hooks inside here)
function getDynamicTasmacLocations(userLocation) {
  if (!userLocation) return []

  return [
    {
      id: 'tasmac-1',
      name: 'TASMAC Shop 1',
      // ~220m away: Food stalls near user location will trigger 'Family zone not enabled'
      lat: userLocation.lat + 0.002,
      lng: userLocation.lng + 0.0015,
    },
    {
      id: 'tasmac-2',
      name: 'TASMAC Shop 2',
      // ~1.1 km away: Outside the 600m zone
      lat: userLocation.lat - 0.010,
      lng: userLocation.lng - 0.008,
    },
    {
      id: 'tasmac-3',
      name: 'TASMAC Shop 3',
      // ~1.3 km away: Outside the 600m zone
      lat: userLocation.lat + 0.008,
      lng: userLocation.lng - 0.010,
    },
  ]
}

const baseShops = [
  {
    id: 'spicy-tiffin',
    name: 'Spicy Tiffin Corner',
    category: 'Breakfast',
    streetType: 'small_street',
    x: 32,
    y: 42,
    note: 'Fast breakfast and tea',
    open: true,
    timing: '6:00 AM - 6:00 PM',
    crowded: 'Moderate',
    pickup: true,
    // Close to TASMAC 1 (~200m away) -> Family Zone NOT Enabled
    latOffset: 0.0070,
    lngOffset: 0.0018,
  },
  {
    id: 'street-bites',
    name: 'Street Bites Hub',
    category: 'Lunch',
    streetType: 'small_street',
    x: 68,
    y: 30,
    note: 'North Indian wraps and juices',
    open: true,
    timing: '11:00 AM - 11:00 PM',
    crowded: 'Busy',
    pickup: true,
    // Close to TASMAC 1 (~350m away) -> Family Zone NOT Enabled
    latOffset: 0.0040,
    lngOffset: 0.0025,
  },
  {
    id: 'night-market',
    name: 'Night Market Grill',
    category: 'Dinner',
    streetType: 'main_road',
    x: 58,
    y: 72,
    note: 'Tandoor snacks and grills',
    open: false,
    timing: 'Closed for the day',
    crowded: 'Low',
    pickup: false,
    // Far from TASMAC 1 (~1 km South-West) -> Family Zone ENABLED
    latOffset: -0.0070,
    lngOffset: -0.0060,
  },
  {
    id: 'family-bites',
    name: 'Family Bites Kitchen',
    category: 'Dinner',
    streetType: 'main_road',
    x: 46,
    y: 64,
    note: 'South Indian meals and sweets',
    open: true,
    timing: '10:00 AM - 10:00 PM',
    crowded: 'Moderate',
    pickup: true,
    // Far from TASMAC 1 (~1.2 km South) -> Family Zone ENABLED
    latOffset: -0.0085,
    lngOffset: -0.0020,
  },
  {
    id: 'tiffin-stop',
    name: 'Tiffin Stop',
    category: 'Breakfast',
    streetType: 'main_road',
    x: 26,
    y: 56,
    note: 'Quick breakfast and coffee',
    open: true,
    timing: '7:00 AM - 9:00 PM',
    crowded: 'Low',
    pickup: true,
    // Far from TASMAC 1 (~900m West) -> Family Zone ENABLED
    latOffset: -0.0010,
    lngOffset: -0.0075,
  },
  {
    id: 'samosa-hub',
    name: 'Samosa Hub',
    category: 'Snacks',
    streetType: 'small_street',
    x: 74,
    y: 62,
    note: 'Street snacks and juices',
    open: true,
    timing: '8:00 AM - 11:00 PM',
    crowded: 'Busy',
    pickup: true,
    // Close to TASMAC 1 (~450m away) -> Family Zone NOT Enabled
    latOffset: 0.0015,
    lngOffset: 0.0045,
  },
  {
  id: 'green-leaf',
  name: 'Green Leaf Salads',
  category: 'Healthy Food',
  streetType: 'small_street',
  x: 38,
  y: 45,
  note: 'Fresh salads and smoothie bowls',
  open: true,
  timing: '9:00 AM - 8:00 PM',
  crowded: 'Low',
  pickup: true,
  latOffset: 0.0050,
  lngOffset: 0.0040,
},

{
  id: 'sweet-treats',
    name: 'Sweet Treats Corner',
    category: 'Desserts',
  streetType: 'main_street',
  x: 61,
  y: 35,
  note: 'Traditional sweets and ice cream',
  open: true,
  timing: '12:00 PM - 10:00 PM',
  crowded: 'Moderate',
  pickup: true,
  latOffset: 0.0051,
  lngOffset: 0.0062,
},

{
  id: 'cool-sips',
    name: 'Cool Sips Juice Bar',
    category: 'Drinks',
  streetType: 'small_street',
  x: 82,
  y: 71,
  note: 'Fresh juices, lassi and shakes',
  open: false,
  timing: '8:00 AM - 11:00 PM',
  crowded: 'Busy',
  pickup: true,
  latOffset: 0.0074,
  lngOffset: 0.0036,
}
]
// Function to check if current time falls within opening hours
function isShopOpenNow(timingString) {
  if (!timingString || timingString.toLowerCase().includes('closed')) {
    return false
  }

  try {
    const [startStr, endStr] = timingString.split(' - ')

    const parseTime = (timeStr) => {
      const match = timeStr.trim().match(/(\d+):(\d+)\s*(AM|PM)/i)
      if (!match) return null

      let [, hours, minutes, period] = match
      hours = parseInt(hours, 10)
      minutes = parseInt(minutes, 10)

      if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12
      if (period.toUpperCase() === 'AM' && hours === 12) hours = 0

      const date = new Date()
      date.setHours(hours, minutes, 0, 0)
      return date
    }

    const now = new Date()
    const startTime = parseTime(startStr)
    const endTime = parseTime(endStr)

    if (!startTime || !endTime) return false

    // Handle overnight shifts (e.g., 6:00 PM - 2:00 AM)
    if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1)
      if (now < startTime) {
        now.setDate(now.getDate() + 1)
      }
    }

    return now >= startTime && now <= endTime
  } catch (error) {
    return false
  }
}
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
  if (!location) return []

  return baseShops
    .map((shop, index) => {
      const latOffset = shop.latOffset ?? (((index % 3) - 1) * 0.008 + (index % 2 === 0 ? 0.002 : -0.001))
      const lngOffset = shop.lngOffset ?? (((index % 4) - 1.5) * 0.008 + (index % 2 === 0 ? -0.001 : 0.002))
      const lat = location.lat + latOffset
      const lng = location.lng + lngOffset
      const distanceKm = haversineDistance(location, { lat, lng })
      // Automatically evaluate open status from timing
      const isOpenNow = isShopOpenNow(shop.timing)

      return {
        ...shop,
        lat,
        lng,
        distanceKm,
        open: isOpenNow, // Overrides hardcoded value dynamically
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
const getCrowdPillClass = (crowdedStatus) => {
  if (crowdedStatus === 'Busy') return 'pill-danger'      // Red
  if (crowdedStatus === 'Moderate') return 'pill-warning'  // Orange
  return 'pill-success'                                   // Green (Low)
}
// 3. Main Component Function
export default function InteractiveMap() {
  const { location, error, loading } = useGeoLocation()
  const [activeShop, setActiveShop] = useState(null)
  const [fromLabel, setFromLabel] = useState('Detecting your location...')
  const [pulseIndex, setPulseIndex] = useState(0)

  // Compute TASMAC locations safely at the top level of the component
  const tasmacLocations = useMemo(() => getDynamicTasmacLocations(location), [location])

  const handleOpenDirections = () => {
    if (!location || !activeShop) return

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
    if (!location) return

    if (nearbyShops.length === 0) {
      setActiveShop(null)
      return
    }

    if (!activeShop || !nearbyShops.some((shop) => shop.id === activeShop.id)) {
      setActiveShop(nearbyShops[0])
    }
  }, [activeShop, location, nearbyShops])

  const directions = useMemo(() => {
    if (!location || !activeShop) return []

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

              {/* Render TASMAC Markers */}
              {tasmacLocations.map((tasmac) => (
                <Marker key={tasmac.id} position={[tasmac.lat, tasmac.lng]} icon={tasmacIcon}>
                  <Popup>
                    <strong>{tasmac.name}</strong>
                    <br />
                    TASMAC outlet
                  </Popup>
                </Marker>
              ))}

              {/* Render Food Shop Markers */}
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
              {/* <p>{activeShop.note}</p> */}
              <p className="distance-text">About {activeShop.distanceKm.toFixed(1)} km away</p>
              <div className="status-grid">
                <div className={`pill ${activeShop.open ? 'pill-success' : 'pill-danger'}`}
               title={`🕒 Hours: ${activeShop.timing}`}>
              {activeShop.open ? 'Open now' : 'Closed'}
              </div>
              {activeShop.open && (
                <div className={`pill ${getCrowdPillClass(activeShop.crowded)}`}>
                 {activeShop.crowded}
                </div>)}
              </div>
              
              {/* <p className="meta-line">Timing: {activeShop.timing}</p> */}
              {activeShop.open && (
              <p className={`meta-line ${activeShop.pickup ? 'meta-success' : 'meta-danger'}`}>
                {activeShop.pickup ? 'Pickup available online' : 'Pickup not available'}
              </p>)}
              
              <TasmacFilter shop={activeShop} tasmacLocations={tasmacLocations} />
              <TransitSelector location={location} shop={activeShop} />
              {/* <button type="button" className="directions-button" onClick={handleOpenDirections} disabled={!location}>
                {location ? 'Open directions in Maps' : 'Enable location to open directions'}
              </button> */}
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