import React, { Component } from 'react';
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
            <p>{data.date}</p>
            <p>{data.high}</p>
            <p>{data.low}</p>
          </div>
        </div>
      )
    })

  }

  SETTINGS = {
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 5,
  }

  render() {
    let { details, forecast } = this.state;
    return (
      <div>
        { !!this.state.details.astronomy
          ?
          <div>
            <div className="detail-container">
              <h2>Details for {details.location.city}</h2>
              <p>Sunrise: {details.astronomy.sunrise}</p>
              <p>Sunset: {details.astronomy.sunset}</p>
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
