import React from 'react';
import { connect } from 'react-redux';
import { getWeather, removePlace, reorder } from '../redux/actions/actions';
import { CSSTransitionGroup } from 'react-transition-group';
import { Route, withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import HOCMap from './Map';
import Main from './Main';
// import StickyToolbar from './StickyToolbar';
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
        lat: position.lat,
        lng: position.lng
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
        {/* <div id="skew"></div> */}
        <HOCMap
          lat={lat}
          lng={lng}
          containerElement={
            <div style={{
                margin: `0`,
                height: `100%`,
                width: `100%`,
                zIndex: `-1000`,
                position: `fixed`,
                filter: `grayscale(100%)`,
                opacity: `0.5`
              }}
            />
          }
          mapElement={<div style={{ height: `100%`, width: `100%` }} />}
          defaultMapTypeId='satellite'
        />
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
                    sendRequest={this.sendRequest}
                    getBackgroundImage={this.getBackgroundImage}
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
