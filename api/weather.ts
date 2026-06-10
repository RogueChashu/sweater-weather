import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Get the GPS coordinates from the frontend request
  const { lat, lon } = req.query;

  if (!lat || !lon || typeof lat !== 'string' || typeof lon !== 'string') {
    return res.status(400).json({ error: 'Latitude and longitude paramaters are required' });
  }

  // 2. Get the API key from the environment variables
  const API_KEY = process.env.VISUAL_CROSSING_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: Missing API key' });
  }

  // 3. Make the weather data request to Visual Crossing from the server
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Visual Crossing API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // 4. Send the data back to frontend
    return res.status(200).json(data);
    
  } catch (error) {
    if (error instanceof Error) {
      console.error('Weather fetch error', error.message);
    } else {
      console.error('An unknown error occured', error);
    }

    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
