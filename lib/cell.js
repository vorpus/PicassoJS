class Cell {
  constructor(options) {
    this.vertices = options.vertices;
    this.color = options.color;
  }

  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(0,0);
    this.vertices.forEach((point) => {
      ctx.lineTo(...point);
    });
    ctx.closePath();
    ctx.fill();
  }
}

module.exports = Cell;
