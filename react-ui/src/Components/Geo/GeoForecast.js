import React from 'react';
import moment from 'moment';
import WeatherIcon from '../WeatherIcon';

const GeoForecast = props => {
  return (
    <div className="panel">
      <div className="panel-heading">
        <h3>Forecast</h3>
        {!!props.data.daily && (
          <span>
            {moment.unix(props.data.currently.time).format('h:mm: a')}
          </span>
        )}
      </div>
      <div className="panel-info">
        <WeatherIcon text={props.data.daily.icon} />
        <div>
          <p className="current-temp">
            {props.data.currently.temperature.toFixed()}&deg;
          </p>
          <p>{props.data.currently.summary}</p>
          {!!props.data.minutely && <p>{props.data.minutely.summary}</p>}
        </div>
      </div>
    </div>
  );
};

export default GeoForecast;
