import React, { useState, useEffect } from 'react';
import Geolocation from './components/Geolocation/Geolocation';
import Weather from './components/Weather/Weather';
import SwipeCards from './components/SwipeCards/SwipeCards';
import Map from './components/Map/Map';
import { fetchActivities } from './api/activities';
import { fetchSuggestions } from './api/suggestions';
import './App.css';

const App = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [activities, setActivities] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [rejectedPreferences, setRejectedPreferences] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleFetchActivities = async () => {
    const generatedActivities = await fetchActivities(location, weather);
    setActivities(generatedActivities);
  };

  const handleFetchSuggestions = async () => {
    setSearching(true);
    const generatedSuggestions = await fetchSuggestions(location, weather, preferences, rejectedPreferences);
    setSuggestions(generatedSuggestions);
    setShowMap(true);
    setSearching(false);
  };

  useEffect(() => {
    if (weather && location && activities.length === 0) {
      handleFetchActivities();
    }
  }, [weather, location]);

  const resetPreferences = () => {
    setPreferences([]);
    setRejectedPreferences([]);
    setSuggestions([]);
    setActivities([]);
    setShowMap(false);

    handleFetchActivities();
  };

  return (
    <div className="App">
      <h1>Local Explorer</h1>
      <Geolocation onLocationFound={setLocation} />
      {location && (
        <>
          <Weather
            latitude={location.latitude}
            longitude={location.longitude}
            onWeatherFetched={setWeather}
          />
          {activities.length > 0 && !showMap ? (
            <>
              <SwipeCards
                activities={activities}
                onPreferencesUpdated={(activity) => setPreferences((prev) => [...prev, activity])}
                onRejectedUpdated={(rejected) => setRejectedPreferences(rejected)}
                onComplete={() => console.log("Préférences terminées !")}
              />
              <button
                onClick={handleFetchSuggestions}
                className="search-button"
                disabled={preferences.length === 0 || searching}
              >
                {searching ? "Recherche en cours..." : "Recherche"}
              </button>
            </>
          ) : activities.length === 0 ? (
            <p>Chargement des activités...</p>
          ) : null}
          {showMap && (
            <div>
              <Map
                suggestions={suggestions}
              />
              <button onClick={resetPreferences} className="reset-button">
                Refaire la sélection des préférences
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
