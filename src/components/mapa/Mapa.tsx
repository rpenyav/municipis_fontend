// components/Mapa.tsx
import React from "react";
import { Button, CircularProgress } from "@mui/material";
import MunicipioSVG from "./MunicipioSvg";
import useZoom from "../../hooks/useZoom";
import usePadding from "../../hooks/usePadding";
import useDrag from "../../hooks/useDrag";
import { useMunicipios } from "../../hooks/useMunicipios";

/**
 * Componente del mapa que muestra los municipios.
 * Utiliza varios hooks personalizados para manejar el zoom, el padding, el arrastre y los municipios.
 *
 * @returns El componente Mapa renderizado.
 */
const Mapa = () => {
  const [paddingLeft, paddingTop] = usePadding();
  const [zoom, setZoom] = useZoom();
  const { handleMouseDown, handleMouseUp, handleMouseMove, offset } = useDrag();

  const { municipios, status, error, reload } = useMunicipios();

  /**
   * Maneja el evento de rueda para actualizar el zoom.
   *
   * @param event El evento de la rueda del mouse.
   */
  const handleWheelZoom = (event: React.WheelEvent<SVGSVGElement>) => {
    // Evita el comportamiento predeterminado del evento (scroll de la página)
    event.preventDefault();

    // Ajusta el valor del zoom en función del desplazamiento de la rueda
    const delta = event.deltaY;
    const newZoom = zoom - delta * 0.09;

    // Aplica los nuevos valores de zoom
    setZoom(newZoom);
  };

  /**
   * Renderiza el contenido en función del estado de la solicitud de los municipios.
   *
   * @returns El contenido renderizado.
   */
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

  /**
   * Renderiza el mapa SVG.
   *
   * @returns El mapa SVG renderizado.
   */
  const renderMap = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center backplay-color">
          <svg
            id="svgCapa83346623"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            onWheel={handleWheelZoom}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={(event) => handleMouseMove(event)}
          >
            <g
              transform={`translate(${paddingLeft + offset.x}, ${
                paddingTop + offset.y
              }) scale(${zoom / 100})`}
              transform-origin="10% 20%"
            >
              {municipios.map((municipio) => (
                <MunicipioSVG
                  key={municipio.identificador}
                  identificador={municipio.identificador}
                  nom={municipio.nom}
                  escut={municipio.escut}
                  posicio_mapa={municipio.posicio_mapa}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );

  return <div>{renderContent()}</div>;
};

export default Mapa;
