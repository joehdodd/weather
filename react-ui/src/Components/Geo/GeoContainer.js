import React, { Component } from 'react';
import Currently from './Currently';



class GeoContainer extends Component {


  render() {
    return (
      <div className="panel-container panel-50-50">
        { !!this.props.data
          ? <Currently {...this.props}/>
          : <span className="pulsate">Loading data for your location!</span>
        }
      </div>
    );
  }

}

export default GeoContainer;
