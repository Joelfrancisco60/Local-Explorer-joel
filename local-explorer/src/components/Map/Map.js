import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const Map = ({ suggestions }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const getMapBounds = (locations) => {
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((location) => {
      if (location.latitude && location.longitude) {
        bounds.extend(new window.google.maps.LatLng(location.latitude, location.longitude));
      }
    });
    return bounds;
  };

  const handleNavigateToGoogleMaps = (place) => {
    const { latitude, longitude, name } = place;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}(${encodeURIComponent(name)})`;
    window.open(url, '_blank');
  };

  const validSuggestions = suggestions.filter(
    (s) => s.latitude && s.longitude && !isNaN(s.latitude) && !isNaN(s.longitude)
  );

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={
          validSuggestions.length > 0
            ? { lat: validSuggestions[0].latitude, lng: validSuggestions[0].longitude }
            : { lat: 0, lng: 0 }
        }
        zoom={10}
        onLoad={(map) => {
          if (validSuggestions.length > 0) {
            const bounds = getMapBounds(validSuggestions);
            map.fitBounds(bounds);
          }
        }}
      >
        {validSuggestions.map((suggestion, index) => (
          <Marker
            key={index}
            position={{
              lat: suggestion.latitude,
              lng: suggestion.longitude,
            }}
            onClick={() => setSelectedPlace(suggestion)}
          />
        ))}
        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.latitude,
              lng: selectedPlace.longitude,
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h3>{selectedPlace.name}</h3>
              <p>Coordonnées : {selectedPlace.latitude}, {selectedPlace.longitude}</p>
              <button
                onClick={() => handleNavigateToGoogleMaps(selectedPlace)}
                style={{
                  backgroundColor: '#4285F4',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Ouvrir dans Google Maps
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
