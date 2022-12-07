import React, { useEffect, useContext, useMemo } from 'react'
import axios from 'axios'

import Filters from './Filters'
import Pagination from './Pagination'
import { getStarWidth, AppContext } from "../utills"
import { searchActions, filterActions } from "../constant"
import "../style/SearchContainer.css";

function SearchContainer() {
    const [state, dispatch] = useContext(AppContext);
    const {searchResult, filterResult, showFilter, isFilterActive, isMapFilter} = state;
    const results = (isFilterActive || isMapFilter) ? filterResult : searchResult;
    const handleFilter = () => {
        dispatch({
            type: filterActions.SHOW_FILTER, payload: true
        })
    }

    useEffect(() => {
        axios
            .get('./data.json')
            .then(res => {
                const listingsGeoCode = []
               
                res.data.data.results.listings.forEach(result => {
                    listingsGeoCode.push({lat: result.geoCode.latitude, lng: result.geoCode.longitude, id: result.listingNumber})
                });
                dispatch({
                    type: searchActions.UPDATE_SEARCH_RESULT, payload: res.data.data.results.listings
                })
                dispatch({
                    type: filterActions.UPDATE_FILTER_RESULT, payload: res.data.data.results.listings
                })
                dispatch({
                    type: searchActions.SET_MAP_MARKER, payload: listingsGeoCode
                })
          })
      }, [])
      
      return (
        <div className='left-container'>
            <div className='search-container'>
            <div className='search-header'>
                <div className='search-bar'>
                    <div className='search-input'>
                        <input type="search" placeholder='Search by property ID or Title' />
                    </div>
                    
                    <button className='filter-btn' onClick={handleFilter}>Filters</button>
                </div>
                <div className='search-categories'>
                    <div>Comp set(49)</div>
                    <div>Other properties(11)</div>
                    <div>Hotels(19)</div>
                </div>
            </div>
            <div className='search-body'>
                <div className='search-select-all'>
                    <input type="checkbox" id="" name=""/>
                    <div>Select all properties</div>
                </div>
                {
                    results.map(result => {
                        return (<div className='properties-list' key={result.listingId}>
                            <input type="checkbox" id="" name=""/>
                            <img src={result.images[0]?.c6_uri}></img>
                            <div className='properties-details'>
                                <span className='properties-match'>76% Match</span>
                                <div className='title'>{result.propertyMetadata.headline}</div>
                                <div><span>{result.bedrooms}</span>-<span>{result.propertyType}</span>-<span>Sleeps {result.sleeps}</span></div>
                                <div className='properties-details-footer'>
                                    <div className='starts-n-rating'>
                                        <div className="stars-outer">
                                            <div className="stars-inner" style={getStarWidth(result.averageRating)}></div>
                                        </div>
                                        <span>({result.reviewCount})</span>
                                    </div>
                                    <button>Remove</button>
                                </div>
                            </div>
                        </div>)
                    })
                }
            </div>
            <div className='search-footer'>
                <Pagination totalCount={results.length} />
            </div>
        </div>
        { showFilter ? <Filters /> : null}
    </div>
    );
}

export default SearchContainer