import React, { useState } from 'react';
import axios from 'axios';

const Suggestions = ({ weather, location, preferences, onSuggestionsReady }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    if (!weather || !location || preferences.length === 0) {
      setError("Veuillez remplir toutes les informations nécessaires.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    const prompt = `
      Voici les conditions actuelles :
      - Météo : ${weather}.
      - Localisation : ${location.latitude}, ${location.longitude}.
      - Préférences de l'utilisateur : ${preferences.join(', ')}.
  
      Fournis une liste de 5 activités adaptées avec leurs noms et coordonnées GPS (latitude et longitude).
    `;
  
    try {
      console.log("Prompt envoyé à OpenAI :", prompt);
  
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 200,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log("Réponse de l'API OpenAI :", response.data);
  
      const suggestions = response.data.choices[0].message.content.split('\n')
        .map((line) => {
          const match = line.match(/(.+):\s*(\d+\.\d+),\s*(\d+\.\d+)/);
          return match ? { name: match[1], latitude: +match[2], longitude: +match[3] } : null;
        })
        .filter(Boolean);
  
      console.log("Suggestions parsées :", suggestions);
  
      onSuggestionsReady(suggestions);
    } catch (err) {
      console.error("Erreur API OpenAI :", err.response || err.message);
      setError('Impossible de récupérer les suggestions.');
    }
  
    setLoading(false);
  };
  

  return (
    <div>
      <button onClick={fetchSuggestions} disabled={loading}>
        {loading ? 'Recherche...' : 'Rechercher'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Suggestions;