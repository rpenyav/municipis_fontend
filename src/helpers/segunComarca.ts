/**
 * Representa las coordenadas x e y.
 *
 * @typedef {Object} Coordinate
 * @property {number} xvalor - Coordenada en el eje X.
 * @property {number} yvalor - Coordenada en el eje Y.
 */
export interface Coordinate {
  xvalor: number;
  yvalor: number;
}

/**
 * Devuelve las coordenadas xvalor e yvalor en base al valor de selectedComarca.
 *
 * @param {number} selectedComarca - El número que representa la provincia seleccionada.
 * @returns {Coordinate} Un objeto con las propiedades x e y.
 */
export const getXandY = (selectedComarca: number): Coordinate => {
  console.log("selectedComarca", selectedComarca);

  switch (selectedComarca) {
    case 1:
      return { xvalor: 10, yvalor: 80 };
    case 2:
      return { xvalor: 15, yvalor: 50 };
    case 3:
      return { xvalor: 550, yvalor: 40 };
    case 4:
      return { xvalor: 30, yvalor: 400 };
    default:
      return { xvalor: 0, yvalor: 0 };
  }
};
