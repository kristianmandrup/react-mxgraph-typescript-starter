# How to use handles

Demonstrates using mxHandle to change custom styles interactively.

```js
function MyShape() {
  mxCylinder.call(this);
};

mxUtils.extend(MyShape, mxCylinder);

MyShape.prototype.defaultPos1 = 20;
MyShape.prototype.defaultPos2 = 60;

MyShape.prototype.getLabelBounds = function(rect)
{
  var pos1 = mxUtils.getValue(this.style, 'pos1', this.defaultPos1) * this.scale;
  var pos2 = mxUtils.getValue(this.style, 'pos2', this.defaultPos2) * this.scale;

  return new mxRectangle(rect.x, rect.y + pos1, rect.width, Math.min(rect.height, pos2) - Math.max(0, pos1));
};
```

Define `redrawPath` method on `MyShape`

```js
MyShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
{
  var pos1 = mxUtils.getValue(this.style, 'pos1', this.defaultPos1);
  var pos2 = mxUtils.getValue(this.style, 'pos2', this.defaultPos2);
  
  if (isForeground)
  {
    if (pos1 < h)
    {
      path.moveTo(0, pos1);
      path.lineTo(w, pos1);
    }

    if (pos2 < h)
    {
      path.moveTo(0, pos2);
      path.lineTo(w, pos2);
    }
  }
  else
  {
    path.rect(0, 0, w, h);
  }
};
```

register new shape `myShape` on `mxCellRenderer` using `MyShape` constructor object

```js
mxCellRenderer.registerShape('myShape', MyShape);

mxVertexHandler.prototype.createCustomHandles = function()
{
  if (this.state.style['shape'] == 'myShape')
  {
```

Implements the handle `firstHandle` for the first divider

```js
var firstHandle = new mxHandle(this.state);
```

Define `getPosition` on `firstHandle` handle

```js
firstHandle.getPosition = function(bounds)
{
  var pos2 = Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'pos2', MyShape.prototype.defaultPos2))));
  var pos1 = Math.max(0, Math.min(pos2, parseFloat(mxUtils.getValue(this.state.style, 'pos1', MyShape.prototype.defaultPos1))));

  return new mxPoint(bounds.getCenterX(), bounds.y + pos1);
};
```

Define `setPosition` function on `firstHandle` handle

```js
firstHandle.setPosition = function(bounds, pt)
{
  var pos2 = Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'pos2', MyShape.prototype.defaultPos2))));

  this.state.style['pos1'] = Math.round(Math.max(0, Math.min(pos2, pt.y - bounds.y)));
};
```

Define `execute` function on `firstHandle` handle

```js
firstHandle.execute = function()
{
  this.copyStyle('pos1');
}

firstHandle.ignoreGrid = true;
```

Implements the handle `secondHandle` for the second divider

```js
    var secondHandle = new mxHandle(this.state);

    secondHandle.getPosition = function(bounds) {
      var pos1 = Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'pos1', MyShape.prototype.defaultPos1))));
      var pos2 = Math.max(pos1, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'pos2', MyShape.prototype.defaultPos2))));

      return new mxPoint(bounds.getCenterX(), bounds.y + pos2);
    };

    secondHandle.setPosition = function(bounds, pt) {
      var pos1 = Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'pos1', MyShape.prototype.defaultPos1))));

      this.state.style['pos2'] = Math.round(Math.max(pos1, Math.min(bounds.height, pt.y - bounds.y)));
    };

    secondHandle.execute = function() {
      this.copyStyle('pos2');
    }

    secondHandle.ignoreGrid = true;

    return [firstHandle, secondHandle];
  }
  
  return null;
};
```

Enable live preview and rotation

```js
mxVertexHandler.prototype.livePreview = true;
mxVertexHandler.prototype.rotationEnabled = true;
```

Main program

Disables the built-in context menu

```js
mxEvent.disableContextMenu(container);
```

Creates the graph inside the given container

```js
var graph = new mxGraph(container);
graph.setCellsCloneable(true);
graph.setHtmlLabels(true);
graph.setPanning(true);
graph.centerZoom = false;
```

Enables rubberband selection

```js
new mxRubberband(graph);
```

Gets the default parent for inserting new cells. 
This is normally the first child of the root (ie. layer 0).

```js
var parent = graph.getDefaultParent();
```

Adds cells to the model in a single step

```js
graph.getModel().beginUpdate();
try
{
  var v1 = graph.insertVertex(parent, null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    20, 20, 240, 120, 'shape=myShape;whiteSpace=wrap;overflow=hidden;pos1=30;pos2=80;');
}
```

Updates the display

```js
finally {
  graph.getModel().endUpdate();
}
```

Append `+` button to zoom in

```js
document.body.appendChild(mxUtils.button('+', function()
{
  graph.zoomIn();
}));
```

Append `-` button to zoom out

```js
document.body.appendChild(mxUtils.button('-', function()
{
  graph.zoomOut();
}));
```
