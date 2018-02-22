import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import GeoContainer from './Geo/GeoContainer';
import { CSSTransitionGroup } from 'react-transition-group';

const Main = props => {
  const { fetching, notFound, data, address } = props;
  return (
    <Route
      location={props.location}
      key={props.location.pathname}
      exact
      path="/"
      render={({ ...props }) => (
        <div className="main-route">
          <CSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionLeave={true}
            transitionEnterTimeout={1000}
            transitionAppearTimeout={750}
            transitionLeaveTimeout={750}
          >
            {fetching ? (
              <div className="loading-container pulsate">
                <h1>Loading your weather...</h1>
              </div>
            ) : (
              <GeoContainer address={address} data={data} />
            )}
          </CSSTransitionGroup>
          {notFound && (
            <CSSTransitionGroup
              transitionName="fade"
              transitionAppear={true}
              transitionLeave={true}
              transitionEnterTimeout={1000}
              transitionAppearTimeout={750}
              transitionLeaveTimeout={750}
            >
              <h2>
                Oops! Your search returned no results. Check your spelling and
                try again!
                <span
                  style={{ fontSize: 48 }}
                  role="img"
                  aria-label="confused emoji"
                >
                  🤔
                </span>
              </h2>
            </CSSTransitionGroup>
          )}
        </div>
      )}
    />
  );
};

export default withRouter(Main);
