import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import { Route, withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import Map from './Map';
import StickyToolbarTop from './StickyToolbarTop';
import StickyToolbarBottom from './StickyToolbarBottom';
import Main from './Main';
import Forecast from './Forecast';
import Favorites from './Favorites';

class App extends Component {
  componentWillReceiveProps(nextProps) {
    const { isFavorite } = this.props.actions;
    isFavorite(nextProps.address);
  }

  toggleFavorites = () => {
    const { actions, isFavorite } = this.props;
    const { removeFavorite, saveFavorite } = actions;
    const params = {
      address: this.props.address,
      lat: this.props.lat,
      lng: this.props.lng
    };
    isFavorite ? removeFavorite(params) : saveFavorite(params);
  };

  refreshWeather = async () => {
    const { actions, lat, lng, history, location } = this.props;
    const { fetchWeather } = actions;
    const params = {
      lat,
      lng
    };
    await fetchWeather(params);
    location.pathname !== '/' && history.push('/');
  };

  render() {
    const {
      actions,
      fetching,
      notFound,
      address,
      lat,
      lng,
      data,
      isFavorite,
      favorites
    } = this.props;
    return (
      <DragDropContext>
        <Map lat={lat} lng={lng} actions={actions} />
        <div className="wrapper">
          <div className="container">
            <StickyToolbarTop fetchWeather={actions.fetchWeather} />
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
                  <Favorites
                    location={location}
                    fetching={fetching}
                    address={address}
                    data={data}
                    favorites={favorites}
                    fetchWeather={actions.fetchWeather}
                    toggleFavorites={this.toggleFavorites}
                  />
                </span>
              )}
            />
            <StickyToolbarBottom
              isFavorite={isFavorite}
              toggleFavorites={this.toggleFavorites}
              refreshWeather={this.refreshWeather}
            />
          </div>
        </div>
      </DragDropContext>
    );
  }
}

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
    location
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
