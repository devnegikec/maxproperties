import { useEffect, useContext, useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import { useLoadScript } from "@react-google-maps/api"

import Map from './Map'
import { getStarWidth, AppContext } from "../utills"
import { searchActions, filterActions, googleMapsApiConfig } from "../constant"

function MapWrapper() {
    return (
        <Wrapper {...googleMapsApiConfig}>
            <Map />
        </Wrapper> 
    )
}

export default MapWrapper