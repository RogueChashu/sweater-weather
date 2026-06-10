import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Get the partial city/location from the frontend request
  const { location } = req.query;

  if (!location || typeof location !== 'string') {
    return res.status(400).json({ error: 'Location parameter is required' });
  }

  // 2. Get the API key from the environment variables
  const API_KEY = process.env.GEOAPIFY_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: Missing API key' });
  }

  // 3. Make the autocomplete geocoding request to geoapify from the server
  try {
    const requestOptions = {
      method: 'GET',
    };

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(location)}&apiKey=${API_KEY}`, requestOptions
    );

    if (!response.ok) {
      throw new Error(`GEOAPIFY responded with status: ${response.status}`);
    }

    const data = await response.json();

    // 4. Send the data back to the frontend
    return res.status(200).json(data);
    
  } catch (error) {
    if (error instanceof Error) {
      console.error('Geolocation fetch error', error.message);
    } else {
      console.error('An unknown error occured', error);
    }

    return res.status(500).json({ error: 'Failed to fetch location data' });
  }
}
