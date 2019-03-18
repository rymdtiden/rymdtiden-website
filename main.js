(function() {
  var FOV = 250;
  var DEPTH = 400;
  var WIDTH = 1440;
  var HEIGHT = 900;
  var STARS = 1000;
  var SPEED = 1;

  var HALF_WIDTH = WIDTH / 2;
  var HALF_HEIGHT = HEIGHT / 2;
  var HALF_DEPTH = DEPTH / 2;

  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var stars = [];

  // add canvas to target element
  document.getElementById("animation").appendChild(canvas);

  // create stars data
  for (var i = 0; i < STARS; i++) {
    stars[i] = {
      x: Math.random() * WIDTH - HALF_WIDTH,
      y: Math.random() * HEIGHT - HALF_HEIGHT,
      z: Math.random() * DEPTH - HALF_DEPTH
    };
  }

  // disable canvas smoothing
  context.imageSmoothingEnabled = false;

  // set canvas size
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  // set canvas style
  canvas.style.cssText =
    "display: block; width: 100%; height: auto; background-color: black;";

  var render = function() {
    // clear canvas of stars
    context.fillStyle = "rgb(0,0,0)";
    context.clearRect(0, 0, WIDTH, HEIGHT);

    // render each star
    for (var i = 0; i < STARS; i++) {
      var x = stars[i].x;
      var y = stars[i].y;
      var z = stars[i].z;

      // move star
      z -= SPEED;

      // reset star if it passes the fov
      if (z < -FOV) z += DEPTH;

      // update star z
      stars[i].z = z;

      // calculate position and scale
      var scale = FOV / (FOV + z);
      var x2d = x * scale + HALF_WIDTH;
      var y2d = y * scale + HALF_HEIGHT;

      // render to canvas context
      context.lineWidth = scale;
      context.strokeStyle = "rgb(255,255,255)";
      context.beginPath();
      context.moveTo(x2d, y2d);
      context.lineTo(x2d + scale, y2d);
      context.stroke();
    }
  };

  // start animation
  setInterval(function() {
    render();
  }, 50);
})();
