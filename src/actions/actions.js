import axios from 'axios';

const URI = `https://query.yahooapis.com/v1/public/yql?q=`;
const QUERY_TEXT = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${place}")&format=json`;
const REST_QUERY = URI += QUERY_TEXT;

export const GET_WEATHER = 'GET_WEATHER';

export function getWeather(place) {
  const query = REST_QUERY;
  const request = axios.get(query);

  return {
    type: GET_WEATHER,
    data: request
  }
}
