import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComarcas,
  setSelectedComarca,
} from "../../features/buscador/searchComarcaSlice";
import { AppDispatch, RootState } from "../../store";
import { Comarca } from "../../models/municipio.interface";
import { useNavigate } from "react-router-dom";

/**
 * Componente que permite seleccionar una comarca y muestra los municipios de la comarca seleccionada.
 *
 * @component
 * @example
 * return (
 *   <PorComarca />
 * )
 */

const PorComarca: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Al inicializar, intentamos recuperar el valor desde localStorage
  const initialSelectedComarcaId =
    Number(localStorage.getItem("selectedComarcaId")) || null;

  // Inicializamos el estado con el valor recuperado
  const [selectedComarcaId, setSelectedComarcaId] = useState<number | null>(
    initialSelectedComarcaId
  );

  const comarcas = useSelector(
    (state: RootState) => state.searchComarca.comarcas
  );
  const error = useSelector((state: RootState) => state.searchComarca.error);
  const status = useSelector((state: RootState) => state.searchComarca.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchComarcas());
    }
  }, [status, dispatch]);

  const comarcaOption = (comarca: Comarca, index: any) => {
    return (
      <option key={index} value={comarca.idcomarca}>
        {comarca.nom}
      </option>
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const idcomarca = Number(event.target.value);
    if (isNaN(idcomarca) || idcomarca === 0) {
      dispatch(setSelectedComarca({ idcomarca: 0, nom: "", idprovincia: 0 }));
      navigate(`/`);
      localStorage.removeItem("selectedComarcaId"); //Limpiamos el valor en localStorage si la selección es nula y redireccionamos al inicio
    } else {
      const selectedComarca = comarcas.find(
        (comarca) => comarca.idcomarca === idcomarca
      );
      if (selectedComarca) {
        dispatch(
          setSelectedComarca({
            idcomarca: idcomarca,
            nom: selectedComarca.nom,
            idprovincia: selectedComarca.idprovincia,
          })
        );
        setSelectedComarcaId(idcomarca);
        localStorage.setItem("selectedComarcaId", idcomarca.toString()); //Guardamos el valor en localStorage cuando la selección cambia
      }
    }
  };

  return (
    <div className="row">
      <div className="col mb-3">
        <label htmlFor="municipio" className="form-label">
          Ver municipios por Comarca
        </label>
        <select
          className="form-select"
          id="porcomarca"
          value={selectedComarcaId ?? ""}
          onChange={handleChange}
        >
          <option value="">Seleccione una comarca</option>
          {status === "succeeded"
            ? comarcas?.map(comarcaOption)
            : "Cargando comarcas..."}
        </select>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default PorComarca;
