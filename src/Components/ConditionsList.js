import React from 'react';
import Conditions from './Conditions';

const ConditionsList = (props) => {
    const { places } = props;
    let conditionItems = places.map( (place, index) => {
      let uniqueKey = (index + 1);
      return <Conditions key={uniqueKey} id={place.id} data={place.data.data} removeItem={props.removeItem}/>
    })
    return (
      <div>
        <div className="conditions-heading">
          <h1>Current Conditions</h1>
          <p>To see details and a 10-day forecast, tap or click a card.</p>
        </div>
          <div className="weather-container">
            {conditionItems}
          </div>
      </div>
    )
}

export default ConditionsList
