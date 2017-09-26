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
    let { forecast } = this.props;
    console.log(id)
    return (
      <div className="slide-container">
        { forecast === undefined
            ? <div>
                <span>Loading Forecast!</span>
              </div>
            : <Slider {...this.SETTINGS}>
                <div>
                  {
                    forecast.forecast.map( data => {
                      return (
                        <p>{data.high}</p>
                      )
                    })
                  }
                </div>
              </Slider>
        }
      </div>
    )
  }
}

export default Forecast;
