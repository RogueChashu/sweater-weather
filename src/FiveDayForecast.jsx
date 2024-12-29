import { convertTemperature, dateFormatting, getIcon } from './utils'

const FiveDayForecast =({ forecast, isCelsius }) => {

  const fiveDayForecast = Object.entries(forecast.days).slice(0,5)

  return (
    <div className='fiveDayForecast'>5 Day Forecast

      <div className='forecastsContainer'>
        {fiveDayForecast.map((day, index) => {
          const data = day[1]

          return (
            <div className={`day${index+1} weatherContainer forecast`} key={index}>
              <div className='forecastDate'>{dateFormatting(data.datetime)}</div>
              <div className='forecastIcon'><img src={getIcon(data.icon)} /> </div>
              <div className='forecastTemp'>{convertTemperature(data.temp, isCelsius)}{(isCelsius)? '°C' : '°F'}</div>
              <div className='forecastConditions'>{data.conditions}</div>
              <div className='tempMinMax'>Temps: {convertTemperature(data.tempmin, isCelsius)}{(isCelsius)? '°C' : '°F'} / {convertTemperature(data.tempmax, isCelsius)}{(isCelsius)? '°C' : '°F'}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FiveDayForecast