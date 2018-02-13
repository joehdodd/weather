import React from 'react';
import Currently from './Currently';
// import GeoForecast from './GeoForecast';
import moment from 'moment';

const GeoContainer = (props) => {
  return (
    <div>
      <div className="panel-heading">
        {!!props.address &&
          <h3>{props.address}</h3>
        }
      </div>
      <div className="panel-container">
        { !!props.data &&
          <Currently {...props}/>
        }
        {/* { !!props.data &&
          <GeoForecast {...props}/>
        } */}
      </div>
    </div>
  )
}

export default GeoContainer;
