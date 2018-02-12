import axios from 'axios';

const getAPIWeather = (callParams) => {
  const APIParams = {
    '/api/ds': {
      lat: callParams.endPoint === '/api/ds' ? callParams.position.lat : '',
      long: callParams.endPoint === '/api/ds' ? callParams.position.lng : '',
    },
    '/api/gm': {
      position: callParams.position,
    }
  }
  const params = APIParams[callParams.endPoint];
  return axios.get(callParams.endPoint, {
    params: {
      ...params
    }
  }).then(response => {
    return response
  })
}

export default getAPIWeather;
