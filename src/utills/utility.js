export const getStarWidth = (rating) => {
    const starTotal = 5
    const starPercentage = (rating / starTotal) * 100
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`
    return {'width': starPercentageRounded}
  }

export const getFilteredResult = (searchResult, filters) => {

  const results = searchResult
                      .filter(result => {
                          // console.log('bedroom:-', result.bedrooms, filters.bedRoomMin, filters.bedRoomMax);
                          if (filters.bedRoomMin === 0 &&  filters.bedRoomMax == 0) {
                            return true;
                          }
                          if(filters.bedRoomMin <= result.bedrooms && result.bedrooms <= filters.bedRoomMax) {
                            return true;
                          }
                          return false;
                      })
                      .filter(item => {
                          if ( filters.sleepMin === 0 &&  filters.sleepMax === 0 ) {
                            return true;
                          }
                          if ( filters.sleepMin <= item.sleeps && item.sleeps <= filters.sleepMax ) {
                            return true;
                          }
                          return false;
                      })
                      .filter(item => {
                        if ( filters.bathRoomMin === 0 && filters.bathRoomMax === 0 ) {
                          return true;
                        }
                        if( filters.bathRoomMin <= item.bathrooms.full && item.bathrooms.full <= filters.bathRoomMax ) {
                          return true;
                        }
                        return false;
                      })
                      .filter(item => {
                        // console.log('item:-', item.averageRating, filters.starFilter)
                        if (!filters.starFilter.zeroStar && !filters.starFilter.fourStar && !filters.starFilter.fiveStar) {
                          return true;
                        }
                        if( filters.starFilter.zeroStar ) {
                          return true;
                        }
                        if( filters.starFilter.fourStar &&  (4 <= item.averageRating) ) {
                          // console.log('item:-', item.averageRating);
                          return true;
                        }
                        if( filters.starFilter.fiveStar &&  (5 <= item.averageRating) ) {
                          return true;
                        }
                        
                        return false;
                      })
    // console.log('results:-', results.length, results);
    return results;
}

export const getFilteredMarker = (markersData) => {
  const listingsGeoCode = []
               
  markersData.forEach(result => {
      listingsGeoCode.push({lat: result.geoCode.latitude, lng: result.geoCode.longitude, id: result.listingNumber})
  });
  return listingsGeoCode;
}