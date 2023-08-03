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
      x="10"
      y="10"
      width="50"
      height="120"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "8px",
      }}
    >
      <button onClick={zoomIn} style={{ height: "50px", fontSize: "2em" }}>
        +
      </button>
      <button
        onClick={zoomOut}
        disabled={zoom === minZoom}
        style={{ height: "50px", fontSize: "2em" }}
      >
        -
      </button>
    </foreignObject>
  );
};

export default ZoomButtons;
