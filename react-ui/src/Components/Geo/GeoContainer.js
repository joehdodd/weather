import React, { Component } from 'react';
import SummaryBreakdown from './SummaryBreakdown';



class GeoContainer extends Component {


  render() {
    return (
      <div className="component-container">
        <div className="conditions-heading">
          <h3>Your Weather...</h3>
        </div>
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
