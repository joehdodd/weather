import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Weather from './Weather';
import Forecast from './Forecast';
// import { DragDropContext } from 'react-beautiful-dnd';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : {}
    }
  }

  PLACES = [
    { city: "chattanooga", state: "tn"},
    { city: "easton", state: "md"},
    { city: "new york", state: "ny"},
    { city: "norfolk", state: "va"},
    { city: "milford", state: "de"},
    { city: "bangkok", state: null}
  ]

  componentWillMount() {
    this.PLACES.map(place => {
      axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${place.city}%2C%2$${place.state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
      .then(res => {
        let data = res.data.query.results.channel;
        this.setState({ data : data });
      })
      .catch( (error) => {
        console.log(error);
      })
    });
  }

  render() {
    let { data } = this.state;
    return (
      <div>
      {!!data
        ?  <Router>
            <div>
              <Route exact path="/" render={ () => (
                <div className="weather-container">
                  {
                    this.PLACES.map( (place, id) => {
                      return <Weather key={place.city} id={id} weather={data[id]} city={place.city} state={place.state} />
                    })
                  }
                </div>
              )}/>
              <Route path={`/forecast/:forecastId`} render={ ({...props}) => (
                <Forecast {...props} data={data} />
              )}/>
            </div>
          </Router>
        : <p>Load up!</p>
      }
      </div>
    )
  }
}

export default App;
