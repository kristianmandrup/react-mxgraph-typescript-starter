// Defines custom message shape
// function MessageShape()
// {
//   mxCylinder.call(this);
// };
// mxUtils.extend(MessageShape, mxCylinder);
// MessageShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
// {
//   if (isForeground)
//   {
//     path.moveTo(0, 0);
//     path.lineTo(w / 2, h / 2);
//     path.lineTo(w, 0);
//   }
//   else
//   {
//     path.moveTo(0, 0);
//     path.lineTo(w, 0);
//     path.lineTo(w, h);
//     path.lineTo(0, h);
//     path.close();
//   }
// };

// // Registers the message shape
// mxCellRenderer.registerShape('message', MessageShape);