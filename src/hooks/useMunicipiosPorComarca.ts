import { useEffect } from "react";
import { fetchMunicipios } from "../features/municipios/municipiosSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { Municipio } from "../models/municipio.interface";
import { toast } from "react-toastify";

/**
 * Hook personalizado para obtener y manejar el estado 'municipios'.
 *
 * @param selectedComarca El idcomarca seleccionado para filtrar los municipios.
 * @returns Un objeto que contiene los municipios filtrados por el idcomarca,
 *          el estado de la operación fetch, cualquier error que pueda haber ocurrido durante la operación y una función reload para volver a obtener los municipios.
 */
export const useMunicipiosPorComarca = (selectedComarca: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const municipios = useSelector<RootState, Municipio[]>((state) =>
    state.municipios.municipios.filter(
      (municipio) => municipio.idcomarca === selectedComarca
    )
  );
  const status = useSelector((state: RootState) => state.municipios.status);
  const error = useSelector((state: RootState) => state.municipios.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMunicipios());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(`Error: ${error}`);
    }
  }, [status, error]);

  // Console.log para ver los registros filtrados
  useEffect(() => {
    console.log("Municipios filtrados por comarca:", municipios);
  }, [municipios]);

  return {
    municipios,
    status,
    error,
    reload: () => dispatch(fetchMunicipios()),
  };
};
