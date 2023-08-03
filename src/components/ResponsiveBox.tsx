import React from "react";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "10%",
  top: "10%",
  width: "30%",

  margin: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: "transparent",
  zIndex: "tooltip",
  [theme.breakpoints.down("md")]: {
    left: "5%",
    height: "5%",
    top: "5%",
    width: "85%",
  },
}));

interface ResponsiveBoxProps {
  children: React.ReactNode;
}

const ResponsiveBox: React.FC<ResponsiveBoxProps> = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default ResponsiveBox;
