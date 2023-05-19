/**
 * Display class for handling the rendering of images on a canvas.
 */
export class Display {
  /**
   * Constructor for the Display class.
   * @param {HTMLCanvasElement} canvas - The HTML canvas element to render on.
   */
  constructor(canvas) {
    /**
     * The buffer canvas context used for drawing.
     * @type {CanvasRenderingContext2D}
     */
    this.buffer = document.createElement("canvas").getContext("2d");

    /**
     * The canvas context used for rendering.
     * @type {CanvasRenderingContext2D}
     */
    this.context = canvas.getContext("2d");
  }

  /**
   * Draws a map onto the buffer canvas.
   * @param {HTMLImageElement} image - The image containing the tileset.
   * @param {number} imageColumns - The number of columns in the tileset image.
   * @param {number[]} map - The map data as an array of tile indices.
   * @param {number} mapColumns - The number of columns in the map.
   * @param {number} tileSize - The size of each tile in pixels.
   */
  drawMap(image, imageColumns, map, mapColumns, tileSize) {
    for (let index = map.length - 1; index > -1; --index) {
      let value = map[index];
      let sourceX = (value % imageColumns) * tileSize;
      let sourceY = Math.floor(value / imageColumns) * tileSize;
      let destinationX = (index % mapColumns) * tileSize;
      let destinationY = Math.floor(index / mapColumns) * tileSize;
      this.buffer.drawImage(
        image,
        sourceX,
        sourceY,
        tileSize,
        tileSize,
        destinationX,
        destinationY,
        tileSize,
        tileSize
      );
    }
  }

  /**
   * Draws an object onto the buffer canvas.
   * @param {HTMLImageElement} image - The image containing the object.
   * @param {number} sourceX - The x-coordinate of the object in the image.
   * @param {number} sourceY - The y-coordinate of the object in the image.
   * @param {number} destinationX - The x-coordinate of the object in the canvas.
   * @param {number} destinationY - The y-coordinate of the object in the canvas.
   * @param {number} width - The width of the object.
   * @param {number} height - The height of the object.
   */
  drawObject(
    image,
    sourceX,
    sourceY,
    destinationX,
    destinationY,
    width,
    height
  ) {
    this.buffer.drawImage(
      image,
      sourceX,
      sourceY,
      width,
      height,
      Math.round(destinationX),
      Math.round(destinationY),
      width,
      height
    );
  }

  /**
   * Resizes the canvas while maintaining the aspect ratio.
   * @param {number} width - The desired width of the canvas.
   * @param {number} height - The desired height of the canvas.
   * @param {number} heightWidthRatio - The desired ratio of height to width.
   */
  resize(width, height, heightWidthRatio) {
    if (height / width > heightWidthRatio) {
      this.context.canvas.height = width * heightWidthRatio;
      this.context.canvas.width = width;
    } else {
      this.context.canvas.height = height;
      this.context.canvas.width = height / heightWidthRatio;
    }
    this.context.imageSmoothingEnabled = false;
  }

  /**
   * Renders the buffer canvas onto the display canvas.
   */
  render() {
    this.context.drawImage(
      this.buffer.canvas,
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height,
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }
}
