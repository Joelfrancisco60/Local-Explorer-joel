import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const Map = ({ latitude, longitude, suggestions }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = { lat: latitude, lng: longitude };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={center}>
        <Marker
          position={center}
          label="Vous êtes ici"
        />
        {suggestions.map((suggestion, index) => (
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
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
