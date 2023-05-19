/**
 * Event listener function that initializes the game when the window loads.
 *
 * @param {Event} event - The window load event.
 */
window.addEventListener("load", function (event) {
  const ZONE_PREFIX = "./assets/zone";
  const ZONE_SUFFIX = ".json";
  let tileSetImage;

  /**
   * Event listener function for keydown and keyup events.
   *
   * @param {KeyboardEvent} event - The keyboard event.
   */
  var keyDownUp = function (event) {
    controller.keyDownUp(event.type, event.keyCode);
  };

  /**
   * Event listener function for resize events.
   *
   * @param {Event} event - The resize event.
   */
  var resize = function (event) {
    display.resize(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
      world.height / world.width
    );
    display.render();

    var rectangle = display.context.canvas.getBoundingClientRect();

    p.style.left = rectangle.left + "px";
    p.style.top = rectangle.top + "px";
    p.style.fontSize =
      (world.tileSet.tileSize * rectangle.height) / world.height + "px";
  };

  /**
   * Renders the game.
   */
  var render = function () {
    var frame = undefined;

    display.drawMap(
      tileSetImage,
      world.tileSet.columns,
      world.graphicalMap,
      world.columns,
      world.tileSet.tileSize
    );

    for (let index = world.carrots.length - 1; index > -1; --index) {
      let carrot = world.carrots[index];

      frame = world.tileSet.frames[carrot.frameValue];

      display.drawObject(
        tileSetImage,
        frame.x,
        frame.y,
        carrot.x +
          Math.floor(carrot.width * 0.5 - frame.width * 0.5) +
          frame.offsetX,
        carrot.y + frame.offsetY,
        frame.width,
        frame.height
      );
    }

    frame = world.tileSet.frames[world.player.frameValue];

    display.drawObject(
      tileSetImage,
      frame.x,
      frame.y,
      world.player.x +
        Math.floor(world.player.width * 0.5 - frame.width * 0.5) +
        frame.offsetX,
      world.player.y + frame.offsetY,
      frame.width,
      frame.height
    );

    for (let index = world.grass.length - 1; index > -1; --index) {
      let grass = world.grass[index];

      frame = world.tileSet.frames[grass.frameValue];

      display.drawObject(
        tileSetImage,
        frame.x,
        frame.y,
        grass.x + frame.offsetX,
        grass.y + frame.offsetY,
        frame.width,
        frame.height
      );
    }

    p.innerHTML = "Carrots: " + world.carrotCount;

    display.render();
  };

  /**
   * Updates the game state.
   */
  var update = function () {
    if (controller.left.active) {
      world.player.moveLeft();
    }
    if (controller.right.active) {
      world.player.moveRight();
    }
    if (controller.up.active) {
      world.player.jump();
      controller.up.active = false;
    }

    world.update();

    if (world.door) {
      engine.stop();

      import(ZONE_PREFIX + world.door.destinationZone + ZONE_SUFFIX).then(
        (zone) => {
          world.setup(zone);

          engine.start();
        }
      );

      return;
    }
  };

  var controller = new Controller();
  var display = new Display(document.querySelector("canvas"));
  var world = new World();
  var engine = new Engine(1000 / 30, render, update);

  var p = document.createElement("p");
  p.setAttribute("style", "color:#c07000; font-size:2.0em; position:fixed;");
  p.innerHTML = "Carrots: 0";
  document.body.appendChild(p);

  display.buffer.canvas.height = world.height;
  display.buffer.canvas.width = world.width;
  display.buffer.imageSmoothingEnabled = false;

  tileSetImg.getImage().then((img) => {
    tileSetImage = img;
    world.setup(zone00);
    resize();
    engine.start();
  });

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  window.addEventListener("resize", resize);
});
