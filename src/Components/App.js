import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Route } from 'react-router-dom';
import ConditionsList from './ConditionsList';
import Forecast from './Forecast';
import '../App.css';

const App = () => (
  <Route render={({ location }) => (
    <div>
      <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={100}
        transitionAppear={true}
        transitionLeave={true}
        transitionAppearTimeout={600}
      >
      <Route
        location={location}
        key={location.pathname}
        exact
        path="/"
        render={({...props}) => (
          <ConditionsList {...props}/>
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

export default App
