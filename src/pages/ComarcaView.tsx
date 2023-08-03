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
          style={{ transition: "all 0.3s ease-out" }}
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
          </svg>
        </div>
        <div className="col-lg ">
          <Button
            onClick={handleCollapse}
            style={{
              position: isCollapsed ? "absolute" : "static",
              top: "50px",
              right: "50px",
              padding: "0px",
              margin: "0px",
              width: "30px",
              height: "30px",
            }}
          >
            {isCollapsed ? (
              <i
                className="bi bi-arrow-left-circle-fill"
                style={{ color: "black", fontSize: "20px" }}
              ></i>
            ) : (
              <i
                className="bi bi-arrow-right-circle-fill"
                style={{ color: "black", fontSize: "20px" }}
              ></i>
            )}
          </Button>

          <Collapse in={!isCollapsed}>
            <SearchPattern />
          </Collapse>
        </div>
      </div>
    </Layout>
  );
};

export default ComarcaView;
