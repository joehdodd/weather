import axios from 'axios';


export const FETCHING = 'FETCHING';
function fetching(fetching) {
  return {
    type: 'FETCHING',
    fetching: fetching
  }
}

export const ERROR = 'ERROR';
function resError(err) {
  return {
    type: ERROR,
    notFound: err
  }
}

export const SUCCESS = 'SUCESS';
function resSuccess(data) {
  return {
    type: SUCCESS,
    notFound: false,
    fetching: false,
    data,
  }
}

export const SET_ADDR = 'SET_ADDR';
export function setAddress(address) {
  return {
    type: SET_ADDR,
    address,
  }
}

export const SET_POSITION = 'SET_POSITION';
function setPosition(position) {
  return {
    type: SET_POSITION,
    lat: position.lat,
    lng: position.lng,
  }
}

function getData(callParams) {
  return function(dispatch) {
    axios.get('/api/ds', { params: {...callParams} })
      .then(response => {
        !response && dispatch(resError(true));
        !!response && dispatch(resSuccess(response.data));
      }).catch(err => {
        dispatch(resError(true));
      });
  }
}


export function fetchWeather(callParams) {
  return function(dispatch) {
    dispatch(fetching(true));
    dispatch(setPosition(callParams));
    dispatch(getData(callParams));
  }
}
