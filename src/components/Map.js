import { useState, useMemo, useCallback, useRef, useContext } from 'react'

import { getStarWidth, AppContext } from "../utills"
import { searchActions, filterActions } from "../constant"
import {
    GoogleMap,
    Marker,
    Circle,
    DrawingManager,
    MarkerClusterer,
} from '@react-google-maps/api'

function Map({ geoCodeList, dispatch }) {
    const mapRef = useRef()
    const center = useMemo(() => {
        console.log('geoCodeList:-', geoCodeList);
        return (geoCodeList.length > 0 ? geoCodeList[0] :{lat: 43, lng: -80})
    }, [geoCodeList])
    let prevRectangle;
    
    const options = useMemo(() => ({
        disabledDefaultUI: true,
        clickableIcons: false,
    }), [])

    const onLoad = useCallback(map => (mapRef.current = map), [])

    const renderMarkers = (markers) => {
        mapRef.current?.panTo(markers[0]);
        return markers.map((marker, index) => {
            return <Marker position={marker} key={index} icon="./blue_icon.png" />
        })
    }
    const onLoadDM = drawingManager => {
        console.log(drawingManager)
    }

    const onRectangleComplete = rectangle => {
        // rectangle.setMap(null);
        if(prevRectangle) {
            prevRectangle.setMap(null);
        }
        prevRectangle = rectangle;
    
        console.log(rectangle)
        const geoCodeInsideRectangle = [];
        geoCodeList.forEach(marker => {
            const isContains = rectangle.getBounds().contains(marker);
            if(isContains) {
                geoCodeInsideRectangle.push(marker.id);
            }
        });
        // console.log("geoCodeInsideRectangle:-", geoCodeInsideRectangle);
        if(geoCodeInsideRectangle.length > 0) {
            // setMapFilterMarker(geoCodeInsideRectangle);
            console.log("geoCodeInsideRectangle:-", geoCodeInsideRectangle);
            dispatch({
                type: searchActions.UPDATE_FILTER_RESULT_MAP_ACTION, payload: geoCodeInsideRectangle
            })
        } else {
            dispatch({
                type: searchActions.RESET_FILTER_RESULT_MAP_ACTION
            })
        }
    }

    return (
            <div className='map'>
                    <GoogleMap
                        zoom={10}
                        center={center}
                        mapContainerClassName='map-container'
                        options={options}
                        onLoad={onLoad}
                    >
                        { geoCodeList.length > 0 ? renderMarkers(geoCodeList) : null} 
                        <DrawingManager onLoad={onLoadDM} onRectangleComplete={onRectangleComplete} />
                    </GoogleMap>
            </div> 
    )
}

export default Map