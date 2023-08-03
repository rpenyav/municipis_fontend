import React from "react";

interface VerticalSpaceProps {
  marginTop?: number;
  marginBottom?: number;
}

const VerticalSpace: React.FC<VerticalSpaceProps> = ({
  marginTop = 0,
  marginBottom = 0,
}) => {
  return <hr className={`mt-${marginTop} mb-${marginBottom}`} />;
};

export default VerticalSpace;
