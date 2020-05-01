# mxOutline

Implements an outline (aka overview) for a graph.  Set `updateOnPan` to true to enable updates while the source graph is panning.

Example:

```js
var outline = new mxOutline(graph, div);
```

If an outline is used in an mxWindow in IE8 standards mode, the following code makes sure that the shadow filter is not inherited and that any transparent elements in the graph do not show the page background, but the background of the graph container.

```js
if (document.documentMode == 8)
{
  container.style.filter = 'progid:DXImageTransform.Microsoft.alpha(opacity=100)';
}
```

To move the graph to the top, left corner the following code can be used.

```js
var scale = graph.view.scale;
var bounds = graph.getGraphBounds();
graph.view.setTranslate(-bounds.x / scale, -bounds.y / scale);
To toggle the suspended mode, the following can be used.

outline.suspended = !outln.suspended;
if (!outline.suspended)
{
  outline.update(true);
}
```