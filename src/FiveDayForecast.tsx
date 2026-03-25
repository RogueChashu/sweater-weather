import { convertTemperature, dateFormatting, getIcon, getWeekday } from './utils'
import { DaysForecastType } from './interfaces'

type FiveDayForecastProps = {
  fiveDayForecastData: DaysForecastType;
  isCelsius: boolean;
}

const FiveDayForecast = ({ fiveDayForecastData, isCelsius }: FiveDayForecastProps): JSX.Element => {

  return (
    <section className='fiveDayForecast'>
      <h2>5 Day Forecast</h2>
        <ol>
        <div className='forecastsContainer'>
          {fiveDayForecastData.map((day, index) => {

            return (
              <li className='invisible-items' key={index}>
                <article className={`day${index+1} weatherContainer forecast`} key={index}>
                  <h3 className='forecastDate'>{getWeekday(day.datetime)}</h3>
                  <div className='forecastIcon'><img src={getIcon(day.icon)} alt={day.icon} /> </div>
                  <p className='forecastTemp'>{convertTemperature(day.temp, isCelsius)}{(isCelsius)? '°C' : '°F'}</p>
                  <p className='forecastConditions'>{day.conditions}<br />
                    Temps: {convertTemperature(day.tempmin, isCelsius)}{(isCelsius)? '°C' : '°F'} / {convertTemperature(day.tempmax, isCelsius)}{(isCelsius)? '°C' : '°F'}</p>
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
