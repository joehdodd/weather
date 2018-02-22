import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { compose, withProps, lifecycle } from 'recompose';

const Map = compose(
  withProps({
    containerElement: <div className="map-conatiner" />,
    mapElement: <div className="map-element" />,
    loadingElement: <div className="map-loading-element" />
  }),
  withGoogleMap,
  lifecycle({
    componentWillMount() {
      const { fetchWeather } = this.props.actions;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          let positionParams = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.setState({
            lat: positionParams.lat,
            lng: positionParams.lng
          });
          fetchWeather(positionParams);
        });
      }
    },

    shouldComponentUpdate(nextProps, nextState) {
      let nextLat = nextProps.lat;
      let prevLat = this.props.lat;
      let nextLng = nextProps.lng;
      let prevLng = this.props.lng;

      if (nextLat !== prevLat && nextLng !== prevLng) {
        return true;
      }
      return false;
    },

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.lat !== this.props.lat &&
        nextProps.lng !== this.props.lng
      ) {
        console.log('CWRP', 'nextProps:', nextProps, 'nextLat:', nextProps.lat, 'prevLat:', this.props.lat);
        this.setState({
          center: {
            lat: nextProps.lat,
            lng: nextProps.lng
          }
        });
      }
    }
  })
)(props => {
  let geocoder = new window.google.maps.Geocoder();
  const { setAddress } = props.actions;
  if (geocoder && (props.center && props.center.lat && props.center.lng)) {
    geocoder.geocode(
      { location: { lat: props.center.lat, lng: props.center.lng } },
      (results, status) => {
        console.log(results);
        if (status === 'OK') {
          let address = '';
          results.length >= 4
          ? address = results[3].formatted_address
          : address = results[0].formatted_address
          setAddress(address)
        } else {
          console.log(results, status);
        }
      }
    );
  }
  return (
    <GoogleMap
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      {...props}
      defaultZoom={12}
      disableDefaultUI
      defaultOptions={{
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false,
        dragControl: false,
        draggable: false
      }}
      defaultMapTypeId="satellite"
    />
  );
});

export default Map;
