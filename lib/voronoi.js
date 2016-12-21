const Canvas = require('./canvas');
const Point = require('./point');
const voronoi = require('./d3-voronoi/d3.v3.min.js')
const jQuery = require('jquery');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');

  canvas.width = Canvas.DIM_X;
  canvas.height = Canvas.DIM_Y;

  const ctx = canvas.getContext('2d');

  ctx.fillStyle = Canvas.BG_COLOR;
  ctx.fillRect(0, 0, Canvas.DIM_X, Canvas.DIM_Y);

  function getMousePos(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  const thisCanvas = new Canvas();


  canvas.addEventListener("click", (e) => {
    let mousePos = getMousePos(canvas, e);
    thisCanvas.addPoint([mousePos.x, mousePos.y]);
    $('.main-column-slider')[0].value = parseInt($('.main-column-slider')[0].value) + 1;
    thisCanvas.draw(ctx);
    debugger
  });

  $('.image-upload').on('change', (e) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      let newImage = new Image();
      // newImage.onload = () => {
      //
      // }
      thisCanvas.replaceImage(e.target.result, ctx);
    }
    reader.readAsDataURL(e.target.files[0]);
  });

  $('.clear-button').on("click", () => {
    thisCanvas.removeAllPoints();
    $('.main-column-slider')[0].value = 0;
    // for (let i = 0; i < 50; i++) {
    //   thisCanvas.addPoint([Math.floor(Math.random()*Canvas.DIM_X), Math.floor(Math.random()*Canvas.DIM_Y)]);
    // }
    thisCanvas.draw(ctx);
  });

  $('.main-column-slider').on("input", (e) => {
    while (e.target.value > thisCanvas.checkPoints().length) {
      thisCanvas.addPoint([Math.floor(Math.random()*Canvas.DIM_X), Math.floor(Math.random()*Canvas.DIM_Y)]);
    }
    while (e.target.value < thisCanvas.checkPoints().length) {
      thisCanvas.popPoint();
    }
      thisCanvas.draw(ctx);
  });
});
