import React from 'react';
import { Route } from 'react-router-dom';
import SearchBox from './SearchBox';
import GeoContainer from './Geo/GeoContainer';
// import ConditionsList from './Favorites/ConditionsList';
import { CSSTransitionGroup } from 'react-transition-group';

const Main = (props) => {
  const { notFound, data, handleUpdates, address } = props;
  return (
    <Route
      location={props.location}
      key={props.location.pathname}
      exact
      path="/"
      render={({...props}) => (
        <div className="main-route">
          <SearchBox handleUpdates={handleUpdates} />
          <GeoContainer address={address} data={data}/>
          {/* { !!places && !notFound &&
            <ConditionsList places={places} removeItem={removeItem} updateItem={updateItem} {...props}/>
          } */}
          { notFound &&
            <CSSTransitionGroup
              transitionName="fade"
              transitionAppear={true}
              transitionLeave={true}
              transitionEnterTimeout={1000}
              transitionAppearTimeout={750}
              transitionLeaveTimeout={750}
              >
                <h2>
                  Oops! Your search returned no results. Check your spelling and try again!
                  <span style={{fontSize: 48}} role="img" aria-label="confused emoji">🤔</span>
                </h2>
              </CSSTransitionGroup>
            }
          </div>
        )}
      />
  )
}

export default Main;
