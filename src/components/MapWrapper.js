import { useEffect, useContext, useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
// import { useLoadScript } from "@react-google-maps/api"

import Map from './Map'
import { getStarWidth, AppContext } from "../utills"
import { googleMapsApiConfig } from "../constant"

// function MapWrapper() {
//     const { isLoaded } = useLoadScript(googleMapsApiConfig)
//     return (isLoaded ? <div className="map"><Map /></div> : <div>Loading...</div>)
// }

function MapWrapper() {
    return (
        <div className="map">
            <Wrapper {...googleMapsApiConfig}>
                <Map />
            </Wrapper> 
        </div>
        
    )
}

export default MapWrapper