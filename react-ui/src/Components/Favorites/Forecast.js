import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import WeatherIcon from '../WeatherIcon';
import { CSSTransitionGroup } from 'react-transition-group';


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

  const { fetching, location } = props;
  return (
    <Route
      location={location}
      key={location.pathname}
      path={`/forecast`}
      render={({...props}) => (
        <CSSTransitionGroup
          transitionName="fade"
          transitionAppear={true}
          transitionLeave={true}
          transitionEnterTimeout={1000}
          transitionAppearTimeout={750}
          transitionLeaveTimeout={750}
        >
        { fetching
          ? <div className="loading-container pulsate">
              <h1>Loading your forecast...</h1>
            </div>
          : <span>
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
        }
        </CSSTransitionGroup>
      )}
    />
  )
}

export default withRouter(Forecast)
