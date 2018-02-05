import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import IconSunnyDay from '../images/components/IconSunnyDay';
import IconPartlyCloudy from '../images/components/IconPartlyCloudy';
import IconLightning from '../images/components/IconLightning';
import IconBlizzard from '../images/components/IconBlizzard';
import IconDrizzle from '../images/components/IconDrizzle';
import IconCloudy from '../images/components/IconCloudy';
import IconRain from '../images/components/IconRain';
import IconMostlyCloudy from '../images/components/IconMostlyCloudy';


const Forecast = (props) => {
  const getIcon = (text) => {
    let conditionTypes = {
      "Sunny": <IconSunnyDay />,
      "Mostly Sunny": <IconSunnyDay />,
      "Partly Cloudy": <IconPartlyCloudy />,
      "Mostly Cloudy": <IconMostlyCloudy />,
      "Scattered Thunderstorms": <IconLightning />,
      "Scattered Showers": <IconDrizzle />,
      "Rain": <IconRain />,
      "Thunderstorms": <IconLightning />,
      "Drizzle": <IconDrizzle />,
      "Blizzard": <IconBlizzard />,
      "Cloudy": <IconCloudy />,
    }
    return conditionTypes[text];
  }

  const getForecastCard = () => {
    const { forecast } = props.location.state.item;
    return forecast.map( data => {
      return (
        <div key={data.date} className="forecast-item">
          <div className="forecast-wrapper">
            <p>{data.day}, {data.date}</p>
            <p>High: <span className="hi-temp">{data.high}&deg;</span></p>
            <p>Low: <span className="lo-temp">{data.low}&deg;</span></p>
            <div className="weather-icon">
              {getIcon(data.text)}
            </div>
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
            <Link to="/">
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

export default Forecast
