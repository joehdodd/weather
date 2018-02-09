import React, { Component } from 'react';

class GeoContainer extends Component {

  render() {
    return (
      <div>
        <h1>Your Weather...</h1>
        { !!this.props.data
          ? <div className="weather-container">
              <span>{this.props.data.daily.summary}</span>
            </div>
          : <div className="weather-container">
              <span>Loading data for your location!</span>
            </div>
        }
      </div>
    );
  }

}

export default GeoContainer;
