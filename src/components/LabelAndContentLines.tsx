import React from "react";

interface LabelAndContentLinesProps {
  label: string;

  content: {
    nomcompletens: string;
    adresa: string;
    codipostal: string;
    telefon: string;
    fax: string;
    cif: string;
    email: string;
  };

  margin?: string;
}

const LabelAndContentLines: React.FC<LabelAndContentLinesProps> = ({
  label,
  content,
  margin,
}) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className={`card border-0 p-${margin}`}>
          <div className="mb-2">
            <h5 className="h5-label">{label}</h5>
          </div>

          <div>
            <div className="d-flex justify-content-between mb-2">
              <h5 className="h5-content">{content.nomcompletens}</h5>
              <h5 className="h5-content">
                {content.adresa} {content.codipostal}
              </h5>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <h5 className="h5-content">{content.telefon}</h5>
              <h5 className="h5-content">{content.fax}</h5>
            </div>
            <div className="d-flex justify-content-between">
              <h5 className="h5-content">{content.email}</h5>
              <h5 className="h5-content">{content.cif}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelAndContentLines;
