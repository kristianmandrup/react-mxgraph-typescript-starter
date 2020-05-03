# ResistorShape: Implements a custom resistor shape

Direction currently ignored here.

```js
function ResistorShape() { };
ResistorShape.prototype = new mxCylinder();
ResistorShape.prototype.constructor = ResistorShape;

ResistorShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
{
  var dx = w / 16;

  if (isForeground)
  {
    path.moveTo(0, h / 2);
    path.lineTo(2 * dx, h / 2);
    path.lineTo(3 * dx, 0);
    path.lineTo(5 * dx, h);
    path.lineTo(7 * dx, 0);
    path.lineTo(9 * dx, h);
    path.lineTo(11 * dx, 0);
    path.lineTo(13 * dx, h);
    path.lineTo(14 * dx, h / 2);
    path.lineTo(16 * dx, h / 2);

    path.end();
  }
};

mxCellRenderer.registerShape('resistor', ResistorShape);
```
