/**
 * Represents a basic game object.
 */
export class GameObject {
  /**
   * Creates a new game object.
   * @param {number} x - The x-coordinate of the object.
   * @param {number} y - The y-coordinate of the object.
   * @param {number} width - The width of the object.
   * @param {number} height - The height of the object.
   */
  constructor(x, y, width, height) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  /**
   * Checks if this object collides with another object.
   * @param {GameObject} object - The other object to check collision with.
   * @returns {boolean} - True if the objects collide, false otherwise.
   */
  collideObject(object) {
    if (
      this.getRight() < object.getLeft() ||
      this.getBottom() < object.getTop() ||
      this.getLeft() > object.getRight() ||
      this.getTop() > object.getBottom()
    )
      return false;

    return true;
  }

  /**
   * Checks if the center of this object is inside another object.
   * @param {new:GameObject} object - The other object to check collision with.
   * @returns {boolean} - True if the center of this object is inside the other object, false otherwise.
   */
  collideObjectCenter(object) {
    let centerX = object.getCenterX();
    let centerY = object.getCenterY();

    if (
      centerX < this.getLeft() ||
      centerX > this.getRight() ||
      centerY < this.getTop() ||
      centerY > this.getBottom()
    )
      return false;

    return true;
  }

  /**
   * Returns the y-coordinate of the bottom edge of the object.
   * @returns {number} - The y-coordinate of the bottom edge.
   */
  getBottom() {
    return this.y + this.height;
  }

  /**
   * Returns the x-coordinate of the center of the object.
   * @returns {number} - The x-coordinate of the center.
   */
  getCenterX() {
    return this.x + this.width * 0.5;
  }

  /**
   * Returns the y-coordinate of the center of the object.
   * @returns {number} - The y-coordinate of the center.
   */
  getCenterY() {
    return this.y + this.height * 0.5;
  }

  /**
   * Returns the x-coordinate of the left edge of the object.
   * @returns {number} - The x-coordinate of the left edge.
   */
  getLeft() {
    return this.x;
  }

  /**
   * Returns the x-coordinate of the right edge of the object.
   * @returns {number} - The x-coordinate of the right edge.
   */
  getRight() {
    return this.x + this.width;
  }

  /**
   * Returns the y-coordinate of the top edge of the object.
   * @returns {number} - The y-coordinate of the top edge.
   */
  getTop() {
    return this.y;
  }

  /**
   * Sets the y-coordinate of the bottom edge of the object.
   * @param {number} y - The y-coordinate to set.
   */
  setBottom(y) {
    this.y = y - this.height;
  }

  /**
   * Sets the x-coordinate of the center of the object.
   * @param {number} x - The x-coordinate to set.
   */
  setCenterX(x) {
    this.x = x - this.width * 0.5;
  }

  /**
   * Sets the y-coordinate of the center of the object.
   * @param {number} y - The y-coordinate to set.
   */
  setCenterY(y) {
    this.y = y - this.height * 0.5;
  }

  /**
   * Sets the x-coordinate of the left edge of the object.
   * @param {number} x - The x-coordinate to set.
   */
  setLeft(x) {
    this.x = x;
  }

  /**
   * Sets the x-coordinate of the right edge of the object.
   * @param {number} x - The x-coordinate to set.
   */
  setRight(x) {
    this.x = x - this.width;
  }

  /**
   * Sets the y-coordinate of the top edge of the object.
   * @param {number} y - The y-coordinate to set.
   */
  setTop(y) {
    this.y = y;
  }
}

/**
 * @template T
 * @typedef {new (...args: any[]) => T} Constructor
 */
/**
 * Mixin function that enhances a class with animation capabilities.
 * @template {Constructor<T>} T - The superclass constructor.
 * @param {T} Superclass - The superclass to extend.
 */
