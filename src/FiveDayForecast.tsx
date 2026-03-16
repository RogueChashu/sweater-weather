import { convertTemperature, dateFormatting, getIcon } from './utils'
import { DaysForecastType } from './interfaces'

type FiveDayForecastProps = {
  fiveDayForecastData: DaysForecastType;
  isCelsius: boolean;
}

const FiveDayForecast = ({ fiveDayForecastData, isCelsius }: FiveDayForecastProps): JSX.Element => {

  return (
    <section className='fiveDayForecast'><h2>5 Day Forecast</h2>
      <ol>
      <div className='forecastsContainer'>
        {fiveDayForecastData.map((day, index) => {

          return (
            <li className='invisible-items' key={index}>
              <article className={`day${index+1} weatherContainer forecast`} key={index}>
                <div className='forecastDate'>{dateFormatting(day.datetime)}</div>
                <div className='forecastIcon'><img src={getIcon(day.icon)} alt={day.icon} /> </div>
                <div className='forecastTemp'>{convertTemperature(day.temp, isCelsius)}{(isCelsius)? '°C' : '°F'}</div>
                <div className='forecastConditions'>{day.conditions}</div>
                <div className='tempMinMax'>Temps: {convertTemperature(day.tempmin, isCelsius)}{(isCelsius)? '°C' : '°F'} / {convertTemperature(day.tempmax, isCelsius)}{(isCelsius)? '°C' : '°F'}</div>
              </article>
            </li>
          )
        })}
      </div>
      </ol>
    </section>
  )
}

export default FiveDayForecast