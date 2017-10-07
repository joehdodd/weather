import React, { Component } from 'react';
import Conditions from './Conditions';

class ConditionsList extends Component {

  PLACES = [
    { city: "chattanooga", state: "tn"},
    { city: "easton", state: "md"},
    { city: "new york", state: "ny"},
    { city: "norfolk", state: "va"},
    { city: "milford", state: "de"},
    { city: "bangkok", state: null}
  ]

  render() {
    return (
      <div>
        <div className="conditions-heading">
          <h1>Current Conditions</h1>
          <p>To see details and a 10-day forecast, tap or click a card.</p>
        </div>
        <div className="weather-container">
          {
            this.PLACES.map( (place, id) => {
              return <Conditions key={place.city} id={id} city={place.city} state={place.state}/>

            })
          }
        </div>
      </div>
    )
  }
}

export default ConditionsList
