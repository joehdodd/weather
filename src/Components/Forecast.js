import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';

class Forecast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: {},
      forecast : []
    }
  }

  componentDidMount() {
    axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${this.props.match.params.forecastId}%2C%2$%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
    .then(res => {
      let details = res.data.query.results.channel;
      let forecast = res.data.query.results.channel.item.forecast;
      this.setState({ details: details, forecast : forecast });
    })
    .catch( (error) => {
      console.log(error);
    })
  }

  getForecastCard = () => {
    let { forecast } = this.state;
    return forecast.map( data => {
      return (
        <div key={data.date} className="forecast-item">
          <div className="forecast-wrapper">
            <p>{data.day}, {data.date}</p>
            <p>High: {data.high}</p>
            <p>Low: {data.low}</p>
            <p>{data.text}</p>
          </div>
        </div>
      )
    })

  }

  SETTINGS = {
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [ { breakpoint: 768, settings: { arrows: false, slidesToShow: 2, slidesToScroll: 2 } } ]
  }

  render() {
    let { details, forecast } = this.state;
    return (
      <div className="page-wrapper">
        { !!this.state.details.astronomy
          ?
          <div>
            <div className="details-head-text">
              <h2>Details for {details.location.city}</h2>
            </div>
            <div className="detail-container">
              <div className="detail-item">
                <p>Sunrise: {details.astronomy.sunrise}</p>
                <p>Sunset: {details.astronomy.sunset}</p>
              </div>
              <div className="detail-item">
                <p>Humidity: {details.atmosphere.humidity}%</p>
                <p>Visbility: {details.atmosphere.visibility} mi</p>
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
              { forecast === undefined
                ? <div>
                  <span>Loading Forecast!</span>
                </div>
                : <Slider {...this.SETTINGS}>
                  {this.getForecastCard()}
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
}

export default Forecast
