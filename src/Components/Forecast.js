import React, { Component } from 'react';
import Slider from 'react-slick';

class Forecast extends Component {
  SETTINGS = {
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 5,
  }

  render() {
    let id = this.props.match.params.forecastId;
    console.log(id)
    // getForecast = (id) => {
    //   !!forecast
    //   forecast.map( d => {
    //     <div>{d[id].high}</div>
    //   })
    // }
    return (
      <div className="slide-container">
        {/* { forecast === undefined
            ? <div>
                <span>Loading Forecast!</span>
              </div>
            : <Slider {...this.SETTINGS}>
                <div>
                  {id}
                </div>
              </Slider>
        } */}
        <p>Hi {id}</p>
      </div>
    )
  }
}

export default Forecast;
