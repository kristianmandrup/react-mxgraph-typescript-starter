# mxStylesheet

Defines the appearance of the cells in a graph.  See `putCellStyle` for an example of creating a new cell style. It is recommended to use objects, not arrays for holding cell styles.  Existing styles can be cloned using `mxUtils.clone` and turned into a string for debugging using mxUtils.toString.

## Default Styles

The stylesheet contains two built-in styles, which are used if no style is defined for a cell:

`defaultVertex` Default style for vertices
`defaultEdge` Default style for edges

Example

```js
var vertexStyle = stylesheet.getDefaultVertexStyle();
vertexStyle[mxConstants.STYLE_ROUNDED] = true;
var edgeStyle = stylesheet.getDefaultEdgeStyle();
edgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
```

Modifies the built-in default styles.

To avoid the default style for a cell, add a leading semicolon to the style definition, eg.

`;shadow=1`

## Removing keys

For removing a key in a cell style of the form [stylename;|key=value;] the special value none can be used, eg. `highlight;fillColor=none`

See also the helper methods in mxUtils to modify strings of this format, namely `mxUtils.setStyle`, `mxUtils.indexOfStylename`, `mxUtils.addStylename`, `mxUtils.removeStylename`, `mxUtils.removeAllStylenames` and `mxUtils.setStyleFlag`.