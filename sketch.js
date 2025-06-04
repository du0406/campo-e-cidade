function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
  let elementosCampo = [];
let elementosCidade = [];
let pontuacao = 0;
let tempoRestante = 60; // 60 segundos de jogo
let estadoJogo = 'iniciar'; // 'iniciar', 'jogando', 'finalizado'

function setup() {
  createCanvas(800, 600);
  // Centraliza o texto
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
}

function draw() {
  background(220); // Cor de fundo suave

  if (estadoJogo === 'iniciar') {
    mostrarTelaInicial();
  } else if (estadoJogo === 'jogando') {
    desenharCenario();
    gerenciarElementos();
    mostrarPontuacaoTempo();
    verificarFimJogo();
  } else if (estadoJogo === 'finalizado') {
    mostrarTelaFinal();
  }
}

function mostrarTelaInicial() {
  fill(50);
  textSize(40);
  text("Conexão Campo e Cidade", width / 2, height / 2 - 50);
  textSize(20);
  text("Clique para começar a plantar e construir!", width / 2, height / 2);
  text("Leve os elementos do campo para a cidade (lado direito)", width / 2, height / 2 + 30);
  text("e os elementos da cidade para o campo (lado esquerdo).", width / 2, height / 2 + 60);
  text("Você tem 60 segundos!", width / 2, height / 2 + 90);
}

function mostrarTelaFinal() {
  fill(50);let elementosCampo = [];
let elementosCidade = [];
let pontuacao = 0;
let tempoRestante = 60; // 60 segundos de jogo
let estadoJogo = 'iniciar'; // 'iniciar', 'jogando', 'finalizado'

function setup() {
  createCanvas(800, 600);
  // Centraliza o texto
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
}

function draw() {
  background(220); // Cor de fundo suave

  if (estadoJogo === 'iniciar') {
    mostrarTelaInicial();
  } else if (estadoJogo === 'jogando') {
    desenharCenario();
    gerenciarElementos();
    mostrarPontuacaoTempo();
    verificarFimJogo();
  } else if (estadoJogo === 'finalizado') {
    mostrarTelaFinal();
  }
}

function mostrarTelaInicial() {
  fill(50);
  textSize(40);
  text("Conexão Campo e Cidade", width / 2, height / 2 - 50);
  textSize(20);
  text("Clique para começar a plantar e construir!", width / 2, height / 2);
  text("Leve os elementos do campo para a cidade (lado direito)", width / 2, height / 2 + 30);
  text("e os elementos da cidade para o campo (lado esquerdo).", width / 2, height / 2 + 60);
  text("Você tem 60 segundos!", width / 2, height / 2 + 90);
}

function mostrarTelaFinal() {
  fill(50);
  textSize(40);
  text("Fim de Jogo!", width / 2, height / 2 - 50);
  textSize(30);
  text("Sua Pontuação: " + pontuacao, width / 2, height / 2);
  textSize(20);
  text("Clique para jogar novamente!", width / 2, height / 2 + 50);
}

function mousePressed() {
  if (estadoJogo === 'iniciar' || estadoJogo === 'finalizado') {
    resetJogo();
    estadoJogo = 'jogando';
  } else if (estadoJogo === 'jogando') {
    // Adiciona um novo elemento do campo ao clicar na tela (lado esquerdo)
    if (mouseX < width / 2) {
      elementosCampo.push(new ElementoCampo(mouseX, mouseY));
    }
    // Adiciona um novo elemento da cidade ao clicar na tela (lado direito)
    else {
      elementosCidade.push(new ElementoCidade(mouseX, mouseY));
    }
  }
}

function desenharCenario() {
  // Lado do Campo (esq)
  fill(144, 238, 144); // Verde claro
  noStroke();
  rect(width / 4, height / 2, width / 2, height);
  // Lado da Cidade (dir)
  fill(169, 169, 169); // Cinza
  rect(width * 3 / 4, height / 2, width / 2, height);

  // Linha divisória
  stroke(50);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);

  // Texto Campo e Cidade
  fill(50);
  textSize(30);
  text("Campo", width / 4, 30);
  text("Cidade", width * 3 / 4, 30);
}

function gerenciarElementos() {
  // Desenha e move os elementos do campo
  for (let i = elementosCampo.length - 1; i >= 0; i--) {
    elementosCampo[i].desenhar();
    elementosCampo[i].mover();
    // Verifica colisão com a área da cidade
    if (elementosCampo[i].x > width / 2) {
      pontuacao += 10;
      elementosCampo.splice(i, 1); // Remove o elemento
    }
  }

  // Desenha e move os elementos da cidade
  for (let i = elementosCidade.length - 1; i >= 0; i--) {
    elementosCidade[i].desenhar();
    elementosCidade[i].mover();
    // Verifica colisão com a área do campo
    if (elementosCidade[i].x < width / 2) {
      pontuacao += 10;
      elementosCidade.splice(i, 1); // Remove o elemento
    }
  }
}

function mostrarPontuacaoTempo() {
  fill(50);
  textSize(20);
  text("Pontuação: " + pontuacao, 100, 50);
  text("Tempo: " + ceil(tempoRestante), width - 100, 50);
}