export function AnimatorMixin(Superclass) {
  /**
   * Class that adds animation functionality to the provided superclass.
   *
   * @extends Superclass
   */
  return class extends Superclass {
    /**
     * Creates an instance of the Animator class extending the Superclass.
     *
     * @param {number[]} frameSet - The array of frame values.
     * @param {number} delay - The delay between frames in animation (in milliseconds).
     * @param {string} [mode="loop"] - The animation mode ("loop" or "pause").
     * @param {...any} args - Additional arguments passed to the superclass constructor.
     */
    constructor(frameSet, delay, mode = "loop", ...args) {
      super(...args);

      /**
       * The current count for frame animation.
       * @type {number}
       */
      this.count = 0;

      /**
       * The delay between frames in animation (in milliseconds).
       * @type {number}
       */
      this.delay = delay >= 1 ? delay : 1;

      /**
       * The array of frame values.
       * @type {number[]}
       */
      this.frameSet = frameSet;

      /**
       * The index of the current frame.
       * @type {number}
       */
      this.frameIndex = 0;

      /**
       * The value of the current frame.
       * @type {number}
       */
      this.frameValue = frameSet[0];

      /**
       * The animation mode ("loop" or "pause").
       * @type {string}
       */
      this.mode = mode;
    }

    /**
     * Animates the frame based on the current animation mode.
     */
    animate() {
      switch (this.mode) {
        case "loop":
          this.loop();
          break;
        case "pause":
          break;
      }
    }

    /**
     * Changes the frame set and animation parameters.
     *
     * @param {number[]} frameSet - The new array of frame values.
     * @param {string} mode - The new animation mode ("loop" or "pause").
     * @param {number} [delay=10] - The new delay between frames in animation (in milliseconds).
     * @param {number} [frameIndex=0] - The new index of the current frame.
     */
    changeFrameSet(frameSet, mode, delay = 10, frameIndex = 0) {
      if (this.frameSet === frameSet) {
        return;
      }

      this.count = 0;
      this.delay = delay;
      this.frameSet = frameSet;
      this.frameIndex = frameIndex;
      this.frameValue = frameSet[frameIndex];
      this.mode = mode;
    }

    /**
     * Advances the frame animation in loop mode.
     */
    loop() {
      this.count++;

      while (this.count > this.delay) {
        this.count -= this.delay;

        this.frameIndex =
          this.frameIndex < this.frameSet.length - 1 ? this.frameIndex + 1 : 0;

        this.frameValue = this.frameSet[this.frameIndex];
      }
    }
  };
}

/**
 * Represents a collider for collision detection.
 */
export class Collider {
  /**
   * Handles collision based on the provided value.
   * @param {number} value - The collision value.
   * @param {MovingObject} object - The object involved in the collision.
   * @param {number} tileX - The x-coordinate of the tile.
   * @param {number} tileY - The y-coordinate of the tile.
   * @param {number} tileSize - The size of the tile.
   */
  collide(value, object, tileX, tileY, tileSize) {
    switch (value) {
      case 1:
        this.collidePlatformTop(object, tileY);
        break;
      case 2:
        this.collidePlatformRight(object, tileX + tileSize);
        break;
      case 3:
        if (this.collidePlatformTop(object, tileY)) return;
        this.collidePlatformRight(object, tileX + tileSize);
        break;
      case 4:
        this.collidePlatformBottom(object, tileY + tileSize);
        break;
      case 5:
        if (this.collidePlatformTop(object, tileY)) return;
        this.collidePlatformBottom(object, tileY + tileSize);
        break;
      case 6:
        if (this.collidePlatformRight(object, tileX + tileSize)) return;
        this.collidePlatformBottom(object, tileY + tileSize);
        break;
      case 7:
        if (this.collidePlatformTop(object, tileY)) return;
        if (this.collidePlatformBottom(object, tileY + tileSize)) return;
        this.collidePlatformRight(object, tileX + tileSize);
        break;
      case 8:
        this.collidePlatformLeft(object, tileX);
        break;
      case 9:
        if (this.collidePlatformTop(object, tileY)) return;
        this.collidePlatformLeft(object, tileX);
        break;
      case 10:
        if (this.collidePlatformLeft(object, tileX)) return;
        this.collidePlatformRight(object, tileX + tileSize);
        break;
      case 11:
        if (this.collidePlatformTop(object, tileY)) return;
        if (this.collidePlatformLeft(object, tileX)) return;
        this.collidePlatformRight(object, tileX + tileSize);
        break;
      case 12:
        if (this.collidePlatformBottom(object, tileY + tileSize)) return;
        this.collidePlatformLeft(object, tileX);
        break;
      case 13:
        if (this.collidePlatformTop(object, tileY)) return;
        if (this.collidePlatformBottom(object, tileY + tileSize)) return;
        this.collidePlatformLeft(object, tileX);
        break;
      case 14:
        if (this.collidePlatformBottom(object, tileY + tileSize)) return;
        if (this.collidePlatformLeft(object, tileX)) return;
        this.collidePlatformRight(object, tileX + tileSize);
        break;
      case 15:
        if (this.collidePlatformTop(object, tileY)) return;
        if (this.collidePlatformBottom(object, tileY + tileSize)) return;
        if (this.collidePlatformLeft(object, tileX)) return;
        this.collidePlatformRight(object, tileX + tileSize);
        break;
    }
  }

