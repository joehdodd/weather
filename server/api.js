const dotEnv = require('dotenv').config({ path: '.env' });
const axios = require('axios');
const { REACT_APP_GMK, REACT_APP_DSK } = process.env;

exports.main = (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
}

exports.gm = function (req, res) {
  let { position } = req.query;
  console.log(position);
  try {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${position}&key=${REACT_APP_GMK}`)
    .then(response => {
      res.json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({"message": 'Oops! An error occured with your request to the Google Maps API!', "details": err})
    })
  } catch(err) {
    res.status(500).json({"message": 'Oops! An error occured with your request to the Google Maps API!', "details" : err})
  }
}

exports.ds = function (req, res) {
  let lat = req.query.lat;
  let long = req.query.long;
  console.log(req);
  try {
    axios.get(`https://api.darksky.net/forecast/${REACT_APP_DSK}/${lat},${long}`)
    .then(response => {
      console.log(response);
      res.json(response.data);
    })
    .catch(err => {
      res.status(500).json({"message": 'Oops! An error occured with your request to the Dark Sky API!', "details": err})
    })
  } catch(err) {
    res.status(500).json({"message": 'Oops! An error occured with your request to the Dark Sky API', "details" : err})
  }
}

exports.ra = function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
}
