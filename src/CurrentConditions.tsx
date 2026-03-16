import { convertTemperature, getIcon } from './utils';
import { weatherAPIResponseType } from './interfaces';

type CurrentConditionsProps = {
  weather: weatherAPIResponseType;
  isCelsius: boolean;
}

const CurrentLocation = ({  weather, isCelsius }: CurrentConditionsProps): JSX.Element => {

  const currentWeather = weather.currentConditions;
  const temperature = convertTemperature(currentWeather.temp, isCelsius)

  // weather.resolvedAddress was chosen to display the city as it displays the best formatting of the city/town
  // (i.e. it corrects the formatting of the user if it omitted uppercase, accents, etc.). You get the best out of this API
  // property if you provide a city/town name, as opposed to GPS coords.
  return (
    <>
      <section className='currentWeather'>
        <h2 className='visually-hidden'>Current conditions</h2>
        <div className='location'><h3>{(weather) ? weather.resolvedAddress : null}</h3></div>

        <div className='currentContainer weatherContainer'>
          <div className='weatherIcon'><img src={getIcon(currentWeather.icon)} alt={currentWeather.icon} /></div>
          <div className='tempValue'>{temperature}{isCelsius? '°C' : '°F'} </div>
          <div className='currentConditions'>{currentWeather.conditions}</div>
        </div>
      </section>
    </>
  )
}

export default CurrentLocation