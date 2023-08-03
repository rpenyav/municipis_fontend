import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedProvince } from "../../features/buscador/searchProvinciaSlice";

const PorProvincia = () => {
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(setSelectedProvince(value)); // Dispatch action to update state
  };

  return (
    <div className="row">
      <div className="col mb-3">
        <label htmlFor="municipio" className="form-label">
          Ver municipios por Provincia
        </label>
        <select
          className="form-select"
          id="porprovincia"
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

export default PorProvincia;
