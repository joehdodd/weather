import React from 'react';
import { withScriptjs, withGoogleMap,GoogleMap } from "react-google-maps";

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{
      lat: 40.7049579,
      lng: -74.0109394,
    }}
    {...props}
    defaultOptions={{
      // these following 7 options turn certain controls off see link below
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false
    }}
    disableDefaultUI
  >
    {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}
  </GoogleMap>
))

export default Map
