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
    "Sunny": <IconSunnyDay iconColor={props.color}/>,
    "Clear": <IconSunnyDay iconColor={props.color}/>,
    "Mostly Sunny": <IconSunnyDay iconColor={props.color}/>,
    "Partly Cloudy": <IconPartlyCloudy iconColor={props.color}/>,
    "Mostly Cloudy": <IconMostlyCloudy iconColor={props.color}/>,
    "Scattered Thunderstorms": <IconLightning iconColor={props.color}/>,
    "Scattered Showers": <IconDrizzle iconColor={props.color}/>,
    "Rain": <IconRain iconColor={props.color}/>,
    "Showers": <IconRain iconColor={props.color}/>,
    "Thunderstorms": <IconLightning iconColor={props.color}/>,
    "Drizzle": <IconDrizzle iconColor={props.color}/>,
    "Blizzard": <IconBlizzard iconColor={props.color}/>,
    "Snow Showers": <IconSnow iconColor={props.color}/>,
    "Rain And Snow": <IconSleet iconColor={props.color}/>,
    "Cloudy": <IconCloudy iconColor={props.color}/>,
    "Breezy": <IconBreeze iconColor={props.color}/>,
  }
  return (
    <div className="weather-icon">
      {conditionTypes[props.text]}
    </div>
  )
}

export default WeatherIcon
