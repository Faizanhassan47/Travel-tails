import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import './MapView.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const GeocodedMarker = ({ photo }) => {
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const geocode = async () => {
      try {
        const query = encodeURIComponent(`${photo.city}, ${photo.country}`);
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
        const data = await res.json();
        if (data && data.length > 0) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (err) {
        console.error('Geocoding error', err);
      }
    };
    geocode();
  }, [photo]);

  if (!position) return null;

  return (
    <Marker position={position}>
      <Popup>
        <div className="map-popup-content" onClick={() => navigate(`/photo/${photo._id}`)}>
          <img src={photo.imageUrl} alt={photo.title} className="map-popup-img" />
          <h4 className="map-popup-title">{photo.title}</h4>
          <p className="map-popup-meta">{photo.city}, {photo.country}</p>
        </div>
      </Popup>
    </Marker>
  );
};

const MapView = ({ photos }) => {
  const photoList = Array.isArray(photos) ? photos : [];

  return (
    <div className="map-wrapper">
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        style={{ height: '100%', width: '100%', backgroundColor: '#0A0C14' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {photoList.map(photo => (
          <GeocodedMarker key={photo._id} photo={photo} />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
