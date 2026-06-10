import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Get the GPS coordinates from the frontend request
  const { lat, lon } = req.query;

  if (!lat || !lon || typeof lat !== 'string' || typeof lon !== 'string') {
  //if (!gpsCoord || typeof gpsCoord !== 'string'){
    return res.status(400).json({ error: 'Latitude and longitude parameters are required' });
  }

  // 2. Get the API key from the environment variables
  const API_KEY = process.env.GEOAPIFY_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: Missing API key' });
  }

  // 3. Make the request to geoapify from the server
  try {

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`GEOAPIFY responded with status: ${response.status}`);
    }

    const data = await response.json();

    // 4. Send the data back to the frontend
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Reverse geolocation fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch location data' });
  }
}
