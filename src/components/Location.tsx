import 'leaflet/dist/leaflet.css';

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

interface LocationSelectorProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationSelect }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  // Define o comportamento quando o mapa é clicado
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      },
    });
    return position === null ? null : (
      <Marker position={position} />
    );
  };

  return (
    <MapContainer center={[-15.7942, -47.8822]} zoom={4} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {position && <Marker position={position} icon={L.icon({ iconUrl: 'path_to_custom_icon', iconSize: [25, 41] })} />}
    </MapContainer>
  );
};

export default LocationSelector;
