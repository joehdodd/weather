import React from 'react';
import { withRouter } from 'react-router-dom';
import WeatherIcon from '../WeatherIcon';

const Forecast = (props) => {
  const getForecastCard = () => {
    const { data } = props.data.daily;
    return data.map( data => {
      return (
        <div key={data.time} className="panel-forecast-item">
          <div className="">
            {/* <p>{data.day}, {data.date}</p> */}
            <p>High: <span className="hi-temp">{data.tempearatureHigh}&deg;</span></p>
            <p>Low: <span className="lo-temp">{data.temperatureLow}&deg;</span></p>
            <WeatherIcon text={data.icon} />
          </div>
        </div>
      )
    })
  }

  // const { item, astronomy, location, atmosphere } = props.location.state;
  return (
    <span>
      <div className="panel-heading">
        <h3>My damn heading.</h3>
      </div>
      <div className="panel-container">
        <div className="panel-info">
          <span>
            Somedember, 200, 200019
          </span>
          <div className="panel-forecast-details">
            {getForecastCard()}
          </div>
      </div>
      </div>
    </span>
  )
}

export default withRouter(Forecast)
