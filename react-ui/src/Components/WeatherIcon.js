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
import IconFlurry from '../images/components/IconFlurry';
import IconCloudyNight from '../images/components/IconCloudyNight';
import IconNight from '../images/components/IconNight';

const WeatherIcon = props => {
  let conditionTypes = {
    'sunny': <IconSunnyDay />,
    'clear': <IconSunnyDay />,
    'Mostly Sunny': <IconSunnyDay />,
    'partly-cloudy-day': <IconPartlyCloudy />,
    'Mostly Cloudy': <IconMostlyCloudy />,
    'partly-cloudy-night': <IconCloudyNight />,
    'clear-night': <IconNight />,
    'Scattered Thunderstorms': <IconLightning />,
    'Scattered Showers': <IconDrizzle />,
    'rain': <IconRain />,
    'showers': <IconRain />,
    'thunderstorms': <IconLightning />,
    'drizzle': <IconDrizzle />,
    'blizzard': <IconBlizzard />,
    'Snow Showers': <IconSnow />,
    'snow': <IconFlurry />,
    'flurries': <IconFlurry />,
    'Rain And Snow': <IconSleet />,
    'cloudy': <IconCloudy />,
    'wind': <IconBreeze />
  };
  return <div className={props.className}>{conditionTypes[props.text]}</div>;
};

export default WeatherIcon;
