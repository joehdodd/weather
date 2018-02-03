import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import IconSunnyDay from '../images/components/IconSunnyDay';
import IconPartlyCloudy from '../images/components/IconPartlyCloudy';
import IconLightning from '../images/components/IconLightning';
import IconBlizzard from '../images/components/IconBlizzard';
import IconDrizzle from '../images/components/IconDrizzle';
import IconCloudy from '../images/components/IconCloudy';
import IconRain from '../images/components/IconRain';
import IconMostlyCloudy from '../images/components/IconMostlyCloudy';

class Conditions extends Component {
  getIcon = (text) => {
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps !== this.props) {
  //     return true;
  //   }
  //   return false;
  // }

  sendRemoveId = (id) => {
    this.props.removeItem(id);
    console.log('%cYou just removed an item, ya dengus! 😆 💯', 'font-size: 24px;');
  }

  render() {
    const { data } = this.props.data.data.query.results.channel;
    const { id } = this.props.id;
    return (
        <div className="weather-item">
          { !!data &&
            <div className="conditions">
              <div className="remove" onClick={ () => { this.sendRemoveId(id) } }>Remove</div>
              <Link to={`/forecast/${this.props.city}`}>
                <h3>{data.location.city}</h3>
                <p><span className="hi-temp">{data.item.forecast[0].high}&deg;</span> <span className="lo-temp">{data.item.forecast[0].low}&deg;</span></p>
                <p className="current-temp">{data.item.condition.temp}&deg;</p>
                <div className="weather-icon">
                  {this.getIcon(data.item.condition.text)}
                </div>
              </Link>
            </div>
          }
          { !data &&
            <span>FUCK!</span>
          }
      </div>
    )
  }
}

export default Conditions
