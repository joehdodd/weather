import React from 'react';
import { connect } from 'react-redux';
import { getWeather, removePlace, reorder } from '../redux/actions/actions';
import { CSSTransitionGroup } from 'react-transition-group';
import { Route, withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import Map from './Map';
import SearchBox from './SearchBox';
import Main from './Main';
import StickyToolbar from './StickyToolbar';
import Forecast from './Favorites/Forecast';
import getAPIWeather from '../utils/apiUtil.js';

const reorderArr = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPortal: false,
      lat: 40.7049579,
      lng: -74.0109394,
    }
  }

  componentDidMount() {
    const { dispatch, places } = this.props;
    const singleUpdate = true;
    if (!!places) {
      places.map(place => dispatch(getWeather(place.id, singleUpdate)))
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>{
        let positionParams = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log(positionParams);
        this.setState({
          lat: positionParams.lat,
          lng: positionParams.lng,
        })
        this.sendRequest('/api/ds', positionParams)
      });
    }
  }

  sendRequest = async (endPoint, position) => {
    const callParams = {
      '/api/ds': {
        endPoint,
        position,
      },
      '/api/gm': {
        endPoint,
        position
      }
    }
    const response = await getAPIWeather(callParams[endPoint]);
    if (!!response.data) {
      return this.setState({
        searchPlaces: endPoint === '/api/gm' ? [...response.data] : [],
        data: endPoint === '/api/ds' ? response.data : {},
      })
    }
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
    const { data, lat, lng } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div id="skew"></div>
        <Map
          lat={lat}
          lng={lng}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GMK}&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          defaultOptions={{
            // these following 7 options turn certain controls off see link below
            streetViewControl: false,
            scaleControl: false,
            mapTypeControl: false,
            panControl: false,
            zoomControl: false,
            rotateControl: false,
            fullscreenControl: false
          }}
          disableDefaultUI
        />
        {/* <StickyToolbar
          sendRequest={this.sendRequest}
          newPlace={this.newPlace}
        /> */}
        <SearchBox />
        <Route render={({ location }) => (
          <div className="wrapper">
            <div className="container">
              <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={100}
                transitionAppear={true}
                transitionAppearTimeout={600}
                >
                  <Main
                    location={location}
                    places={places}
                    notFound={notFound}
                    data={data}
                    removeItem={this.removeItem}
                    updateItem={this.updateItem}
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
