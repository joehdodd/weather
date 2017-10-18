import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
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
    const conditionItems =  this.PLACES.map( (place, id) => {
        return <Conditions key={place.city} id={id} city={place.city} state={place.state}/>
      })
    return (
      <div>
        <div className="conditions-heading">
          <h1>Current Conditions</h1>
          <p>To see details and a 10-day forecast, tap or click a card.</p>
        </div>
          <CSSTransitionGroup
            transitionName="background"
            transitionEnterTimeout={5000}
            transitionLeaveTimeout={5000}
          >
          <div className="weather-container">
            {conditionItems}
          </div>
          </CSSTransitionGroup>
      </div>
    )
  }
}

export default ConditionsList
