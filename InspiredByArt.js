var mySVG = document.getElementById("mySVG");
HEIGHT = mySVG.height.baseVal.value;
WIDTH = mySVG.width.baseVal.value;
// This will be a list of objects of type Hexagon
var hexagons = [];

function Hexagon (center, sideLength, color) {
  /*
    This object contains all the details about a single hexagon in the picture.
    The only things that return as attributes are the inputs; all else
    returns as a method.  Notice that all hexagons have two sides parallel
    to the horiontal axis.
  */

  // Both coordinates of the center point
  this.center = center;
  // Just the x-coordinate
  this.centerX = function () {
    return center[0];
  }
  // Just the y-coordinate
  this.centerY = function () {
    return center[1];
  }
  // The length of one side
  this.sideLength = sideLength;
  // The stroke color as [r, g, b]
  this.color = color;
  // Just the red
  this.r = function () {
    return color[0];
  }
  // Just the green
  this.g = function () {
    return color[1];
  }
  // Just the blue
  this.b = function () {
    return color[2];
  }
  // Compute the six vertices from the center and sidelength as an Array
  this.points = function () {
    // the points are listed counterclockwise, starting at the left.
    point1 = [this.centerX() - sideLength, this.centerY()];
    point2 = [this.centerX() - Math.round(0.5 * sideLength), this.centerY() - Math.round(0.866 * sideLength)];
    point3 = [this.centerX() + Math.round(0.5 * sideLength), this.centerY() - Math.round(0.866 * sideLength)];
    point4 = [this.centerX() + sideLength, this.centerY()];
    point5 = [this.centerX() + Math.round(0.5 * sideLength), this.centerY() + Math.round(0.866 * sideLength)];
    point6 = [this.centerX() - Math.round(0.5 * sideLength), this.centerY() + Math.round(0.866 * sideLength)];
    points = [point1, point2, point3, point4, point5, point6];
    return points;
  }
  // Convert the points Array to a string suitable for <svg><polygon />
  this.pointStr = function () {
    pointList = this.points();
    pointStr = "";
    pointList.forEach(addPointToStr);
    function addPointToStr (point) {
      pointStr += point[0] + "," + point[1] + " ";
    }
    return pointStr;
  }
  // Generate a color that is 70% lighter, same shade for fill
  this.fillColor = function () {
    littleR = Math.round(255 - 0.3*(255 - this.r() ));
    littleG = Math.round(255 - 0.3*(255 - this.g() ));
    littleB = Math.round(255 - 0.3*(255 - this.b() ));
    return [littleR, littleG, littleB];
  }
  // Just the red from the fill
  this.fillR = function () {
    fillColor = this.fillColor();
    return fillColor[0];
  }
  // Just the green from the fill
  this.fillG = function () {
    fillColor = this.fillColor();
    return fillColor[1];
  }
  // Just the blue from the fill
  this.fillB = function () {
    fillColor = this.fillColor();
    return fillColor[2];
  }
  // Convert the stroke color into format rgb(r, g, b) for HTML
  this.colorHTML = function () {
    colorHTMLStr = "rgb(";
    colorHTMLStr += this.r() + ", ";
    colorHTMLStr += this.g() + ", ";
    colorHTMLStr += this.b() + ")";
    return colorHTMLStr;
  }
  // Convert the fill color into format rgb(r, g, b) for HTML
  this.fillHTML = function () {
    fillHTMLStr = "rgb(";
    fillHTMLStr += this.fillR() + ", ";
    fillHTMLStr += this.fillG() + ", ";
    fillHTMLStr += this.fillB() + ")";
    return fillHTMLStr;
  }
  // Put together a complete <polygon /> tag to include in HTML
  this.svgHTML = function () {
    svgStr = '<polygon points=\"';
    svgStr += this.pointStr();
    svgStr += '\" style=\"fill:';
    svgStr += this.fillHTML();
    svgStr += '; stroke:';
    svgStr += this.colorHTML();
    svgStr += '; stroke-width:3\" />';
    return svgStr;
  }
}

