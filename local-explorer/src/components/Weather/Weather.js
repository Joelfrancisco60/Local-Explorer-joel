import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ latitude, longitude, onWeatherFetched }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`
        );
        onWeatherFetched({
          description: response.data.weather[0].description,
          temperature: response.data.main.temp,
        });
      } catch (err) {
        setError('Erreur lors de la récupération des données météo.');
        console.error(err);
      }

      setLoading(false);
    };

    fetchWeather();
  }, [latitude, longitude, onWeatherFetched]);

  if (loading) return <p>Chargement de la météo...</p>;
  if (error) return <p>{error}</p>;
};

export default Weather;