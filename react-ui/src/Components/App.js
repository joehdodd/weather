import React from 'react';
import { connect } from 'react-redux';
import { getWeather, removePlace, reorder } from '../actions/actions';
import { CSSTransitionGroup } from 'react-transition-group';
import { Route, withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import GeoContainer from './Geo/GeoContainer';
import AddMore from './AddMore';
import ConditionsList from './Favorites/ConditionsList';
import Forecast from './Favorites/Forecast';
import axios from 'axios';
import '../App.css';

const reorderArr = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

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
      navigator.geolocation.getCurrentPosition(this.geoLocateLanding);
    }
    axios.get('/api').then(response => console.log(response))
  }

  geoLocateLanding = (position) => {
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

  geoLocateSearch = (searchString) => {
    axios.get('/api/gm', {
      params: {
        search: searchString
      }
    }).then(response => { console.log(response) });
      // console.log(response.data[0].geometry.location);
      // let { lat, lng } = response.data[0].geometry.location;
      // axios.get('/api/ds', {
      //   params: {
      //     lat: lat,
      //     long: lng,
      //   }
    //   }).then(response => {
    //     this.setState({
    //       data: response.data
    //     })
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // }).catch(err => {
    //   console.log(err);
    // })
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

  onDragEnd = (result) => {
    const { dispatch, places } = this.props;
    if (!result.destination) {
      return;
    }

    const reorderedPlaces = reorderArr(
      places,
      result.source.index,
      result.destination.index
    );

    return dispatch(reorder(reorderedPlaces));
  }

  render() {
    const { places, notFound } = this.props;
    const { data } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
      <Route render={({ location }) => (
        <div>
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={100}
            transitionAppear={true}
            transitionAppearTimeout={600}
            >
              <Route
                location={location}
                key={location.pathname}
                exact
                path="/"
                render={({...props}) => (
                  <div>
                    <AddMore
                      geoLocateSearch={this.geoLocateSearch}
                      newPlace={this.newPlace}
                      searchType='Get Weather..'
                      labelText="Add a new city by searching in the field below."
                    />
                    <GeoContainer data={data}/>
                    <AddMore
                      isNewPlace={true}
                      geoLocate={this.geoLocate}
                      newPlace={this.newPlace}
                      searchType="Your Favorites"
                      labelText="Add a new city by searching in the field below."
                    />
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
      </DragDropContext>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const {
    handleWeather,
  } = state;
  const {
    places,
    notFound,
    reorder
  } = handleWeather;
  return {
    places,
    notFound,
    reorder,
  }
}

export default withRouter(connect(mapStateToProps)(App))
