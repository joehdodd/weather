import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from "react-google-maps";

const Map = withGoogleMap((props) => {
  return props.center ? (
    <GoogleMap
      defaultZoom={12}
      // defaultCenter={{
      //   lat: 40,
      //   lng: -74
      // }}
      center={{...props.center}}
      defaultOptions={{
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false,
        dragControl: false,
      }}
      disableDefaultUI
      >
      </GoogleMap>

  ) : null
})

class HOCMap extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.lat && nextProps.lng) {
      this.setState({
        center: {
          lat: nextProps.lat,
          lng: nextProps.lng
        },
      })
    }
  }
  render() {
    return (
      <div>
        <Map {...this.state} {...this.props}/>
      </div>
    );
  }

}

export default HOCMap;
