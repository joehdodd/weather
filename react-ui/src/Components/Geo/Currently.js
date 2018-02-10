import React from 'react';
import moment from 'moment';
import Skycons from 'skycons-component';

const Currently = (props) => {
  console.log(props);
  return (
    <div className="panel">
      <div className="panel-heading">
        <h3>Current Conditions</h3>
        <span>{moment.unix(props.data.currently.time).format('MMMM Do YYYY, h:mm: a')}</span>
      </div>
      <div className="panel-info">
        <div>
          <Skycons
            iconColor="#abb2bf"
            icon={props.data.currently.icon}
            style={{width: 100, height: 100}}
          />
        </div>
        <div>
          <p className="current-temp">{props.data.currently.temperature.toFixed()}&deg;</p>
          <p>{props.data.currently.summary}</p>
          <p>{props.data.minutely.summary}</p>
        </div>
      </div>
    </div>
  )
}

export default Currently
