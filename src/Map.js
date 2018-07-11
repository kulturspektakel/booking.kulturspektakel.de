// @flow

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import config from './config';
import {compose, withProps} from 'recompose';
import React, {Fragment, Component} from 'react';
import './Map.css';

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
      config.googleAPIKey
    }`,
    loadingElement: <div className="Map loading" />,
    containerElement: <div className="Map" />,
    mapElement: <div style={{height: `100%`}} />,
  }),
  withScriptjs,
  withGoogleMap,
)(() => (
  <GoogleMap defaultZoom={8} defaultCenter={{lat: -34.397, lng: 150.644}} />
));
