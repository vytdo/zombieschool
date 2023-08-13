export default class Weapon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pickedUp = false;
  }

  draw(ctx) {
    if (!this.pickedUp) {
      ctx.fillStyle = "gray";
      ctx.fillRect(this.x - 5, this.y - 5, 10, 10); // Draw the weapon as a small square
    }
  }

  pickUp() {
    this.pickedUp = true;
  }
}
