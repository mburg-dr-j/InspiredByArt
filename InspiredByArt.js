var mySVG = document.getElementById("mySVG");

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
    fillHTMLStr = "rbg(";
    fillHTMLStr += this.fillR() + ", ";
    fillHTMLStr += this.fillG() + ", ";
    fillHTMLStr += this.fillB() + ")";
    return fillHTMLStr;
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


var myHexagon1 = new Hexagon([200, 200], 100, [128, 128, 128]);
var myHexagon2 = new Hexagon([300, 300], 100, [0, 0, 0]);
console.log(myHexagon1);
