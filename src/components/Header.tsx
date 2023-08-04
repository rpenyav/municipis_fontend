import React from "react";

const Header = () => {
  return (
    <header>
      <div className="container-fluid bg-blue-municipis ps-5 pe-5">
        <div className="row">
          <div className="col-8 p-3">
            <h1>Municipios de Cataluña</h1>
            <h5>Con datos demográficos</h5>
          </div>
          <div className="col-4 ps-5 pe-5 d-flex align-items-center justify-content-start">
            <ul className="header-menu-list">
              <li>
                <a href="/" className="link-menu-superior">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="link-menu-superior">
                  Uso del mapa
                </a>
              </li>
              <li>
                <a href="#" className="link-menu-superior">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