  /**
   * Handles collision with the bottom side of a platform.
   * @param {MovingObject} object - The object involved in the collision.
   * @param {number} tileBottom - The y-coordinate of the bottom side of the platform.
   * @returns {boolean} - Returns true if a collision occurred, false otherwise.
   */
  collidePlatformBottom(object, tileBottom) {
    if (object.getTop() < tileBottom && object.getOldTop() >= tileBottom) {
      object.setTop(tileBottom);
      object.velocityY = 0;
      return true;
    }
    return false;
  }

  /**
   * Handles collision with the left side of a platform.
   * @param {MovingObject} object - The object involved in the collision.
   * @param {number} tileLeft - The x-coordinate of the left side of the platform.
   * @returns {boolean} - Returns true if a collision occurred, false otherwise.
   */
  collidePlatformLeft(object, tileLeft) {
    if (object.getRight() > tileLeft && object.getOldRight() <= tileLeft) {
      object.setRight(tileLeft - 0.01);
      object.velocityX = 0;
      return true;
    }
    return false;
  }

  /**
   * Handles collision with the right side of a platform.
   * @param {MovingObject} object - The object involved in the collision.
   * @param {number} tileRight - The x-coordinate of the right side of the platform.
   * @returns {boolean} - Returns true if a collision occurred, false otherwise.
   */
  collidePlatformRight(object, tileRight) {
    if (object.getLeft() < tileRight && object.getOldLeft() >= tileRight) {
      object.setLeft(tileRight);
      object.velocityX = 0;
      return true;
    }
    return false;
  }

  /**
   * Handles collision with the top side of a platform.
   * @param {MovingObject} object - The object involved in the collision.
   * @param {number} tileTop - The y-coordinate of the top side of the platform.
   * @returns {boolean} - Returns true if a collision occurred, false otherwise.
   */
  collidePlatformTop(object, tileTop) {
    if (object.getBottom() > tileTop && object.getOldBottom() <= tileTop) {
      object.setBottom(tileTop - 0.01);
      object.velocityY = 0;
      object.jumping = false;
      return true;
    }
    return false;
  }
}

/**
 * Frame class representing a frame of animation.
 */
