import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MunicipioSVG from "./MunicipioSvg";
import useZoom from "../../hooks/useZoom";
import usePadding from "../../hooks/usePadding";
import useDrag from "../../hooks/useDrag";
import { useMunicipios } from "../../hooks/useMunicipios";
import ResponsiveBox from "../ResponsiveBox";
import SearchPattern from "../buscador/SearchPattern";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { BrowserRouter, Route } from "react-router-dom";
import useNavigateAndResetComarca from "../../hooks/useNavigateAndResetComarca";
import { setSelectedComarca } from "../../features/buscador/searchComarcaSlice";
import { formatString } from "../../helpers/formatString";
import { Municipio } from "../../models/municipio.interface";
import useSvgTransform from "../../hooks/useSvgTransform";
import { useSelectedRegions } from "../../hooks/useSelectedRegions";
import ZoomButtons from "./ZoomButtons";
import { Collapse } from "@mui/material";

/**
 * MapaMunicipis es un componente que renderiza un mapa de municipios.
 * El mapa puede ser manipulado por el usuario a través del arrastre y el zoom.
 * También proporciona una interfaz de búsqueda avanzada para los municipios.
 */
const MapaMunicipis = () => {
  const { handleMouseDown, handleMouseUp, handleMouseMove, offset } = useDrag();
  const { municipios, status, error, reload } = useMunicipios();

  // Estado para el municipio seleccionado
  const [selectedMunicipio, setSelectedMunicipio] = useState<string | null>(
    null
  );

  //desde el selector de comarcas enviamos a redux el dato sobre el identificador y nombre elegidos
  // posteriormente los recogemos desde este hook para hacer el desvio a la url de comarcas
  useNavigateAndResetComarca();

  // Manejador para cuando se hace clic en un municipio
  const handlePathClick = (identificador: string) => {
    setSelectedMunicipio(identificador);
  };

  const ref = useRef<SVGSVGElement>(null);
  const transform = useSvgTransform(ref, municipios, 1.5);

  // Estado para el nivel de zoom actual
  const [zoom, setZoom] = useState<number | null>(1.5);

  // Manejadores para el zoom
  const handleZoomIn = () => {
    setZoom((prevZoom: number | null) =>
      prevZoom ? Math.min(prevZoom + 0.1, 5) : null
    );
  };

  const MIN_ZOOM = 1;

  const handleZoomOut = () => {
    setZoom((prevZoom: number | null) =>
      prevZoom && prevZoom > MIN_ZOOM ? prevZoom - 0.1 : prevZoom
    );
  };
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
  // Función para renderizar el contenido dependiendo del estado
  const renderContent = () => {
    switch (status) {
      case "loading":
        return <CircularProgress />;
      case "succeeded":
        return renderMap();
      case "failed":
        return (
          <div>
            <Button onClick={reload}>Reintentar</Button>
          </div>
        );
    }
  };

  const renderMap = () => (
    <div className="container-fluid">
      <div className="row">
        <div
          className={
            isCollapsed
              ? "col-lg-12 d-flex justify-content-center align-items-center backplay-color"
              : "col-lg-9 d-flex justify-content-center align-items-center backplay-color"
          }
          style={{ transition: "all 0.3s ease-out" }}
        >
          <svg
            id="svgCapa83346623"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 700 700"
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#c7e6f6",
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={(event) => handleMouseMove(event)}
          >
            <g
              ref={ref}
              transform={`translate(${transform.x + offset.x}, ${
                transform.y + offset.y
              }) scale(${zoom ?? 1.5})`}
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
            <ZoomButtons
              handleZoomIn={handleZoomIn}
              handleZoomOut={handleZoomOut}
              defaultZoom={1.5}
              minZoom={MIN_ZOOM}
            />
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
    </div>
  );

  return <div>{renderContent()}</div>;
};

export default MapaMunicipis;
