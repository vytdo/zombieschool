export default class Player {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.speed = 3; // Reduced speed
    this.direction = { x: 0, y: 0 };
    this.mouseX = 0;
    this.mouseY = 0;
    this.health = 100; // Add health property

    document.addEventListener("keydown", (e) => this.handleKeyDown(e));
    document.addEventListener("keyup", (e) => this.handleKeyUp(e));
    this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
  }

  reduceHealth(amount) {
    this.health -= amount;
    if (this.health < 0) {
      this.health = 0;
    }
  }

  handleKeyDown(event) {
    switch (event.key) {
      case "ArrowLeft":
        this.direction.x = -1;
        break;
      case "ArrowRight":
        this.direction.x = 1;
        break;
      case "ArrowUp":
        this.direction.y = -1;
        break;
      case "ArrowDown":
        this.direction.y = 1;
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
        this.direction.x = 0;
        break;
      case "ArrowUp":
      case "ArrowDown":
        this.direction.y = 0;
        break;
    }
  }

  handleMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }

  update() {
    const angle = Math.atan2(this.mouseY - this.y, this.mouseX - this.x);
    this.direction.x = Math.cos(angle);
    this.direction.y = Math.sin(angle);

    this.x += this.direction.x * this.speed;
    this.y += this.direction.y * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.atan2(this.mouseY - this.y, this.mouseX - this.x));
    ctx.fillStyle = "blue";
    ctx.fillRect(-10, -10, 20, 20); // Draw the player centered on its position
    ctx.restore();
  }
}
