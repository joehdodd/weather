import React, { Component } from 'react';
import '../App.css';
import Weather from './Weather';

class App extends Component {

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
      <div className="weather-container">
        {
          this.PLACES.map( (place, id) => {
            return <Weather key={place.city} id={id} city={place.city} state={place.state} />
          })
        }
      </div>
    )
  }
}

export default App;
