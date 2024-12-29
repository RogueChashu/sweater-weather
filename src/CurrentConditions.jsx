import { convertTemperature, getIcon } from './utils'

function CurrentLocation({ city, weather, isCelsius }) {

  const temperature = convertTemperature(weather.currentConditions.temp, isCelsius)

  return (
    <>
      <div className='currentWeather'>
        <div className='location'>{(city) ? city : weather.resolvedAddress}</div>

        <div className='currentContainer weatherContainer'>
          <div className='weatherIcon'><img src={getIcon(weather.currentConditions.icon)} /></div>
          <div className='tempValue'>{temperature}{isCelsius? '°C' : '°F'} </div>
          <div className='currentConditions'>{weather.currentConditions.conditions}</div>
        </div>
      </div>

    </>
  )
}

export default CurrentLocation