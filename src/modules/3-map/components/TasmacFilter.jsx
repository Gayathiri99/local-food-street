import { useMemo } from 'react'

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

export default function TasmacFilter({ shop, tasmacLocations = [] }) {
  const familyZoneStatus = useMemo(() => {
    if (!shop || !tasmacLocations.length) {
      return null
    }

    const isNearTasmac = tasmacLocations.some(
      (location) => haversineDistance(shop, location) <= 0.6
    )

    return {
      text: isNearTasmac ? 'Family zone not enabled' : 'Family zone enabled',
      tone: isNearTasmac ? 'danger' : 'success',
    }
  }, [shop, tasmacLocations])

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