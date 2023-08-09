// Variáveis
var andarAtual = 0; // Andar atual do elevador
var totalAndares = 12; // Total de andares no prédio (8 andares + térreo + 3 subsolos)
var delay = 1000; // Delay em milissegundos para simular o movimento do elevador

// Função para atualizar o display do elevador
function atualizarDisplay(andar, subindo) {
  var floorDisplay = document.getElementById('floor-display');
  var arrow = subindo ? '▲' : '▼';
  floorDisplay.innerHTML = andar + '       ' + arrow;
}


// Função para mover o elevador para um andar específico
function moverElevador(andarDesejado) {
  if (andarDesejado >= -3 && andarDesejado <= 8 && andarAtual !== andarDesejado) {
    var diff = andarDesejado - andarAtual;
    var increment = (diff > 0) ? 1 : -1;
    var subindo = (diff > 0);
    var interval = setInterval(function() {
      andarAtual += increment;
      atualizarDisplay(andarAtual, subindo);
      if (andarAtual === andarDesejado) {
        clearInterval(interval);
        apagarLuzBotao(andarDesejado); // Apagar a luz do botão quando chegar ao andar
      }
    }, delay);
  }
}

// Função para mover o elevador para o térreo
function irParaTerreo() {
  moverElevador(0);
}
// Função para limpar a seta do display
function limparSeta() {
    var floorDisplay = document.getElementById('floor-display');
    floorDisplay.innerHTML = andarAtual + ' ';
  }

// Função para lidar com o clique no botão
function botaoClicado(botao) {
  var andarDesejado = botao.textContent;
  if (andarDesejado === 'T') {
    irParaTerreo();
  } else {
    moverElevador(parseInt(andarDesejado));
    acenderLuzBotao(andarDesejado); // Acender a luz do botão quando pressionado
    var subindo = (parseInt(andarDesejado) > andarAtual);
  }
}

// Função para acender a luz do botão
function acenderLuzBotao(andar) {
  var botoesAndares = document.getElementsByClassName('botoes_andares');
  for (var i = 0; i < botoesAndares.length; i++) {
    if (botoesAndares[i].textContent === andar.toString()) {
      botoesAndares[i].classList.add('acende-luz');
    }
  }
}

// Função para apagar a luz do botão
function apagarLuzBotao(andar) {
  var botoesAndares = document.getElementsByClassName('botoes_andares');
  for (var i = 0; i < botoesAndares.length; i++) {
    if (botoesAndares[i].textContent === andar.toString()) {
      botoesAndares[i].classList.remove('acende-luz');
    }
  }
}
