import React from 'react';
import { connect } from 'react-redux';
import { getWeather, setPosition, setAddress } from '../redux/actions/actions';
import { CSSTransitionGroup } from 'react-transition-group';
import { Route, withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import HOMap from './Map';
import StickyToolbar from './StickyToolbar';
import Main from './Main';
import Forecast from './Favorites/Forecast';

class App extends React.Component {

  handleUpdates = async (options) => {
    const { dispatch, address } = this.props;
    if (options.address) await dispatch(setAddress(options.address))
    if (options.position) await dispatch(setPosition(options.position), getWeather(options.position))
  }

  render() {
    const { fetching, notFound, address, lat, lng, data } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <HOMap
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
                { fetching
                  ? <div className="loading-container pulsate">
                      <h1>Loading your weather...</h1>
                    </div>
                  : <Main
                      location={location}
                      handleUpdates={this.handleUpdates}
                      address={address}
                      notFound={notFound}
                      data={data}
                    />
                }
                <CSSTransitionGroup
                  transitionName="fade"
                  transitionEnterTimeout={200}
                  transitionLeaveTimeout={500}
                >
                  <Route
                    location={location}
                    key={location.pathname}
                    path={`/forecast`}
                    render={({...props}) => (
                      <Forecast {...props}/>
                    )}
                  />
                </CSSTransitionGroup>
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
  const { location } = router;
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
