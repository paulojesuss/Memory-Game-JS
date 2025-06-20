var btnVoltar = document.getElementById("btnVoltar");
function voltar(){
    window.location = "telaInicial.html"
}

function inicio(){
    mostrarRanking();
}

function mostrarRanking() {
  // pega o ranking salvo
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  // organiza do menor para o maior tempo
  ranking.sort((a, b) => a.tempo - b.tempo);

  // mostra os 5 melhores
  for (let i = 0; i < 5; i++) {
    let jogador = ranking[i];
    if (jogador) {
      document.getElementById("jogador" + i).innerText = jogador.nome;
      document.getElementById("tempo" + i).innerText = jogador.tempo + "s";
    } else {
      document.getElementById("jogador" + i).innerText = "-";
      document.getElementById("tempo" + i).innerText = "-";
    }
  }
}