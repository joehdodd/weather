import React from 'react';
import { connect } from 'react-redux';
import { getWeather, removePlace } from '../actions/actions';
import { CSSTransitionGroup } from 'react-transition-group';
import { Route, withRouter } from 'react-router-dom';
import AddMore from './AddMore';
import ConditionsList from './ConditionsList';
import Forecast from './Forecast';
import '../App.css';


class App extends React.Component {

  newPlace = (newPlace) => {
    const { dispatch } = this.props;
    dispatch(getWeather(newPlace));
  }

  removeItem = (id) => {
    const { dispatch } = this.props;
    dispatch(removePlace(id));
  }

  render() {
    const { places, notFound } = this.props;
    return (
      <Route render={({ location }) => (
        <div>
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={100}
            transitionAppear={true}
            // transitionLeave={true}
            transitionAppearTimeout={600}
            >
              <Route
                location={location}
                key={location.pathname}
                exact
                path="/"
                render={({...props}) => (
                  <div>
                    <AddMore newPlace={this.newPlace}/>
                    { !!places &&
                      <ConditionsList places={places} removeItem={this.removeItem} {...props}/>
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
                          <h2>Oops! Your search returned no results. Check your spelling and try again! <span style={{fontSize: 48}}>🤔</span></h2>
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
    )
  }
}


function mapStateToProps(state, ownProps) {
  const { handleWeather } = state;
  const  { places, notFound } = handleWeather;
  return {
    places,
    notFound
  }
}

export default withRouter(connect(mapStateToProps)(App))
