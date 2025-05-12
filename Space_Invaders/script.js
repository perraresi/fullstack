//Classes importadas

import Player from "./classes/Player.js";
import Projectile from "./classes/Projectile.js";
import Grid from "./classes/Grid.js";
import Invader from "./classes/invader.js";
import Particles from "./classes/Particles.js";
import { GameState } from "./utils/constants.js";
import Obstacles from "./classes/Obstacles.js";
import SoundEffects from "./classes/SoundEffects.js";

const backgroundMusic = new Audio('./assets/audios/space_beat.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

// Definindo a imagem de fundo
const backgroundImage = new Image();
backgroundImage.src = './assets/images/background.jpg';  // Substitua pelo caminho correto da sua imagem


window.addEventListener('click', () => {
    backgroundMusic.play();
}, { once: true }); // garante que só vai tentar uma vez

//booleana para iniciar a cutscene
let cutscenePlayed = false;


//canvas e contexto
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


//contexto para passar pelas fases de Start e Game over e tbm para passar o score e dados do jogo
const startScreen = document.querySelector(".start-screen");
const gameOverScreen = document.querySelector(".game-over");
const scoreUi = document.querySelector(".score-ui");
const scoreElement = scoreUi.querySelector(".score > span");
const levelElement = scoreUi.querySelector(".level > span");
const highElement = scoreUi.querySelector(".high > span");
const buttonPlay = document.querySelector(".button-play");
const buttonRestart = document.querySelector(".button-restart");

//função para remover a tela de game over do inicio do jogo
gameOverScreen.remove();

//determinando as variaveis do tamanho do canvas
canvas.width = innerWidth;
canvas.height = innerHeight;


//desabilitando o antialiasing para q as imagens fiquem mais pixeladas
ctx.imageSmoothingEnabled = false;

//iniciando o game state no estado de start
let currentState = GameState.START

//chamando a classe dos sons
const soundEffects = new SoundEffects();

const gameData = {
    score: 0,
    level: 1,
    high: 0,
}


const showGameData = () => {
    scoreElement.textContent = gameData.score;
    levelElement.textContent = gameData.level;
    highElement.textContent = gameData.high;
}


const player = new Player(canvas.width, canvas.height);
const grid = new Grid(3, 6);
const playerProjectiles = [];
const invaderProjectiles = [];
const particles = [];
const obstacles = [];

const initObstacles = () => {
    const x = canvas.width / 2 - 50;
    const y = canvas.height - 250;
    const offset = canvas.width * 0.15
    const color = "red";

    const obstacle1 = new Obstacles({x: x - offset, y}, 100, 20, color);
    const obstacle2 = new Obstacles({x: x + offset, y}, 100, 20, color);
    
    obstacles.push(obstacle1);
    obstacles.push(obstacle2);

}

initObstacles();

const drawObstacles = () => {
    obstacles.forEach((obstacle) => obstacle.draw(ctx));
}

const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    shoot: {
        pressed: false,
        released: true,
    }
};


//Cutscene feita com ajuda do ChatGPT

// Criação da função para desenhar o fundo
const drawBackground = () => {
    if (backgroundImage.complete) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }
};

