import React from "react";
import vinhos from "./vinhos";
import ListaVinhos from "./ListaVinhos";
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <h1 className="m-2 text-center">Lista de Vinhos</h1>
      <div className="d-flex flex-wrap">
        <ListaVinhos vinhos={vinhos} />
      </div>
    </>
  );
}

export default App;
