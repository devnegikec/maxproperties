import { useEffect, useContext, useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
// import { useLoadScript } from "@react-google-maps/api"

import Map from './Map'
import { getStarWidth, AppContext } from "../utills"
import { googleMapsApiConfig } from "../constant"

// function MapWrapper() {
//     const { isLoaded } = useLoadScript(googleMapsApiConfig)
//     return (isLoaded ? <Map /> : <div>Loading...</div>)
// }

function MapWrapper() {
    return (
        <div class="map">
            <Wrapper {...googleMapsApiConfig}>
                <Map />
            </Wrapper> 
        </div>
        
    )
}

export default MapWrapper