export class Frame {
  /**
   * Constructor for the Frame class.
   * @param {number} x - The x-coordinate of the frame.
   * @param {number} y - The y-coordinate of the frame.
   * @param {number} width - The width of the frame.
   * @param {number} height - The height of the frame.
   * @param {number} [offsetX=0] - The x-offset of the frame.
   * @param {number} [offsetY=0] - The y-offset of the frame.
   */
  constructor(x, y, width, height, offsetX = 0, offsetY = 0) {
    /**
     * The x-coordinate of the frame.
     * @type {number}
     */
    this.x = x;

    /**
     * The y-coordinate of the frame.
     * @type {number}
     */
    this.y = y;

    /**
     * The width of the frame.
     * @type {number}
     */
    this.width = width;

    /**
     * The height of the frame.
     * @type {number}
     */
    this.height = height;

    /**
     * The x-offset of the frame.
     * @type {number}
     */
    this.offsetX = offsetX;

    /**
     * The y-offset of the frame.
     * @type {number}
     */
    this.offsetY = offsetY;
  }
}

/**
 * Represents a moving game object.
 * @extends GameObject
 */
export class MovingObject extends GameObject {
  /**
   * Creates a new moving game object.
   * @param {number} x - The x-coordinate of the object.
   * @param {number} y - The y-coordinate of the object.
   * @param {number} width - The width of the object.
   * @param {number} height - The height of the object.
   * @param {number} velocityMax - The maximum velocity of the object (default: 15).
   */
  constructor(x, y, width, height, velocityMax = 15) {
    super(x, y, width, height);

    this.jumping = false;
    this.velocityMax = velocityMax; // added velocityMax so velocity can't go past 16
    this.velocityX = 0;
    this.velocityY = 0;
    this.xOld = x;
    this.yOld = y;
  }

  /**
   * Returns the y-coordinate of the bottom edge of the object in the previous frame.
   * @returns {number} - The y-coordinate of the bottom edge in the previous frame.
   */
  getOldBottom() {
    return this.yOld + this.height;
  }

  /**
   * Returns the x-coordinate of the center of the object in the previous frame.
   * @returns {number} - The x-coordinate of the center in the previous frame.
   */
  getOldCenterX() {
    return this.xOld + this.width * 0.5;
  }

  /**
   * Returns the y-coordinate of the center of the object in the previous frame.
   * @returns {number} - The y-coordinate of the center in the previous frame.
   */
  getOldCenterY() {
    return this.yOld + this.height * 0.5;
  }

  /**
   * Returns the x-coordinate of the left edge of the object in the previous frame.
   * @returns {number} - The x-coordinate of the left edge in the previous frame.
   */
  getOldLeft() {
    return this.xOld;
  }

  /**
   * Returns the x-coordinate of the right edge of the object in the previous frame.
   * @returns {number} - The x-coordinate of the right edge in the previous frame.
   */
  getOldRight() {
    return this.xOld + this.width;
  }

  /**
   * Returns the y-coordinate of the top edge of the object in the previous frame.
   * @returns {number} - The y-coordinate of the top edge in the previous frame.
   */
  getOldTop() {
    return this.yOld;
  }

  /**
   * Sets the y-coordinate of the bottom edge of the object in the previous frame.
   * @param {number} y - The y-coordinate to set.
   */
  setOldBottom(y) {
    this.yOld = y - this.height;
  }

  /**
   * Sets the x-coordinate of the center of the object in the previous frame.
   * @param {number} x - The x-coordinate to set.
   */
  setOldCenterX(x) {
    this.xOld = x - this.width * 0.5;
  }

  /**
   * Sets the y-coordinate of the center of the object in the previous frame.
   * @param {number} y - The y-coordinate to set.
   */
  setOldCenterY(y) {
    this.yOld = y - this.height * 0.5;
  }

  /**
   * Sets the x-coordinate of the left edge of the object in the previous frame.
   * @param {number} x - The x-coordinate to set.
   */
  setOldLeft(x) {
    this.xOld = x;
  }

  /**
   * Sets the x-coordinate of the right edge of the object in the previous frame.
   * @param {number} x - The x-coordinate to set.
   */
  setOldRight(x) {
    this.xOld = x - this.width;
  }

  /**
   * Sets the y-coordinate of the top edge of the object in the previous frame.
   * @param {number} y - The y-coordinate to set.
   */
  setOldTop(y) {
    this.yOld = y;
  }
}

