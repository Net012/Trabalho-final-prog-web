import React from "react";
import Swal from "sweetalert2";
import vinhos from "./vinhos.js";

function Avaliados() {
  function mostrarAvaliacoes() {
    const avaliacoesSalvas =
      JSON.parse(localStorage.getItem("avaliacoes")) || [];

    if (avaliacoesSalvas.length === 0) {
      Swal.fire(
        "Nenhuma avaliação encontrada",
        "Você ainda não fez nenhuma avaliação.",
        "error"
      );
      return;
    }

    const avaliacoes = avaliacoesSalvas.map((avaliacao, index) => {
      const vinho = vinhos.find((item) => item.id === avaliacao.vinhoId);

      if (vinho) {
        return `
          <div key=${index}>
            <img src=${vinho.imagem} alt=${vinho.nome} />
            <p>Nome do Vinho: ${vinho.nome}</p>
            <p>Nota: ${avaliacao.nota}</p>
            <p>Comentário: ${avaliacao.comentario}</p>
          </div>
        `;
      } else {
        return null;
      }
    });

    Swal.fire({
      title: "Avaliações",
      html: avaliacoes.join(""),
      showCloseButton: true,
      showConfirmButton: false,
    });
  }

  return (
    <a className="btn btn-outline-light mx-4 my-2" onClick={mostrarAvaliacoes}>
      <img
        className="icone"
        src="images/icone-avaliados.png"
        alt="Ícone Avaliados"
      />
    </a>
  );
}

export default Avaliados;
