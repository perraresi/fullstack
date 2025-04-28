import {PATH_SPACESHIP_IMAGE, PATH_ENGINE_IMAGE, PATH_ENGINE_SPRITES, INITIAL_FRAMES} from "../utils/constants.js";
import Projectile from "./Projectile.js";

class Player {
    constructor(canvasWidth, canvasHeight) {
        
        this.widht = 48 * 2;
        this.height = 48 * 2;
        this.position = {
            x: canvasWidth / 2 - this.widht / 2,
            y: canvasHeight - this.height - 30,
        };
        this.velocity = 6;

        this.image = this.getImage(PATH_SPACESHIP_IMAGE);
        this.engineImage = this.getImage(PATH_ENGINE_IMAGE);
        this.engineSprites = this.getImage(PATH_ENGINE_SPRITES);

        this.sx = 0;
        this.framesCounter = INITIAL_FRAMES
    }

    getImage(path) {
        const image = new Image();
        image.src = path;
        return image;
    }


    moveLeft() {
        this.position.x -= this.velocity
    }

    moveRight() {
        this.position.x += this.velocity
    }

    moveUp() {
        this.position.y -= this.velocity
    }

    moveDown() {
        this.position.y += this.velocity
    }

    draw(ctx) {
 ctx.drawImage(

    this.image,
    this.position.x, 
    this.position.y, 
    this.widht, 
    this.height
)

ctx.drawImage(
    this.engineSprites,

    this.sx, 
    0, 
    48, 
    48,
    this.position.x,
    this.position.y + 11,
    this.widht,
    this.height
)

ctx.drawImage(
    this.engineImage,
    this.position.x,
    this.position.y + 8,
    this.widht,
    this.height

);

this.update();

    };

    update() {

        if (this.framesCounter === 0) {
            this.sx = this.sx === 96 ? 0 : this.sx + 48;
            this.framesCounter = INITIAL_FRAMES;
        }

            this.framesCounter--;
    }

    shoot(projectiles){
        const p = new Projectile({
            
            x: this.position.x + this.widht / 2,
            y: this.position.y

        }, -10)
        projectiles.push(p);
    }

};



export default Player;