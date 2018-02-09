import React from 'react';
import { connect } from 'react-redux';
import { getWeather, removePlace } from '../actions/actions';
import { CSSTransitionGroup } from 'react-transition-group';
import { Route, withRouter } from 'react-router-dom';
import AddMore from './AddMore';
import ConditionsList from './ConditionsList';
import Forecast from './Forecast';
import axios from 'axios';
import '../App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { dispatch, places } = this.props;
    const singleUpdate = true;
    if (!!places) {
      places.map(place => dispatch(getWeather(place.id, singleUpdate)))
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoLocate);
    }
  }

  geoLocate = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    axios.get('/api/ds', {
      params: {
        lat: lat,
        long: long,
      }
    }).then(response => {
      this.setState({
        data: response.data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  newPlace = (newPlace) => {
    const { dispatch } = this.props;
    dispatch(getWeather(newPlace));
  }

  removeItem = (id) => {
    const { dispatch } = this.props;
    dispatch(removePlace(id));
  }

  updateItem = (id) => {
    const { dispatch } = this.props;
    const singleUpdate = true;
    dispatch(getWeather(id, singleUpdate));
  }

  render() {
    const { places, notFound } = this.props;
    const { data } = this.state;
    console.log(data);
    return (
      <Route render={({ location }) => (
        <div>
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={100}
            transitionAppear={true}
            // transitionLeave={true}
            transitionAppearTimeout={600}
            >
              <Route
                location={location}
                key={location.pathname}
                exact
                path="/"
                render={({...props}) => (
                  <div>
                    <h1>Your Weather...</h1>
                    { !!data
                      ? <div className="weather-container">
                          <span>{data.daily.summary}</span>
                        </div>
                      : <div className="weather-container">
                          <span>Loading data for your location!</span>
                        </div>
                    }
                    <AddMore newPlace={this.newPlace}/>
                    { !!places && !notFound &&
                      <ConditionsList places={places} removeItem={this.removeItem} updateItem={this.updateItem} {...props}/>
                    }
                    { notFound &&
                      <CSSTransitionGroup
                        transitionName="fade"
                        transitionAppear={true}
                        transitionLeave={true}
                        transitionEnterTimeout={1000}
                        transitionAppearTimeout={750}
                        transitionLeaveTimeout={750}
                        >
                          <h2>
                            Oops! Your search returned no results. Check your spelling and try again!
                            <span style={{fontSize: 48}} role="img" aria-label="confused emoji">🤔</span>
                          </h2>
                        </CSSTransitionGroup>
                      }
                    </div>
                  )}
                />
              </CSSTransitionGroup>
              <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={500}
                >
                  <Route
                    location={location}
                    key={location.pathname}
                    path={`/forecast/:forecastId`}
                    render={({...props}) => (
                      <Forecast {...props}/>
                    )}
                  />
                </CSSTransitionGroup>
        </div>
      )}/>
    )
  }
}


function mapStateToProps(state, ownProps) {
  const { handleWeather } = state;
  const  { places, notFound, } = handleWeather;
  return {
    places,
    notFound,
  }
}

export default withRouter(connect(mapStateToProps)(App))
