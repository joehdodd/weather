import React from 'react';
import { connect } from 'react-redux';
// import { fetchWeather, setAddress } from '../redux/actions/actions';
import { Route, withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import Map from './Map';
import StickyToolbar from './StickyToolbar';
import Main from './Main';
import Forecast from './Favorites/Forecast';

const App = (props) => {

  const handleUpdates = async (options, action) => {
    const { dispatch } = props;
    return await dispatch(action(options));
  }

  const { fetching, notFound, address, lat, lng, data } = props;
  return (
    <DragDropContext>
      <Map
        lat={lat}
        lng={lng}
        handleUpdates={handleUpdates}
      />
      <div className="wrapper">
        <div className="container">
          <StickyToolbar
            handleUpdates={handleUpdates}
          />
          <Route render={({ location }) => (
            <span>
              <Main
                location={location}
                handleUpdates={handleUpdates}
                address={address}
                fetching={fetching}
                notFound={notFound}
                data={data}
              />
              <Forecast
                location={location}
                fetching={fetching}
                notFound={notFound}
                address={address}
                data={data}
              />
            </span>
          )}/>
        </div>
      </div>
    </DragDropContext>
  )
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
