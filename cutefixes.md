There's no way to extract color data from a non-rectangle polygon.
stages of improvement
1. insidePolygon loops through every pixel in canvas checking whether or not it's inside polygon, and calclating averages that way

2. Improvised by cutting out the smallest rectangle containing the polygon and calculating based on whether or not each point was inside the polygon.

3. further improved by calculating color map when image is loaded
