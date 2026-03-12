import { convertTemperature, dateFormatting, getIcon } from './utils'
import { DaysForecastType } from './interfaces'

type FiveDayForecastProps = {
  fiveDayForecastData: DaysForecastType;
  isCelsius: boolean;
}

const FiveDayForecast = ({ fiveDayForecastData, isCelsius }: FiveDayForecastProps): JSX.Element => {

  return (
    <div className='fiveDayForecast'>5 Day Forecast

      <div className='forecastsContainer'>
        {fiveDayForecastData.map((day, index) => {

          return (
            <div className={`day${index+1} weatherContainer forecast`} key={index}>
              <div className='forecastDate'>{dateFormatting(day.datetime)}</div>
              <div className='forecastIcon'><img src={getIcon(day.icon)} /> </div>
              <div className='forecastTemp'>{convertTemperature(day.temp, isCelsius)}{(isCelsius)? '°C' : '°F'}</div>
              <div className='forecastConditions'>{day.conditions}</div>
              <div className='tempMinMax'>Temps: {convertTemperature(day.tempmin, isCelsius)}{(isCelsius)? '°C' : '°F'} / {convertTemperature(day.tempmax, isCelsius)}{(isCelsius)? '°C' : '°F'}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FiveDayForecast