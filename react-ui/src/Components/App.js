import React from 'react';
import { connect } from 'react-redux';
import { getWeather, removePlace, reorder } from '../redux/actions/actions';
import { CSSTransitionGroup } from 'react-transition-group';
import { Route, withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import HOMap from './Map';
import Main from './Main';
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
    this.state = {}
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
        this.handleUpdates({ position: positionParams })
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ( ((nextState.lat !== this.state.lat) && (nextState.lng !== this.state.lng)) || (nextState.data !== this.state.data) ) {
      return true;
    }
    return false;
  }

  handleUpdates = async (options) => {
    if (options.address) {
      this.setState({ address: options.address })
    }

    const response = await getAPIWeather(options.position);
    console.log(response);
    if (!!response.data) {
      return this.setState({
        data: response.data,
        lat: options.position.lat,
        lng: options.position.lng,
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
    const { data, lat, lng, address } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <HOMap
          lat={lat}
          lng={lng}
          handleUpdates={this.handleUpdates}
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
                    handleUpdates={this.handleUpdates}
                    places={places}
                    address={address}
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
