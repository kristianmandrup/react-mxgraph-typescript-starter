# Edge-to-edge Wire connections

If connect preview is not moved away then getCellAt is used to detect the cell under
the mouse if the mouse is over the preview shape in IE (no event transparency), ie.
the built-in hit-detection of the HTML document will not be used in this case.

```js
mxConnectionHandler.prototype.movePreviewAway = false;
mxConnectionHandler.prototype.waypointsEnabled = true;
mxGraph.prototype.resetEdgesOnConnect = false;
mxConstants.SHADOWCOLOR = '#C0C0C0';
var joinNodeSize = 7;
var strokeWidth = 2;
```

Replaces the point image

```js
mxConstraintHandler.prototype.pointImage = new mxImage('images/dot.gif', 10, 10);
```

Enables guides

```js
mxGraphHandler.prototype.guidesEnabled = true;
```

Alt disables guides

```js
mxGuide.prototype.isEnabledForEvent = function(evt) {
  return !mxEvent.isAltDown(evt);
};
```

Enables snapping waypoints to terminals

```js
mxEdgeHandler.prototype.snapToTerminals = true;
```

Create graph and set:

- panning
- connectable
- connectable edges
- disable disconnect on move
- no folding enabled

```js
var graph = new mxGraph(container);
graph.view.scale = 1;
graph.setPanning(true);
graph.setConnectable(true);
graph.setConnectableEdges(true);
graph.setDisconnectOnMove(false);
graph.foldingEnabled = false;
```

Set maximum size

```js
graph.maximumGraphBounds = new mxRectangle(0, 0, 800, 600)
graph.border = 50;
```

Panning handler consumed right click so this must be
disabled if right click should stop connection handler.

```js
graph.panningHandler.isPopupTrigger = function() { return false; };
```

Enables return key to stop editing (use shift-enter for newlines)

```js  
graph.setEnterStopsCellEditing(true);
```

Adds rubberband selection

```js
  new mxRubberband(graph);
```  

Alternative solution for implementing connection points without child cells.
This can be extended as shown in portrefs.html example to allow for per-port
incoming/outgoing direction.

```js  
  graph.getAllConnectionConstraints = function(terminal)
  {
      var geo = (terminal != null) ? this.getCellGeometry(terminal.cell) : null;

      if ((geo != null ? !geo.relative : false) &&
        this.getModel().isVertex(terminal.cell) &&
        this.getModel().getChildCount(terminal.cell) == 0)
      {
      return [new mxConnectionConstraint(new mxPoint(0, 0.5), false),
          new mxConnectionConstraint(new mxPoint(1, 0.5), false)];
      }

    return null;
  };
```

Makes sure non-relative cells can only be connected via constraints

```js
graph.connectionHandler.isConnectableCell = function(cell)
{
  if (this.graph.getModel().isEdge(cell))
  {
    return true;
  }
  else
  {
    var geo = (cell != null) ? this.graph.getCellGeometry(cell) : null;
    
    return (geo != null) ? geo.relative : false;
  }
};
mxEdgeHandler.prototype.isConnectableCell = function(cell)
{
  return graph.connectionHandler.isConnectableCell(cell);
};
```  

Adds a special tooltip for edges

```js
graph.setTooltips(true);

var getTooltipForCell = graph.getTooltipForCell;
graph.getTooltipForCell = function(cell)
{
  var tip = '';
  
  if (cell != null)
  {
    var src = this.getModel().getTerminal(cell, true);
    
    if (src != null)
    {
      tip += this.getTooltipForCell(src) + ' ';
    }
    
    var parent = this.getModel().getParent(cell);
    
    if (this.getModel().isVertex(parent))
    {
      tip += this.getTooltipForCell(parent) + '.';
    }

    tip += getTooltipForCell.apply(this, arguments);
    
    var trg = this.getModel().getTerminal(cell, false);
    
    if (trg != null)
    {
      tip += ' ' + this.getTooltipForCell(trg);
    }
  }

  return tip;
};
```

Switch for black background and bright styles

