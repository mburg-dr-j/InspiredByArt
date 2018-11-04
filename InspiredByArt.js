var mySVG = document.getElementById("mySVG");
HEIGHT = mySVG.height.baseVal.value;
WIDTH = mySVG.width.baseVal.value;
var hexagons = [];

function Hexagon (center, sideLength, color) {
  this.center = center;
  this.centerX = function () {
    return center[0];
  }
  this.centerY = function () {
    return center[1];
  }
  this.sideLength = sideLength;
  this.color = color;
  this.r = function () {
    return color[0];
  }
  this.g = function () {
    return color[1];
  }
  this.b = function () {
    return color[2];
  }
  this.points = function () {
    // the points are listed counterclockwise, starting at the left.  The hexagon
    // is oriented so that two sides are horizontal.
    point1 = [this.centerX() - sideLength, this.centerY()];
    point2 = [this.centerX() - Math.round(0.5 * sideLength), this.centerY() - Math.round(0.866 * sideLength)];
    point3 = [this.centerX() + Math.round(0.5 * sideLength), this.centerY() - Math.round(0.866 * sideLength)];
    point4 = [this.centerX() + sideLength, this.centerY()];
    point5 = [this.centerX() + Math.round(0.5 * sideLength), this.centerY() + Math.round(0.866 * sideLength)];
    point6 = [this.centerX() - Math.round(0.5 * sideLength), this.centerY() + Math.round(0.866 * sideLength)];
    points = [point1, point2, point3, point4, point5, point6];
    return points;
  }
  this.pointStr = function () {
    // return point list as a string, suitable for use in an SVG polygon object.
    pointList = this.points();
    pointStr = "";
    pointList.forEach(addPointToStr);
    function addPointToStr (point) {
      pointStr += point[0] + "," + point[1] + " ";
    }
    return pointStr;
  }
  this.fillColor = function () {
    littleR = Math.round(255 - 0.3*(255 - this.r() ));
    littleG = Math.round(255 - 0.3*(255 - this.g() ));
    littleB = Math.round(255 - 0.3*(255 - this.b() ));
    return [littleR, littleG, littleB];
  }
  this.fillR = function () {
    fillColor = this.fillColor();
    return fillColor[0];
  }
  this.fillG = function () {
    fillColor = this.fillColor();
    return fillColor[1];
  }
  this.fillB = function () {
    fillColor = this.fillColor();
    return fillColor[2];
  }
  this.colorHTML = function () {
    colorHTMLStr = "rgb(";
    colorHTMLStr += this.r() + ", ";
    colorHTMLStr += this.g() + ", ";
    colorHTMLStr += this.b() + ")";
    return colorHTMLStr;
  }
  this.fillHTML = function () {
    fillHTMLStr = "rgb(";
    fillHTMLStr += this.fillR() + ", ";
    fillHTMLStr += this.fillG() + ", ";
    fillHTMLStr += this.fillB() + ")";
    return fillHTMLStr;
  }
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
  xDist = hexagon1.centerX() - hexagon2.centerX();
  yDist = hexagon1.centerY() - hexagon2.centerY();
  dist = Math.sqrt(xDist * xDist + yDist * yDist);
  console.log(xDist);
  console.log(yDist);
  console.log(dist);
  totalSideLen = hexagon1.sideLength + hexagon2.sideLength;
  console.log(totalSideLen);
  if (dist > totalSideLen) {
    return false;
  } else {
    return true;
  }
}

function startHexagon () {
  centerX = Math.floor(Math.random() * (WIDTH-200)) + 100;
  centerY = Math.floor(Math.random() * (HEIGHT-200)) + 100;
  center = [centerX, centerY];
  sideLength = Math.floor(Math.random() * 200 + 100);
  colorRed = Math.floor(Math.random() * 128 + 128);
  colorGreen = Math.floor(Math.random() * 128 + 128);
  colorBlue = Math.floor(Math.random() * 128 + 128);
  color = [colorRed, colorGreen, colorBlue];
  startHex = new Hexagon (center, sideLength, color);
  return startHex;
}

var hexagon1 = startHexagon();
console.log(hexagon1.svgHTML());
mySVG.innerHTML += hexagon1.svgHTML();