// Função para a animação da cutscene
const playCutscene = () => {

    const messages = [
        "Ano 5025: O império galáctico está à beira da extinção...",
        "Você é o último piloto vivo da elite da frota espacial...",
        "Sua missão: defender o último lar da humanidade!"
    ];

    let messageIndex = 0;
    let alpha = 0;
    let fadeIn = true;
    const displayDuration = 600;
    let frameCount = 0;

    // Função para exibir as mensagens com fade in e fade out
    const showIntroMessages = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenha o fundo primeiro
        drawBackground();

        // Fundo escuro sobre o fundo para melhorar a leitura do texto
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "24px 'Press Start 2P', sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillText(messages[messageIndex], canvas.width / 2, canvas.height / 2);

        if (fadeIn) {
            alpha += 0.02;
            if (alpha >= 1) {
                alpha = 1;
                frameCount++;
                if (frameCount > displayDuration) {
                    fadeIn = false;
                }
            }
        } else {
            alpha -= 0.02;
            if (alpha <= 0) {
                alpha = 0;
                messageIndex++;
                if (messageIndex >= messages.length) {
                    startCutsceneAnimation();
                    return;
                } else {
                    fadeIn = true;
                    frameCount = 0;
                }
            }
        }

        requestAnimationFrame(showIntroMessages);
    };

    // Função para a animação da cutscene
    const startCutsceneAnimation = () => {
        let mothershipY = -100;
        const mothershipImage = new Image();
        mothershipImage.src = './assets/images/mothership.png';

        const playerShipImage = new Image();
        playerShipImage.src = './assets/images/spaceship.png';

        let mothershipState = 'moving';
        const playerShipY = canvas.height - 128;
        const stopAtY = playerShipY - 240;
        const delayBeforeExit = 2000;
        const mothershipExitSpeed = 2;
        let stopTimer = 0;
        let showPlayerShip = false;

        const player = new Player(canvas.width, canvas.height);  // Cria uma instância do jogador

        const animateCutscene = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Desenha o fundo na cutscene
            drawBackground();

            ctx.drawImage(mothershipImage, canvas.width / 2 - 240, mothershipY, 480, 480);

            if (mothershipState === 'moving') {
                mothershipY += 2;
                soundEffects.playMothershipSound();
                if (mothershipY >= stopAtY) {
                    mothershipState = 'stopped';
                    stopTimer = Date.now();
                }
            }

            if (mothershipState === 'stopped') {
                if (!showPlayerShip && Date.now() - stopTimer >= 500) {
                    soundEffects.playSmallShipReleaseSound();
                    showPlayerShip = true;
                }

                if (Date.now() - stopTimer >= delayBeforeExit) {
                    mothershipState = 'exiting';
                }
            }

            if (mothershipState === 'exiting') {
                mothershipY -= mothershipExitSpeed;

                ctx.drawImage(mothershipImage, canvas.width / 2 - 240, mothershipY, 480, 480);
                soundEffects.playMothershipGoesSound();

                if (mothershipY + 480 < 0) {
                    currentState = GameState.PLAYING;
                    scoreUi.style.display = "block";
                    return;
                }
            }

            if (showPlayerShip) {
                player.update();  // Atualiza a animação do foguinho
                player.draw(ctx);  // Desenha a nave e o foguinho
            }

            requestAnimationFrame(animateCutscene);
        };

        animateCutscene();
    };

    showIntroMessages();
};


const drawProjectiles = () => {
    const projectiles = [...playerProjectiles, ...invaderProjectiles]


    projectiles.forEach((projectile) => {
        projectile.draw(ctx);
        projectile.update();
    })
};



const clearProjectiles = () => {
    playerProjectiles.forEach((projectile, index) => {
        if (projectile.position.y <= 0) {
            playerProjectiles.splice(index, 1);
        }
    });
};

const clearParticles = () => {
    particles.forEach((particle, index) => {
        if (particle.opacity <= 0) {
            particles.splice(index, 1);
        }
    });
};

const drawParticles = () => {
    particles.forEach((particle) => {

    particle.draw(ctx);
    particle.update();

    })
}

const createExplosion = (position, size, color) => {
    for (let i = 0; i < size; i += 1) {
        const particle = new Particles(
                {  
                x: position.x, 
                y: position.y
                    }, 
                {x: (Math.random() -0.5) * 3, 
                y: (Math.random() -0.5) * 3}, 2, color)
        
        particles.push(particle);
    }


}


const incrementScore = (value) => {
    gameData.score += value;
    if (gameData.score > gameData.high) {
        gameData.high = gameData.score;
    }
}

const incrementLevel = () => {
    gameData.level += 1;}

const checkShootInvaders = () => {
    grid.invaders.forEach((invader, invaderIndex) => {
        playerProjectiles.some((projectile, projectileIndex) => {
            if (invader.hit(projectile)) {
                soundEffects.playHitSound();
                createExplosion({x: invader.position.x + invader.widht / 2, y: invader.position.y + invader.height / 2}, 15, "#941CFF");
                grid.invaders.splice(invaderIndex, 1);
                playerProjectiles.splice(projectileIndex, 1);
                incrementScore(10);
            }
        });
    });
}

const checkShootPlayer = () => {
    invaderProjectiles.some((projectile, projectileIndex) => {
        if (player.hit(projectile)) {
            invaderProjectiles.splice(projectileIndex, 1);
            gameOver()
        }
    })
}

