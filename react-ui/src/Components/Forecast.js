import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import WeatherIcon from './WeatherIcon';
import { CSSTransitionGroup } from 'react-transition-group';
import moment from 'moment';


const Forecast = (props) => {
  const getForecastCard = () => {
    const { data } = props.data.daily;
    return data.map( data => {
      return (
        <div key={data.time} className="panel-forecast-item">
         <span>{moment.unix(data.time).format('MMM Do')}</span>
         <div>
           <p>High: <span className="hi-temp">{data.temperatureHigh.toFixed()}&deg;</span></p>
           <p>Low: <span className="lo-temp">{data.temperatureLow.toFixed()}&deg;</span></p>
         </div>
         <WeatherIcon className="forecast-weather-icon" text={data.icon} />
        </div>
      )
    })
  }

  const { fetching, location, address, data } = props;
  // console.log(props);
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
                <h3>{address}</h3>
              </div>
              <div className="panel-container">
                <div className="panel-info">
                  { !!data && !!data.currently &&
                    <span>{moment.unix(data.currently.time).format('MMMM Do YYYY')}</span>
                  }
                  <div className="panel-forecast-details">
                    {getForecastCard()}
                  </div>
                  <span>{data.daily.summary}</span>
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
