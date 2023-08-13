import Weapon from "./Weapon.js";

export default class Gun extends Weapon {
  constructor(x, y) {
    super(x, y); // Call the super constructor from Weapon class
    this.name = "Gun"; // Add a name for the item
    this.bullets = [];
  }

  draw(ctx) {
    if (!this.pickedUp) {
      // Only draw if the gun has not been picked up
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI); // Draw a circle with a radius of 5
      ctx.fill();
    }
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
