import { useState, useEffect } from 'react'
import { getInitialLocation } from './initialLocation'
import CurrentLocation from "./CurrentLocation"
let apiKey = 'GXQN64TQL2DSWWEQ7X6YGXNP2'

function App() {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getInitialLocation()
      .then(coords => {
        setLocation(coords)
      })
      .catch(error => console.error(error))
  }, [])

  const getWeather = async (location) => {
    try {
      const latlon = `${location.latitude},${location.longitude}`
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latlon}?key=${apiKey}&iconSet=icons2`)
    
      if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.statusText}`)
        }

      const weatherData = await response.json()
    
      if (!weatherData) {
        throw new Error('Failed to parse weather data')
      }
      setWeather(weatherData)
      console.log('the weather: ', weather)

    } catch (error) {
      console.log('Error fetching weather:', error)
    }
  }

  useEffect(() => {
    if (location) {
      getWeather(location)
    }
  }, [location])


  return (
    <>
    <div className='container'>
      { location && weather ? (
        <CurrentLocation location={location} currentConditions={weather.currentConditions}/>
      ) : (
        <div>Loading...</div>
      )}    

      <form>
        <label>Enter a city: </label>
          <div>
            🔍<input className='citySearch' placeholder='ex: New York, NY' />
          </div>
      </form>
    </div>
    </>
  )
}

export default App
