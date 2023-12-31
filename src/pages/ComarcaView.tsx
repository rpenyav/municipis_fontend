import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMunicipiosPorComarca } from "../hooks/useMunicipiosPorComarca";
import MunicipioSVG from "../components/mapa/MunicipioSvg";
import {
  AccordionSummary,
  Button,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { Accordion, Collapse } from "react-bootstrap";

import SearchPattern from "../components/buscador/SearchPattern";
import useDrag from "../hooks/useDrag";
import useSvgTransform from "../hooks/useSvgTransform";
import useNavigateAndResetComarca from "../hooks/useNavigateAndResetComarca";
import CollapseButton from "../components/CollapseButton";
import { getXandY } from "../helpers/segunProvincia";
import useNavigateAndResetProvincia from "../hooks/useNavigateAndResetProvincia";

const ComarcaView = () => {
  // Obtener el valor de selectedComarca del parámetro de la URL y convertirlo a número
  const { idcomarca, nom } = useParams<{ idcomarca: string; nom: string }>();
  const selectedComarca = parseInt(idcomarca!);
  const [selectedMunicipio, setSelectedMunicipio] = useState<string | null>(
    null
  );
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem("isCollapsed") === "true"
  );

  useEffect(() => {
    if (isCollapsed) {
      localStorage.setItem("isCollapsed", "true");
    } else {
      localStorage.removeItem("isCollapsed");
    }
  }, [isCollapsed]);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  //desde el selector de comarcas enviamos a redux el dato sobre el identificador y nombre elegidos
  // posteriormente los recogemos desde este hook para hacer el desvio a la url de comarcas
  const { selectedProvincia } = useNavigateAndResetProvincia();

  //desde el selector de comarcas enviamos a redux el dato sobre el identificador y nombre elegidos
  // posteriormente los recogemos desde este hook para hacer el desvio a la url de comarcas
  useNavigateAndResetComarca();

  const handlePathClick = (identificador: string) => {
    setSelectedMunicipio(identificador);
  };

  // Usar el hook useMunicipios para obtener los municipios de la comarca seleccionada
  const { municipios, status, error, reload } =
    useMunicipiosPorComarca(selectedComarca);

  const ref = useRef<SVGSVGElement>(null);
  const transform = useSvgTransform(ref, municipios, 10);

  return (
    <Layout>
      <div className="row">
        <div
          className={isCollapsed ? "col-lg-12 " : "col-lg-9 "}
          style={{ transition: "all 0.8s ease-out" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 700 800"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "75%", backgroundColor: "#c7e6f6" }}
          >
            <g
              ref={ref}
              transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}
            >
              {municipios &&
                municipios.map(
                  (municipio) =>
                    municipio &&
                    municipio.identificador && (
                      <MunicipioSVG
                        key={municipio.identificador}
                        isSelected={
                          selectedMunicipio === municipio.identificador
                        }
                        onPathClick={handlePathClick}
                        {...municipio}
                      />
                    )
                )}
            </g>

            <foreignObject x="-40" y="50" width="250" height="50">
              <div>
                <h4 className="h4-nom-comarca">{nom}</h4>
              </div>
            </foreignObject>
          </svg>
        </div>
        <div className="col-lg   border-left-collapsable">
          <CollapseButton
            isCollapsed={isCollapsed}
            handleCollapse={handleCollapse}
          />

          <div
            style={{
              transition: "opacity 0.3s ease-out",
              opacity: isCollapsed ? 0 : 1,
            }}
          >
            <SearchPattern />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ComarcaView;
