import { combineReducers } from "@reduxjs/toolkit";
import municipiosReducer from "../features/municipios/municipiosSlice";

const rootReducer = combineReducers({
  municipios: municipiosReducer,
});

export default rootReducer;
