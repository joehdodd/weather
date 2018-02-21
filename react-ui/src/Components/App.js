import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions/actions';
import { Route, withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import Map from './Map';
import StickyToolbar from './StickyToolbar';
import Main from './Main';
import Forecast from './Favorites/Forecast';

class App extends Component {

  componentWillReceiveProps(nextProps) {
    console.log('fire?');
    const { favorites } = this.props;
    const favorite = favorites.some(fav => fav.address === nextProps.address)
    console.log(favorite, actions);
    actions.isFavorite(favorite)
  }

  handleFavorites = () => {
    console.log('fired handleFavorites');
    const params = {
      address: this.props.address,
      lat: this.props.lat,
      lng: this.props.lng,
    }
    return actions.saveFavorite(params);
  }

  render () {
    const { actions, fetching, notFound, address, lat, lng, data, isFavorite } = this.props;
    console.log(isFavorite);
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
                <span onClick={() => this.handleFavorites()}>Add to favorites</span>
              </div>
          </div>
        </div>
      </DragDropContext>
    )
  }

};

function mapStateToProps(state, ownProps) {
  const { handleWeather, handleFavorites, router } = state;
  const { fetching, notFound, address, lat, lng, data } = handleWeather;
  const { isFavorite, favorites } = handleFavorites;
  const { location } = router;
  return {
    fetching,
    notFound,
    address,
    lat,
    lng,
    data,
    isFavorite,
    favorites,
    location,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
