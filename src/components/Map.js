import { useState, useMemo, useCallback, useRef, useContext } from 'react'

import { getStarWidth, AppContext } from "../utills"
import { searchActions, filterActions } from "../constant"
import {
    GoogleMap,
    Marker,
    Circle,
    InfoWindow,
    DrawingManager,
    MarkerClusterer,
} from '@react-google-maps/api'

function Map() {
    const [state, dispatch] = useContext(AppContext);
    const [activeMarker, setActiveMarker] = useState(null);
    const { mapMarkers } = state;
    const mapRef = useRef()
    const center = useMemo(() => {
        return (mapMarkers.length > 0 ? mapMarkers[0] :{lat: 43, lng: -80})
    }, [mapMarkers])

    let prevRectangle;
    
    const options = useMemo(() => ({
        disabledDefaultUI: false,
        clickableIcons: false,
    }), [])

    const onLoad = useCallback(map => (mapRef.current = map), [])
    const handleMarkerMouseOver = (markerId) => {
        if(markerId === activeMarker) {
            return;
        }
        setActiveMarker(markerId)
    }

    const handleMarkerClick = (markerId) => {
        dispatch({
            type: searchActions.SCROLL_TO_VIEW,
            payload: markerId
        })
    }

    const renderMarkers = (markers) => {
        mapRef.current?.panTo(markers[0]);
        return markers.map((marker, index) => {
            const refKey = `marker_${marker.id}`;
            return <Marker
                position={marker}
                key={index}
                icon="./blue_icon.png"
                onMouseOver={() => handleMarkerMouseOver(marker.id)}
                >
                {marker.id ?  <InfoWindow key={refKey}>
                                <div key={refKey}>
                                    <b>{marker.lat}</b>
                                    <b>{marker.lng}</b>
                                </div>
                            </InfoWindow> : null}
            </Marker>
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
        mapMarkers.forEach(marker => {
            const isContains = rectangle.getBounds().contains(marker);
            if(isContains) {
                geoCodeInsideRectangle.push(marker.id);
            }
        });
        // console.log("geoCodeInsideRectangle:-", geoCodeInsideRectangle);
        if(geoCodeInsideRectangle.length > 0) {
            dispatch({
                type: searchActions.UPDATE_FILTER_RESULT_MAP_ACTION, payload: geoCodeInsideRectangle
            })
        } else {
            dispatch({
                type: searchActions.RESET_FILTER_RESULT_MAP_ACTION
            })
        }
    }

    return useMemo(() => {
        return (
            <div className='map'>
                    <GoogleMap
                        zoom={10}
                        center={center}
                        mapContainerClassName='map-container'
                        options={options}
                        onLoad={onLoad}
                    >
                        {mapMarkers.map((marker, index) => {
                            const refKey = `marker_${marker.id}`;
                            return <Marker
                                position={marker}
                                key={index}
                                icon="./blue_icon.png"
                                onMouseOver={() => handleMarkerMouseOver(marker.id)}
                                onClick={() => handleMarkerClick(marker.id)}
                                >
                                {marker.id === activeMarker ?  (<InfoWindow key={refKey}>
                                                    <div>
                                                        <b>{marker.title}</b>
                                                    </div>
                                                    
                                            </InfoWindow>) : null}
                            </Marker>
                        })}
                        <DrawingManager onLoad={onLoadDM} onRectangleComplete={onRectangleComplete} />
                    </GoogleMap>
            </div> 
        )
    }, [mapMarkers, activeMarker])
}

export default Map