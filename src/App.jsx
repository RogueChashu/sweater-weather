import { useState, useEffect } from 'react'
import { getInitialLocation } from './utils'
import CurrentConditions from "./CurrentConditions"
import Search from './Search'
import Switch from './Switch'
import './Switch.css';
import FiveDayForecast from './FiveDayForecast'

const weatherApiKey = 'GXQN64TQL2DSWWEQ7X6YGXNP2'

function App() {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState(null)
  const [isCelsius, setisCelsius] = useState(false)

  useEffect(() => {
    getInitialLocation()
      .then(coords => {
        setLocation(coords)
      })
      .catch(error => console.error(error))
  }, [])

  const getWeather = async (area) => {
    try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${area}?key=${weatherApiKey}`)
    
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`)
      }
      const weatherData = await response.json()
    
      if (!weatherData) {
        throw new Error('Failed to parse weather data')
      }
      setWeather(weatherData)
    } catch (error) {
      console.error('Error fetching weather:', error)
    }
  }

  useEffect(() => {
    if (location) {
      const locationCoords = `${location.latitude},${location.longitude}`
      getWeather(locationCoords)
    }
  }, [location])

  const getCityFromLocation = async (location) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}&zoom=18&addressdetails=1`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed fetching city', error)
    }
  }

  useEffect(() => {
    if (location) {
      getCityFromLocation(location)
      .then(area => {
       const locale =  (area != null && area.address.city)? area.address.city : (area != null && area.address.neighbourhood) ? area.address.neighbourhood : null
       const city = `${locale}, ${area.address.state}`
        setCity(city)
      }).catch(error => {
        console.error('Error fetching city', error)
      })
    }
  }, [location])

  const toggleTempUnits = () => {
    setisCelsius(!isCelsius);
  }

  const handleSearch = (searchTerm) =>{
    //setCity(searchTerm)
    getWeather(searchTerm)
    setCity(null)
  }

  return (
    <>
      <Switch isCelsius={isCelsius} toggleTempUnits={toggleTempUnits} />
      <Search onSearch={handleSearch} />

      <div className='container'>
        { location && weather ? (
          <CurrentConditions city={city} weather={weather} isCelsius={isCelsius} />
        ) : (
          <div>Loading...</div>
        )} 

        { location && weather ? (
          <FiveDayForecast forecast={weather} isCelsius={isCelsius} /> 
        ) : (
         <div>Loading...</div>
        )}
      </div>
    </>
  )
}

export default App
