import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from "react-google-maps";

const Map = withGoogleMap((props) => {
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
    />
  )
})

class HOMap extends Component {

  componentWillMount() {
    this.setState({
      center: {
        lat: this.props.lat,
        lng: this.props.lng,
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.lat !== this.props.lat) && (nextProps.lng !== this.props.lng) ) {
      console.log('CWRP');
      this.setState({
        center: {
          lat: nextProps.lat,
          lng: nextProps.lng
        },
      })
    }
  }

  render() {
    const { center } = this.state;
    const { handleUpdates } = this.props;
    return (
      <div>
        <Map
          center={center}
          handleUpdates={handleUpdates}
          containerElement={
            <div style={{
                margin: `0`,
                height: `100%`,
                width: `100%`,
                zIndex: `-1000`,
                position: `fixed`,
                filter: `grayscale(30%)`,
                opacity: `0.65`
              }}
            />
          }
          mapElement={<div style={{ height: `100%`, width: `100%` }} />}
          loadgingElement={<div style={{ height: `100%`, width: `100%`}} />}
          defaultMapTypeId='satellite'
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
          disableDefaultUI
        />
      </div>
    );
  }

}

export default HOMap;
