/* eslint-disable */
import { RES_SUCC, RES_ERR, REMOVE_PLACE } from '../actions/actions.js';

function handleWeather(state = {}, action) {
	switch (action.type) {
		case RES_SUCC:
			return Object.assign({}, state, {
        places: [ { id: action.place, data: action.payload}, ...handleWeather(state.places, action.payload) ],
        notFound: action.notFound,
      })
    case RES_ERR:
      return Object.assign({}, state, {
        notFound: action.notFound
      })
		case REMOVE_PLACE:
			return {
				...state,
				places: state.places.filter(place => place.id !== action.id),
			}
    default:
      return state;
	}
	return state;
}

export default handleWeather;
