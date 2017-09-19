import React, { Component } from 'react';
import Slider from 'react-slick';

class Forecast extends Component {

  getForecast() {
    let { forecast } = this.props;
    return forecast.map(data => {
        return (
          <div key={data.date} className="forecast-item">
            <h4>
              {data.date}
            </h4>
            <p>High: {data.high}</p>
            <p>Low: {data.low}</p>
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
    let { forecast } = this.props;
    return (
      <div className="slide-container">
        { forecast === undefined
            ? <div>
                <span>Loading Forecast!</span>
              </div>
            : <Slider {...this.SETTINGS}>
                {this.getForecast()}
              </Slider>
        }
      </div>
    )
  }
}

export default Forecast;
