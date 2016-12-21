## Picasso JS

### Background

A [Voronoi Diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) is a figure in which cells are created around a number of seed points such that all points within the cell are closest to its seed point.

PicassoJS will allow the user to add seed points to a Voronoi Diagram to create a picasso-esque version of their photographs.


### MVP
In PicassoJS, users will be able to...

- [ ] Click to add new seed points
- [ ] Randomly generate seed points for the voronoi diagram
- [ ] Drag a slider to increase the number of random seed points (making a clearer picture)
- [ ] Select among predefined voronoi pattern demos

### Wireframe

PicassoJS will consist of a single canvas element surrounded by controls. Controls will include elements to 'upload a photo', 'choose a stock photo', 'clear seed points', and a 'randomly place points' slider.

![Wireframe](/wireframe/wireframe.png)

### Architecture and Technologies

The app will use the following technologies:
* **HTML5 & CSS3** - to style everything outside the canvas
* **JavaScript, jQuery** - to implement button actions
* **D3.js** - for its Voronoi Diagram implementation

My implementation will rely on two main files:
1. points.js - handles the logic of adding and removing points

2. voronoi.js - middleman between d3-voronoi and points.js to generate the Voronoi cells

3. colors.js - Uses voronoi cells to find the average color within each polygon


### Implementation Timeline
**Day 1:** Implement Canvas where user can click to place a point or drag a slider to create random points. Ensure that all points are being stored in an array for future use.

**Day 2:** Learn D3.js, learn how to use D3 outputs as inputs to HTML5 Canvas. By end of the day be able to generate Voronoi Diagrams.

**Day 3:** Photos - Allow the user to upload pictures or choose from defaults. Get average color of photo within each polygon and fill entire Voronoi cell with said color.

**Day 4+:** Polish HTML and CSS, add to portfolio.

### Bonus Features
In the future, I hope to...
- [ ] Allow the user to drag points around and dynamically display the resulting picture
- [ ] Add random movement to points and animate the resulting picture
- [ ] Allow the user to toggle to view the Delaunay Triangulation of image as well
