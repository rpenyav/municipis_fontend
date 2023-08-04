import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProvincias,
  setSelectedProvincia,
} from "../../features/buscador/searchProvinciaSlice";
import { AppDispatch, RootState } from "../../store";
import { Provincia } from "../../models/municipio.interface";
import { useNavigate } from "react-router-dom";

/**
 * Componente que permite seleccionar una provincia y muestra los municipios de la provincia seleccionada.
 *
 * @component
 * @example
 * return (
 *   <PorProvincia />
 * )
 */

const PorProvincia: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Al inicializar, intentamos recuperar el valor desde localStorage
  const initialSelectedProvinciaId =
    Number(localStorage.getItem("selectedProvinciaId")) || null;

  // Inicializamos el estado con el valor recuperado
  const [selectedProvinciaId, setSelectedProvinciaId] = useState<number | null>(
    initialSelectedProvinciaId
  );

  const provincias = useSelector(
    (state: RootState) => state.searchProvincia.provincias
  );
  const error = useSelector((state: RootState) => state.searchProvincia.error);
  const status = useSelector(
    (state: RootState) => state.searchProvincia.status
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProvincias());
    }
  }, [status, dispatch]);

  const provinciaOption = (provincia: Provincia, index: any) => {
    return (
      <option key={index} value={provincia.idprovincia}>
        {provincia.nom}
      </option>
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const idprovincia = Number(event.target.value);
    if (isNaN(idprovincia) || idprovincia === 0) {
      dispatch(setSelectedProvincia({ idprovincia: 0, nom: "" }));
      navigate(`/`);
      localStorage.removeItem("selectedProvinciaId"); //Limpiamos el valor en localStorage si la selección es nula y redireccionamos al inicio
    } else {
      const selectedProvincia = provincias.find(
        (provincia) => provincia.idprovincia === idprovincia
      );
      if (selectedProvincia) {
        dispatch(
          setSelectedProvincia({
            idprovincia: idprovincia,
            nom: selectedProvincia.nom,
          })
        );
        setSelectedProvinciaId(idprovincia);
        localStorage.setItem("selectedProvinciaId", idprovincia.toString()); //Guardamos el valor en localStorage cuando la selección cambia
      }
    }
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
          value={selectedProvinciaId ?? ""}
          onChange={handleChange}
        >
          <option value="">Seleccione una provincia</option>
          {status === "succeeded"
            ? provincias?.map(provinciaOption)
            : "Cargando provincias..."}
        </select>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default PorProvincia;
