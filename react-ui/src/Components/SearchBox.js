import React from 'react';
import { compose, lifecycle } from "recompose";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

const SearchBox = compose(
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          // const photo = places[0].photos[0].getUrl({'maxWidth': 1500, 'maxHeight': 1500});
          // this.props.getBackgroundImage(photo);
          let lat = places[0].geometry.location.lat();
          let lng = places[0].geometry.location.lng();
          const latLng = {
            lat: lat,
            lng: lng,
          }
          this.props.sendRequest('/api/ds', latLng);
          this.setState({
            places,
          });
        },
      })
    },
  }),
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="New York, NY"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `400px`,
          height: `40px`,
          padding: `0 16px`,
          borderRadius: `3px`,
          // boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `16px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
    {/* <ol>
      {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
        <li key={place_id}>
          {formatted_address}
          {" at "}
          ({location.lat()}, {location.lng()})
        </li>
      )}
    </ol> */}
  </div>
);

export default SearchBox;
