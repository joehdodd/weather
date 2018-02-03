/* eslint-disable */
import { RES_SUCC, RES_ERR } from '../actions/actions.js';
import { combineReducers } from 'redux';

function getWeather(state = {}, action) {
	switch (action.type) {
		case RES_SUCC:
			return Object.assign({}, state, {
        places: [ { id: action.place, data: action.payload}, ...getWeather(state.places, action.payload) ],
        notFound: action.notFound,
      })
    case RES_ERR:
      return Object.assign({}, state, {
        noutFound: action.notFound
      })
    default:
      return state;
	}
	return state;
}

const rootReducer = combineReducers({
  getWeather
})

export default rootReducer;
