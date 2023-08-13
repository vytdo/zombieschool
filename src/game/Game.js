import Player from "./Player.js";
import Zombie from "./Zombie.js";
import Gun from "../weapons/Gun.js";

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.player = new Player(
      this.canvas,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.zombies = [
      new Zombie(100, 100),
      new Zombie(200, 200),
      // Add more zombies as needed
    ];
    this.gun = new Gun(400, 300); // Place the gun somewhere on the canvas
    this.shooting = false;

    canvas.addEventListener("mousedown", () => (this.shooting = true));
    canvas.addEventListener("mouseup", () => (this.shooting = false));
  }

  start() {
    this.loop();
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }

  update() {
    this.player.update();

    this.zombies.forEach((zombie) => {
      zombie.update(this.player.x, this.player.y);

      // Check for collision with player
      const distance = Math.sqrt(
        (zombie.x - this.player.x) ** 2 + (zombie.y - this.player.y) ** 2
      );

      const collisionThreshold = 20;

      if (distance < collisionThreshold) {
        this.player.reduceHealth(1);
      }
    });

    // Check for collision with gun
    const distanceToGun = Math.sqrt(
      (this.gun.x - this.player.x) ** 2 + (this.gun.y - this.player.y) ** 2
    );

    if (distanceToGun < 20 && !this.gun.pickedUp) {
      this.gun.pickUp();
    }

    // Calculate the distance between the mouse cursor and the player
    const distanceToCursor = Math.sqrt(
      (this.player.mouseX - this.player.x) ** 2 +
        (this.player.mouseY - this.player.y) ** 2
    );

    const minShootingDistance = 5;

    // Update gun bullets only if the cursor is far enough from the player
    if (
      this.gun.pickedUp &&
      this.shooting &&
      distanceToCursor > minShootingDistance
    ) {
      const angle = Math.atan2(
        this.player.mouseY - this.player.y,
        this.player.mouseX - this.player.x
      );
      this.gun.shoot(this.player.x, this.player.y, angle);
    }
    this.gun.updateBullets();

    this.gun.bullets.forEach((bullet, bulletIndex) => {
      this.zombies.forEach((zombie, zombieIndex) => {
        const distance = Math.sqrt(
          (bullet.x - zombie.x) ** 2 + (bullet.y - zombie.y) ** 2
        );

        if (distance < 20) {
          this.gun.bullets.splice(bulletIndex, 1);
          this.zombies.splice(zombieIndex, 1);
        }
      });
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    this.zombies.forEach((zombie) => zombie.draw(this.ctx));
    this.gun.draw(this.ctx);
    this.gun.drawBullets(this.ctx);
    this.drawHealth();
  }

  drawHealth() {
    this.ctx.fillStyle = "black";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Health: ${this.player.health}`, 10, 30);
  }
}
