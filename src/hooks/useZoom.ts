// /hooks/useZoom.ts
import { useState, useEffect } from "react";

/**
 * Hook para actualizar el zoom en función del ancho de pantalla.
 * @returns Un array con el nivel de zoom actual, una función para actualizar el zoom, y un booleano para indicar si el zoom está habilitado.
 */
const useZoom = (): [number, (zoom: number) => void, boolean] => {
  const [zoom, setZoom] = useState(192);
  const [zoomEnabled, setZoomEnabled] = useState(true);

  const toggleZoom = () => {
    setZoomEnabled(!zoomEnabled);
  };

  const updateZoomBasedOnScreenWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 350) {
      setZoom(80);
    } else if (screenWidth <= 769) {
      setZoom(150);
    } else {
      setZoom(192);
    }
  };

  useEffect(() => {
    updateZoomBasedOnScreenWidth();
    window.addEventListener("resize", updateZoomBasedOnScreenWidth);
    return () => {
      window.removeEventListener("resize", updateZoomBasedOnScreenWidth);
    };
  }, []);

  return [zoom, setZoom, zoomEnabled];
};

export default useZoom;
