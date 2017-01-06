const d3poly = require('./d3-voronoi/d3-polygon.v1.min.js')

class Canvas {
  constructor(ctx) {
    this.points = [];
    this.voronoi = d3.geom.voronoi()
                      .size([Canvas.DIM_X, Canvas.DIM_Y]);
    this.image = new Image();
    this.colorMap = {};

    this.showAccurate = false;
    this.showBorders = true;
    this.showPoints = true;
  }

  togglePoints() {
    this.showPoints = !this.showPoints;
  }

  toggleBorders() {
    this.showBorders = !this.showBorders;
  }

  toggleAccurate() {
    this.showAccurate = !this.showAccurate;
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
    this.clearCanvas(ctx);
    const newImage = new Image();
    newImage.src = img;

    newImage.onload = (e) => {
      this.image = newImage;
      this.renderImage(ctx);
      this.calculateColorMap(ctx);
    }
  }

  calculateColorMap(ctx) {
    let reds = [];
    let greens = [];
    let blues = [];
    let alpha = [];

    const colorMap = ctx.getImageData(0, 0, Canvas.DIM_X, Canvas.DIM_Y);

    let colorfuls = [reds, greens, blues, alpha];
    for (let i = 0; i < colorMap.data.length; i++) {
      colorfuls[i%4].push(colorMap.data[i]);
    }

    let reds2d = [];
    let greens2d = [];
    let blues2d = [];

    for (let j = 0; j < Canvas.DIM_Y; j++) {
      reds2d.push(reds.splice(0, Canvas.DIM_X));
      greens2d.push(greens.splice(0, Canvas.DIM_X));
      blues2d.push(blues.splice(0, Canvas.DIM_X));
    }

    this.colorMap = {
      reds: reds2d,
      greens: greens2d,
      blues: blues2d
    }
  }


  getVoronoiPolys() {
    const vorPolys = this.voronoi(this.points);
    return vorPolys;
  }

  printPolys(polys, ctx) {
    polys.forEach((polygon, idx) => {
      ctx.beginPath();

      let fillColor;
      if (this.showAccurate) {
        fillColor = this.averageColors(polygon, ctx);
      } else {
        fillColor = this.quickColors(polygon, ctx);
      }

      ctx.fillStyle = fillColor;

      polygon.forEach((vertex) => ctx.lineTo(...vertex));

      if (this.showBorders) {
        ctx.stroke();
      }
      ctx.fill();
    });
  }

  averageColors(polygon, ctx) {
    let bounds = this.squareBounds(polygon);

    let smallReds; let smallGreens; let smallBlues;
    [smallReds, smallGreens, smallBlues] = this.submatrix(bounds);

    let polyReds = this.sumColorsBoundedByPolygon(polygon, bounds, smallReds);
    let polyGreens = this.sumColorsBoundedByPolygon(polygon, bounds, smallGreens);
    let polyBlues = this.sumColorsBoundedByPolygon(polygon, bounds, smallBlues);

    return d3.rgb(polyReds, polyGreens, polyBlues);
  }

  quickColors(polygon, ctx) {
    let bounds = this.squareBounds(polygon);
    let yCenter = Math.round((bounds.ymin + bounds.ymax)/2);
    let xCenter = Math.round((bounds.xmin + bounds.xmax)/2);

    let quickReds = this.colorMap.reds[yCenter][xCenter];
    let quickGreens = this.colorMap.greens[yCenter][xCenter];
    let quickBlues = this.colorMap.blues[yCenter][xCenter];

    return d3.rgb(quickReds, quickGreens, quickBlues);
  }

  colorsBoundedByPolygon(polygon, bounds, polyColors) {
    const boundedColors = [];
    polyColors.forEach((colorRow, rowIdxY) => {
      colorRow.forEach((colorEl, elIdxX) => {
        if (d3poly.polygonContains(polygon, [bounds.xmin + elIdxX, bounds.ymin + rowIdxY])) {
          boundedColors.push(colorEl);
        }
      });
    });
    return boundedColors;
  }

  sumColorsBoundedByPolygon(polygon, bounds, polyColors) {
    let boundedColorsSum = 0;
    let boundedCount = 0;
    polyColors.forEach((colorRow, rowIdxY) => {
      colorRow.forEach((colorEl, elIdxX) => {
        if (d3poly.polygonContains(polygon, [bounds.xmin + elIdxX, bounds.ymin + rowIdxY])) {
          boundedColorsSum += colorEl;
          boundedCount++;
        }
      });
    });
    return Math.floor(boundedColorsSum/boundedCount);
  }

  submatrix(bounds) {
    let relevantRedRows = this.colorMap.reds.slice(Math.floor(bounds.ymin), Math.floor(bounds.ymax));
    let relevantReds = relevantRedRows.map((row) => {
      return row.slice(Math.floor(bounds.xmin), Math.floor(bounds.xmax));
    });
    let relevantGreenRows = this.colorMap.greens.slice(Math.floor(bounds.ymin), Math.floor(bounds.ymax));
    let relevantGreens = relevantGreenRows.map((row) => {
      return row.slice(Math.floor(bounds.xmin), Math.floor(bounds.xmax));
    });
    let relevantBlueRows = this.colorMap.blues.slice(Math.floor(bounds.ymin), Math.floor(bounds.ymax));
    let relevantBlues = relevantBlueRows.map((row) => {
      return row.slice(Math.floor(bounds.xmin), Math.floor(bounds.xmax));
    });
    return [relevantReds,relevantGreens,relevantBlues];
  }

  squareBounds(polygon) {
    let polyMinX = Canvas.DIM_X;
    let polyMinY = Canvas.DIM_Y;
    let polyMaxX = 0;
    let polyMaxY = 0;

    polygon.forEach((vertex) => {
      if (vertex[0] < polyMinX) {
        polyMinX = vertex[0];
        if (polyMinX < 0) {
          polyMinX = 0;
        }
      }
      if (vertex[0] > polyMaxX) {
        polyMaxX = vertex[0];
      }
      if (vertex[1] < polyMinY) {
        polyMinY = vertex[1];
        if (polyMinY < 0) {
          polyMinY = 0;
        }
      }
      if (vertex[1] > polyMaxY) {
        polyMaxY = vertex[1];
      }
    });

    return({
      xmin: polyMinX,
      xmax: polyMaxX,
      ymin: polyMinY,
      ymax: polyMaxY
    })
  }

  renderImage(ctx) {
      ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height,
                                0, 0, Canvas.DIM_X, Canvas.DIM_Y);
  }

  renderPoints(ctx) {
    this.points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point[0], point[1], 2, 0, 2*Math.PI, false);
      ctx.fillStyle = 'green';
      ctx.closePath();
      ctx.fill();
    });
  }

  clearCanvas(ctx) {
    ctx.fillStyle = Canvas.BG_COLOR;
    ctx.fillRect(0, 0, Canvas.DIM_X, Canvas.DIM_Y);
  }

  draw(ctx) {
    this.clearCanvas(ctx);

    ctx.fillStyle = Canvas.BG_COLOR;
    ctx.fillRect(0, 0, Canvas.DIM_X, Canvas.DIM_Y);

    this.renderImage(ctx);

    let vorPolys = this.getVoronoiPolys();
    this.printPolys(vorPolys, ctx);

    if (this.showPoints) {
      this.renderPoints(ctx);
    }
  }
}

Canvas.BG_COLOR = "#ffffff";
Canvas.DIM_X = 1200;
Canvas.DIM_Y = 800;
Canvas.FPS = 32;
Canvas.NUM_ASTEROIDS = 10;

module.exports = Canvas;
