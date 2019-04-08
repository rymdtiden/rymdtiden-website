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

  var mouseOffsetX = 0;
  var mouseOffsetY = 0;
  var scrollOffsetY = 0;
  var speedOffset = 0;
  var speedOffsetExpo = 0;
  var animationOffsetX = 0;
  var animationOffsetY = 0;
  var animationSpeedOffset = 0;

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

    HALF_WIDTH = WIDTH / 2;
    HALF_HEIGHT = HEIGHT / 2;

    // animation offset
    animationOffsetX += (mouseOffsetX - animationOffsetX) * 0.1;
    animationOffsetY += (mouseOffsetY - scrollOffsetY - animationOffsetY) * 0.1;

    // speed offset animation
    animationSpeedOffset +=
      (speedOffset - animationSpeedOffset) * speedOffsetExpo;

    // render space
    context.fillStyle = "rgba(0,0,0,1)";
    context.fillRect(0, 0, WIDTH, HEIGHT);

    // render each star
    for (var i = 0; i < STARS; i++) {
      var x = stars[i].x;
      var y = stars[i].y;
      var z = stars[i].z;

      // move star
      z -= SPEED + animationSpeedOffset;

      // reset star if it passes the fov
      if (z < -FOV) z += DEPTH;

      // update star z
      stars[i].z = z;

      // calculate position and scale
      var scale = FOV / (FOV + z);
      var x2d = x * scale + HALF_WIDTH + animationOffsetX;
      var y2d = y * scale + HALF_HEIGHT + animationOffsetY;

      // render to canvas context
      context.beginPath();
      context.fillStyle = "#fff";
      context.moveTo(x2d, y2d);
      context.arc(x2d, y2d, 0.5 * scale, 0, Math.PI * 2, true);
      context.fill();
    }
  };

  var resize = function() {
    canvas.width = WIDTH = canvas.offsetWidth;
    canvas.height = HEIGHT = canvas.offsetHeight;
  };

  var moveSpace = function(x, y) {
    mouseOffsetX = (HALF_WIDTH - x) * 0.1;
    mouseOffsetY = (HALF_HEIGHT - y) * 0.1;
  };

  var panSpace = function(y) {
    scrollOffsetY = y * -0.25;
  };

  window.addEventListener("resize", function() {
    resize();
  });

  window.addEventListener("mousemove", function(event) {
    moveSpace(event.clientX, event.clientY);
  });

  window.addEventListener("touchstart", function(event) {
    var touch = event.touches[0];
    moveSpace(touch.clientX, touch.clientY);
  });

  window.addEventListener("touchmove", function(event) {
    var touch = event.touches[0];
    moveSpace(touch.clientX, touch.clientY);
  });

  window.addEventListener("scroll", function() {
    panSpace(window.pageYOffset);
  });

  canvas.parentElement.addEventListener("mousedown", function() {
    speedOffsetExpo = 0.001;
    speedOffset = 20;
  });

  canvas.parentElement.addEventListener("mouseup", function() {
    speedOffsetExpo = 0.1;
    speedOffset = 0;
  });

  render();
  resize();
})();
