import React, { FC } from "react";
import { Button } from "react-bootstrap";

interface CollapseButtonProps {
  isCollapsed: boolean;
  handleCollapse: () => void;
}

const CollapseButton: FC<CollapseButtonProps> = ({
  isCollapsed,
  handleCollapse,
}) => {
  return (
    <Button
      onClick={handleCollapse}
      style={{
        position: isCollapsed ? "absolute" : "static",
        top: "120px",
        right: "0px",
        padding: "0px",
        margin: isCollapsed ? "0px 0px 0px 0px" : "15px 0px 0px 17px",
        width: isCollapsed ? "60px" : "30px",
        height: "60px",
        backgroundColor: isCollapsed ? "#ffffff" : "transparent",
        border: "0px",
        borderRadius: "8px 0 0 8px",
      }}
    >
      {isCollapsed ? (
        <i
          className="bi bi-arrow-left-circle-fill"
          style={{ color: "black", fontSize: "20px" }}
        ></i>
      ) : (
        <i
          className="bi bi-arrow-right-circle-fill"
          style={{ color: "black", fontSize: "20px" }}
        ></i>
      )}
    </Button>
  );
};

export default CollapseButton;
