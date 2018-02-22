/* eslint-disable */
import {
	FETCHING,
  ERROR,
  SET_ADDR,
  SET_POSITION,
  SUCCESS,
	IS_FAV,
	SAVE_FAV,
	REM_FAV,
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

export function handleFavorites(state = {
	favorites: [],
	isFavorite: false,
}, action) {
	switch (action.type) {
		case IS_FAV:
			return Object.assign({}, state, {
				isFavorite: state.favorites.some(fav => fav.address === action.address)
			})
		case SAVE_FAV:
			return Object.assign({}, state, {
				favorites: [ { address: action.address, lat: action.lat, lng: action.lng, }, ...state.favorites ],
			})
		case REM_FAV:
			return Object.assign({}, state, {
				favorites: state.favorites.filter(fav => fav.address !== action.address)
			})
		default:
			return state;
	}
}
