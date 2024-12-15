import axios from 'axios';

export const fetchActivities = async (location, weather) => {
  if (!weather || !location) return [];

  console.log("Fetching activities...");

  const prompt = `
    Voici les conditions actuelles :
    - Localisation : Latitude ${location.latitude}, Longitude ${location.longitude}.
    - Météo : ${weather}.

    Génère une liste de 10 activités adaptées à ces conditions. 
    Les suggestions doivent être générales (par exemple : "musée", "promenade au parc") et non spécifiques à un lieu ou à un établissement particulier. 
    Assure-toi qu'il y ait un mélange d'activités d'intérieur et d'extérieur. Les activités ne doivent pas se répéter.
    Fournis uniquement les noms des activités sans autre détail. 
  `;

  try {
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

    const generatedActivities = response.data.choices[0].message.content
      .split('\n')
      .map((line) => line.trim())
      .filter((activity) => activity !== "");

    console.log("Activités générées :", generatedActivities);
    return generatedActivities;
  } catch (err) {
    console.error("Erreur lors de la génération des activités :", err.response || err.message);
    return [];
  }
};
