import { useEffect } from "react";

import { toast } from "react-toastify";
import { fetchMunicipios } from "../features/municipios/municipiosSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

/**
 * Hook personalizado para obtener y manejar el estado 'municipios'.
 *
 * @returns Un objeto que contiene los municipios, el estado de la operación fetch,
 *          cualquier error que pueda haber ocurrido durante la operación y una función reload para volver a obtener los municipios.
 */
export const useMunicipios = () => {
  const dispatch = useDispatch<AppDispatch>();
  const municipios = useSelector(
    (state: RootState) => state.municipios.municipios
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
    // if (status === "succeeded") {
    //   toast.success("Los datos se cargaron correctamente");
    // }
  }, [status, error]);

  return {
    municipios,
    status,
    error,
    reload: () => dispatch(fetchMunicipios()),
  };
};
