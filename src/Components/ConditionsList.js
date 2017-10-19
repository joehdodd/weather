import React, { Component } from 'react';
import Conditions from './Conditions';

class ConditionsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places : [
        { city: "chattanooga", state: "tn"},
        { city: "easton", state: "md"},
        { city: "new york", state: "ny"},
        { city: "norfolk", state: "va"},
        { city: "milford", state: "de"},
        { city: "bangkok", state: null}
      ],
    }
  }

  componentWillMount() {
    const localStorageRef = localStorage.getItem(`place`);

    if (!!localStorageRef) {
      this.setState( prevState => ({
        places: [...prevState.places, JSON.parse(localStorageRef)]
      }))
    }

  }

  componentWillReceiveProps(nextProps) {
    let placesArr = nextProps.places;
    // console.log(placesArr);
    this.setState( prevState => ({
      places: [...prevState.places, nextProps.newPlace]
    }));
  }

  componentWillUpdate(nextState) {
    // console.log(nextState);
    // localStorage.setItem(`place`, JSON.stringify(nextState.places));
  }

  render() {
    let { places } = this.state;
    const conditionItems =  places.map( (place, id) => {
        return <Conditions key={id} id={id} city={place.city} state={place.state}/>
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
}

export default ConditionsList