function overlapped (hexagon1, hexagon2) {
  /*
    Check if two hexagons are overlapping or not.  Returns boolean.
    This function treats the hexagons as if they were circles, so will
    return TRUE if the circles of same center, with radius = sideLength
    would overlap.
  */

  // Compute horizontal distance between centers
  xDist = hexagon1.centerX() - hexagon2.centerX();
  // Compute vertical distance between centers
  yDist = hexagon1.centerY() - hexagon2.centerY();
  // Use Pythagorean distance formula to compute diagonal distance
  dist = Math.sqrt(xDist * xDist + yDist * yDist);
  // Find sum of sideLengths -- essentially radii
  totalSideLen = hexagon1.sideLength + hexagon2.sideLength;
  // Check if overlapping
  if (dist > totalSideLen) {
    return false;
  } else {
    return true;
  }
}

function startHexagon () {
  // Returns the very first hexagon for the pattern.

  // Generate the center; pushing away from edges a little
  // Both coordinates need to be at least 100 from the edge
  centerX = Math.floor(Math.random() * (WIDTH-200)) + 100;
  centerY = Math.floor(Math.random() * (HEIGHT-200)) + 100;
  center = [centerX, centerY];
  // Generate the sideLength, 100-299
  sideLength = Math.floor(Math.random() * 100 + 100);
  // Generate the color, first hexagon has saturated color
  // r,g,b are all between 128-255.
  colorRed = Math.floor(Math.random() * 128 + 128);
  colorGreen = Math.floor(Math.random() * 128 + 128);
  colorBlue = Math.floor(Math.random() * 128 + 128);
  color = [colorRed, colorGreen, colorBlue];
  // Create the object and return.
  startHex = new Hexagon (center, sideLength, color);
  return startHex;
}

function getHexagon (sourceHexagon, newSideLength) {
  /*
    This function randomly generates one hexagon, that is close to the
    source hexagon, in location, size and color.  Does not overlap with
    source hexagon, but might overlap with something else, need to check.
  */
  // Start by generating an angle and a radius, then start at center
  // of source hexagon, go out from there at this angle for a distance
  // of this radius, and put new center there.
  angle = Math.random() * Math.PI * 2;
  radius = sourceHexagon.sideLength + newSideLength;
  newCenterX = Math.floor(Math.cos(angle) * radius) + sourceHexagon.centerX();
  newCenterY = Math.floor(Math.sin(angle) * radius) + sourceHexagon.centerY();
  newCenter = [newCenterX, newCenterY];
  // Generate new color, adding 0-29 to each band of existing color
  // to make it lighter.
  currentColor = sourceHexagon.color;
  newR = Math.floor(Math.random() * 30) + currentColor[0];
  newG = Math.floor(Math.random() * 30) + currentColor[1];
  newB = Math.floor(Math.random() * 30) + currentColor[2];
  newColor = [newR, newG, newB];
  newHexagon = new Hexagon (newCenter, newSideLength, newColor);
  return newHexagon;
}

function addHexagons () {
  /*
    This function generates one round of hexagons, trying to generate
    hexagons around each of the existing hexagons.  Stops trying at
    a particular hexagon once it generates three in a row that collide
    with one that already exists.
  */
  // Create empty list that we will merge with main list later
  hexagonsToAdd = [];
  // Get the side length we had most recently, subtract 1-30 from it
  lastHexagon = hexagons[hexagons.length - 1];
  prevSideLength = lastHexagon.sideLength;
  newSideLength = Math.round(prevSideLength - 1 - Math.random() * 30);
  // End the design once we get below sideLength 10.
  if (newSideLength > 10) {
    console.log(lastHexagon);
    console.log(getHexagon(lastHexagon, newSideLength));
    clearInterval(startRun);
  }
}

var hexagon1 = startHexagon();
hexagons.push(hexagon1);
mySVG.innerHTML += hexagon1.svgHTML();
startRun = setInterval(addHexagons, 1000);
