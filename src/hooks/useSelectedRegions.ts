import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useSelectedRegions = () => {
  /** recuperamos la provincia desde el buscador por provincia */
  const selectedProvincia = useSelector(
    (state: RootState) => state.searchProvincia.selectedProvincia
  );

  const selectedNomProvincia = useSelector(
    (state: RootState) => state.searchProvincia.selectedNomProvincia
  );

  /** recuperamos la comarca desde el buscador por comarca */
  const selectedComarca = useSelector(
    (state: RootState) => state.searchComarca.selectedComarca
  );

  const selectedNomComarca = useSelector(
    (state: RootState) => state.searchComarca.selectedNomComarca
  );

  const selectedIdProvinciaComarca = useSelector(
    (state: RootState) => state.searchComarca.selectedIdProvComarca
  );

  /** recuperamos la vegueria desde el buscador por vegueria */
  const selectedVegueria = useSelector(
    (state: RootState) => state.searchVegueria.selectedVegueria
  );

  return {
    selectedProvincia,
    selectedNomProvincia,
    selectedComarca,
    selectedNomComarca,
    selectedVegueria,
    selectedIdProvinciaComarca,
  };
};
