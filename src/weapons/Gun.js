import Weapon from "./Weapon.js";

export default class Gun extends Weapon {
  constructor(x, y) {
    super(x, y);
    this.bullets = [];
  }

  shoot(x, y, angle) {
    this.bullets.push({ x, y, angle, speed: 10 });
  }

  updateBullets() {
    this.bullets.forEach((bullet) => {
      bullet.x += Math.cos(bullet.angle) * bullet.speed;
      bullet.y += Math.sin(bullet.angle) * bullet.speed;
    });
  }

  drawBullets(ctx) {
    this.bullets.forEach((bullet) => {
      ctx.fillStyle = "black";
      ctx.fillRect(bullet.x - 2, bullet.y - 2, 4, 4); // Draw the bullets as small squares
    });
  }
}
