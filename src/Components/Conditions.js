import React from 'react';
import { Link } from 'react-router-dom';
import IconSunnyDay from '../images/components/IconSunnyDay';
import IconPartlyCloudy from '../images/components/IconPartlyCloudy';
import IconLightning from '../images/components/IconLightning';
import IconBlizzard from '../images/components/IconBlizzard';
import IconDrizzle from '../images/components/IconDrizzle';
import IconCloudy from '../images/components/IconCloudy';
import IconRain from '../images/components/IconRain';
import IconMostlyCloudy from '../images/components/IconMostlyCloudy';

const Conditions = (props) => {
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

  const sendRemoveId = (id) => {
    props.removeItem(id);
    console.log('%cYou just removed an item, ya dengus! 😆 💯', 'font-size: 24px;');
  }

  const { channel } = props.data.query.results;
  const { id } = props;
  const linkId = id.split(' ').join('_');
  return (
    <div className="weather-item">
        { !!channel &&
          <div className="conditions">
            <div className="remove" onClick={ () => { sendRemoveId(id) } }>Remove</div>
            <Link to={{ pathname: `/forecast/${linkId}`, state: channel }}>
              <h3>{channel.location.city}</h3>
              <p><span className="hi-temp">{channel.item.forecast[0].high}&deg;</span> <span className="lo-temp">{channel.item.forecast[0].low}&deg;</span></p>
              <p className="current-temp">{channel.item.condition.temp}&deg;</p>
              <div className="weather-icon">
                {getIcon(channel.item.condition.text)}
              </div>
            </Link>
          </div>
        }
        { !channel &&
          <div className="conditions">
            <span>Loading...</span>
          </div>
        }
    </div>
  )
}

export default Conditions
