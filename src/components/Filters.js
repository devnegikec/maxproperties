import React, { useEffect, useContext, useMemo } from 'react'

import { getStarWidth, AppContext } from "../utills"
import { filterActions, searchActions } from '../constant';
import "../style/filterStyle.css";

function Filters() {
    const [state, dispatch] = useContext(AppContext)
    const {filters} = state;
    const {bedRoomMin, bedRoomMax, bathRoomMin, bathRoomMax, sleepMin, sleepMax} = filters;
    const handleFilter = () => {
        // updateFilter(state);
        // setShowFilter(false)
        dispatch({
            type: filterActions.SHOW_FILTER, payload: false
        })
    }
    const applyFilter = () => {
        // updateFilter(state)
        // clearFilter(false)
        dispatch({
            type: filterActions.APPLY_FILTER
        })
        dispatch({
            type: searchActions.UPDATE_MAP_MARKER
        })
    }
    const resetFilter = () => {
        dispatch({
            type: filterActions.REST_FILTER
        })
        dispatch({
            type: searchActions.RESET_MAP_MARKER
        })
    }
    const handleCheckBox = (checked, starType) => {
        const obj = {};
        obj[starType] = checked;
        dispatch({type: filterActions.UPDATE_REVIEW_FILTER, payload: obj})
    }
    return useMemo(() => {
        return (
            <div className='filter-container'>
                <div className='close-filter' onClick={handleFilter}>X</div>
                <div className='filters'>
                    <div>
                        <h3>Bedrooms</h3>
                        <div className='items'>
                            <div>{bedRoomMin}</div>
                            <div>Min bedRooms</div>
                            <div 
                                className={`control dec ${bedRoomMin ? '' : 'disabled'}`}
                                onClick={() => dispatch({type: filterActions.DECREMENT_BEDROOM_MIN})}
                            ></div>
                            <div
                                className={`control inc ${bedRoomMin < bedRoomMax ? '' : 'disabled'}`}
                                onClick={() => dispatch({type: filterActions.INCREMENT_BEDROOM_MIN})}
                            ></div>
                        </div>
                        <div className='items'>
                            <div>{bedRoomMax}</div>
                            <div>Max bedRooms</div>
                            <div
                                className={`control dec ${bedRoomMax > bedRoomMin ? '' : 'disabled'}`}
                                onClick={() => dispatch({type: filterActions.DECREMENT_BEDROOM_MAX})}
                            ></div>
                            <div
                                className={`control inc`}
                                onClick={() => dispatch({type: filterActions.INCREMENT_BEDROOM_MAX})}
                            ></div>
                        </div>
                    </div>
                    <div>
                        <h3>Bathrooms</h3>
                        <div className='items'>
                            <div>{bathRoomMin}</div>
                            <div>Min bathrooms</div>
                            <div
                                className={`control dec ${bathRoomMin ? '' : 'disabled'}`}
                                onClick={() => dispatch({type: filterActions.DECREMENT_BATHROOM_MIN})}
                            ></div>
                            <div
                                className={`control inc ${bathRoomMin < bathRoomMax ? '' : 'disabled'}`}
                                onClick={() => dispatch({type: filterActions.INCREMENT_BATHROOM_MIN})}
                            ></div>
                        </div>
                        <div className='items'>
                            <div>{bathRoomMax}</div>
                            <div>Max bathrooms</div>
                            <div
                                className={`control dec ${bathRoomMax > bathRoomMin ? '' : 'disabled'}`}
                                onClick={() => dispatch({type: filterActions.DECREMENT_BATHROOM_MAX})}></div>
                            <div className='control inc' onClick={() => dispatch({type: filterActions.INCREMENT_BATHROOM_MAX})}></div>
                        </div>
                    </div>
                    <div>
                        <h3>Sleeps</h3>
                        <div className='items'>
                            <div>{sleepMin}</div>
                            <div>Min sleeps</div>
                            <div
                                className={`control dec ${sleepMin ? '' : 'disabled'}`}
                                onClick={() => dispatch({type: filterActions.DECREMENT_SLEEP_MIN})}></div>
                            <div
                                className={`control inc ${sleepMin < sleepMax ? '' : 'disabled'}`}
                                onClick={() => dispatch({type: filterActions.INCREMENT_SLEEP_MIN})}></div>
                        </div>
                        <div className='items'>
                            <div>{sleepMax}</div>
                            <div>Max sleeps</div>
                            <div
                                className={`control dec ${sleepMax > sleepMin ? '' : 'disabled'}`}
                                onClick={() => dispatch({type: filterActions.DECREMENT_SLEEP_MAX})}></div>
                            <div className='control inc' onClick={() => dispatch({type: filterActions.INCREMENT_SLEEP_MAX})}></div>
                        </div>
                    </div>
                    <div>
                        <h3>Property reviews</h3>
                        <div className='property-review'>
                            <div>
                                <input type="checkbox" checked={filters.starFilter.fiveStar} onChange={(e) => handleCheckBox(e.target.checked, 'fiveStar')} />
                            </div>
                            <div className="stars-outer">
                                <div className="stars-inner" style={getStarWidth(5)}></div>
                            </div>
                            <div>5+ stars</div>
                        </div>
                        <div className='property-review'>
                            <div>
                                <input type="checkbox" checked={filters.starFilter.fourStar} onChange={(e) => handleCheckBox(e.target.checked, 'fourStar')}/>
                            </div>
                            <div className="stars-outer">
                                <div className="stars-inner" style={getStarWidth(4)}></div>
                            </div>
                            <div>4+ stars</div>
                        </div>
                        <div className='property-review'>
                            <div>
                                <input type="checkbox" checked={filters.starFilter.zeroStar} onChange={(e) => handleCheckBox(e.target.checked, 'zeroStar')} />
                            </div>
                            <div className="stars-outer">
                                <div className="stars-inner" style={getStarWidth(0)}></div>
                            </div>
                            <div>0+ stars</div>
                        </div>
                    </div>
                </div>
                <div className='filter-bottom'>
                    <button className="btn-rest" onClick={resetFilter}>Rest</button>
                    <button className="btn-apply" onClick={applyFilter}>Apply</button>
                </div>
            </div>
        );
    }, [filters]);
}

export default Filters