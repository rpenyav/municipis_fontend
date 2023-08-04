import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMunicipiosPorProvincia } from "../hooks/useMunicipiosPorProvincia";
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
import useNavigateAndResetProvincia from "../hooks/useNavigateAndResetProvincia";
import { Municipio } from "../models/municipio.interface";
import CollapseButton from "../components/CollapseButton";
import { getXandY } from "../helpers/segunProvincia";
import useNavigateAndResetComarca from "../hooks/useNavigateAndResetComarca";

const ProvinciaView = () => {
  // Obtener el valor de selectedProvincia del parámetro de la URL y convertirlo a número
  const { idprovincia, nom } = useParams<{
    idprovincia: string;
    nom: string;
  }>();
  const selectedProvincia = parseInt(idprovincia!);
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
  useNavigateAndResetProvincia();

  //desde el selector de comarcas enviamos a redux el dato sobre el identificador y nombre elegidos
  // posteriormente los recogemos desde este hook para hacer el desvio a la url de comarcas
  useNavigateAndResetComarca();

  const handlePathClick = (identificador: string) => {
    setSelectedMunicipio(identificador);
  };

  // Usar el hook useMunicipios para obtener los municipios de la comarca seleccionada
  const { municipios, status, error, reload } =
    useMunicipiosPorProvincia(selectedProvincia);

  const ref = useRef<SVGSVGElement>(null);
  const transform = useSvgTransform(
    ref,
    municipios,
    selectedProvincia === 1 ? 2.7 : 3.7 //el tamaño de Lleida (idprovincia 1) nos condiciona a regular la escala solo para esta provincia
  );

  // Definir inicialmente las coordenadas como un estado
  const [coordinates, setCoordinates] = useState({ xvalor: 0, yvalor: 0 });

  // Actualizar las coordenadas cada vez que selectedProvincia cambia
  useEffect(() => {
    const newCoordinates = getXandY(selectedProvincia);
    setCoordinates(newCoordinates);
  }, [selectedProvincia]);

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
                  (municipio: Municipio) =>
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
            <foreignObject
              x={coordinates.xvalor}
              y={coordinates.yvalor}
              width="250"
              height="50"
            >
              <div>
                <h3 className="h3-nom-provincia">{nom}</h3>
              </div>
            </foreignObject>
          </svg>
        </div>
        <div className="col-lg  border-left-collapsable ">
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

export default ProvinciaView;
