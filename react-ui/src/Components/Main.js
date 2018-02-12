import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import GeoContainer from './Geo/GeoContainer';
import ConditionsList from './Favorites/ConditionsList';
import { CSSTransitionGroup } from 'react-transition-group';

const Main = (props) => {
  const { location, places, notFound, data, removeItem, updateItem } = props;
  return (
    <Route
      location={props.location}
      key={props.location.pathname}
      exact
      path="/"
      render={({...props}) => (
        <div>
          <GeoContainer data={data}/>
          { !!places && !notFound &&
            <ConditionsList places={places} removeItem={props.removeItem} updateItem={props.updateItem} {...props}/>
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
