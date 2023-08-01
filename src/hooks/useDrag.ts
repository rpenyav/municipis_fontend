import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Hook personalizado para habilitar la funcionalidad de arrastre (drag) en el contenido de un SVG.
 * @returns Un objeto que contiene el desplazamiento actual ({x, y}), una función para actualizar el desplazamiento,
 * y funciones para manejar los eventos de inicio, fin y movimiento del arrastre.
 */
const useDrag = () => {
  /**
   * Estado para almacenar el desplazamiento actual ({x, y}) durante la operación de arrastre.
   */
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  /**
   * Ref para almacenar si se está actualmente arrastrando.
   */
  const isDraggingRef = useRef(false);

  /**
   * Ref para almacenar la última posición del mouse registrada.
   */
  const prevMousePosRef = useRef({ x: 0, y: 0 });

  /**
   * Manejador para el evento mousedown. Inicia el arrastre.
   */
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      event.preventDefault();
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: event.clientX, y: event.clientY };
    },
    []
  );

  /**
   * Manejador para el evento mouseup. Finaliza el arrastre.
   */
  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  /**
   * Manejador para el evento mousemove. Actualiza el desplazamiento en función del movimiento del ratón.
   */
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      if (!isDraggingRef.current) return;
      const deltaX = event.clientX - prevMousePosRef.current.x;
      const deltaY = event.clientY - prevMousePosRef.current.y;
      setOffset((prevOffset) => ({
        x: prevOffset.x + deltaX,
        y: prevOffset.y + deltaY,
      }));
      prevMousePosRef.current = { x: event.clientX, y: event.clientY };
    },
    []
  );

  /**
   * Hook de efecto para manejar los eventos touchstart, touchmove y touchend en el SVG,
   * permitiendo que el arrastre funcione en dispositivos táctiles.
   */
  useEffect(() => {
    const svgElement = document.getElementById("svgCapa83346623");

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        isDraggingRef.current = true;
        prevMousePosRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDraggingRef.current) return;
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        const deltaX = touch.clientX - prevMousePosRef.current.x;
        const deltaY = touch.clientY - prevMousePosRef.current.y;
        setOffset((prevOffset) => ({
          x: prevOffset.x + deltaX,
          y: prevOffset.y + deltaY,
        }));
        prevMousePosRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    if (svgElement) {
      svgElement.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      svgElement.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      svgElement.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (svgElement) {
        svgElement.removeEventListener("touchstart", handleTouchStart);
        svgElement.removeEventListener("touchmove", handleTouchMove);
        svgElement.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  /**
   * @returns un objeto que expone el estado del desplazamiento actual, la función para cambiarlo,
   * y los manejadores de eventos para el inicio, el movimiento y el final del arrastre.
   */
  return { offset, setOffset, handleMouseDown, handleMouseUp, handleMouseMove };
};

export default useDrag;
