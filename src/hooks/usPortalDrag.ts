import { useState, useRef, useCallback } from "react";

const usePortalDrag = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setIsDragging(true);
    setOffset({ x: event.clientX, y: event.clientY });
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!isDragging) return;
      const deltaX = event.clientX - offset.x;
      const deltaY = event.clientY - offset.y;
      setOffset({ x: event.clientX, y: event.clientY });
      // Here, you can update the position of the portal using deltaX and deltaY.
      // For example, you can use CSS transform to update the position of the portal.
    },
    [isDragging, offset]
  );

  return { handleMouseDown, handleMouseUp, handleMouseMove };
};

export default usePortalDrag;
