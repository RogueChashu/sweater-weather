
function CurrentLocation( {location, currentConditions} ) {

/*
       

        */

  return (
    <>
      <div className='currentWeather'>
        <div className='location'>Current Location: {location.latitude}, {location.longitude}</div>
        <div className='weatherIcon'>...</div>
        <div className='currentConditions'>Current temp.: {currentConditions.temp} °F <br />
        {currentConditions.conditions}</div>
      </div>
    </>
  )
}

export default CurrentLocation