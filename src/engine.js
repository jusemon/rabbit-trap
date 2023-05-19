/**
 * Engine class for running the game loop and updating/rendering the game.
 */
export class Engine {
  /**
   * Constructor for the Engine class.
   * @param {number} timeStep - The desired time step between updates in milliseconds.
   * @param {Function} update - The update function to be called on each update.
   * @param {Function} render - The render function to be called on each frame.
   */
  constructor(timeStep, update, render) {
    /**
     * The accumulated time since the last update in milliseconds.
     * @type {number}
     */
    this.accumulatedTime = 0;

    /**
     * The animation frame request ID.
     * @type {number}
     */
    this.animationFrameRequest = undefined;

    /**
     * The current time in milliseconds.
     * @type {number}
     */
    this.time = undefined;

    /**
     * The time step between updates in milliseconds.
     * @type {number}
     */
    this.timeStep = timeStep;

    /**
     * Indicates if the game state has been updated.
     * @type {boolean}
     */
    this.updated = false;

    /**
     * The update function to be called on each update.
     * @type {Function}
     */
    this.update = update;

    /**
     * The render function to be called on each frame.
     * @type {Function}
     */
    this.render = render;
  }

  /**
   * Runs the game loop.
   * @param {DOMHighResTimeStamp} timeStamp - The current timestamp in milliseconds.
   */
  run(timeStamp) {
    this.animationFrameRequest = window.requestAnimationFrame(this.handleRun);
    this.accumulatedTime += timeStamp - this.time;
    this.time = timeStamp;

    if (this.accumulatedTime >= this.timeStep * 3) {
      this.accumulatedTime = this.timeStep;
    }

    while (this.accumulatedTime >= this.timeStep) {
      this.accumulatedTime -= this.timeStep;
      this.update(timeStamp);
      this.updated = true;
    }

    if (this.updated) {
      this.updated = false;
      this.render(timeStamp);
    }
  }

  /**
   * Starts the game loop.
   */
  start() {
    this.accumulatedTime = this.timeStep;
    this.time = window.performance.now();
    this.animationFrameRequest = window.requestAnimationFrame(this.handleRun);
  }

  /**
   * Stops the game loop.
   */
  stop() {
    window.cancelAnimationFrame(this.animationFrameRequest);
  }

  /**
   * Handles the game loop by calling the run method.
   * @param {DOMHighResTimeStamp} timeStep - The current timestamp in milliseconds.
   */
  handleRun = (timeStep) => {
    this.run(timeStep);
  };
}