export const GameObjectAnimator = AnimatorMixin(GameObject);
export const MovingObjectAnimator = AnimatorMixin(MovingObject);
export const Animator = AnimatorMixin(Object);

/**
 * Represents a carrot object.
 * @extends {GameObjectAnimator}
 */
export class Carrot extends GameObjectAnimator {
  /**
   * Creates a new carrot object.
   * @param {number} x - The x-coordinate of the carrot.
   * @param {number} y - The y-coordinate of the carrot.
   */
  constructor(x, y) {
    const frameSets = { twirl: [12, 13] };
    super(frameSets.twirl, 15, "loop", x, y, 7, 14);
    this.frameSets = frameSets;
    this.frameIndex = Math.floor(Math.random() * 2);
    this.baseX = x;
    this.baseY = y;
    this.positionX = Math.random() * Math.PI * 2;
    this.positionY = this.positionX * 2;
  }

  /**
   * Updates the position of the carrot object.
   */
  updatePosition() {
    this.positionX += 0.1;
    this.positionY += 0.2;

    this.x = this.baseX + Math.cos(this.positionX) * 2;
    this.y = this.baseY + Math.sin(this.positionY);
  }
}

/**
 * Represents a grass object.
 * @extends Animator
 */
export class Grass extends Animator {
  /**
   * Creates a new grass object.
   * @param {number} x - The x-coordinate of the grass.
   * @param {number} y - The y-coordinate of the grass.
   */
  constructor(x, y) {
    const frameSets = {
      wave: [14, 15, 16, 15],
    };
    super(frameSets.wave, 25);
    this.frameSets = frameSets;
    this.x = x;
    this.y = y;
  }
}

/**
 * Represents a door object.
 * @extends GameObject
 */
export class Door extends GameObject {
  /**
   * Creates a door object.
   * @param {object} door - The door data.
   * @param {number} door.x - The x-coordinate of the door.
   * @param {number} door.y - The y-coordinate of the door.
   * @param {number} door.width - The width of the door.
   * @param {number} door.height - The height of the door.
   * @param {number} door.destinationX - The x-coordinate of the destination.
   * @param {number} door.destinationY - The y-coordinate of the destination.
   * @param {string} door.destinationZone - The destination zone.
   */
  constructor(door) {
    super(door.x, door.y, door.width, door.height);
    this.destinationX = door.destinationX;
    this.destinationY = door.destinationY;
    this.destinationZone = door.destinationZone;
  }
}

/**
 * Represents a player in the
 * @extends MovingObjectAnimator
 */
export class Player extends MovingObjectAnimator {
  /**
   * Creates a new player.
   * @constructor
   * @param {number} x - The initial x-coordinate of the player.
   * @param {number} y - The initial y-coordinate of the player.
   */
  constructor(x, y) {
    /**
     * Frame sets for different player animations.
     */
    const frameSets = {
      idleLeft: [0],
      jumpLeft: [1],
      moveLeft: [2, 3, 4, 5],
      idleRight: [6],
      jumpRight: [7],
      moveRight: [8, 9, 10, 11],
    };
    super(frameSets.idleLeft, 10, "loop", x, y, 7, 12);

    /**
     * Frame sets for different player animations.
     */
    this.frameSets = frameSets;

    /**
     * Indicates whether the player is currently jumping.
     * @type {boolean}
     */
    this.jumping = true;

    /**
     * The direction of player movement along the x-axis.
     * @type {number}
     */
    this.directionX = -1;

    /**
     * The velocity of the player along the x-axis.
     * @type {number}
     */
    this.velocityX = 0;

    /**
     * The velocity of the player along the y-axis.
     * @type {number}
     */
    this.velocityY = 0;
  }

  /**
   * Makes the player jump if not already jumping and not falling too fast.
   */
  jump() {
    /* Made it so you can only jump if you aren't falling faster than 10px per frame. */
    if (!this.jumping && this.velocityY < 10) {
      this.jumping = true;
      this.velocityY -= 13;
    }
  }

