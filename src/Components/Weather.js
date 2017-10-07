import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ConditionsList from './ConditionsList';
import Forecast from './Forecast';

const Weather = () => (
  <Router>
      <Route render={({ location }) => (
          <div>
            <Route
              location={location}
              key={location.key}
              exact
              path="/"
              // render={({...props}) => (
              //   <ConditionsList {...props}/>
              // )}
              component={ConditionsList}
            />
            <CSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={50}
            >
              <Route
                location={location}
                key={location.key}
                path={`/forecast/:forecastId`}
                // render={({...props}) => (
                //   <Forecast {...props}/>
                // )}
                component={Forecast}
              />
            </CSSTransitionGroup>
          </div>
      )}/>
    </Router>
)

export default Weather
