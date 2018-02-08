import axios from 'axios';

// export const GLOBAL_UPDATE = 'GLOBAL_UPDATE';
// export function globalTimeUpdate() {
//   return {
//     type: GLOBAL_UPDATE,
//     globalUpdated: Date.now()
//   }
// }

export const RES_SUCC = 'RES_SUCC';
function resSuccess(response, place) {
  return {
    type: RES_SUCC,
    payload: response,
    place: place,
    updatedAt: Date.now(),
    notFound: false,
  }
}

export const UPDATE_PLACE = 'SINGLE_UPDATE';
function updatePlace(response, place) {
  return {
    type: UPDATE_PLACE,
    payload: response,
    place: place,
    updatedAt: Date.now(),
    notFound: false,
  }
}

export const RES_ERR = 'RES_ERR';
function resError(err) {
  return {
    type: RES_ERR,
    notFound: err
  }
}

export const REMOVE_PLACE = 'REMOVE_PLACE';
export function removePlace(id) {
  return {
    type: REMOVE_PLACE,
    id: id
  }
}

export const GET_WEATHER = 'GET_WEATHER';
export function getWeather(place, update) {
  let uri = `https://query.yahooapis.com/v1/public/yql?q=`;
  let query = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${place}")&format=json`;
  const rest_query = uri += query;
  return function(dispatch) {
    axios.get(rest_query)
    .then((response) => {
      const results = response.data.query.results;
      if (!!response && (results === null || undefined)) {
        dispatch(resError(true))
      } else if (!!update) {
        dispatch(updatePlace(response, place));
      } else {
        dispatch(resSuccess(response, place));
      }
    })
    .catch((err) => {
      dispatch(resError(true))
    })
  }
}
