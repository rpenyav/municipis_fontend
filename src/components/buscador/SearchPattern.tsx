import React from "react";
import PorComarca from "./PorComarca";
import PorHabitantes from "./PorHabitantes";
import PorProvincia from "./PorProvincia";
import PorVegueria from "./PorVegueria";

const SearchPattern = () => {
  return (
    <div className="p-4">
      <div className="row">
        <div className="col mb-3">
          <label className="form-label" htmlFor="searchInput">
            Buscar y marcar Municipio en el mapa
          </label>
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              id="searchInput"
              placeholder="Escriba aquí..."
            />
            <button className="btn btn-outline-secondary" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>

      <PorProvincia key="provincia-component" />
      <PorComarca key="comarca-component" />
      <PorVegueria />
      <PorHabitantes />
    </div>
  );
};

export default SearchPattern;
