import React from "react";

interface LabelAndContentProps {
  label: string;
  content: string | number;
  margin?: string;
}

const LabelAndContent: React.FC<LabelAndContentProps> = ({
  label,
  content,
  margin,
}) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className={`card border-0 p-${margin}`}>
          <div className="d-flex justify-content-start">
            <div>
              <h5 className="h5-label">{label}</h5>
            </div>
            <div className="ms-2">
              <h5 className="h5-content">{content}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelAndContent;
