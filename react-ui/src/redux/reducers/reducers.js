import {
	FETCHING,
  ERROR,
  SET_ADDR,
  SET_POSITION,
  SUCCESS,
} from '../actions/actions.js';

export function handleWeather(state = {
  fetching: true
}, action) {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, {
        fetching: action.fetching,
      })
      break;
    case ERROR:
      return Object.assign({}, state, { notFound: action.notfound })
    case SET_ADDR:
      return Object.assign({}, state, { address: action.address })
    case SET_POSITION:
      return Object.assign({}, state, {
        lat: action.lat,
        lng: action.lng,
      })
    case SUCCESS:
      return Object.assign({}, state, {
        notFound: action.notfound,
        fetching: action.fetching,
        data: action.data,
      })
    default:
      return state;
  }
}