  /**
   * Moves the player to the left.
   */
  moveLeft() {
    this.directionX = -1;
    this.velocityX -= 0.55;
  }

  /**
   * Moves the player to the right.
   */
  moveRight() {
    this.directionX = 1;
    this.velocityX += 0.55;
  }

  /**
   * Updates the player's animation based on the current state.
   */
  updateAnimation() {
    if (this.velocityY < 0) {
      if (this.directionX < 0)
        this.changeFrameSet(this.frameSets.jumpLeft, "pause");
      else this.changeFrameSet(this.frameSets.jumpRight, "pause");
    } else if (this.directionX < 0) {
      if (this.velocityX < -0.1)
        this.changeFrameSet(this.frameSets.moveLeft, "loop", 5);
      else this.changeFrameSet(this.frameSets.idleLeft, "pause");
    } else if (this.directionX > 0) {
      if (this.velocityX > 0.1)
        this.changeFrameSet(this.frameSets.moveRight, "loop", 5);
      else this.changeFrameSet(this.frameSets.idleRight, "pause");
    }

    this.animate();
  }

  /**
   * Updates the player's position based on gravity and friction.
   * @param {number} gravity - The value of gravity affecting the player.
   * @param {number} friction - The value of friction affecting the player's movement.
   */
  updatePosition(gravity, friction) {
    this.xOld = this.x;
    this.yOld = this.y;

    this.velocityY += gravity;
    this.velocityX *= friction;

    /* Made it so that velocity cannot exceed velocityMax */
    if (Math.abs(this.velocityX) > this.velocityMax)
      this.velocityX = this.velocityMax * Math.sign(this.velocityX);

    if (Math.abs(this.velocityY) > this.velocityMax)
      this.velocityY = this.velocityMax * Math.sign(this.velocityY);

    this.x += this.velocityX;
    this.y += this.velocityY;
  }
}

/**
 * Represents a tile set object.
 */
export class TileSet {
  /**
   * Creates a new tile set object.
   * @param {number} columns - The number of columns in the tile set.
   * @param {number} tileSize - The size of each tile in the tile set.
   */
  constructor(columns, tileSize) {
    this.columns = columns;
    this.tileSize = tileSize;

    this.frames = [
      [115, 96, 13, 16, 0, -4],
      [50, 96, 13, 16, 0, -4],
      [102, 96, 13, 16, 0, -4],
      [89, 96, 13, 16, 0, -4],
      [76, 96, 13, 16, 0, -4],
      [63, 96, 13, 16, 0, -4],
      [0, 112, 13, 16, 0, -4],
      [65, 112, 13, 16, 0, -4],
      [13, 112, 13, 16, 0, -4],
      [26, 112, 13, 16, 0, -4],
      [39, 112, 13, 16, 0, -4],
      [52, 112, 13, 16, 0, -4],
      [81, 112, 14, 16],
      [96, 112, 16, 16],
      [112, 115, 16, 4],
      [112, 124, 16, 4],
      [112, 119, 16, 4],
    ].map((args) => new Frame(...args));
  }
}

/**
 * Represents a world object.
 */
export class World {
  /**
   * Creates a new world object.
   * @param {number} friction - The friction value of the world.
   * @param {number} gravity - The gravity value of the world.
   */
  constructor(friction = 0.85, gravity = 2) {
    this.collider = new Collider();

    this.friction = friction;
    this.gravity = gravity;

    this.columns = 12;
    this.rows = 9;

    this.tileSet = new TileSet(8, 16);
    this.player = new Player(32, 76);

    this.zoneId = "00";

    this.carrots = []; // the array of carrots in this zone;
    this.carrotCount = 0; // the number of carrots you have.
    this.doors = [];
    this.door = undefined;

    this.height = this.tileSet.tileSize * this.rows;
    this.width = this.tileSet.tileSize * this.columns;
  }

