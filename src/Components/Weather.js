import React, { Component } from 'react';
import axios from 'axios';
import { HashRouter as Router, Route } from 'react-router-dom';
import Conditions from './Conditions';
import Forecast from './Forecast';

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : {}
    }
  }

  componentDidMount() {
    axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${this.props.city}%2C%2$${this.props.state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
    .then(res => {
      let data = res.data.query.results.channel;
      this.setState({ data : data });
    })
    .catch( (error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' render={() => (
            <div className="weather-item">
              { !!this.state.data.item
                ? <div>
                  <Conditions current={this.state.data.item} city={this.props.city}/>
                </div>
                : <p>Loading weather for {this.props.city}{!!this.props.state ? <span>, {this.props.state}</span> : null}.</p>
              }
            </div>
          )}/>
          <Route path={`/forecast/:forecastId`} render={({...props}) => (
            <Forecast {...props} forecast={this.state.data.item}/>)}
          />
        </div>
      </Router>
    )
  }
}

export default Weather
