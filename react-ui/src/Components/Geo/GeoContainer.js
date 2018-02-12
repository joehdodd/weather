import React from 'react';
import Currently from './Currently';
import GeoForecast from './GeoForecast';

const GeoContainer = (props) => {
  return (
    <div className="panel-container">
      { !!props.data &&
        <Currently {...props}/>
      }
      { !!props.data &&
        <GeoForecast {...props}/>
      }
    </div>
  )
}

export default GeoContainer;
