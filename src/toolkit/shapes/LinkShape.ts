// // Defines custom edge shape
// function LinkShape()
// {
//   mxArrow.call(this);
// };
// mxUtils.extend(LinkShape, mxArrow);
// LinkShape.prototype.paintEdgeShape = function(c, pts)
// {
//   var width = 10;

//   // Base vector (between end points)
//   var p0 = pts[0];
//   var pe = pts[pts.length - 1];
  
//   var dx = pe.x - p0.x;
//   var dy = pe.y - p0.y;
//   var dist = Math.sqrt(dx * dx + dy * dy);
//   var length = dist;
  
//   // Computes the norm and the inverse norm
//   var nx = dx / dist;
//   var ny = dy / dist;
//   var basex = length * nx;
//   var basey = length * ny;
//   var floorx = width * ny/3;
//   var floory = -width * nx/3;
  
//   // Computes points
//   var p0x = p0.x - floorx / 2;
//   var p0y = p0.y - floory / 2;
//   var p1x = p0x + floorx;
//   var p1y = p0y + floory;
//   var p2x = p1x + basex;
//   var p2y = p1y + basey;
//   var p3x = p2x + floorx;
//   var p3y = p2y + floory;
//   // p4 not necessary
//   var p5x = p3x - 3 * floorx;
//   var p5y = p3y - 3 * floory;
  
//   c.begin();
//   c.moveTo(p1x, p1y);
//   c.lineTo(p2x, p2y);
//   c.moveTo(p5x + floorx, p5y + floory);
//   c.lineTo(p0x, p0y);
//   c.stroke();
// };

// // Registers the link shape
// mxCellRenderer.registerShape('link', LinkShape);