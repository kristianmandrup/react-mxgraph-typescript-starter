# How to add icons to selected vertices to carry out special operations

Demonstrates adding icons to selected vertices to carry out special operations.

```js
// Defines a subclass for mxVertexHandler that adds a set of clickable
// icons to every selected vertex.
function mxVertexToolHandler(state) {
  mxVertexHandler.apply(this, arguments);
};

mxVertexToolHandler.prototype = new mxVertexHandler();
mxVertexToolHandler.prototype.constructor = mxVertexToolHandler;

mxVertexToolHandler.prototype.domNode = null;

mxVertexToolHandler.prototype.init = function() {
  mxVertexHandler.prototype.init.apply(this, arguments);
```

In this example we force the use of DIVs for images in IE.
This handles transparency in PNG images properly in IE and fixes the
problem that IE routes all mouse events for a gesture via the
initial IMG node, which means the target vertices.

```js
  this.domNode = document.createElement('div');
  this.domNode.style.position = 'absolute';
  this.domNode.style.whiteSpace = 'nowrap';
```

Workaround for event redirection via image tag in quirks and IE8

```js  
  function createImage(src)
  {
    if (mxClient.IS_IE && !mxClient.IS_SVG)
    {
      var img = document.createElement('div');
      img.style.backgroundImage = 'url(' + src + ')';
      img.style.backgroundPosition = 'center';
      img.style.backgroundRepeat = 'no-repeat';
      img.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';

      return img;
    }
    else
    {
      return mxUtils.createImage(src);
    }
  };
```

Delete

```js
var img = createImage('images/delete2.png');
img.setAttribute('title', 'Delete');
img.style.cursor = 'pointer';
img.style.width = '16px';
img.style.height = '16px';
mxEvent.addGestureListeners(img,
  mxUtils.bind(this, function(evt)
  {
    // Disables dragging the image
    mxEvent.consume(evt);
  })
);
mxEvent.addListener(img, 'click',
  mxUtils.bind(this, function(evt)
  {
    this.graph.removeCells([this.state.cell]);
    mxEvent.consume(evt);
  })
);
this.domNode.appendChild(img);
```

Size

```js
var img = createImage('images/fit_to_size.png');
img.setAttribute('title', 'Resize');
img.style.cursor = 'se-resize';
img.style.width = '16px';
img.style.height = '16px';
mxEvent.addGestureListeners(img,
  mxUtils.bind(this, function(evt)
  {
    this.start(mxEvent.getClientX(evt), mxEvent.getClientY(evt), 7);
    this.graph.isMouseDown = true;
    this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
    mxEvent.consume(evt);
  })
);
this.domNode.appendChild(img);
```

Move

```js
var img = createImage('images/plus.png');
img.setAttribute('title', 'Move');
img.style.cursor = 'move';
img.style.width = '16px';
img.style.height = '16px';
mxEvent.addGestureListeners(img,
  mxUtils.bind(this, function(evt)
  {
    this.graph.graphHandler.start(this.state.cell,
      mxEvent.getClientX(evt), mxEvent.getClientY(evt));
    this.graph.graphHandler.cellWasClicked = true;
    this.graph.isMouseDown = true;
    this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
    mxEvent.consume(evt);
  })
);
this.domNode.appendChild(img);
```

Connect

```js
var img = createImage('images/check.png');
img.setAttribute('title', 'Connect');
img.style.cursor = 'pointer';
img.style.width = '16px';
img.style.height = '16px';
mxEvent.addGestureListeners(img,
  mxUtils.bind(this, function(evt)
  {
    var pt = mxUtils.convertPoint(this.graph.container,
        mxEvent.getClientX(evt), mxEvent.getClientY(evt));
    this.graph.connectionHandler.start(this.state, pt.x, pt.y);
    this.graph.isMouseDown = true;
    this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
    mxEvent.consume(evt);
  })
);
this.domNode.appendChild(img);
```

Append to graph container element and redraw tools

```js
  this.graph.container.appendChild(this.domNode);
  this.redrawTools();
  };
```

Add `redraw` method to `mxVertexToolHandler` which calls `redrawTools`

```js
mxVertexToolHandler.prototype.redraw = function() {
  mxVertexHandler.prototype.redraw.apply(this);
  this.redrawTools();
};
```

`redrawTools` function

```js
mxVertexToolHandler.prototype.redrawTools = function() {
  if (this.state != null && this.domNode != null) {
    var dy = (mxClient.IS_VML && document.compatMode == 'CSS1Compat') ? 20 : 4;
    this.domNode.style.left = (this.state.x + this.state.width - 56) + 'px';
    this.domNode.style.top = (this.state.y + this.state.height + dy) + 'px';
  }
};
```

```js
mxVertexToolHandler.prototype.destroy = function(sender, me) {
  mxVertexHandler.prototype.destroy.apply(this, arguments);

  if (this.domNode != null)
  {
    this.domNode.parentNode.removeChild(this.domNode);
    this.domNode = null;
  }
};
```

Creates the graph inside the given container

```js
var graph = new mxGraph(container);
graph.setConnectable(true);
graph.connectionHandler.createTarget = true;

graph.createHandler = function(state)
{
  if (state != null &&
    this.model.isVertex(state.cell))
  {
    return new mxVertexToolHandler(state);
  }

  return mxGraph.prototype.createHandler.apply(this, arguments);
};
```

Uncomment the following if you want the container to fit the size of the graph

```js
//graph.setResizeContainer(true);
```

Enables rubberband selection

```js
new mxRubberband(graph);
```

Gets the default parent for inserting new cells. This is normally the first child of the root (ie. layer 0).

```js
var parent = graph.getDefaultParent();
```

Adds cells to the model in a single step

```js
graph.getModel().beginUpdate();
try
{
  var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
  var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
  var e1 = graph.insertEdge(parent, null, '', v1, v2);
}
```

Updates the display

```js
finally
{
  graph.getModel().endUpdate();
}
```
