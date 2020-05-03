# How to change style of Collapsed cell

Create graph

```js
var graph = new mxGraph(container);
var parent = graph.getDefaultParent();
```

Extends `mxGraphModel.getStyle` to show an image when collapsed
Override `getStyle` method for graph model.

```js
var modelGetStyle = graph.model.getStyle;
graph.model.getStyle = function(cell)
{
  if (cell != null)
  {
```

Call original `getStyle` method (inheritance) to get the base `style`.

```js
    var style = modelGetStyle.apply(this, arguments);
```

If cell is collapsed set the cell style to a custom style

```js
  if (this.isCollapsed(cell))
  {
    style = style + ';shape=image;image=http://www.jgraph.com/images/mxgraph.gif;' +
      'noLabel=1;imageBackground=#C3D9FF;imageBorder=#6482B9';
  }

  return style;
}

return null;
```

Start graph model update transaction

```js
graph.getModel().beginUpdate();
try
{
```

Insert new vertex `v1` named `Container` in graph `parent` with a `swimlane` shape.
Set bounds of `v1` to a rectangle. Insert a vertext `v11` on `v1` named `Hello`

```js
  var v1 = graph.insertVertex(parent, null, 'Container', 20, 20, 200, 200,
    'shape=swimlane;startSize=20;');
  v1.geometry.alternateBounds = new mxRectangle(0, 0, 110, 70);
  var v11 = graph.insertVertex(v1, null, 'Hello,', 10, 40, 120, 80);
}
```

End the model update transaction

```js
finally
{
  graph.getModel().endUpdate();
}
```