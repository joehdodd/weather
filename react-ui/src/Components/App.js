import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions/actions';
import { Route, withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import Map from './Map';
import StickyToolbar from './StickyToolbar';
import Main from './Main';
import Forecast from './Favorites/Forecast';

const App = props => {
  const saveFavorite = () => {
    const { favorites } = props;
    const params = {
      address: props.address,
      lat: props.lat,
      lng: props.lng,
    }
    favorites.includes(props.address)
    ? console.log('you done did favorite this!')
    : actions.saveFavorite(params);
    // return actions.saveFavorite(params);
  }
  const { actions, fetching, notFound, address, lat, lng, data } = props;
  return (
    <DragDropContext>
      <Map lat={lat} lng={lng} actions={actions} />
      <div className="wrapper">
        <div className="container">
          <StickyToolbar fetchWeather={actions.fetchWeather} />
          <Route
            render={({ location }) => (
              <span>
                <Main
                  actions={actions}
                  location={location}
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
            )}
          />
          <div className="bottom-toolbar-container">
            <span onClick={() => saveFavorite()}>Add to favorites</span>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

function mapStateToProps(state, ownProps) {
  const { handleWeather, handleFavorites, router } = state;
  const { fetching, notFound, address, lat, lng, data } = handleWeather;
  const { favorites } = handleFavorites
  const { location } = router;
  return {
    fetching,
    notFound,
    address,
    lat,
    lng,
    data,
    favorites,
    location,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