```js
var invert = false;

if (invert)
{
  container.style.backgroundColor = 'black';
  
  // White in-place editor text color
  mxCellEditorStartEditing = mxCellEditor.prototype.startEditing;
  mxCellEditor.prototype.startEditing = function (cell, trigger)
  {
    mxCellEditorStartEditing.apply(this, arguments);

    if (this.textarea != null)
    {
      this.textarea.style.color = '#FFFFFF';
    }
  };
  
  mxGraphHandler.prototype.previewColor = 'white';
}

var labelBackground = (invert) ? '#000000' : '#FFFFFF';
var fontColor = (invert) ? '#FFFFFF' : '#000000';
var strokeColor = (invert) ? '#C0C0C0' : '#000000';
var fillColor = (invert) ? 'none' : '#FFFFFF';

var style = graph.getStylesheet().getDefaultEdgeStyle();
delete style['endArrow'];
style['strokeColor'] = strokeColor;
style['labelBackgroundColor'] = labelBackground;
style['edgeStyle'] = 'wireEdgeStyle';
style['fontColor'] = fontColor;
style['fontSize'] = '9';
style['movable'] = '0';
style['strokeWidth'] = strokeWidth;
//style['rounded'] = '1';
```

Sets join node size

```js  
  style['startSize'] = joinNodeSize;
  style['endSize'] = joinNodeSize;
  
  style = graph.getStylesheet().getDefaultVertexStyle();
  style['gradientDirection'] = 'south';
  //style['gradientColor'] = '#909090';
  style['strokeColor'] = strokeColor;
  //style['fillColor'] = '#e0e0e0';
  style['fillColor'] = 'none';
  style['fontColor'] = fontColor;
  style['fontStyle'] = '1';
  style['fontSize'] = '12';
  style['resizable'] = '0';
  style['rounded'] = '1';
  style['strokeWidth'] = strokeWidth;
```

Get graph parent node

```js
  var parent = graph.getDefaultParent();
```

Start graph model update transaction

```js
  graph.getModel().beginUpdate();
```

Create and insert vertex `v1` named `J1` (join 1).

```js
try
  {
    var v1 = graph.insertVertex(parent, null, 'J1', 80, 40, 40, 80,
        'verticalLabelPosition=top;verticalAlign=bottom;shadow=1;fillColor=' + fillColor);
    v1.setConnectable(false);
```

Create and insert vertex `v11` on `v1` named `1` with `routingCenterX=-0.5`.
Set geometry as relative to `v1` and set offset position (`y=2`).

```js
var v11 = graph.insertVertex(v1, null, '1', 0, 0, 10, 16,
    'shape=line;align=left;verticalAlign=middle;fontSize=10;routingCenterX=-0.5;'+
    'spacingLeft=12;fontColor=' + fontColor + ';strokeColor=' + strokeColor);
v11.geometry.relative = true;
v11.geometry.offset = new mxPoint(-v11.geometry.width, 2);
```

Create vertex `v12` as clone of `v11` and name it `2`

```js
var v12 = v11.clone();
    v12.value = '2';
```

Set offset to `y=22` and insert vertex as child of `v1`

```js
    v12.geometry.offset = new mxPoint(-v11.geometry.width, 22);
    v1.insert(v12);
```

Create vertex `v13` as clone of `v11` and name it `3`

```js
    var v13 = v11.clone();
    v13.value = '3';
```

Set offset to `y=42` and insert vertex as child of `v1`

```js
    v13.geometry.offset = new mxPoint(-v11.geometry.width, 42);
    v1.insert(v13);
```

Create vertex `v14` as clone of `v11` and name it `4`

```js
    var v14 = v11.clone();
    v14.value = '4';
```

Set offset to `y=62` and insert vertex as child of `v1`

```js
    v14.geometry.offset = new mxPoint(-v11.geometry.width, 62);
    v1.insert(v14);
```

Create vertex `v15` as clone of `v11` and name it `5`.
Set `routingCenterX=0.5`

