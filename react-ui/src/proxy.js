import axios from 'axios';

export default function getDSKWeather(coords) {
  return  axios.get(`https://api.darksky.net/forecast/${process.env.REACT_APP_DSK}/${coords}`)
            .then(response => console.log(response))
}
