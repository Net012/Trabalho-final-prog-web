import React from "react";
import Avaliados from "./Avaliados";

function Header() {
  return (
    <nav className="navbar bg-primary d-flex justify-content-between">
      <h3 className="mx-4 my-2 text-white">Avaliadora de Vinhos Avenida</h3>
      <Avaliados />
    </nav>
  );
}

export default Header;
