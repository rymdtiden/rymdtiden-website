(function() {
  var canvas = document.getElementById("animation");

  var FOV = 250;
  var DEPTH = 400;
  var WIDTH = canvas.offsetWidth;
  var HEIGHT = canvas.offsetHeight;
  var STARS = 1000;
  var SPEED = 0.3;

  var HALF_WIDTH = WIDTH / 2;
  var HALF_HEIGHT = HEIGHT / 2;
  var HALF_DEPTH = DEPTH / 2;

  var context = canvas.getContext("2d");
  var stars = [];

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

  var render = function() {
    requestAnimationFrame(render);

    WIDTH = canvas.offsetWidth;
    HEIGHT = canvas.offsetHeight;

    HALF_WIDTH = WIDTH / 2;
    HALF_HEIGHT = HEIGHT / 2;

    // set canvas size
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

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

  render();
})();
