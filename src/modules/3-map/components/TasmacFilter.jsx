import { useMemo } from 'react'

const tasmacLocations = [
  { id: 'tasmac-1', name: 'TASMAC Center 1', lat: 12.9722, lng: 77.5952 },
  { id: 'tasmac-2', name: 'TASMAC Center 2', lat: 12.9734, lng: 77.5938 },
  { id: 'tasmac-3', name: 'TASMAC Center 3', lat: 12.9711, lng: 77.5968 },
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

export default function TasmacFilter({ shop }) {
  const familyZoneStatus = useMemo(() => {
    if (!shop) {
      return null
    }

    const isNearTasmac = tasmacLocations.some((location) => haversineDistance(shop, location) <= 0.6)

    return {
      text: isNearTasmac ? 'Family zone not enabled' : 'Family zone enabled',
      tone: isNearTasmac ? 'danger' : 'success',
    }
  }, [shop])

  if (!familyZoneStatus) {
    return null
  }

  return (
    <div className={`family-zone-status ${familyZoneStatus.tone}`}>
      <strong>{familyZoneStatus.text}</strong>
      <div className="family-zone-hint">
        {familyZoneStatus.tone === 'danger'
          ? 'This shop is within 600m of a TASMAC outlet.'
          : 'This shop is outside the TASMAC zone.'}
      </div>
    </div>
  )
}
