const canvas = document.getElementById("meuCanvas");
const ctx = canvas.getContext("2d");


const canvas1 = document.getElementById("meuCanvas2");
const ctx1 = canvas1.getContext("2d");

function desenharQuadrado(x, y, tamanho, cor) {
  ctx.fillStyle = cor;
  ctx.fillRect(x, y, tamanho, tamanho);
  
}

function desenharQuadrado2(x, y, tamanho, cor) {
  ctx1.fillStyle = cor;
  ctx1.fillRect(x, y, tamanho, tamanho);

}


function desenharLinha(x1, y1, x2, y2, cor, largura = 1) {
  ctx.strokeStyle = cor;
  ctx.lineWidth = largura;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

}

function desenharLinha2(x1, y1, x2, y2, cor, largura = 1) {
  ctx.strokeStyle = cor;
  ctx.lineWidth = largura;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

}

function desenharArco(x, y, raio, angInicio, angFim, cor) {
  ctx.strokeStyle = cor;
  ctx.beginPath();
  ctx.arc(x, y, raio, angInicio, angFim);
  ctx.stroke();
}

function desenharArco2(x, y, raio, angInicio, angFim, cor) {
  ctx.strokeStyle = cor;
  ctx.beginPath();
  ctx.arc(x, y, raio, angInicio, angFim);
  ctx.stroke();
}

function desenharCirculo(x, y, raio, corBorda, corPreenchimento) {
  ctx.beginPath();
  ctx.arc(x, y, raio, 0, Math.PI * 2);
  ctx.fillStyle = corPreenchimento;
  ctx.fill();
  ctx.strokeStyle = corBorda;
  ctx.stroke();
}

function desenharCirculo2(x, y, raio, corBorda, corPreenchimento) {
  ctx1.beginPath();
  ctx1.arc(x, y, raio, 0, Math.PI * 2);
  ctx1.fillStyle = corPreenchimento;
  ctx1.fill();
  ctx1.strokeStyle = corBorda;
  ctx1.stroke();
}

function escreverTexto(texto, x, y, cor, fonte = "16px Arial") {
  ctx.fillStyle = cor;
  ctx.font = fonte;
  ctx.fillText(texto, x, y);
}

function escreverTexto2(texto, x, y, cor, fonte = "16px Arial") {
  ctx.fillStyle = cor;
  ctx.font = fonte;
  ctx.fillText(texto, x, y);
}

function desenharTrianguloCanvas(x1, y1, x2, y2, x3, y3, cor) {
  const canvas = document.getElementById("meuCanvas");
  const ctx = canvas.getContext("2d");

  ctx1.beginPath();
  ctx1.moveTo(x1, y1);    // Topo
  ctx1.lineTo(x2, y2);    // Base esquerda
  ctx1.lineTo(x3, y3);   // Base direita
  ctx1.closePath();

  ctx1.fillStyle = cor; // Definindo a cor de preenchimento
  ctx1.fill();             // Preenche o triângulo com a cor
}


function desenharCena() {

  //Quadrados
  desenharQuadrado2(0, 0, 300, "mediumaquamarine");
  desenharQuadrado2(0, 220, 300, "gray")
  desenharQuadrado2(100,140, 80, "sienna")
  desenharQuadrado2(110,160,20, "cyan")
  desenharQuadrado2(150,160,20, "cyan")
  desenharQuadrado2(130, 180, 20, "brown")
  desenharQuadrado2(130, 200, 20, "brown")
  desenharQuadrado2(0, 205, 40, "blue")
  desenharQuadrado2(0, 245, 40, "blue")
  desenharQuadrado2(0, 285, 40, "blue")
  desenharQuadrado2(40, 255, 70, "blue")
  desenharQuadrado2(50, 200, 20, "brown")
  desenharQuadrado2(50, 180, 20, "brown")
  desenharQuadrado2(260, 245, 20, "brown")
  desenharQuadrado2(260, 225, 20, "brown")

  //circulos
  desenharCirculo2(0, 200, 40, "blue", "blue")
  desenharCirculo2(110, 295, 40, "blue", "blue")
  desenharCirculo2(60,160, 25, "green", "green")
  desenharCirculo2(270,205, 25, "green", "green")
  desenharCirculo2(220, 80, 40, "yellow", "yellow")

  desenharTrianguloCanvas(140, 100, 100, 140, 180, 140, "red")

  
}

desenharCena();

function desenharCampoGeometrico() {
  // Texto
  escreverTexto("Canvas", 120, 60, "black");


  //Quadrados
  desenharQuadrado(270, 135, 30, "cyan");

  // Linhas
  desenharLinha(0, 0, 150, 150, "blue");
  desenharLinha(300, 0, 150, 150, "red");
  desenharLinha(150, 150, 150, 300, "black");
  desenharLinha(0, 150, 300, 150, "green");

  // Arcos
  desenharArco(150, 150, 80, Math.PI, Math.PI+Math.PI/4, "green");
  desenharArco(150, 150, 80, Math.PI*1.75, Math.PI*2, "green");
  desenharArco(150, 150, 60, Math.PI, 0, "green");
  desenharArco(150, 300, 80, Math.PI, Math.PI*1.5, "green");
  desenharArco(150, 300, 60, Math.PI*1.5, Math.PI*2, "green");

  // Círculo central
  desenharCirculo(150, 115, 15, "blue", "cyan");

  // Círculo inferior
  desenharCirculo(150, 300, 40, "green", "cyan");

  // Círculos amarelos
  desenharCirculo(70, 220, 13, "green", "yellow");
  desenharCirculo(230, 220, 13, "green", "yellow");

  // Quadrados coloridos
  desenharQuadrado(0, 0, 50, "blue");
  desenharQuadrado(250, 0, 50, "red");
  desenharQuadrado(109, 151, 40, "red");

  desenharQuadrado(0, 270, 30, "yellow");
  desenharQuadrado(0, 240, 30, "yellow");
  desenharQuadrado(30, 270, 30, "yellow");
  desenharQuadrado(270, 270, 30, "black");
  desenharQuadrado(240, 270, 30, "black");
  desenharQuadrado(270, 240, 30, "black");

  desenharQuadrado(0, 119, 30, "cyan");
  desenharQuadrado(0, 151, 30, "cyan");
}

desenharCampoGeometrico();