var nome = localStorage.getItem("nome");
var tempo;
var jogador = document.getElementById("jogador");
jogador.innerHTML += localStorage.getItem('nome');
var rodaTempo = true;
var contador = 0;
var intervalo;
function atualizarTempo() {
    if (rodaTempo == true) {
        intervalo = setInterval(function () {
            contador++;
            document.getElementById('tempo').textContent = contador;
        }, 1000);
        console.log(rodaTempo);
    }else{
        clearInterval(intervalo);
    }
}

atualizarTempo();

if (cartasViradas == 6) {
    rodaTempo = false;
    clearInterval(intervalo);
}

var btnReset = document.getElementById("btnReset");
var btnRank = document.getElementById("btnRank");
var cartasViradas = 0;

function resetar() {
    cartasViradas = 0;
    rodaTempo = false;
    contador = 0;
    clearInterval(intervalo);
    document.getElementById('tempo').textContent = contador;
    btnReset.classList.add("invisivel");
    btnRank.classList.add("invisivel");
    var cartas = ["gato", "sapo", "cachorro", "pinto", "leao", "elefante", "gato", "sapo", "cachorro", "pinto", "leao", "elefante"];
    // Embaralha as cartas
    var cartasEmbaralhadas = [];
    while (cartas.length > 0) {
        let numero = Math.floor(Math.random() * cartas.length);
        let carta = cartas[numero];
        cartasEmbaralhadas.push(carta);
        cartas.splice(numero, 1); // remove pra não repetir
    }

    // define imagens nas cartas
    for (let contador = 0; contador < cartasEmbaralhadas.length; contador++) {
        var nomeAnimal = cartasEmbaralhadas[contador];
        var cartaFrente = document.querySelector("#carta" + contador + " .cartaFrente");
        cartaFrente.src = "../img/" + nomeAnimal + ".png";
    }
    for (let contador = 0; contador < 12; contador++) {
        carta = document.getElementById("carta" + contador);
        carta.classList.remove("virada");
    }
    rodaTempo = true;
    atualizarTempo();
}
var primeiraCarta = null;
var segundaCarta = null;
var travar = false;

// evento de clique nas cartas
for (let contador = 0; contador < 12; contador++) {
    document.getElementById("carta" + contador).addEventListener("click", function () {
        if (travar || this.classList.contains("virada")) {
            return;
        }

        this.classList.add("virada");

        if (!primeiraCarta) {
            primeiraCarta = this;
        } else {
            segundaCarta = this;
            travar = true;

            // pega o caminho src completo da imagem
            var img1 = primeiraCarta.querySelector(".cartaFrente").src;
            var img2 = segundaCarta.querySelector(".cartaFrente").src;

            // pega apenas o nome do arquivo com a substring (que nem no jogo da velha)
            var nome1 = img1.substring(img1.lastIndexOf("/") + 1); // o lastIndexOf com o / encontra a ultima barra e com o +1 pula ela
            var nome2 = img2.substring(img2.lastIndexOf("/") + 1);

            if (nome1 === nome2) {
                // par correto
                var nomeSom = img1.substring(img1.lastIndexOf("/") + 1, img1.lastIndexOf(".")); // o lastIndexOf com o . encontra o ultimo ponto e para nele
                var som = new Audio("../som/" + nomeSom + ".mp3");
                som.play();
                cartasViradas++;
                primeiraCarta = null;
                segundaCarta = null;
                travar = false;
                if (cartasViradas == 6) {
                    btnReset.classList.remove("invisivel");
                    btnRank.classList.remove("invisivel");
                    rodaTempo = false;
                    console.log(rodaTempo);
                    clearInterval(intervalo);
                }

            } else {
                // não são iguais, desvira depois de 1 segundo
                setTimeout(() => {
                    primeiraCarta.classList.remove("virada");
                    segundaCarta.classList.remove("virada");
                    primeiraCarta = null;
                    segundaCarta = null;
                    travar = false;
                }, 1000);
            }
        }
    });
}

// Ranking

var btnRank = document.getElementById("btnRank");
function verRank(){
    window.location = "rank.html";
    tempo = document.getElementById('tempo').textContent;
    salvarPontuacao(nome, tempo);
}

function salvarPontuacao(nome, tempo) {

  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ nome: nome, tempo: tempo });
  localStorage.setItem("ranking", JSON.stringify(ranking));

}


