# Neocis Software Assesment
-----

## [Demo](https://caditi97.github.io/index.html)


## Part 1 : Digitizng Circles 
The objective here was to design a program capable of digitizing circles. The system should start with a single window containing a 20x20 grid of square points. All square points start with a color of grey which turs blue when a circle is made connecting the points. Center of the circle is the point user clicks and the edge corresponds to the point where the user releases the mouse. Two additional circles are created in red color corresponding to the largest and smallest radius of the highlighted points. 

### Approach 
The first task to handle here was creating a grid of squares, for which HTML's Canas API was used. The dimensions of the grid can be defined by changing the <code>DIM_X</code> and <code>DIM_Y</code> constants. Other variables include canvas properties like <code>getContext</code> which keeps track of the drawing instance, a list containing square properties and variable to keep track of point coordinates or radii.

After creating the square grid we have to handle mouse events. As the circle is created by clicking and dragging, there are three mouse events that need to be handled - when the mouse is pressed (<code>onmousedown</code>), when the mouse is being dragged (<code>onmousemove</code>), and finally when the mouse is not being pressed (<code>onmouseup</code>).

While handling the mouse down or click event the position of the mouse is recorded as the center of the circle. The key to creating a circle capable of resizing here is to create a circle everytime the mouse is dragged. When the mouse is lifted the final circle is created using the coordinates of the point where the mouse stopped and further creation of circles is stopped by the <code>mouseIsDown</code> flag. After drawing the circle the squares that need to be highlighted blue by evalutating if the point on the circle circumference lies inside any of the squares' boundaries. If a point is inside a square the color property of that squaer is changed to blue and the grid is re-created.

## Part 2 : Toggling the Grid
The objective here was to design a program similar to the previous part but instead here the user has the ability to toggle square points on and off. <br> Using the points toggled on by the user the program then creates a circle joining those points accordingly with the help of an iterative least-squares based algorithm.
Similar starting conditions to the previous part. A "Generate" button which creates circle using highlighted points.The algorithm used to create the circle should not rely on an external library or code to find best fit.

### Approach
The script for this part is pretty similar to the previous part but has some extra functionality. Firstly in order to record the squares selected by the user we keep track of the mouse down event and add an on click event listener to the generate button. 

The center of a circle is evaluated by calculating the centroid of a set of points/ The centroid is calculated by taking the mean of each coordinate of the set of points. Then by taking the average of the distance between the endpoints and the centroid. Each time the user clicks on a square it is recorded using the<code>geBlueSquares</code> function and the grid is updated. Pressing the <code>Generate</code> button then executes the <code>drawCircle</code> which creates the circle. 
