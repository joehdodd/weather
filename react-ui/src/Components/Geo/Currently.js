import React from 'react';
import moment from 'moment';
// import Skycons from 'skycons-component';
import WeatherIcon from '../WeatherIcon';

const Breakdown = (props) => {
  return (
    <ul className="breakdown-card">
      <li className="breakdown-item">Precipitation: {props.data.currently.precipProbability}%</li>
      <li className="breakdown-item">Cloud Cover: {props.data.currently.cloudCover}%</li>
      <li className="breakdown-item">Humidity: {props.data.currently.humidity}</li>
      <li className="breakdown-item">Wind Speed: {props.data.currently.windSpeed}mph</li>
      <li className="breakdown-item">UV Index: {props.data.currently.uvIndex}</li>
      <li className="breakdown-item">Visibitly: {props.data.currently.visibility} mi</li>
      <li className="breakdown-item">Sunrise: {moment.unix(props.data.daily.data[0].sunriseTime).format('hh:mm a')}</li>
      <li className="breakdown-item">Sunset: {moment.unix(props.data.daily.data[0].sunsetTime).format('hh:mm a')}</li>
    </ul>
  )
}

const Currently = (props) => {
  return (
    <div className="panel">
      <div className="panel-info">
        { !!props.data && !!props.data.currently &&
          <span>{moment.unix(props.data.currently.time).format('MMMM Do YYYY')}</span>
        }
        <div className="panel-details">
          <WeatherIcon
            text={props.data.currently.icon}
          />
          <div className="current">
            <p className="current-temp">{props.data.currently.temperature.toFixed()}&deg;</p>
            <span>Feels Like: {props.data.currently.apparentTemperature.toFixed()}</span>
            <p>{props.data.currently.summary}</p>
          </div>
          <Breakdown {...props}/>
        </div>
      </div>
    </div>
  )
}

export default Currently
