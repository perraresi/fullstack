const canvas = document.getElementById("cursor");
const ctx = canvas.getContext("2d");

const larguraCanvas = canvas.width;
const alturaCanvas = canvas.height;

// Carregar imagem // dessa forma consigo carregar a imagem diretamente pelo JS
const imagem = new Image();
imagem.src = "Imagens/orange_cursor.png";
const imagemLargura = 25;
const imagemAltura = 25;

// Posição inicial no centro do canvas
let posX = larguraCanvas / 2;
let posY = alturaCanvas / 2;

// Atualizar a posição da imagem de acordo com o mouse
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // Centralizar a imagem no ponteiro
  let novaX = mouseX - imagemLargura / 7;
  let novaY = mouseY - imagemAltura / 7;

  // Impedir que a imagem saia do canvas
  novaX = Math.max(0, Math.min(novaX, larguraCanvas - imagemLargura));
  novaY = Math.max(0, Math.min(novaY, alturaCanvas - imagemAltura));

  posX = novaX;
  posY = novaY;
});

function desenhar() {
  ctx.clearRect(0, 0, larguraCanvas, alturaCanvas);
  ctx.drawImage(imagem, posX, posY, imagemLargura, imagemAltura);
  requestAnimationFrame(desenhar);
}

// Começar o loop de desenho assim que a imagem carregar (vai evitar que de erro por não carregamento da imagem)
imagem.onload = () => {
  desenhar();
};
