import { useEffect, useState } from "react"
import getIcon from "./getIcon"
import convertTemperature from './temperatureConverter'
import dateFormatting from "./dateFormatting"

const FiveDayForecast =({ forecast, celsius }) => {
  const [icon, setIcon] = useState([])

  const fiveForecast = Object.entries(forecast.days).slice(0,5)

 useEffect(() => {
    const loadIcons = async () => {
      try {
        const fiveDaysIcons = await Promise.all(fiveForecast.map(async (day) => {
          const data = day[1]
          const newIcon = await getIcon(data.icon)
          return newIcon
        }))
        setIcon(fiveDaysIcons)
      } catch (error) {
        console.log('Oops! Failed to retrieve icon: ', error)
      }
    }
    loadIcons()
  }, [fiveForecast, setIcon])

  return (
    <div className='fiveDayForecast'>5 Day Forecast

      <div className='forecastsContainer'>
        {fiveForecast.map((day, index) => {
          const data = day[1]
          //console.log(data)

          return (
            <div className={`day${index+1} weatherContainer forecast`} key={index}>
              <div className='forecastDate'>{dateFormatting(data.datetime)}</div>
              <div className='forecastIcon'>
                {icon && <img src={icon[index]} key={index} /> }
               </div>

              <div className='forecastTemp'>{convertTemperature(data.temp, celsius)}{(celsius)? '°C' : '°F'}</div>
              <div className='forecastConditions'>{data.conditions}</div>
              <div className='tempMinMax'>Min / Max: {convertTemperature(data.tempmin, celsius)} / {convertTemperature(data.tempmax, celsius)}{(celsius)? '°C' : '°F'}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FiveDayForecast