function verificarFimJogo() {
  if (frameCount % 60 == 0 && tempoRestante > 0) { // Diminui o tempo a cada segundo
    tempoRestante--;
  }
  if (tempoRestante <= 0) {
    estadoJogo = 'finalizado';
  }
}

function resetJogo() {
  elementosCampo = [];
  elementosCidade = [];
  pontuacao = 0;
  tempoRestante = 60;
  loop(); // Garante que o loop de draw continue
}

// Classe para representar um elemento do Campo
class ElementoCampo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 20;
    this.cor = color(34, 139, 34); // Verde floresta
    this.velocidade = random(1, 3);
  }

  desenhar() {
    fill(this.cor);
    noStroke();
    ellipse(this.x, this.y, this.tamanho, this.tamanho); // Representa uma semente ou fruto
  }

  mover() {
    this.x += this.velocidade; // Se move para a direita (em direção à cidade)
  }
}

// Classe para representar um elemento da Cidade
class ElementoCidade {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 25;
    this.cor = color(105, 105, 105); // Cinza escuro
    this.velocidade = random(1, 3);
  }

  desenhar() {
    fill(this.cor);
    noStroke();
    rect(this.x, this.y, this.tamanho, this.tamanho * 1.5); // Representa um pequeno edifício
  }

  mover() {
    this.x -= this.velocidade; // Se move para a esquerda (em direção ao campo)
  }
}
  textSize(40);
  text("Fim de Jogo!", width / 2, height / 2 - 50);
  textSize(30);
  text("Sua Pontuação: " + pontuacao, width / 2, height / 2);
  textSize(20);
  text("Clique para jogar novamente!", width / 2, height / 2 + 50);
}

function mousePressed() {
  if (estadoJogo === 'iniciar' || estadoJogo === 'finalizado') {
    resetJogo();
    estadoJogo = 'jogando';
  } else if (estadoJogo === 'jogando') {
    // Adiciona um novo elemento do campo ao clicar na tela (lado esquerdo)
    if (mouseX < width / 2) {
      elementosCampo.push(new ElementoCampo(mouseX, mouseY));
    }
    // Adiciona um novo elemento da cidade ao clicar na tela (lado direito)
    else {
      elementosCidade.push(new ElementoCidade(mouseX, mouseY));
    }
  }
}

function desenharCenario() {
  // Lado do Campo (esq)
  fill(144, 238, 144); // Verde claro
  noStroke();
  rect(width / 4, height / 2, width / 2, height);
  // Lado da Cidade (dir)
  fill(169, 169, 169); // Cinza
  rect(width * 3 / 4, height / 2, width / 2, height);

  // Linha divisória
  stroke(50);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);

  // Texto Campo e Cidade
  fill(50);
  textSize(30);
  text("Campo", width / 4, 30);
  text("Cidade", width * 3 / 4, 30);
}

function gerenciarElementos() {
  // Desenha e move os elementos do campo
  for (let i = elementosCampo.length - 1; i >= 0; i--) {
    elementosCampo[i].desenhar();
    elementosCampo[i].mover();
    // Verifica colisão com a área da cidade
    if (elementosCampo[i].x > width / 2) {
      pontuacao += 10;
      elementosCampo.splice(i, 1); // Remove o elemento
    }
  }

  // Desenha e move os elementos da cidade
  for (let i = elementosCidade.length - 1; i >= 0; i--) {
    elementosCidade[i].desenhar();
    elementosCidade[i].mover();
    // Verifica colisão com a área do campo
    if (elementosCidade[i].x < width / 2) {
      pontuacao += 10;
      elementosCidade.splice(i, 1); // Remove o elemento
    }
  }
}

function mostrarPontuacaoTempo() {
  fill(50);
  textSize(20);
  text("Pontuação: " + pontuacao, 100, 50);
  text("Tempo: " + ceil(tempoRestante), width - 100, 50);
}

function verificarFimJogo() {
  if (frameCount % 60 == 0 && tempoRestante > 0) { // Diminui o tempo a cada segundo
    tempoRestante--;
  }
  if (tempoRestante <= 0) {
    estadoJogo = 'finalizado';
  }
}

function resetJogo() {
  elementosCampo = [];
  elementosCidade = [];
  pontuacao = 0;
  tempoRestante = 60;
  loop(); // Garante que o loop de draw continue
}

// Classe para representar um elemento do Campo
class ElementoCampo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 20;
    this.cor = color(34, 139, 34); // Verde floresta
    this.velocidade = random(1, 3);
  }

  desenhar() {
    fill(this.cor);
    noStroke();
    ellipse(this.x, this.y, this.tamanho, this.tamanho); // Representa uma semente ou fruto
  }

  mover() {
    this.x += this.velocidade; // Se move para a direita (em direção à cidade)
  }
}

// Classe para representar um elemento da Cidade
class ElementoCidade {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 25;
    this.cor = color(105, 105, 105); // Cinza escuro
    this.velocidade = random(1, 3);
  }

  desenhar() {
    fill(this.cor);
    noStroke();
    rect(this.x, this.y, this.tamanho, this.tamanho * 1.5); // Representa um pequeno edifício
  }

  mover() {
    this.x -= this.velocidade; // Se move para a esquerda (em direção ao campo)
  }
}