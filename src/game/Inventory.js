export default class Inventory {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Inventory:", 10, 60);

    this.items.forEach((item, index) => {
      ctx.fillText(item.name, 10, 80 + index * 20);
    });
  }
}
