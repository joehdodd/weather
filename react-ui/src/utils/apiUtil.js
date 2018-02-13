import axios from 'axios';

const getAPIWeather = (callParams) => {
  return axios.get('/api/ds', {
    params: {
      ...callParams
    }
  }).then(response => {
    return response
  })
}

export default getAPIWeather;
