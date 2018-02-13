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
          const address = places[0].formatted_address;
          let lat = places[0].geometry.location.lat();
          let lng = places[0].geometry.location.lng();
          const latLng = {
            lat: lat,
            lng: lng,
          }
          this.props.handleUpdates({position: latLng, address: address});
          this.setState({
            places,
          });
        },
      })
    },
  }),
)(props =>
  <div>
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="New York, NY"
        className="search"
        style={{
          boxSizing: `border-box`,
          borderTop: `none`,
          borderRight: `1px solid #c4c4c4`,
          borderBottom: `1px solid #c4c4c4`,
          borderLeft: `none`,
          width: `50%`,
          height: `40px`,
          padding: `0 16px`,
          backgroundColor: `#f2f2f2`,
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