```js
    var v15 = v11.clone();
    v15.value = '5';
    v15.geometry.x = 1;
    v15.style = 'shape=line;align=right;verticalAlign=middle;fontSize=10;routingCenterX=0.5;'+
      'spacingRight=12;fontColor=' + fontColor + ';strokeColor=' + strokeColor;
    v15.geometry.offset = new mxPoint(0, 2);
    v1.insert(v15);
```

Create vertex `v16` as clone of `v11` and name it `6`

```js
    var v16 = v15.clone();
    v16.value = '6';
    v16.geometry.offset = new mxPoint(0, 22);
    v1.insert(v16);
```

```js
    var v17 = v15.clone();
    v17.value = '7';
    v17.geometry.offset = new mxPoint(0, 42);
    v1.insert(v17);
```

```js
    var v18 = v15.clone();
    v18.value = '8';
    v18.geometry.offset = new mxPoint(0, 62);
    v1.insert(v18);
```

```js
    var v19 = v15.clone();
    v19.value = 'clk';
    v19.geometry.x = 0.5;
    v19.geometry.y = 1;
    v19.geometry.width = 10;
    v19.geometry.height = 4;
    // NOTE: portConstraint is defined for east direction, so must be inverted here
    v19.style = 'shape=triangle;direction=north;spacingBottom=12;align=center;portConstraint=horizontal;'+
      'fontSize=8;strokeColor=' + strokeColor + ';routingCenterY=0.5;';
    v19.geometry.offset = new mxPoint(-4, -4);
    v1.insert(v19);
```

```js
    var v2 = graph.insertVertex(parent, null, 'R1', 220, 220, 80, 20,
      'shape=resistor;verticalLabelPosition=top;verticalAlign=bottom;');

    // Uses implementation of connection points via constraints (see above)
    //v2.setConnectable(false);

    /*var v21 = graph.insertVertex(v2, null, 'A', 0, 0.5, 10, 1,
      'shape=none;spacingBottom=11;spacingLeft=1;align=left;fontSize=8;'+
      'fontColor=#4c4c4c;strokeColor=#909090;');
    v21.geometry.relative = true;
    v21.geometry.offset = new mxPoint(0, -1);
    
    var v22 = graph.insertVertex(v2, null, 'B', 1, 0.5, 10, 1,
      'spacingBottom=11;spacingLeft=1;align=left;fontSize=8;'+
      'fontColor=#4c4c4c;strokeColor=#909090;');
    v22.geometry.relative = true;
    v22.geometry.offset = new mxPoint(-10, -1);*/
```

```js
    var v3 = graph.addCell(graph.getModel().cloneCell(v1));
    v3.value = 'J3';
    v3.geometry.x = 420;
    v3.geometry.y = 340;

    // Connection constraints implemented in edges, alternatively this
    // can be implemented using references, see: portrefs.html
    var e1 = graph.insertEdge(parent, null, 'e1', v1.getChildAt(7), v2,
      'entryX=0;entryY=0.5;entryPerimeter=0;');
    e1.geometry.points = [new mxPoint(180, 110)];

    var e2 = graph.insertEdge(parent, null, 'e2', v1.getChildAt(4), v2,
      'entryX=1;entryY=0.5;entryPerimeter=0;');
    e2.geometry.points = [new mxPoint(320, 50), new mxPoint(320, 230)];

    var e3 = graph.insertEdge(parent, null, 'crossover', e1, e2);
    e3.geometry.setTerminalPoint(new mxPoint(180, 140), true);
    e3.geometry.setTerminalPoint(new mxPoint(320, 140), false);
```

```js
// 				var e1 = graph.insertEdge(parent, null, 'e1', v1.getChildAt(7), v2.getChildAt(0));
// 				e1.geometry.points = [new mxPoint(180, 140)];
    
// 				var e2 = graph.insertEdge(parent, null, '', v1.getChildAt(4), v2.getChildAt(1));
// 				e2.geometry.points = [new mxPoint(320, 80)];
    
// 				var e3 = graph.insertEdge(parent, null, 'crossover', e1, e2);
// 				e3.geometry.setTerminalPoint(new mxPoint(180, 160), true);
// 				e3.geometry.setTerminalPoint(new mxPoint(320, 160), false);
```

