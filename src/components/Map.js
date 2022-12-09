import { useState, useMemo, useCallback, useRef, useContext } from 'react'

import { getStarWidth, AppContext } from "../utills"
import { searchActions, filterActions, googleMapsApiConfig } from "../constant"
import {
    GoogleMap,
    Marker,
    InfoWindow,
    DrawingManager,
} from '@react-google-maps/api'

let mapDrawingManager;
let prevRectangle;
function Map() {
    const [state, dispatch] = useContext(AppContext);
    const [activeMarker, setActiveMarker] = useState(null);
    const { mapMarkers, mapDrawingMode } = state;

    const mapRef = useRef()
    const center = useMemo(() => {
        return (mapMarkers.length > 0 ? mapMarkers[0] :{lat: 48.85657, lng: 2.33021})
    }, [mapMarkers])

    
    
    const options = useMemo(() => ({
        disabledDefaultUI: false,
        clickableIcons: false,
    }), [])

    const onLoad = useCallback(map => (mapRef.current = map), [])

    const clearSelection = () => {
        console.log("clearSelection");
    }

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
        mapDrawingManager = drawingManager;
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
        dispatch({
            type: searchActions.SET_MAP_DRAWING_MODE, payload: 'drawing'
        })
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
        // console.log("in memo:-mapDrawingMode:-", mapDrawingMode)
        // console.log("mapDrawingManager:-", mapDrawingManager)
        // mapDrawingManager = drawingManager;
        if (mapDrawingManager && prevRectangle&& mapDrawingMode === 'clear') {
            mapDrawingManager.setDrawingMode(null);
            prevRectangle.setMap(null)
        }
        return (<GoogleMap
                        zoom={12}
                        center={center}
                        mapContainerClassName='map-container'
                        options={options}
                        onClick={() => setActiveMarker(null)}
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
                        <DrawingManager onLoad={onLoadDM}  onRectangleComplete={onRectangleComplete} />
                    </GoogleMap>
                )
    }, [mapMarkers, activeMarker, mapDrawingMode])
}

export default Map