const checkShootObstacles = () => {
   obstacles.forEach((obstacle) => {
    playerProjectiles.some((projectile, projectileIndex) => {
        if (obstacle.hit(projectile)) {
            
            playerProjectiles.splice(projectileIndex, 1)};
    })

    invaderProjectiles.some((projectile, projectileIndex) => {
        if (obstacle.hit(projectile)) {
            
            invaderProjectiles.splice(projectileIndex, 1)};
    })

   })
}
const gameOver = () => {

    createExplosion({x: player.position.x + player.widht /2, y: player.position.y + player.height / 2}, 10, "orange")
    createExplosion({x: player.position.x + player.widht /2, y: player.position.y + player.height / 2}, 5, "crimson")
    createExplosion({x: player.position.x + player.widht /2, y: player.position.y + player.height / 2}, 5, "yellow")
    soundEffects.playExplosionSound();
    player.alive = false
    currentState = GameState.gameOver
    document.body.append(gameOverScreen)


}


const spawnGrid = () => {
    if (grid.invaders.length === 0) { 
        grid.rows = Math.round(Math.random() * 9 + 1)
        grid.cols = Math.round(Math.random() * 9 + 1)
        incrementLevel();
        soundEffects.playNextLevelSound();
        grid.restart()
    }
}


const gameloop = () => {

ctx.clearRect(0, 0, canvas.width, canvas.height);

if (currentState == GameState.PLAYING) {

drawBackground();

checkShootInvaders();

drawProjectiles();

clearProjectiles();

drawParticles();

clearParticles();

checkShootPlayer();

drawObstacles();

checkShootObstacles();

showGameData();

soundEffects.adjustVolumes();




grid.draw(ctx);
grid.update(player.alive);

spawnGrid();

ctx.save();
ctx.translate
(   
    player.position.x + player.widht/2, 
    player.position.y + player.height/2
);


if(keys.left && player.position.x >= 0) {
    player.moveLeft();
    ctx.rotate(-0.15);
}

if(keys.right && player.position.x <= canvas.width - player.widht) {
    player.moveRight();
    ctx.rotate(0.15);
}

if(keys.up && player.position.y >= 0) {
   

    player.moveUp(); 
}

if(keys.down && player.position.y <= canvas.height - player.widht) {
    player.moveDown()
}

ctx.translate
(   
    -player.position.x - player.widht/2, 
    -player.position.y - player.height/2
);

if (keys.shoot.pressed && keys.shoot.released) {
    soundEffects.playShootSound();
    player.shoot(playerProjectiles);
    keys.shoot.released = false;
}


player.draw(ctx);

ctx.restore();
}


requestAnimationFrame(gameloop)


if (currentState == GameState.gameOver) {
    drawParticles();
    drawProjectiles();
    grid.draw(ctx);
    grid.update(player.alive);

    clearParticles();
    clearProjectiles();
    drawObstacles();
    checkShootObstacles();

    buttonRestart.addEventListener("click", () => {
        player.alive = true;
        grid.invaders.length = 0;
        grid.invadersVelocity = 1;
        playerProjectiles.length = 0;
        invaderProjectiles.length = 0;
        gameData.score = 0;
        gameData.level = 0;
        gameOverScreen.remove();
        currentState = GameState.PLAYING;})




    
}}




addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if(key === "a") keys.left = true;

    if(key === "d") keys.right = true;

    if(key === "w") keys.up = true;

    if(key === "s") keys.down = true;
    
    if (key === " ") keys.shoot.pressed = true
})


addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();

    if(key === "a") keys.left = false;

    if(key === "d") keys.right = false;

// fizemos as funções pra nave mover verticalmente, mas não combinou com o jogo, então deixamos comentadas

    // if(key === "w") keys.up = false;

    // if(key === "s") keys.down = false;

    if(key === " ") {
        
        keys.shoot.pressed = false,
        keys.shoot.released = true}
})

buttonPlay.addEventListener("click", () => {
    startScreen.remove();
    

    if (!cutscenePlayed) {
        cutscenePlayed = true;
        playCutscene(); // roda animação e depois inicia o jogo
      } else {
        currentState = GameState.PLAYING;
        scoreUi.style.display = "block";
      }

    setInterval(() => {
        const invader = grid.getRandominvader();
        if (invader) {
            invader.shoot(invaderProjectiles);
        }
    }, 1000);
});

gameloop();

