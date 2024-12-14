import axios from 'axios';

export const fetchSuggestions = async (location, weather, preferences, rejectedPreferences) => {
  console.log("Fetching suggestions...");

  const prompt = `
    Voici les conditions actuelles :
    - Localisation : Latitude ${location.latitude}, Longitude ${location.longitude}.
    - Météo : ${weather}.
    - Activités préférées de l'utilisateur : ${preferences.join(', ')}.
    - Activités rejetées par l'utilisateur : ${rejectedPreferences.join(', ')}.

    Fournis une liste de 5 activités adaptées avec leurs noms et coordonnées GPS (latitude et longitude). Les activités rejetées ne doivent pas être incluses dans la liste.
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

    const generatedSuggestions = response.data.choices[0].message.content
      .split('\n')
      .map((line) => {
        const match = line.match(/(.+):\s*(\d+\.\d+),\s*(\d+\.\d+)/);
        return match ? { name: match[1], latitude: +match[2], longitude: +match[3] } : null;
      })
      .filter(Boolean);

    console.log("Suggestions générées :", generatedSuggestions);
    return generatedSuggestions;
  } catch (err) {
    console.error("Erreur lors de la génération des suggestions :", err.response || err.message);
    return [];
  }
};
