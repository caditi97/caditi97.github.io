// This script contians the code required to implement the first part of the
// assessment.

(function(){
  "use strict";

  // MODULE GLOBAL VARIABLES AND CONSTANTS
  const DIM_X = 20
  const DIM_Y = 20
  var canvas;
  var ctx;
  let point = null;
  let radius = 0;
  let squares = [];
  let endPoints = [];

  window.addEventListener("load", initialize);

  /**
   *  Function that will be called when the window is loaded.
   */
  function initialize(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // create 20x20 grid of grey squares
    createSquares();
    createGrid();

    // handle mouse down event
    canvas.onmousedown = function(e){
        point = {x:e.offsetX, y:e.offsetY};
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // record squares toggled by user
        getBlueSquares();
        createGrid();
    }

    document.getElementById("generate").onclick = function () {
      drawCircle();
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

  /**
   * Function that is called to create a grid of squares and then fill
   * the squares with its respective color.
   */
  function createGrid(){
    for (let i = 1; i < squares.length; i++){
      ctx.fillStyle = squares[i].style;
      ctx.fillRect(squares[i].x, squares[i].y, squares[i].width, squares[i].width);
    }
  }

  /*
   * Helper function that draws a cricle according to given coordinates using Canvas'
   * Path, arc and stroke methods. Here the center of the circle is calculated using
   * the getCentroid method and the radius using the getRadius method.
   */
  function drawCircle(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createGrid();
    let center = getCentroid();
    let radius = getRadius(center);
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  /*
   * Helper function that evalutes whether a point is located inside a square.
   * @param {object} square - properties of the square.
   * @param {object} point - properties of the point.
   * @return {boolean} - true is point is located inside square.
   */
  function inSquare(square, point){
    if (point.x + 1 > square.x && point.x < square.x + square.width &&
      point.y + 1 > square.y && point.y < square.y + square.width){
        return true;
    }
  }

  /*
   * Helper function that records the clicked/toggled squares as endpoints for
   * the circle and also changes the color of the square if it is intersecting
   * any of those endpoints.
   */
  function getBlueSquares(){
    for (let i = 1; i < squares.length; i++){
      if(inSquare(squares[i],point)){
        squares[i].style = 'blue';
        endPoints.push(squares[i]);
      }
    }
  }

  /*
   * Helper function that calculates the centroid of a set of points. This will
   * give us the center of our desired circle. The centroid of a set of points is
   * calculated using the average of its coordinates.
   * @return {object} - x and y coordinates of the center.
   */
  function getCentroid(){
    let x_sum = 0;
    let y_sum = 0;
    for (let i = 1; i < endPoints.length; i++){
      // here we take the center of the square for calculations and not the edges
      x_sum += (endPoints[i].x + (endPoints[i].width/2));
      y_sum += (endPoints[i].y + (endPoints[i].width/2));
    }
    return {x:x_sum/endPoints.length, y:y_sum/endPoints.length};
  }

  /*
   * Helper function that makes a rough estimation the radius of the circle that
   * can be made with the given set of points. The distance between the center
   * and each endpoint is taken and averaged to get our final radius.
   * @param {object} center - center of the circle and its properties.
   * @return {object} - radius of the circle.
   */
  function getRadius(center){
    let radius =  0;
    for (let i = 1; i < endPoints.length; i++){
      let vertex = endPoints[i];
      let dist = (((vertex.x - center.x)**2) + ((vertex.y - center.y)**2))**(0.5);
      radius += dist;
    }
    return radius/endPoints.length;
  }

})();
