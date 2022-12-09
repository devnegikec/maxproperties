import React, { useContext, useReducer, useState } from "react"
import { useLoadScript } from "@react-google-maps/api"

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
      </div>
    </AppContext.Provider>
    
  );
}

export default App;
