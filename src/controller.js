/**
 * Controller class for handling button inputs.
 */
export class Controller {
  /**
   * Constructor for the Controller class.
   */
  constructor() {
    /**
     * ButtonInput instance for the left button.
     */
    this.left = new Controller.ButtonInput();

    /**
     * ButtonInput instance for the right button.
     */
    this.right = new Controller.ButtonInput();

    /**
     * ButtonInput instance for the up button.
     */
    this.up = new Controller.ButtonInput();
  }

  /**
   * Handles key down and key up events.
   * @param {string} type - The type of the event ("keydown" or "keyup").
   * @param {number} keyCode - The key code of the pressed or released key.
   */
  keyDownUp(type, keyCode) {
    var down = type == "keydown" ? true : false;
    switch (keyCode) {
      case 37:
        this.left.getInput(down);
        break;
      case 38:
        this.up.getInput(down);
        break;
      case 39:
        this.right.getInput(down);
    }
  }

  /**
   * ButtonInput class for handling button input state.
   */
  static ButtonInput = class ButtonInput {
    /**
     * Constructor for the ButtonInput class.
     */
    constructor() {
      /**
       * Indicates if the button is currently active.
       * @type {boolean}
       */
      this.active = false;

      /**
       * Indicates if the button is currently in the down state.
       * @type {boolean}
       */
      this.down = false;
    }

    /**
     * Sets the button input state based on the provided value.
     * @param {boolean} down - The value indicating if the button is down.
     */
    getInput(down) {
      if (this.down != down) this.active = down;
      this.down = down;
    }
  };
}
