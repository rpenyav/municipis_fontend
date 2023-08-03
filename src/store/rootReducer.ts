import { combineReducers } from "@reduxjs/toolkit";
import municipiosReducer from "../features/municipios/municipiosSlice";
import searchProvinciaReducer from "../features/buscador/searchProvinciaSlice";
import searchComarcaReducer from "../features/buscador/searchComarcaSlice";
import searchVegueriaReducer from "../features/buscador/searchVegueriaSlice";
import searchHabitantesReducer from "../features/buscador/searchHabitantesSlice";

const rootReducer = combineReducers({
  municipios: municipiosReducer,
  searchProvincia: searchProvinciaReducer,
  searchComarca: searchComarcaReducer,
  searchVegueria: searchVegueriaReducer,
  searchHabitantes: searchHabitantesReducer,
});

export default rootReducer;
