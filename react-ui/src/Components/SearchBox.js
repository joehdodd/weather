import React from 'react';
import { compose, lifecycle } from 'recompose';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

const SearchBox = compose(
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          let lat = places[0].geometry.location.lat();
          let lng = places[0].geometry.location.lng();
          const latLng = {
            lat: lat,
            lng: lng
          };
          this.props.fetchWeather(latLng);
          this.setState({
            places
          });
        }
      });
    }
  })
)(props => (
  <div className="search-container">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input type="text" placeholder="New York, NY" className="search" />
    </StandaloneSearchBox>
  </div>
));

export default SearchBox;
