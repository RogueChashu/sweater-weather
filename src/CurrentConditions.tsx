import { convertTemperature, getIcon } from './utils';
import { WeatherAPIResponseType } from './interfaces';

type CurrentConditionsProps = {
  displayLocation: string;
  weather: WeatherAPIResponseType;
  isCelsius: boolean;
}

const CurrentLocation = ({ displayLocation, weather, isCelsius }: CurrentConditionsProps): JSX.Element => {

  const currentWeather = weather.currentConditions;
  const temperature = convertTemperature(currentWeather.temp, isCelsius)

  return (
    <>
      <section className='currentWeather'>
        <h2 className='visually-hidden'>Current conditions</h2>
        <div className='location'>{(weather) ? displayLocation : null}</div>

        <div className='currentContainer weatherContainer'>
          <div className='weatherIcon'><img src={getIcon(currentWeather.icon)} alt={currentWeather.icon} /></div>
            <p className='tempValue'>{temperature}{isCelsius? '°C' : '°F'} </p>
            <p className='currentConditions'>{currentWeather.conditions}</p>
        </div>
      </section>
    </>
  )
}

export default CurrentLocation
