import React from 'react';
import { withGoogleMap, GoogleMap } from "react-google-maps";
import { compose, withProps, lifecycle } from "recompose";

const Map = compose (
  withProps({
    containerElement: <div className="map-conatiner" />,
    mapElement: <div className="map-element" />,
    loadgingElement: <div className="map-loading-element" />,
  }),
  withGoogleMap,
  lifecycle({
    componentWillMount() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let positionParams = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.setState({
            lat: positionParams.lat,
            lng: positionParams.lng,
          })
          this.props.handleUpdates({ position: positionParams })
        });
      }
    },

    shouldComponentUpdate(nextProps, nextState) {
      let nextLat = nextProps.lat;
      let prevLat = this.props.lat;
      let nextLng = nextProps.lng;
      let prevLng = this.props.lng;

      if ( ((nextLat !== prevLat) && (nextLng !== prevLng)) ) {
        return true;
      }
      return false;
    },


    componentWillReceiveProps(nextProps) {
      if ((nextProps.lat !== this.props.lat) && (nextProps.lng !== this.props.lng) ) {
        console.log('CWRP', 'next:', nextProps.lat, 'prev:', this.props.lat);
        this.setState({
          center: {
            lat: nextProps.lat,
            lng: nextProps.lng
          },
        })
      }
    },

  }),
)(props => {
  let geocoder = new window.google.maps.Geocoder();
  if (geocoder && (props.center && props.center.lat && props.center.lng)) {
    geocoder.geocode({'location': { lat: props.center.lat, lng: props.center.lng} }, (results, status) => {
      status === 'OK'
      ? props.handleUpdates({ address: results[0].formatted_address })
      : console.log(results, status)
    })
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
        draggable: false,
      }}
      defaultMapTypeId='satellite'
    />
  )
})


export default Map;
