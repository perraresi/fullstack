import Player from "./classes/Player.js";
import Projectile from "./classes/Projectile.js";
import Grid from "./classes/Grid.js";
import Invader from "./classes/invader.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


canvas.width = innerWidth;
canvas.height = innerHeight;

ctx.imageSmoothingEnabled = false;

const player = new Player(canvas.width, canvas.height);
const grid = new Grid(3, 6);
const playerProjectiles = [];
const invaderProjectiles = [];


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

const checkShootInvaders = () => {
    grid.invaders.forEach((invader, invaderIndex) => {
        playerProjectiles.some((projectile, projectileIndex) => {
            if (invader.hit(projectile)) {
                grid.invaders.splice(invaderIndex, 1);
                playerProjectiles.splice(projectileIndex, 1);
            }
        });
    });
}


const gameloop = () => {

ctx.clearRect(0, 0, canvas.width, canvas.height);

checkShootInvaders();
drawProjectiles();
clearProjectiles();

grid.draw(ctx);
grid.update();

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
    player.shoot(playerProjectiles);
    keys.shoot.released = false;
}


player.draw(ctx);

ctx.restore();

requestAnimationFrame(gameloop)

}


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

    if(key === "w") keys.up = false;

    if(key === "s") keys.down = false;

    if(key === " ") {
        
        keys.shoot.pressed = false,
        keys.shoot.released = true}
})

setInterval(() => {
 const invader = grid.getRandominvader()

 if (invader) {
    invader.shoot(invaderProjectiles);
 }
}, 1000)


gameloop();