  /**
   * Collides an object with the collision map of the world.
   * @param {GameObject} object - The object to collide.
   */
  collideObject(object) {
    let bottom, left, right, top, value;

    top = Math.floor(object.getTop() / this.tileSet.tileSize);
    left = Math.floor(object.getLeft() / this.tileSet.tileSize);
    value = this.collisionMap[top * this.columns + left];
    this.collider.collide(
      value,
      object,
      left * this.tileSet.tileSize,
      top * this.tileSet.tileSize,
      this.tileSet.tileSize
    );

    top = Math.floor(object.getTop() / this.tileSet.tileSize);
    right = Math.floor(object.getRight() / this.tileSet.tileSize);
    value = this.collisionMap[top * this.columns + right];
    this.collider.collide(
      value,
      object,
      right * this.tileSet.tileSize,
      top * this.tileSet.tileSize,
      this.tileSet.tileSize
    );

    bottom = Math.floor(object.getBottom() / this.tileSet.tileSize);
    left = Math.floor(object.getLeft() / this.tileSet.tileSize);
    value = this.collisionMap[bottom * this.columns + left];
    this.collider.collide(
      value,
      object,
      left * this.tileSet.tileSize,
      bottom * this.tileSet.tileSize,
      this.tileSet.tileSize
    );

    bottom = Math.floor(object.getBottom() / this.tileSet.tileSize);
    right = Math.floor(object.getRight() / this.tileSet.tileSize);
    value = this.collisionMap[bottom * this.columns + right];
    this.collider.collide(
      value,
      object,
      right * this.tileSet.tileSize,
      bottom * this.tileSet.tileSize,
      this.tileSet.tileSize
    );
  }

  /**
   * Sets up the world with the specified zone.
   * @param {Zone} zone - The zone to set up the world with.
   */
  setup(zone) {
    this.carrots = new Array();
    this.doors = new Array();
    this.grass = new Array();
    this.collisionMap = zone.collisionMap;
    this.graphicalMap = zone.graphicalMap;
    this.columns = zone.columns;
    this.rows = zone.rows;
    this.zoneId = zone.id;

    for (let index = zone.carrots.length - 1; index > -1; --index) {
      let carrot = zone.carrots[index];
      this.carrots[index] = new Carrot(
        carrot[0] * this.tileSet.tileSize + 5,
        carrot[1] * this.tileSet.tileSize - 2
      );
    }

    for (let index = zone.doors.length - 1; index > -1; --index) {
      let door = zone.doors[index];
      this.doors[index] = new Door(door);
    }

    for (let index = zone.grass.length - 1; index > -1; --index) {
      let grass = zone.grass[index];
      this.grass[index] = new Grass(
        grass[0] * this.tileSet.tileSize,
        grass[1] * this.tileSet.tileSize + 12
      );
    }

    if (this.door) {
      if (this.door.destinationX != -1) {
        this.player.setCenterX(this.door.destinationX);
        this.player.setOldCenterX(this.door.destinationX);
      }

      if (this.door.destinationY != -1) {
        this.player.setCenterY(this.door.destinationY);
        this.player.setOldCenterY(this.door.destinationY);
      }

      this.door = undefined;
    }
  }

  /**
   * Updates the world state.
   */
  update() {
    this.player.updatePosition(this.gravity, this.friction);

    this.collideObject(this.player);

    for (let index = this.carrots.length - 1; index > -1; --index) {
      let carrot = this.carrots[index];

      carrot.updatePosition();
      carrot.animate();

      if (carrot.collideObject(this.player)) {
        this.carrots.splice(this.carrots.indexOf(carrot), 1);
        this.carrotCount++;
      }
    }

    for (let index = this.doors.length - 1; index > -1; --index) {
      let door = this.doors[index];

      if (door.collideObjectCenter(this.player)) {
        this.door = door;
      }
    }

    for (let index = this.grass.length - 1; index > -1; --index) {
      let grass = this.grass[index];

      grass.animate();
    }

    this.player.updateAnimation();
  }
}
