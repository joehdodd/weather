/* eslint-disable */
import {
	RES_SUCC,
	RES_ERR,
	REMOVE_PLACE,
	UPDATE_PLACE,
	GLOBAL_UPDATE,
	REORDER } from '../actions/actions.js';

export function handleWeather(state = {
		notFound: false,
	}, action) {
	switch (action.type) {
		case RES_SUCC:
			let nextState = {
        places: [
					{ id: action.place, updatedAt: action.updatedAt, data: action.payload},
					...handleWeather(state.places, action.payload)
				],
        notFound: action.notFound,
      }
			return Object.assign({}, state, nextState)
    case RES_ERR:
      return Object.assign({}, state, { notFound: action.notFound })
		case REMOVE_PLACE:
			return Object.assign({}, state, {
				...state,
				places: state.places.filter(place => place.id !== action.id),
			})
		case UPDATE_PLACE:
			nextState = {
			 	places: state.places.map(place => {
					return (place.id !== action.place)
						? place
						: {
								id: action.place,
								updatedAt: action.updatedAt,
								data: action.payload
							}
				}),
				notFound: action.notFound,
			}
			return Object.assign({}, state, nextState)
			case REORDER:
			return Object.assign({}, state, {
				places: [...action.places]
			})
    default:
      return state;
	}
	return state;
}
