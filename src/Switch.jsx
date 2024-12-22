
const Switch = ({ celsius, toggleTempUnits }) => {

  return (
    <div className="switch-container">
      <div
        className={`switch ${celsius? 'checked' : 'unchecked'}`}
        onClick={toggleTempUnits}
      >
        {celsius ? '°C' : '°F'}
        <div className="switch-thumb" />
      </div>
    </div>
  )
}

export default Switch;