# mxEdgeStyle

Provides various edge styles to be used as the values for `mxConstants.STYLE_EDGE` in a cell style.

Example:

```js
var style = stylesheet.getDefaultEdgeStyle();
style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
```

Sets the default edge style to `ElbowConnector`.

Custom edge style:

To write a custom edge style, a function must be added to the `mxEdgeStyle` object as follows:


```js
mxEdgeStyle.MyStyle = function(state, source, target, points, result)
{
  if (source != null && target != null)
  {
    var pt = new mxPoint(target.getCenterX(), source.getCenterY());

    if (mxUtils.contains(source, pt.x, pt.y))
    {
      pt.y = source.y + source.height;
    }

    result.push(pt);
  }
};
```

In the above example, a right angle is created using a point on the horizontal center of the target vertex and the vertical center of the source vertex.  The code checks if that point intersects the source vertex and makes the edge straight if it does.  The point is then added into the result array, which acts as the return value of the function.

The new edge style should then be registered in the mxStyleRegistry as follows:

```js
mxStyleRegistry.putValue('myEdgeStyle', mxEdgeStyle.MyStyle);
```

The custom edge style above can now be used in a specific edge as follows:

```js
model.setStyle(edge, 'edgeStyle=myEdgeStyle');
```

Note that the key of the `mxStyleRegistry` entry for the function should be used in string values, unless `mxGraphView.allowEval` is `true`, in which case you can also use `mxEdgeStyle.MyStyle` for the value in the cell style above.

Or it can be used for all edges in the graph as follows

```js
var style = graph.getStylesheet().getDefaultEdgeStyle();
style[mxConstants.STYLE_EDGE] = mxEdgeStyle.MyStyle;
```