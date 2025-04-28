import Invader from "./invader.js";

class Grid {
    constructor(rows, cols) {

        this.rows = rows;
        this.cols = cols;
        
        this.invadersVelocity = 1;
        this.invaders = this.init();
        
        this.direction = "right";
        this.movedown = "false";

    }

    init() {
        const array = [];

        for (let row = 0; row < this.rows; row += 1) {
         
            for (let col = 0; col < this.cols; col += 1) {
                const invader = new Invader({
                    x: col * 50 + 20,
                    y: row * 37 + 20,
                }, this.invadersVelocity
            );

                array.push(invader);
            }
        }

        return array;

    }

    draw(ctx) {
        this.invaders.forEach(invader => invader.draw(ctx));
    }

    update () {
          if (this.touched_right_border()) {
              this.direction = "left";
              this.movedown = true;
        }
            else if (this.touched_left_border()) {
                this.direction = "right";
                this.movedown = "true"
            }
    
      this.invaders.forEach((invader) => {

        if (this.movedown) { 
            invader.moveDown();
            invader.incrementVelocity(0.1)
            this.invadersVelocity = invader.velocity;
        }

        if (this.direction === "right") invader.moveRight();
        if (this.direction === "left") invader.moveLeft();

    });    
    
    this.movedown = false

    }

    touched_right_border() {
        return this.invaders.some(
            
            (invader) => invader.position.x >= innerWidth - invader.widht);

    }

    touched_left_border() {
        return this.invaders.some(
            
            (invader) => invader.position.x <= 0);

    }

    getRandominvader() {
        const index = Math.floor(Math.random() * this.invaders.length);
        return this.invaders[index];
    }

    }

export default Grid;