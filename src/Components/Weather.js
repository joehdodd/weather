import React, { Component } from 'react';
import Conditions from './Conditions';

class Weather extends Component {
  render() {
    return (
      <div className="weather-item">
        { !!this.props.weather
          ? <div>
              <Conditions current={this.props.weather} city={this.props.city}/>
            </div>
          : <p>Loading weather for {this.props.city}{!!this.props.state ? <span>, {this.props.state}</span> : null}.</p>
        }
      </div>
      // <div>
      //   <p>Stuff</p>
      // </div>
    )
  }
}

export default Weather
