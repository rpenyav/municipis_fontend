import React, { useState } from "react";
import noEscutImage from "../../assets/images/no-escut.png";
import { Comarca, Provincia, Vegueria } from "../../models/municipio.interface";
import { Portal } from "@mui/material";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { Button } from "react-bootstrap";

import LabelAndContent from "../LabelAndContent";
import VerticalSpace from "../VerticalSpace";
import LabelAndContentLines from "../LabelAndContentLines";

interface Props {
  identificador: string;
  idcomarca?: number;
  nom?: string;
  posicio_mapa: string;
  escut: string;
  comarca: Comarca;
  provincia: Provincia;
  vegueria: Vegueria;
  habitants: number;
  homes: number;
  dones: number;
  nomcompletens: string;
  adresa: string;
  codipostal: string;
  telefon: string;
  fax: string;
  cif: string;
  email: string;
  latitud: string;
  longitud: string;
  altitud: string;
  isSelected: boolean;
  onPathClick: (identificador: string) => void;
}

/**
 * El componente MunicipioSVG representa una imagen SVG de un municipio con varias opciones de interacción.
 * El usuario puede pasar el mouse sobre el municipio, seleccionarlo y ver detalles sobre el municipio en un cuadro emergente.
 *
 * @param {Props} props Las propiedades que definen el municipio y sus interacciones.
 * @returns {JSX.Element} Un componente React que representa la imagen SVG del municipio.
 */

const MunicipioSVG: React.FC<Props> = ({
  identificador,
  idcomarca,
  posicio_mapa,
  nom,
  escut,
  isSelected,
  comarca,
  provincia,
  vegueria,
  habitants,
  homes,
  dones,
  nomcompletens,
  adresa,
  codipostal,
  telefon,
  fax,
  cif,
  email,
  latitud,
  longitud,
  altitud,
  onPathClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const handleMouseEnter = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    setIsHovered(true);
    setHoverX(event.pageX + 50);
    setHoverY(event.pageY + 50);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePathClick = () => {
    setOpen(true);
    onPathClick(identificador);
    setSelectedPath(identificador);
  };

  const handleClose = () => {
    setOpen(false);
    onPathClick("");
    setSelectedPath(null);
  };

  const fillColor = isHovered
    ? "#2F487B"
    : selectedPath === identificador
    ? "green"
    : "#729ED6";

  return (
    <>
      <path
        className="cursor-pointer"
        id={identificador}
        d={posicio_mapa}
        fill={fillColor}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-title={nom}
        onClick={handlePathClick}
      />
      {isSelected && (
        <>
          <Dialog
            open={open}
            hideBackdrop
            onClose={handleClose}
            PaperProps={{
              elevation: 6,
              style: {
                minWidth: "500px",
                maxWidth: "80%",
                borderRadius: "15px",
              },
            }}
          >
            <DialogContent>
              <div>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="dark"
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={handleClose}
                  >
                    <i
                      className="bi-x-lg"
                      style={{ color: "white", fontSize: "10px" }}
                    ></i>
                  </Button>
                </div>
                <div className="row m-2">
                  <div className="col-12 ps-5 pe-5 pt-2">
                    <div className="d-flex justify-content-start">
                      <h4>{nom}</h4>
                    </div>

                    <div className="mt-3 d-flex justify-content-start">
                      <img
                        alt={nom}
                        className="image-zi"
                        src={
                          escut && /\.(jpe?g|png)$/i.test(escut)
                            ? `${process.env.REACT_APP_IMAGES_URL}/${escut}`
                            : noEscutImage
                        }
                      />
                      <div className="ms-4 w-100">
                        <LabelAndContent
                          label="Comarca:"
                          content={comarca ? comarca.nom : ""}
                          margin="1"
                        />
                        <VerticalSpace marginTop={2} marginBottom={2} />
                        <LabelAndContent
                          label="Provincia:"
                          content={provincia ? provincia.nom : ""}
                          margin="1"
                        />
                        <VerticalSpace marginTop={2} marginBottom={2} />
                        <LabelAndContent
                          label="Veguería:"
                          content={vegueria ? vegueria.nom : ""}
                          margin="1"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <LabelAndContent
                        label="Índice de población año(2021):"
                        content={habitants}
                        margin="1"
                      />
                      <VerticalSpace marginTop={2} marginBottom={2} />
                    </div>
                    <div className="mt-2 d-flex justify-content-between">
                      <div>
                        <LabelAndContent
                          label="Mujeres:"
                          content={dones}
                          margin="1"
                        />
                      </div>
                      <div>
                        <LabelAndContent
                          label="Hombres:"
                          content={homes}
                          margin="1"
                        />
                      </div>
                    </div>
                    <VerticalSpace marginTop={2} marginBottom={2} />
                    <div className="mt-2">
                      <div>
                        <LabelAndContentLines
                          label="Ente municipal:"
                          content={{
                            nomcompletens,
                            adresa,
                            codipostal,
                            telefon,
                            fax,
                            cif,
                            email,
                          }}
                          margin="1"
                        />
                      </div>
                    </div>
                    <VerticalSpace marginTop={2} marginBottom={2} />
                    <div className="mt-2 d-flex justify-content-between">
                      <div>
                        <LabelAndContent
                          label="Longitud:"
                          content={longitud}
                          margin="1"
                        />
                      </div>
                      <div>
                        <LabelAndContent
                          label="Latitud:"
                          content={latitud}
                          margin="1"
                        />
                      </div>
                    </div>
                    <VerticalSpace marginTop={2} marginBottom={2} />
                    <div className="mt-2 d-flex justify-content-between">
                      <div>
                        <LabelAndContent
                          label="Altitud:"
                          content={altitud}
                          margin="1"
                        />
                      </div>
                      <div>
                        <LabelAndContent
                          label="Google Maps:"
                          content="Barcelona"
                          margin="1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions className="m-5 d-flex justify-content-center">
              <Button className="btn btn-dark btn-lg rounded-pill w-100 button-text-size">
                Ver municipio
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {isHovered && (
        <Portal>
          <div
            style={{
              position: "absolute",
              left: hoverX,
              width: "20%",
              top: hoverY,
              backgroundColor: "white",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
              padding: "10px",
            }}
          >
            <div className="row">
              <div className="col d-flex justify-content-start align-items-center">
                <img
                  alt={nom}
                  className="img-fluid"
                  style={{ maxHeight: "50px", maxWidth: "50px" }}
                  src={
                    escut && /\.(jpe?g|png)$/i.test(escut)
                      ? `${process.env.REACT_APP_IMAGES_URL}/${escut}`
                      : noEscutImage
                  }
                />

                <h5 className="ms-3">{nom}</h5>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default MunicipioSVG;
