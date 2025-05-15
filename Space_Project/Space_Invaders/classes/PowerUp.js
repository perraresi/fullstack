class PowerUp {

    constructor(position, velocity, color) {
this.position = position;
        this.type = type;
        this.width = 30;
        this.height = 30;
        this.velocity = { x: 0, y: 2 };
        this.image = new Image();
        this.image.src = `./assets/images/powerups/${type}.png`;}

draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.widht, this.height)
}

update() {
    this.position.y += this.velocity
}
}


export default PowerUp;