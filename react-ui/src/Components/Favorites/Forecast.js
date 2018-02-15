import React from 'react';
import { withRouter } from 'react-router-dom';
// import WeatherIcon from '../WeatherIcon';

const Forecast = (props) => {
  // // const getForecastCard = () => {
  // //   const { forecast } = props.location.state.item;
  // //   return forecast.map( data => {
  // //     return (
  // //       <div key={data.date} className="forecast-item">
  // //         <div className="forecast-wrapper">
  // //           <p>{data.day}, {data.date}</p>
  // //           <p>High: <span className="hi-temp">{data.high}&deg;</span></p>
  // //           <p>Low: <span className="lo-temp">{data.low}&deg;</span></p>
  // //           <WeatherIcon text={data.text} />
  // //         </div>
  // //       </div>
  // //     )
  // //   })
  //
  // }

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
          <div className="panel-details">
            <span>
              Some new stuff!
            </span>
            <span>
              Some new stuff!
            </span>
            <span>
              Some new stuff!
            </span>
          </div>
      </div>
      </div>
    </span>
  )
}

export default withRouter(Forecast)
