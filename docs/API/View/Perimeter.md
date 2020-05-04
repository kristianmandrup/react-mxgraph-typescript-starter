# mxPerimeter

Provides various perimeter functions to be used in a style as the value of `mxConstants.STYLE_PERIMETER`. Perimeters for `rectangle`, `circle`, `rhombus` and `triangle` are available.

Example:

```xml
<add as="perimeter">mxPerimeter.RectanglePerimeter</add>
```

Or programmatically

```js
style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
```

When adding new perimeter functions, it is recommended to use the `mxPerimeter`-namespace as follows:

```js
mxPerimeter.CustomPerimeter = function (bounds, vertex, next, orthogonal)
{
  var x = 0; // Calculate x-coordinate
  var y = 0; // Calculate y-coordainte

  return new mxPoint(x, y);
}
```

The new perimeter should then be registered in the mxStyleRegistry as follows:

```js
mxStyleRegistry.putValue('customPerimeter', mxPerimeter.CustomPerimeter);
```

The custom perimeter above can now be used in a specific vertex as follows:

```js
model.setStyle(vertex, 'perimeter=customPerimeter');
```

Note that the key of the `mxStyleRegistry` entry for the function should be used in string values, unless `mxGraphView.allowEval` is `true`, in which case you can also use `mxPerimeter.CustomPerimeter` for the value in the cell style above.

Or it can be used for all vertices in the graph as follows:

```js
var style = graph.getStylesheet().getDefaultVertexStyle();
style[mxConstants.STYLE_PERIMETER] = mxPerimeter.CustomPerimeter;
```

Note that the object can be used directly when programmatically setting the value, but the key in the `mxStyleRegistry` should be used when setting the value via a key, value pair in a cell style.

The parameters are explained in [RectanglePerimeter]().