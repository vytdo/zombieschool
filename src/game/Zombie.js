export default class Zombie {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.health = 3; // Initial health of the zombie
    this.direction = { x: 0, y: 0 };
  }

  reduceHealth(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
    }
  }

  avoidCollision(otherZombie) {
    const dx = this.x - otherZombie.x;
    const dy = this.y - otherZombie.y;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const avoidanceForce = 5; // Adjust this value to change how strongly the zombies push each other away

    if (distance < 20) {
      // 20 is the collision threshold; adjust as needed
      this.x += (dx / distance) * avoidanceForce;
      this.y += (dy / distance) * avoidanceForce;
    }
  }

  avoidPlayerCollision(player) {
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const avoidanceForce = 5; // Adjust this value to change how strongly the zombies push away from the player

    if (distance < 20) {
      // 20 is the collision threshold; adjust as needed
      this.x += (dx / distance) * avoidanceForce;
      this.y += (dy / distance) * avoidanceForce;
    }
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
