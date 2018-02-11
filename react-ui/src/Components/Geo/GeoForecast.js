import React from 'react';
import moment from 'moment';
import Skycons from 'skycons-component';

const GeoForecast = (props) => {
  console.log(props);
  return (
    <div className="panel">
      <div className="panel-heading">
        <h3>Forecast</h3>
        { !!props.data.daily &&
          <span>{moment.unix(props.data.currently.time).format('h:mm: a')}</span>
          // <span>{props.data.daily.summary}</span>
        }
      </div>
      <div className="panel-info">
        <Skycons
          iconColor="#5b4287"
          icon={props.data.daily.icon}
          style={{width: 200, height: 100}}
        />
        <div>
          <p className="current-temp">{props.data.currently.temperature.toFixed()}&deg;</p>
          <p>{props.data.currently.summary}</p>
          { !!props.data.minutely &&
            <p>{props.data.minutely.summary}</p>
          }
        </div>
      </div>
    </div>
  )
}

export default GeoForecast;
