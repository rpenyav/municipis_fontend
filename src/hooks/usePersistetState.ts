import { useState, useEffect } from "react";

/**
 * Hook personalizado para administrar un estado persistente con localStorage.
 *
 * @template T - El tipo de los valores de estado.
 * @param {string} key - La clave bajo la cual se almacenarán los valores de estado en localStorage.
 * @param {T} defaultValue - El valor por defecto del estado en caso de que no haya nada en localStorage.
 * @returns {readonly [T, React.Dispatch<React.SetStateAction<T>>]} - Una tupla con el valor actual del estado y una función para actualizar el estado.
 */

const usePersistentState = <T>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};

export default usePersistentState;
