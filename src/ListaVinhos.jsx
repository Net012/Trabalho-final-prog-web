import React from "react";
import Swal from "sweetalert2";

function ListaVinhos({ vinhos }) {
  function salvarAvaliacao(avaliacao) {
    const avaliacoesSalvas =
      JSON.parse(localStorage.getItem("avaliacoes")) || [];
    avaliacoesSalvas.push(avaliacao);
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoesSalvas));
  }

  function Avaliar(vinho) {
    const avaliacoesSalvas =
      JSON.parse(localStorage.getItem("avaliacoes")) || [];
    const vinhoAvaliado = avaliacoesSalvas.find(
      (avaliacao) => avaliacao.vinhoId === vinho.id
    );

    if (vinhoAvaliado) {
      Swal.fire(
        "Vinho já avaliado",
        "Você já avaliou este vinho anteriormente.",
        "warning"
      );
      return;
    }

    Swal.fire({
      title: "Avaliar Vinho",
      html: `
        <select id="nota" class="form-select mb-3" required>
          <option value="">Selecione a nota</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <textarea id="comentario" class="form-control" rows="3" placeholder="Comentário" required></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const notaElement = document.getElementById("nota");
        const comentarioElement = document.getElementById("comentario");
        const nota = notaElement ? notaElement.value : "";
        const comentario = comentarioElement ? comentarioElement.value : "";
        return { vinhoId: vinho.id, nota, comentario };
      },
      didClose: () => {
        const notaElement = document.getElementById("nota");
        const comentarioElement = document.getElementById("comentario");
        if (notaElement) {
          notaElement.value = "";
        }
        if (comentarioElement) {
          comentarioElement.value = "";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { vinhoId, nota, comentario } = result.value;
        salvarAvaliacao({ vinhoId, nota, comentario });
      }
    });
  }

  return (
    <div className="row">
      {vinhos.map((vinho) => (
        <div key={vinho.id} className="col-md-4 my-3">
          <div className="card d-flex">
            <img
              src={vinho.imagem}
              className="card-img-top align-self-center img-vinho"
              alt={vinho.nome}
            />
            <div className="card-body">
              <h5 className="card-title">{vinho.nome}</h5>
              <div className="card-text">
                <p>Tipo: {vinho.tipo}</p>
                <p>Safra: {vinho.safra}</p>
                <p>País: {vinho.pais}</p>
                <p>Região: {vinho.regiao}</p>
                <p>Produtor: {vinho.produtor}</p>
                <p>Uva: {vinho.uva}</p>
              </div>
              <a className="btn btn-primary" onClick={() => Avaliar(vinho)}>
                Avaliar
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaVinhos;
