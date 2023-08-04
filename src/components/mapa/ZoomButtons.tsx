import React, { useState } from "react";
import useZoom from "../../hooks/useZoom";

const ZoomButtons = ({
  handleZoomIn,
  handleZoomOut,
  minZoom,
  defaultZoom,
}: {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  minZoom: number;
  defaultZoom: number;
}) => {
  const { zoom, zoomIn, zoomOut } = useZoom({
    defaultZoom,
    onZoomIn: handleZoomIn,
    onZoomOut: handleZoomOut,
  });

  return (
    <foreignObject
      x="15"
      y="15"
      width="40"
      height="100"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button className="zoom-buttons" onClick={zoomIn}>
        <i className="bi bi-plus"></i>
      </button>
      <button
        className="zoom-buttons"
        onClick={zoomOut}
        disabled={zoom === minZoom}
      >
        <i className="bi bi-dash"></i>
      </button>
    </foreignObject>
  );
};

export default ZoomButtons;
