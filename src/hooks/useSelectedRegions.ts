import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useSelectedRegions = () => {
  /** recuperamos la provincia desde el buscador por provincia */
  const selectedProvince = useSelector(
    (state: RootState) => state.searchProvincia.selectedProvince
  );

  /** recuperamos la comarca desde el buscador por comarca */
  const selectedComarca = useSelector(
    (state: RootState) => state.searchComarca.selectedComarca
  );

  const selectedNomComarca = useSelector(
    (state: RootState) => state.searchComarca.selectedNomComarca
  );

  /** recuperamos la vegueria desde el buscador por vegueria */
  const selectedVegueria = useSelector(
    (state: RootState) => state.searchVegueria.selectedVegueria
  );

  return {
    selectedProvince,
    selectedComarca,
    selectedNomComarca,
    selectedVegueria,
  };
};
