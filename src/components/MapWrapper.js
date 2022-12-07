import { useEffect, useContext, useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'

import Map from './Map'
import { getStarWidth, AppContext } from "../utills"
import { searchActions, filterActions, googleMapsApiConfig } from "../constant"

function MapWrapper() {
    const [state, dispatch] = useContext(AppContext)
    const { mapMarkers } = state;

    return (
        <Wrapper {...googleMapsApiConfig}>
            <Map geoCodeList={mapMarkers} />
        </Wrapper> 
    )
}

export default MapWrapper