class Canvas {
  constructor() {
    this.points = [];
    this.voronoi = d3.geom.voronoi()
                      .size([Canvas.DIM_X, Canvas.DIM_Y]);
    this.image = new Image();

    this.image.src = './pictures/600.jpg';
    this.image.crossOrigin = 'Anonymous';
    // this.voronoi.extent([[0,0], [1000, 1000]]);
  }

  addPoint(point) {
    this.points.push(point);
  }

  checkPoints() {
    return this.points;
  }

  popPoint() {
    this.points.pop()
  }

  removeAllPoints() {
    this.points = [];
  }

  replaceImage(img, ctx) {
    this.image.src = img;
    this.renderImage(ctx);
  }


  getVoronoiPolys() {
    const vorPolys = this.voronoi(this.points);
    return vorPolys;
  }

  printPolys(polys, ctx) {
    polys.forEach((polygon) => {
      ctx.beginPath();
      polygon.forEach((vertex) => ctx.lineTo(...vertex));
      ctx.stroke();
    });
  }

  renderImage(ctx) {
      ctx.drawImage(this.image, 0, 0);
  }

  draw(ctx) {

    ctx.fillStyle = Canvas.BG_COLOR;
    ctx.fillRect(0, 0, Canvas.DIM_X, Canvas.DIM_Y);

    this.renderImage(ctx);

    let vorPolys = this.getVoronoiPolys();
    this.printPolys(vorPolys, ctx);



    this.points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point[0], point[1], 2, 0, 2*Math.PI, false);
      ctx.fillStyle = 'green';
      ctx.closePath();
      ctx.fill();
    });
  }
}

Canvas.BG_COLOR = "#ffffff";
Canvas.DIM_X = 700;
Canvas.DIM_Y = 600;
Canvas.FPS = 32;
Canvas.NUM_ASTEROIDS = 10;

module.exports = Canvas;
