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

  $('.heading, .below-canvas').mouseover(() => {
    $('.heading').removeClass('fadeout');
    $('.below-canvas').removeClass('fadeout');
  });


  $('canvas').on("mousedown", (e) => {
    $('.heading').addClass('fadeout');
    $('.below-canvas').addClass('fadeout');
    $('.canvas-instructions').addClass('hide-me');


    let mousePos = getMousePos(canvas, e);
    clicked(mousePos);

    $('canvas').on("mousemove", (e) => {
      mousePos = getMousePos(canvas, e);
    });
    let drag = window.setInterval(() => {
      clicked(mousePos);
    }, 100);

    $('canvas').on("mouseup", (e) => {
      window.clearInterval(drag);
      $('canvas').off("mouseup");
    });

  });

  function clicked(mousePos) {
    thisCanvas.addPoint([mousePos.x, mousePos.y]);
    $('.main-column-slider')[0].value = parseInt($('.main-column-slider')[0].value) + 1;
    thisCanvas.draw(ctx);
    $('#how-many').text(thisCanvas.points.length);
  }



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
      thisCanvas.addPoint([Math.floor(Math.random()*Canvas.DIM_X),
                          Math.floor(Math.random()*Canvas.DIM_Y)]);
    }
    while (e.target.value < thisCanvas.checkPoints().length) {
      thisCanvas.popPoint();
    }
    thisCanvas.draw(ctx);
    $('#how-many').text(e.target.value);
  });

  $('.toggle-points').on("click", () => {
    $('.toggle-points').toggleClass('selected');
    thisCanvas.togglePoints();
    thisCanvas.draw(ctx);
  });

  $('.toggle-borders').on("click", () => {
    $('.toggle-borders').toggleClass('selected');
    thisCanvas.toggleBorders();
    thisCanvas.draw(ctx);
  });

  $('.toggle-mode').on("click", () => {
    thisCanvas.toggleAccurate();
    thisCanvas.draw(ctx);
    $('.toggle-mode-display').toggleClass('current-show');
  });

  $('.fullscreen').on("click", () => {
    const el = document.documentElement;
    if(el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen();
    }
    else {
        el.mozRequestFullScreen();
    }
  });

  $('li').on("click", (e) => {
    resetSlider();
    thisCanvas.replaceImage(e.target.attributes.data.nodeValue, ctx);
  });

  $('.toggle-multi-opa').on("click", (e) => {
    $('.toggle-multi-opa').removeClass('selected');
    $(e.target).addClass('selected')
    thisCanvas.setOpacity(parseFloat(e.target.attributes.data.value));
    thisCanvas.draw(ctx);
  });


  function resetSlider() {
    thisCanvas.removeAllPoints();
    $('.main-column-slider')[0].value = 0;
    $('#how-many').text('0');
  }

  // thisCanvas.replaceImage('pictures/marina.jpg', ctx);
});
