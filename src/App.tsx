import { useState, useEffect } from 'react';
import { getInitialCoord } from './utils';
import CurrentConditions from "./CurrentConditions";
import Search from './Search';
import Switch from './Switch';
import './Switch.css';
import FiveDayForecast from './FiveDayForecast';
import { GPSCoordinatesType, CityAPIResponseType, weatherAPIResponseType } from './interfaces';
import Header from './Header';

const weatherApiKey = 'GXQN64TQL2DSWWEQ7X6YGXNP2'

function App() {
  const [gpsCoord, setGpsCoord] = useState<GPSCoordinatesType | null>(null);
  const [weather, setWeather] = useState<weatherAPIResponseType | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
 
  /*
  Loading time steps:
    1:Retrieve the user's location for default local weather: stored in gpsCoord
    2:Fetch city from  gpsCoords (because the weather API returns what was used for
      fetching the weather, so if we use a city, it'll return a well formated city name): stored in city
    3:Fetch weather based on city: stored in weather

                  city ---------------------------> weather
  GPS coords-------^
  */

  // Retrieve the user's geographical location to display local weather by default:
  useEffect(() => {
    getInitialCoord()
      .then(coords => {
        setGpsCoord(coords);
      })
      .catch(error => console.error(error));
  }, []); // Only needed at loading time, not needed afterwards, hence the empty dependency

  const getCityFromGPSCoord = async (gpsCoord:GPSCoordinatesType): Promise<CityAPIResponseType> => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${gpsCoord.latitude}&lon=${gpsCoord.longitude}&zoom=18&addressdetails=1`)
    const data = await response.json();
    return data;
  }

  // Weather API does not provide city name if search was done by GPS coords, usually it returns the GPS coords.
  // Sometimes, it can return a broad area at best. In order to display a proper city/town, we must reverse geolocate:
  useEffect(() => {
    const fetchAndSetCityData = async () => {
      if (gpsCoord == null) return;

      try {
        const cityData = await getCityFromGPSCoord(gpsCoord);
            
        const locale = 
          cityData.address.city ?? 
          cityData.address.neighbourhood ?? 
          cityData.address.town;
        const completeCityData = `${locale}, ${cityData.address.state}`;
        setCity(completeCityData)
      } catch (error) {
        console.error("Problem while fetching city data:", error);
      }
    }
    fetchAndSetCityData();
  }, [gpsCoord])

  // Weather could be fetched using GPS coords directly, but since it doesn't return a city or a town to display, 
  // it was chosen to fetch weather data by city, so we obtain a well formatted city/town ready to display.
  useEffect(() => {
    if (city == null) return;

    const getWeather = async (city: string) => {
      try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${weatherApiKey}`)
    
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }
        const weatherData = await response.json();
    
        if (weatherData ==  null) {
          throw new Error('Failed to parse weather data');
        }
        setWeather(weatherData)
      } catch (error) {        
        console.error('Error fetching weather data:', error);
      }
    }
    getWeather(city);
  }, [city])

  const toggleTempUnits = () => {
    setIsCelsius(!isCelsius);
  }

  const handleSearch = (searchTerm: string ) => {
    // regex rule for checking if search term is a valid GPS coord (ex: lat: -90 to 90, lon: -180 to 180)
    const gpsRegex = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*-?((1[0-7]\d(\.\d+)?|180(\.0+)?)|([1-9]?\d(\.\d+)?))$/;

    // The weather API returns what was used for search. If GPS coords are used,cwe don't have a city 
    // name to display. By setting gpsCoord in state, the change will trigger to look for a city name 
    // in the fetchAndSetCityData useEffect, so setting the gpsCoord state is key with handling gpd coords.

    if (gpsRegex.test(searchTerm)) {
      const [ latitude, longitude ] = searchTerm.split(',').map(coord => parseFloat(coord.trim()));
      setGpsCoord({ latitude, longitude });
    } else {
    // If user entered a city name, the weather API should have the data, so setting the city in state
    // triggers the weather data fetch in its useEffect 
      setCity(searchTerm)
      setGpsCoord(null); // resets the GPS coords so we don't have stale coords from a previous search.
    }
  }

  const fiveDayForecastData = weather?.days?.slice(0,5);

  return (
    <> 
      <div className='app-container'>
        <Header />
        <div className='controls'>
          <Search onSearch={handleSearch} />
          <Switch isCelsius={isCelsius} toggleTempUnits={toggleTempUnits} /> 
        </div>
        <main>
          { weather ? (
            <CurrentConditions weather={weather} isCelsius={isCelsius} />
          ) : (
            <div>One moment please...</div>
          )} 

          { fiveDayForecastData ? (
            <FiveDayForecast fiveDayForecastData={fiveDayForecastData} isCelsius={isCelsius} /> 
          ) : (
          <div>One moment please...</div>
          ) } 
        </main>
      </div>
    </>
  )
}

export default App
