import axios from 'axios';

export const RES_ERR = 'RES_ERR';
export const RES_SUCC = 'RES_SUCC'
export const GET_WEATHER = 'GET_WEATHER';

function resSuccess(response, place) {
  return {
    type: RES_SUCC,
    payload: response,
    place: place,
    notFound: false,
  }
}

function resError(err) {
  return {
    type: RES_ERR,
    notFound: true
  }
}

export function getWeather(place) {
  let uri = `https://query.yahooapis.com/v1/public/yql?q=`;
  let query = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${place}")&format=json`;
  const rest_query = uri += query;
  return function(dispatch) {
    axios.get(rest_query)
    .then((response) => {
      const results = response.data.query.results;
      results === null || undefined ? dispatch(resError(response)) : dispatch(resSuccess(response, place));
    })
    .catch((err) => {
      dispatch(resError(err))
    })
  }
}
