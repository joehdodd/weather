import React, { Component } from 'react';
import SummaryBreakdown from './SummaryBreakdown';



class GeoContainer extends Component {


  render() {
    return (
      <div className="component-container">
        <h1>Your Weather...</h1>
        { !!this.props.data
          ? <div>
              <SummaryBreakdown {...this.props}/>
            </div>
          : <div>
              <span className="pulsate">Loading data for your location!</span>
            </div>
        }
      </div>
    );
  }

}

export default GeoContainer;
