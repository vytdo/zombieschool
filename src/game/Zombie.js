export default class Zombie {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.direction = { x: 0, y: 0 };
  }

  update(playerX, playerY) {
    const angle = Math.atan2(playerY - this.y, playerX - this.x);
    this.direction.x = Math.cos(angle);
    this.direction.y = Math.sin(angle);

    this.x += this.direction.x * this.speed;
    this.y += this.direction.y * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.atan2(this.direction.y, this.direction.x));
    ctx.fillStyle = "red";
    ctx.fillRect(-10, -10, 20, 20); // Draw the zombie centered on its position
    ctx.restore();
  }
}
