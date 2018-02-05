import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import WeatherIcon from './WeatherIcon';

const Forecast = (props) => {
  const getForecastCard = () => {
    const { forecast } = props.location.state.item;
    return forecast.map( data => {
      return (
        <div key={data.date} className="forecast-item">
          <div className="forecast-wrapper">
            <p>{data.day}, {data.date}</p>
            <p>High: <span className="hi-temp">{data.high}&deg;</span></p>
            <p>Low: <span className="lo-temp">{data.low}&deg;</span></p>
            <WeatherIcon text={data.text} />
          </div>
        </div>
      )
    })

  }

  const SETTINGS = {
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [ { breakpoint: 768, settings: { arrows: false, slidesToShow: 2, slidesToScroll: 2 } } ]
  }

  const { item, astronomy, location, atmosphere } = props.location.state;
  return (
    <div className="page-wrapper">
      { !!props.location.state
        ?
        <div className="forecast-items">
          <div className="details-head-text">
            <h2>Details for {location.city}</h2>
          </div>
          <div className="detail-container">
            <div className="detail-item">
              <p><span className="rise-text">Sunrise</span>: {astronomy.sunrise}</p>
              <p><span className="set-text">Sunset</span>: {astronomy.sunset}</p>
            </div>
            <div className="detail-item">
              <p>Humidity: {atmosphere.humidity}%</p>
              <p>Visbility: {atmosphere.visibility} mi</p>
            </div>
          </div>
          <div className="details-head-text">
            <h2>10-Day Forecast</h2>
            { window.innerWidth < 768
              ? <p>Swipe to see the next card.</p>
              : null
            }
          </div>
          <div className="slide-container">
            { item.forecast === undefined
              ? <div>
                  <span>Loading Forecast!</span>
                </div>
              : <Slider {...SETTINGS}>
                  {getForecastCard()}
                </Slider>
            }
          </div>
          <div>
            <Link to={{ pathname: '/'}}>
              <button className="button">Back to Overview</button>
            </Link>
          </div>
        </div>
        :
        <div>
          <p>Loading!</p>
        </div>
      }
    </div>
  )
}

export default withRouter(Forecast)
