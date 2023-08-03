import { useState } from "react";

// Definir el tipo para las propiedades de entrada del hook
interface UseZoomProps {
  defaultZoom: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

const useZoom = ({ defaultZoom, onZoomIn, onZoomOut }: UseZoomProps) => {
  const [zoom, setZoom] = useState<number>(defaultZoom);

  const zoomIn = () => {
    if (onZoomIn) {
      onZoomIn();
    }
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 5));
  };

  const zoomOut = () => {
    if (onZoomOut) {
      onZoomOut();
    }
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };

  return { zoom, zoomIn, zoomOut };
};

export default useZoom;
