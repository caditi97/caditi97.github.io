// This script contians the code required to implement the first part of the
// assessment.

(function(){
  "use strict";

  // MODULE GLOBAL VARIABLES AND CONSTANTS
  const DIM_X = 20
  const DIM_Y = 20
  var canvas;
  var ctx;
  var centerX = null, centerY = null;
  let endpoint = false;
  let mouseIsDown = false;
  let radius = 0;
  let maxRadius = 0;
  let minRadius = 0;
  let squares = [];

  window.addEventListener("load", initialize);

  /**
   *  Function that will be called when the window is loaded.
   */
  function initialize(){
    // initialize and record canvas properties
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // create 20x20 grid of grey squares
    createSquares();
    createGrid();

    // handle mouse down event
    canvas.onmousedown = function(e){
      createSquares();
      mouseIsDown = true;
      endpoint = false;
      centerX = e.offsetX;  // get mouse x position relative to left end of div
      centerY = e.offsetY;  // get mouse y position relative to left end of div
    }

    // handle mouse move event
    canvas.onmousemove = function(e){
      if(!mouseIsDown) return;
      let dragX = e.offsetX;
      let dragY = e.offsetY;
      endpoint = false;
      drawCircle(centerX, centerY, dragX, dragY, 'blue');
    }

    // handle mouse up event
    canvas.onmouseup = function(e){
      mouseIsDown = false;
      let endX = e.offsetX;
      let endY = e.offsetY;
      // trigger endpoint reached flag
      endpoint = true;
      drawCircle(centerX, centerY, endX, endY, 'blue');
      getBlueSquares();
      createGrid();
    }
  }

   /*
    * Helper function that creates an array of squares as defined by the dimension
    * from the DIM_X/Y constant. It updates the squares array with coordinates,
    * width of each square created.
    */
  function createSquares(){
    let sqrWidth = canvas.width / ((DIM_X*2)+1);
    let sqrHeight = canvas.height / ((DIM_Y*2)+1);
    let index = 1;
    for (let i = 1; i <= DIM_X*2; i+=2){
      let x = sqrWidth * i;
      for (let j = 1; j <= DIM_Y*2; j+=2){
        let y = sqrHeight * j;
        squares[index] = {x:x, y:y, width:sqrWidth, style:'gray'};
        index+=1;
      }
    }
  }

  /*
   * Helper function that creates a grid of squares as defined by the dimension
   * by iterating through the squares array updated in the previous function.
   * It uses HTML 5' Canvas API to create figures on the page and fill them with
   * colors.
   */
  function createGrid(){
    for (let i = 1; i < squares.length; i++){
      ctx.fillStyle = squares[i].style;
      ctx.fillRect(squares[i].x, squares[i].y, squares[i].width, squares[i].width);
    }
  }

  /*
   * Helper function that draws a cricle according to given coordinates using Canvas'
   * Path, arc and stroke methods.
   * @param {object} x1, x2, y1, y2 - coordinates of center and endpoint of a circle
   * @param {string} color - color in which the circle needs to be drawn.
   */
  function drawCircle(x1, x2, y1, y2, color){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createGrid();
    ctx.beginPath();
    ctx.strokeStyle = color;
    radius = (((x2 - x1)**2) + ((y2 - y1)**2))**(0.5);
    ctx.arc(x1, x2, radius, 0, 2 * Math.PI);
    ctx.stroke();

  }

  /*
   * Helper function that calculates the coordinates of a point located on the
   * circumference of the circle by using trignometric relations between radial
   * coordinates.
   * @param {object} theta - angle at which the current point is located.
   * @return {object} - x and y coordinates of the point on a circle.
   */
  function getPoint(theta){
    let cos = radius*Math.cos(theta);
    let sin = radius*Math.sin(theta);
    return {x: centerX + cos, y: centerY};
  }


  /*
   * Helper function that evalutes whether a point is located inside a square.
   * @param {object} square - properties of the square.
   * @param {object} point - properties of the point.
   * @return {boolean} - true is point is located inside square.
   */
  function inSquare(square, point){
    if (point.x > square.x && point.x < square.x + square.width &&
        point.y > square.y && point.y < square.y + square.width){
          return true;
    }
  }


  /*
   * Helper function that evalutes whether a square needs to be colored blue or not.
   * A square will be colored blue if it intersects the edge of circle constructed
   * by the user.
   * @param {object} index - index of the square we are currently iterating over.
   * @return {boolean} - true if square intersects the circle and false otherwise.
   */
  function getBlueSquares(){
    for (let i = 1; i < squares.length; i++){
      for (let angle = 0; angle < 360; angle+=20){
        let point = getPoint(angle / 0.017);
        if(inSquare(squares[i],point)){
          // if square is near the circle color it blue
          squares[i].style = 'blue';
          // calculate the distance between this point and the center
          // if distance is greater than max update maxRadius
          // if distance is lower than min update minRadius
          // then use these two value to create inner and outer red circles.
        }
      }
    }
  }



})();
