import React from 'react';

const Conditions = ({...props}) => {
  return (
    <div className="conditions">
      <h3>{props.city}</h3>
      <p><span className="hi-temp">{props.current.forecast[0].high}&deg;</span> <span className="lo-temp">{props.current.forecast[0].low}&deg;</span></p>
      <p className="current-conditions">{props.current.condition.text}</p>
      <p className="current-temp">{props.current.condition.temp}&deg;</p>
    </div>
  )
}

export default Conditions
