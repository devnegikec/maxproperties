import React, { useContext, useReducer, useState } from "react"

import "./App.css";
import { AppContext, appReducer, initialState } from "./utills"
import SearchContainer from "./components/SearchContainer"
import MapWrapper from "./components/MapWrapper"
import { googleMapsApiConfig } from "./constant";

function App() {
  const value = useReducer(appReducer, initialState)
  
  return (
    <AppContext.Provider value={value}>
      <div className='container'>
        <SearchContainer />
        <MapWrapper />
        {/* <Wrapper {...googleMapsApiConfig}>
            <Map/>
        </Wrapper> */}
      </div>
    </AppContext.Provider>
    
  );
}

export default App;

