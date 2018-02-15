import React from 'react';
import { connect } from 'react-redux';
import { getWeather, setAddress } from '../redux/actions/actions';
import { Route, withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import Map from './Map';
import StickyToolbar from './StickyToolbar';
import Main from './Main';
import Forecast from './Favorites/Forecast';

class App extends React.Component {

  handleUpdates = async (options) => {
    const { dispatch } = this.props;
    !!options.address && await dispatch(setAddress(options.address));
    !!options.position && await dispatch(getWeather(options.position));
  }

  render() {
    const { fetching, notFound, address, lat, lng, data } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Map
          lat={lat}
          lng={lng}
          handleUpdates={this.handleUpdates}
        />
        <div className="wrapper">
          <div className="container">
            <StickyToolbar
              handleUpdates={this.handleUpdates}
            />
            <Route render={({ location }) => (
              <span>
                <Main
                  location={location}
                  handleUpdates={this.handleUpdates}
                  address={address}
                  fetching={fetching}
                  notFound={notFound}
                  data={data}
                />
                <Forecast
                  location={location}
                  fetching={fetching}
                  notFound={notFound}
                  data={data}
                />
              </span>
            )}/>
          </div>
        </div>
      </DragDropContext>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const {
    handleWeather,
    router,
  } = state;
  const {
    fetching,
    notFound,
    address,
    lat,
    lng,
    data
  } = handleWeather;
  const {
    location
  } = router;
  return {
    fetching,
    notFound,
    address,
    lat,
    lng,
    data,
    location,
  }
}

export default withRouter(connect(mapStateToProps)(App))
