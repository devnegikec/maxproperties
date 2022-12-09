import React from 'react'
import {
    GoogleMap,
    Marker,
    InfoWindow,
    DrawingManager,
} from '@react-google-maps/api'

const NewMap = () => {
  return <GoogleMap zoom={10} center={{lat:44, lng: -80}} mapContainerClassName="map"></GoogleMap>
}

export default NewMap;