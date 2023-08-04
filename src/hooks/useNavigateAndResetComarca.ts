// hooks/useNavigateAndResetComarca.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedComarca } from "../features/buscador/searchComarcaSlice";
import { formatString } from "../helpers/formatString";
import { useSelectedRegions } from "./useSelectedRegions";

const useNavigateAndResetComarca = () => {
  const { selectedComarca, selectedNomComarca } = useSelectedRegions() as {
    selectedComarca: number | null;
    selectedNomComarca: string;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedComarca !== 0 && selectedComarca !== null) {
      let formattedNomComarca = formatString(selectedNomComarca);
      console.log("selectedComarca", selectedComarca);
      navigate(`/comarca/${selectedComarca}/${formattedNomComarca}`);
      dispatch(setSelectedComarca({ idcomarca: 0, nom: "", idprovincia: 0 }));
    }
  }, [selectedComarca, navigate, dispatch, selectedNomComarca]);
};

export default useNavigateAndResetComarca;
