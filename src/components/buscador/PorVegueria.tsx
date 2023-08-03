import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedVegueria } from "../../features/buscador/searchVegueriaSlice";

const PorVegueria = () => {
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(setSelectedVegueria(value)); // Dispatch action to update state
  };

  return (
    <div className="row">
      <div className="col mb-3">
        <label htmlFor="municipio" className="form-label">
          Ver municipios por Vegueria
        </label>
        <select
          className="form-select"
          id="porvegueria"
          defaultValue="Elige..."
          onChange={handleChange}
        >
          <option value="">Elige...</option>
          <option value="1">Lleida</option>
          <option value="2">Tarragona</option>
          <option value="3">Barcelona</option>
          <option value="4">Girona</option>
        </select>
      </div>
    </div>
  );
};

export default PorVegueria;