```js
var e4 = graph.insertEdge(parent, null, 'e4', v2, v3.getChildAt(0),
  'exitX=1;exitY=0.5;entryPerimeter=0;');
e4.geometry.points = [new mxPoint(380, 230)];
```

```js
var e5 = graph.insertEdge(parent, null, 'e5', v3.getChildAt(5), v1.getChildAt(0));
e5.geometry.points = [new mxPoint(500, 310), new mxPoint(500, 20), new mxPoint(50, 20)];
```

```js
var e6 = graph.insertEdge(parent, null, '');
e6.geometry.setTerminalPoint(new mxPoint(100, 500), true);
e6.geometry.setTerminalPoint(new mxPoint(600, 500), false);
```

```js
var e7 = graph.insertEdge(parent, null, 'e7', v3.getChildAt(7), e6);
e7.geometry.setTerminalPoint(new mxPoint(500, 500), false);
e7.geometry.points = [new mxPoint(500, 350)];
```

```js
finally
{
  graph.getModel().endUpdate();
}
```

```js  
  document.body.appendChild(mxUtils.button('Zoom In', function()
  {
    graph.zoomIn();
  }));
```

```js
  document.body.appendChild(mxUtils.button('Zoom Out', function()
  {
    graph.zoomOut();
  }));
```

Undo/redo

```js
var undoManager = new mxUndoManager();
var listener = function(sender, evt)
{
  undoManager.undoableEditHappened(evt.getProperty('edit'));
};
```

```js
graph.getModel().addListener(mxEvent.UNDO, listener);
graph.getView().addListener(mxEvent.UNDO, listener);
```

```js
document.body.appendChild(mxUtils.button('Undo', function()
{
  undoManager.undo();
}));
```

```js  
document.body.appendChild(mxUtils.button('Redo', function()
{
  undoManager.redo();
}));
```


Shows XML for debugging the actual model

```js
document.body.appendChild(mxUtils.button('Delete', function()
{
  graph.removeCells();
}));
```

Wire-mode

``js
var checkbox = document.createElement('input');
checkbox.setAttribute('type', 'checkbox');

document.body.appendChild(checkbox);
mxUtils.write(document.body, 'Wire Mode');
```

Starts connections on the background in wire-mode

```js
var connectionHandlerIsStartEvent = graph.connectionHandler.isStartEvent;
graph.connectionHandler.isStartEvent = function(me)
{
  return checkbox.checked || connectionHandlerIsStartEvent.apply(this, arguments);
};
```

Avoids any connections for gestures within tolerance except when in wire-mode
or when over a port

```js
var connectionHandlerMouseUp = graph.connectionHandler.mouseUp;
graph.connectionHandler.mouseUp = function(sender, me) {
  if (this.first != null && this.previous != null)
  {
    var point = mxUtils.convertPoint(this.graph.container, me.getX(), me.getY());
    var dx = Math.abs(point.x - this.first.x);
    var dy = Math.abs(point.y - this.first.y);

    if (dx < this.graph.tolerance && dy < this.graph.tolerance)
    {
      // Selects edges in non-wire mode for single clicks, but starts
      // connecting for non-edges regardless of wire-mode
      if (!checkbox.checked && this.graph.getModel().isEdge(this.previous.cell))
      {
        this.reset();
      }

      return;
    }
  }
  
  connectionHandlerMouseUp.apply(this, arguments);
};
```
  
Grid

```js
var checkbox2 = document.createElement('input');
checkbox2.setAttribute('type', 'checkbox');
checkbox2.setAttribute('checked', 'true');

document.body.appendChild(checkbox2);
mxUtils.write(document.body, 'Grid');
```

```js
mxEvent.addListener(checkbox2, 'click', function(evt)
{
  if (checkbox2.checked)
  {
    container.style.background = 'url(\'images/wires-grid.gif\')';
  }
  else
  {
    container.style.background = '';
  }
  
  container.style.backgroundColor = (invert) ? 'black' : 'white';
});
```

```js  
  mxEvent.disableContextMenu(container);
```