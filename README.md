# Neocis Software Assesment
-----

## [Demo](https://caditi97.github.io/index.html)


## Part 1 : Digitizng Circles 
The objective here was to design a program capable of digitizing circles. The system should start with a single window containing a 20x20 grid of square points. All square points start with a color of grey which turs blue when a circle is made connecting the points. Center of the circle is the point user clicks and the edge corresponds to the point where the user releases the mouse. Two additional circles are created in red color corresponding to the largest and smallest radius of the highlighted points. 

### Approach 
The first task to handle here was creating a grid of squares, for which HTML's Canas API was used. The dimensions of the grid can be defined by changing the <code>DIM_X</code> and <code>DIM_Y</code> constants. Other variables include canvas properties like <code>getContext</code> which keeps track of the drawing instance, a list containing square properties and variable to keep track of point coordinates or radii.

After creating the square grid we have to handle mouse events. As the circle is created by clicking and dragging, there are three mouse events that need to be handled - when the mouse is pressed (<code>onmousedown</code>), when the mouse is being dragged (<code>onmousemove</code>), and finally when the mouse is not being pressed (<code>onmouseup</code>).

While handling the mouse down or click event the position of the mouse is recorded as the center of the circle. The key to creating a circle capable of resizing here was 
