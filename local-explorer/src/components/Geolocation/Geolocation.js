import { useState, useEffect } from 'react';

const Geolocation = ({ onLocationFound }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          onLocationFound({ latitude, longitude });
        },
        (err) => setError(err.message)
      );
    } else {
      setError('Géolocalisation non supportée par ce navigateur.');
    }
  }, [onLocationFound]);

  // return (
  //   <div>
  //     {location ? (
  //       <p>
  //         Localisation : {location.latitude}, {location.longitude}
  //       </p>
  //     ) : error ? (
  //       <p>Erreur : {error}</p>
  //     ) : (
  //       <p>Chargement de la localisation...</p>
  //     )}
  //   </div>
  // );
};

export default Geolocation;
