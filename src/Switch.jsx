const Switch = ({ isCelsius, toggleTempUnits }) => {

  return (
    <div className='switch-container'>
      <div className='switch-labels'>
        <span className='switch-label-left'>°F</span>
        <div
          className={`switch ${isCelsius? 'checked' : 'unchecked'}`}
          onClick={toggleTempUnits}
        >
          <div className="switch-thumb" />
       </div>
        <span className='switch-label-right'>°C</span>
      </div>
    </div>
  )
}

export default Switch
