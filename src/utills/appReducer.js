import { searchActions, filterActions } from "../constant"
import { getFilteredResult, getFilteredMarker, updateFilterFromMap } from "../utills"
const filterInitialState = {
    bedRoomMin: 0,
    bedRoomMax: 0,
    bathRoomMax: 0,
    bathRoomMin: 0,
    sleepMax: 0,
    sleepMin: 0,
    starFilter: {
      fiveStar: false,
      fourStar: false,
      zeroStar: false
    }
  };
export const initialState = {
  searchResult: [],
  filterResult: [],
  showFilter: false,
  isFilterActive: false,
  isMapFilter: false,
  filters: filterInitialState,
  mapMarkers: [],
};

export const appReducer = (state, action) => {
  console.log("action:-", action, state.searchResult, state.filters);
  switch(action.type) {
    case searchActions.UPDATE_SEARCH_RESULT:
      return {...state, searchResult:  action.payload}
    case searchActions.SET_MAP_MARKER:
      return {...state, mapMarkers: action.payload}
    case searchActions.UPDATE_MAP_MARKER:
      return {...state, mapMarkers: [...getFilteredMarker(state.filterResult)]}
    case searchActions.RESET_MAP_MARKER:
      return {...state, mapMarkers: [...getFilteredMarker(state.searchResult)]}
    case searchActions.UPDATE_FILTER_RESULT_MAP_ACTION:
      return {...state, filterResult: [...updateFilterFromMap(action.payload, state.searchResult)], isMapFilter: true}
    case searchActions.RESET_FILTER_RESULT_MAP_ACTION:
      return {...state, filterResult: [], isMapFilter: false}
    case filterActions.UPDATE_FILTER_RESULT:
      return {...state, filterResult: action.payload}
    case filterActions.SHOW_FILTER:
      return {...state, showFilter: action.payload}
    case filterActions.INCREMENT_BEDROOM_MIN:
      return {...state, filters: {...state.filters, bedRoomMin: state.filters.bedRoomMin +1 }}
    case filterActions.DECREMENT_BEDROOM_MIN:
      if (state.filters.bedRoomMin) {
        return {...state, filters: {...state.filters, bedRoomMin: state.filters.bedRoomMin - 1 }}
      }
      return {...state}
    case filterActions.INCREMENT_BEDROOM_MAX:
      return {...state, filters: {...state.filters, bedRoomMax: state.filters.bedRoomMax +1 }}
    case filterActions.DECREMENT_BEDROOM_MAX:
      if (state.filters.bedRoomMax) {
        return {...state, filters: {...state.filters, bedRoomMax: state.filters.bedRoomMax - 1 }}
      }
      return {...state}
    case filterActions.INCREMENT_BATHROOM_MIN:
      return {...state, filters: {...state.filters, bathRoomMin: state.filters.bathRoomMin +1 }}
    case filterActions.DECREMENT_BATHROOM_MIN:
      if (state.filters.bathRoomMin) {
        return {...state, filters: {...state.filters, bathRoomMin: state.filters.bathRoomMin - 1 }}
      }
      return {...state}
    case filterActions.INCREMENT_BATHROOM_MAX:
      return {...state, filters: {...state.filters, bathRoomMax: state.filters.bathRoomMax +1 }}
    case filterActions.DECREMENT_BATHROOM_MAX:
      if (state.filters.bathRoomMax) {
        return {...state, filters: {...state.filters, bathRoomMax: state.filters.bathRoomMax - 1 }}
      }
      return {...state}
      case filterActions.INCREMENT_SLEEP_MIN:
        return {...state, filters: {...state.filters, sleepMin: state.filters.sleepMin +1 }}
      case filterActions.DECREMENT_SLEEP_MIN:
        if (state.filters.sleepMin) {
          return {...state, filters: {...state.filters, sleepMin: state.filters.sleepMin - 1 }}
        }
        return {...state}
      case filterActions.INCREMENT_SLEEP_MAX:
        return {...state, filters: {...state.filters, sleepMax: state.filters.sleepMax +1 }}
      case filterActions.DECREMENT_SLEEP_MAX:
        if (state.filters.sleepMax) {
          return {...state, filters: {...state.filters, sleepMax: state.filters.sleepMax - 1 }}
        }
        return {...state}
      case filterActions.UPDATE_REVIEW_FILTER:
        return {...state, filters: {...state.filters, starFilter: {...state.filters.starFilter, ...action.payload} }}
      case filterActions.APPLY_FILTER:
        return {
          ...state,
          filterResult: [...getFilteredResult(state.searchResult, state.filters)],
          isFilterActive: true
        }
      case filterActions.REST_FILTER:
        return {...state, filterResult: [], isFilterActive: false, filters: {...filterInitialState} }
    default:
      throw new Error("Unexpected action type")
  }
};