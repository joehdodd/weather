import React, { Component } from 'react';
import Currently from './Currently';
import GeoForecast from './GeoForecast'



class GeoContainer extends Component {


  render() {
    return (
      <div className="panel-container panel-50-50">
        { !!this.props.data &&
          <Currently {...this.props}/>
        }
        { !!this.props.data &&
          <GeoForecast {...this.props}/>
        }
      </div>
    );
  }

}

export default GeoContainer;
