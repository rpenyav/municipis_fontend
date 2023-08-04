// hooks/useNavigateAndResetProvincia.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedProvincia } from "../features/buscador/searchProvinciaSlice";
import { formatString } from "../helpers/formatString";
import { useSelectedRegions } from "./useSelectedRegions";

const useNavigateAndResetProvincia = () => {
  const { selectedProvincia, selectedNomProvincia } = useSelectedRegions() as {
    selectedProvincia: number | null;
    selectedNomProvincia: string;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedProvincia !== 0 && selectedProvincia !== null) {
      let formattedNomProvincia = formatString(selectedNomProvincia);
      console.log("selectedProvincia", selectedProvincia);
      navigate(`/provincia/${selectedProvincia}/${formattedNomProvincia}`);
      dispatch(setSelectedProvincia({ idprovincia: 0, nom: "" }));
    }
  }, [selectedProvincia, navigate, dispatch, selectedNomProvincia]);

  return { selectedProvincia };
};

export default useNavigateAndResetProvincia;
