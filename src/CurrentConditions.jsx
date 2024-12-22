import { useEffect, useState } from 'react'
import getIcon from "./getIcon"
import convertTemperature from './temperatureConverter'

function CurrentLocation({ city, currentConditions, celsius }) {
  const [icon, setIcon] = useState(null)

  const temperature = convertTemperature(currentConditions.temp, celsius)

    useEffect(() => {
      const loadIcon = async () => {
        const loadedIcon = await getIcon(currentConditions.icon)
        setIcon(loadedIcon)
      }
      loadIcon()
    }, [currentConditions.icon]) 

  return (
    <>
      <div className='currentWeather'>
        <div className='location'>{city}</div>

        <div className='currentContainer weatherContainer'>
          <div className='weatherIcon'><img src={icon} alt={currentConditions.icon} /></div>
          <div className='tempValue'>{temperature}{celsius? '°C' : '°F'} </div>
          <div className='currentConditions'>{currentConditions.conditions}</div>
        </div>
      </div>

    </>
  )
}

export default CurrentLocation