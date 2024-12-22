import { useState, useEffect } from 'react'
import { getInitialLocation } from './initialLocation'
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
  const [celsius, setCelsius] = useState(false)

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
      console.log('Error fetching weather:', error)
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
      console.log('Failed fetching city', error)
    }
  }

  useEffect(() => {
    getCityFromLocation(location)
     .then(area => {
      //console.log(area)
      const locale =  (area != null && area.address.city)? area.address.city : (area != null && area.address.neighbourhood) ? area.address.neighbourhood : null
      //console.log(locale)
      const city = `${locale}, ${area.address.state}`
      setCity(city)
     }).catch(error => {
      console.error('Error fetching city', error)
     })
  }, [location])

  const searchCity = (e) => {
    const value = e.target.value
    console.log(value)
      
    //if (value === '') {
    //  return null
   // } else {
   if (value) {
      setCity(value)
      getWeather(value)
    }
  }

  const toggleTempUnits = () => {
    setCelsius(!celsius);
  }

  return (
    <>
    <div className='container'>

      <Switch celsius={celsius} toggleTempUnits={toggleTempUnits} />

      { weather && city ? (
        <CurrentConditions city={city} currentConditions={weather.currentConditions} celsius={celsius} />
      ) : (
        <div>Loading...</div>
      )}    

      <Search value={searchCity}  />

      { weather ? (<FiveDayForecast forecast={weather} celsius={celsius} /> ) : (
        <div>Loading...</div>
      )}

    </div>
    </>
  )
}

export default App
