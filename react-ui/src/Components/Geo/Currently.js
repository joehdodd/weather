import React from 'react';
import moment from 'moment';
// import Skycons from 'skycons-component';
import WeatherIcon from '../WeatherIcon';

const Currently = (props) => {
  return (
    <div className="panel">
      <div className="panel-heading">
        <h3>Current Conditions</h3>
        { !!props.data.currently &&
          <span>{moment.unix(props.data.currently.time).format('h:mm: a')}</span>
        }
      </div>
      <div className="panel-info">
        {/* <Skycons
          iconColor="#5b4287"
          icon={props.data.currently.icon}
          style={{width: 200, height: 100}}
        /> */}
        <WeatherIcon
          text={props.data.currently.summary}
        />
        <div>
          <p className="current-temp">{props.data.currently.temperature.toFixed()}&deg;</p>
          <span>Feels Like: {props.data.currently.apparentTemperature}</span>
          <p>{props.data.currently.summary}</p>
          { !!props.data.minutely &&
            <p>{props.data.minutely.summary}</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Currently
