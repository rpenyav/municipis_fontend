import React, { useState, useMemo } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

/**
 * Define las propiedades que se espera recibir por el componente MunicipioSVG.
 */
interface Props {
  /**
   * El identificador único para el elemento del camino SVG.
   */
  identificador: string;

  /**
   * El nombre del municipio que se mostrará en el tooltip.
   */
  nom: string;

  /**
   * La ruta del camino SVG que define la forma del municipio.
   */
  posicio_mapa: string;

  /**
   * La imagen del escudo del municipio.
   */
  escut: string;
}

/**
 * MunicipioSVG es un componente que crea un camino (path) SVG con un identificador y una ruta definidos.
 * @param {Props} props - Las propiedades que se pasan al componente.
 * @returns El componente de camino SVG.
 */
const MunicipioSVG: React.FC<Props> = ({
  identificador,
  posicio_mapa,
  nom,
  escut,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const fillColor = isHovered ? "green" : "red";

  // Utilizamos useMemo para memoizar el componente Tooltip
  const tooltip = useMemo(
    () => (
      <Tooltip id={`tooltip-${identificador}`}>
        <div>{nom}</div>
      </Tooltip>
    ),
    [identificador, nom]
  );

  return (
    <OverlayTrigger placement="top" overlay={tooltip} trigger="hover">
      <path
        id={identificador}
        d={posicio_mapa}
        fill={fillColor}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </OverlayTrigger>
  );
};

export default MunicipioSVG;
