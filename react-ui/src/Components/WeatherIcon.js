import React from 'react';
import IconSunnyDay from '../images/components/IconSunnyDay';
import IconPartlyCloudy from '../images/components/IconPartlyCloudy';
import IconLightning from '../images/components/IconLightning';
import IconSleet from '../images/components/IconSleet';
import IconBlizzard from '../images/components/IconBlizzard';
import IconDrizzle from '../images/components/IconDrizzle';
import IconCloudy from '../images/components/IconCloudy';
import IconRain from '../images/components/IconRain';
import IconMostlyCloudy from '../images/components/IconMostlyCloudy';
import IconBreeze from '../images/components/IconBreeze';
import IconSnow from '../images/components/IconSnow';

const WeatherIcon = (props) => {
  let conditionTypes = {
    "Sunny": <IconSunnyDay />,
    "Clear": <IconSunnyDay />,
    "Mostly Sunny": <IconSunnyDay />,
    "Partly Cloudy": <IconPartlyCloudy />,
    "Mostly Cloudy": <IconMostlyCloudy />,
    "Scattered Thunderstorms": <IconLightning />,
    "Scattered Showers": <IconDrizzle />,
    "Rain": <IconRain />,
    "Showers": <IconRain />,
    "Thunderstorms": <IconLightning />,
    "Drizzle": <IconDrizzle />,
    "Blizzard": <IconBlizzard />,
    "Snow Showers": <IconSnow />,
    "Rain And Snow": <IconSleet />,
    "Cloudy": <IconCloudy />,
    "Breezy": <IconBreeze iconColor={props.color}/>,
  }
  return (
    <div className="weather-icon">
      {conditionTypes[props.text]}
    </div>
  )
}

export default WeatherIcon
