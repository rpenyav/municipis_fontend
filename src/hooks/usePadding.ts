import { useState, useEffect } from "react";

/**
 * Hook personalizado para ajustar los valores de relleno (padding) en función del ancho de la pantalla.
 * @returns Un array con los valores de paddingLeft y paddingTop.
 */
const usePadding = (): [number, number] => {
  /**
   * Estado para almacenar el valor del relleno izquierdo (paddingLeft).
   */
  const [paddingLeft, setPaddingLeft] = useState(500);

  /**
   * Estado para almacenar el valor del relleno superior (paddingTop).
   */
  const [paddingTop, setPaddingTop] = useState(190);

  /**
   * Función para actualizar los valores de relleno en función del ancho de la pantalla.
   * Se establecen distintos valores de relleno para distintos rangos de ancho de pantalla.
   */
  const updatePaddingBasedOnScreenWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 350) {
      setPaddingLeft(-10);
      setPaddingTop(-20);
    } else if (screenWidth <= 771) {
      setPaddingLeft(80);
      setPaddingTop(50);
    } else if (screenWidth <= 1161) {
      setPaddingLeft(210);
      setPaddingTop(150);
    } else {
      setPaddingLeft(400);
      setPaddingTop(180);
    }
  };

  /**
   * Hook de efecto para actualizar los valores de relleno cuando se monta el componente,
   * y para establecer un evento de escucha que actualiza los valores de relleno cuando cambia el tamaño de la ventana.
   */
  useEffect(() => {
    updatePaddingBasedOnScreenWidth();
    window.addEventListener("resize", updatePaddingBasedOnScreenWidth);
    return () => {
      window.removeEventListener("resize", updatePaddingBasedOnScreenWidth);
    };
  }, []);

  /**
   * @returns un array con los valores de paddingLeft y paddingTop.
   */
  return [paddingLeft, paddingTop];
};

export default usePadding;
