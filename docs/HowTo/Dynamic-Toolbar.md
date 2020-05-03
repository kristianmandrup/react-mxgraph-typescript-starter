# How to create a Dynamic Toolbar

Demonstrates changing the state of the toolbar at runtime.

Defines an icon for creating new connections in the connection handler.
This will automatically disable the highlighting of the source vertex.

```js
mxConnectionHandler.prototype.connectImage = new mxImage('images/connector.gif', 16, 16);
```

Creates the div for the toolbar

```js
var tbContainer = document.createElement('div');
tbContainer.style.position = 'absolute';
tbContainer.style.overflow = 'hidden';
tbContainer.style.padding = '2px';
tbContainer.style.left = '0px';
tbContainer.style.top = '0px';
tbContainer.style.width = '24px';
tbContainer.style.bottom = '0px';
    
    document.body.appendChild(tbContainer);
```

Creates new toolbar without event processing

```js
var toolbar = new mxToolbar(tbContainer);
toolbar.enabled = false
```

Creates the div for the graph

```js
var container = document.createElement('div');
container.style.position = 'absolute';
container.style.overflow = 'hidden';
container.style.left = '24px';
container.style.top = '0px';
container.style.right = '0px';
container.style.bottom = '0px';
container.style.background = 'url("editors/images/grid.gif")';

document.body.appendChild(container);
```

Workaround for Internet Explorer ignoring certain styles

```js
if (mxClient.IS_QUIRKS) {
  document.body.style.overflow = 'hidden';
  new mxDivResizer(tbContainer);
  new mxDivResizer(container);
}
```

Creates the model and the graph inside the container using the fastest rendering available on the browser

```js
var model = new mxGraphModel();
var graph = new mxGraph(container, model);
```

Enables new connections in the graph

```js
graph.setConnectable(true);
graph.setMultigraph(false);
```

Stops editing on enter or escape keypress

```js
    var keyHandler = new mxKeyHandler(graph);
    var rubberband = new mxRubberband(graph);
```

`addVertex` helper function used to add toolbar items for shapes (vertices)

```js
var addVertex = function(icon, w, h, style)
{
  var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
  vertex.setVertex(true);
```

Call `addToolbarItem` to add image and vertex to the toolbar and return image to be stored in `img`

```js
  var img = addToolbarItem(graph, toolbar, vertex, icon);
  img.enabled = true;
  
  graph.getSelectionModel().addListener(mxEvent.CHANGE, function()
  {
    var tmp = graph.isSelectionEmpty();
    mxUtils.setOpacity(img, (tmp) ? 100 : 20);
    img.enabled = tmp;
  });
};
```

Call `addVertex` helper for each image and vertex shape (with default dimensions - widht, height)

```js
addVertex('editors/images/rectangle.gif', 100, 40, '');
addVertex('editors/images/rounded.gif', 100, 40, 'shape=rounded');
addVertex('editors/images/ellipse.gif', 40, 40, 'shape=ellipse');
addVertex('editors/images/rhombus.gif', 40, 40, 'shape=rhombus');
addVertex('editors/images/triangle.gif', 40, 40, 'shape=triangle');
addVertex('editors/images/cylinder.gif', 40, 40, 'shape=cylinder');
addVertex('editors/images/actor.gif', 30, 40, 'shape=actor');
```

`addToolbarItem` helper function to add image to the toolbar of the graph.

```js
function addToolbarItem(graph, toolbar, prototype, image) {
```

Function `funct` that is executed when the image is dropped on the graph.
The cell argument points to the cell under the mousepointer if there is one.

```js
  var funct = function(graph, evt, cell, x, y)
  {
    graph.stopEditing(false);

    var vertex = graph.getModel().cloneCell(prototype);
    vertex.geometry.x = x;
    vertex.geometry.y = y;

    graph.addCell(vertex);
    graph.setSelectionCell(vertex);
  }
```

Creates the image `img` which is used as the drag icon (preview)
  
```js
var img = toolbar.addMode(null, image, function(evt, cell)
{
  var pt = this.graph.getPointForEvent(evt);
  funct(graph, evt, cell, pt.x, pt.y);
});
```

Disables dragging if element is disabled. This is a workaround for wrong event order in IE. 
Following is a dummy `mousedown` listener that is invoked as the last listener in IE.

```js
mxEvent.addListener(img, 'mousedown', function(evt)
{
  // do nothing
});
```

This `mousedown` listener is always called first before any other listener in all browsers.

```js
mxEvent.addListener(img, 'mousedown', function(evt)
{
  if (img.enabled == false)
  {
    mxEvent.consume(evt);
  }
});
```

Make image dragable, calling `funct`function on drag

```js
mxUtils.makeDraggable(img, graph, funct);
```

Return image

```js
return img;
```
