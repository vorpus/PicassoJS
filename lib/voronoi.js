const Canvas = require('./canvas');
const d3 = require('./d3-voronoi/d3.v3.min.js')
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

  });

  $('.image-upload').on('change', (e) => {
    let reader = new FileReader();
    reader.onload = (e) => {

      resetSlider();
      let newImage = new Image();

      thisCanvas.replaceImage(e.target.result, ctx);
    }
    reader.readAsDataURL(e.target.files[0]);
  });

  $('.clear-button').on("click", () => {
    resetSlider();

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
    $('#how-many').text(e.target.value);
  });

  $('.toggle-points').on("click", () => {
    thisCanvas.togglePoints();
    thisCanvas.draw(ctx);
  });

  $('.toggle-borders').on("click", () => {
    thisCanvas.toggleBorders();
    thisCanvas.draw(ctx);
  });

  $('.toggle-mode').on("click", () => {
    thisCanvas.toggleAccurate();
    thisCanvas.draw(ctx);
    $('.toggle-mode-display').toggleClass('current-show');
  });

  $('li').on("click", (e) => {
    resetSlider();
    thisCanvas.replaceImage(e.target.attributes.data.nodeValue, ctx);
  });

  function resetSlider() {
    thisCanvas.removeAllPoints();
    $('.main-column-slider')[0].value = 0;
    $('#how-many').text('0');
  }

  // thisCanvas.replaceImage('pictures/marina.jpg', ctx);
});
