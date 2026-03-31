type SwitchProps = {
  isCelsius: boolean;
  toggleTempUnits: () => void;    // function that returns nothing
}
//        <div className='switch-labels'>


const Switch = ({ isCelsius, toggleTempUnits }: SwitchProps): JSX.Element => {

  return (
    <div className='switch-container'>
          <div
            className={`switch ${isCelsius? 'checked' : 'unchecked'}`}
            onClick={toggleTempUnits}
          >
            <div className="switch-thumb">
              <span className='switch-label'>{isCelsius? '°C' : '°F'}</span>
            </div>
 
        </div>
    </div>
  )
}

export default Switch
