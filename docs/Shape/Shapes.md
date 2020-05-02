# Shapes

## mxActor

Extends mxShape to implement an actor shape.  If a custom shape with one filled area is needed, then this shape’s redrawPath should be overridden.

Example
function SampleShape() { }

SampleShape.prototype = new mxActor();
SampleShape.prototype.constructor = vsAseShape;

mxCellRenderer.registerShape('sample', SampleShape);
SampleShape.prototype.redrawPath = function(path, x, y, w, h)
{
  path.moveTo(`0`, `0`);
  path.lineTo(w, h);
  // ...
  path.close();
}

This shape is registered under mxConstants.SHAPE_ACTOR in mxCellRenderer.

## mxArrow

Extends mxShape to implement an arrow shape.  (The shape is used to represent edges, not vertices.)  This shape is registered under mxConstants.SHAPE_ARROW in mxCellRenderer.

## mxArrowConnector

Extends `mxShape` to implement an new rounded arrow shape with support for waypoints and double arrows.  (The shape is used to represent edges, not vertices.)  This shape is registered under `mxConstants`.`SHAPE_ARROW_CONNECTOR` in `mxCellRenderer`.

## mxCloud

Extends `mxActor` to implement a cloud shape.

This shape is registered under `mxConstants.SHAPE_CLOUD` in `mxCellRenderer`.

## mxConnector

Extends `mxShape` to implement a connector shape.  The connector shape allows for arrow heads on either side.

This shape is registered under `mxConstants.SHAPE_CONNECTOR` in `mxCellRenderer`.

## mxCylinder

Extends mxShape to implement an cylinder shape.  If a custom shape with one filled area and an overlay path is needed, then this shape’s redrawPath should be overridden.  This shape is registered under mxConstants.SHAPE_CYLINDER in mxCellRenderer.

## mxDoubleEllipse

Extends mxShape to implement a double ellipse shape.  This shape is registered under mxConstants.SHAPE_DOUBLE_ELLIPSE in mxCellRenderer.  Use the following override to only fill the inner ellipse in this shape:

```js
mxDoubleEllipse.prototype.paintVertexShape = function(c, x, y, w, h)
{
  c.ellipse(x, y, w, h);
  c.stroke();

  var inset = mxUtils.getValue(this.style, mxConstants.STYLE_MARGIN, Math.min(3 + this.strokewidth, Math.min(w / 5, h / 5)));
  x += inset;
  y += inset;
  w -= 2 * inset;
  h -= 2 * inset;

  if (w > `0` && h > `0`)
  {
    c.ellipse(x, y, w, h);
  }

  c.fillAndStroke();
};
```

## mxEllipse

Extends mxShape to implement an ellipse shape.  This shape is registered under mxConstants.SHAPE_ELLIPSE in mxCellRenderer.

## mxHexagon

Implementation of the hexagon shape.

## mxImageShape

Extends mxShape to implement an image shape.  This shape is registered under mxConstants.SHAPE_IMAGE in mxCellRenderer.

## mxLabel

Extends mxShape to implement an image shape with a label.  This shape is registered under mxConstants.SHAPE_LABEL in mxCellRenderer.

## mxLine

Extends mxShape to implement a horizontal line shape.  This shape is registered under mxConstants.SHAPE_LINE in mxCellRenderer.

## mxMarker

A static class that implements all markers for VML and SVG using a registry.

## mxPolyline

Extends mxShape to implement a polyline (a line with multiple points).  This shape is registered under `mxConstants.SHAPE_POLYLINE` in `mxCellRenderer`.

## mxRectangleShape

Extends mxShape to implement a rectangle shape.  This shape is registered under mxConstants.SHAPE_RECTANGLE in mxCellRenderer.

## mxRhombus

Extends mxShape to implement a rhombus (aka diamond) shape.  This shape is registered under mxConstants.SHAPE_RHOMBUS in mxCellRenderer.

## mxShape

Base class for all shapes.  A shape in mxGraph is a separate implementation for SVG, VML and HTML.  Which implementation to use is controlled by the dialect property which is assigned from within the mxCellRenderer when the shape is created.  The dialect must be assigned for a shape, and it does normally depend on the browser and the confiuration of the graph (see mxGraph rendering hint).

For each supported shape in SVG and VML, a corresponding shape exists in mxGraph, namely for text, image, rectangle, rhombus, ellipse and polyline.  The other shapes are a combination of these shapes (eg. label and swimlane) or they consist of one or more (filled) path objects (eg. actor and cylinder).  The HTML implementation is optional but may be required for a HTML-only view of the graph.

Custom Shapes
To extend from this class, the basic code looks as follows.  In the special case where the custom shape consists only of one filled region or one filled region and an additional stroke the mxActor and mxCylinder should be subclassed, respectively.

`function CustomShape() { }`

```js
CustomShape.prototype = new mxShape();
CustomShape.prototype.constructor = CustomShape;
```

To register a custom shape in an existing graph instance, one must register the shape under a new name in the graph’s cell renderer as follows:

```js
mxCellRenderer.registerShape('customShape', CustomShape);
```

The second argument is the name of the constructor.

In order to use the shape you can refer to the given name above in a stylesheet.  For example, to change the shape for the default vertex style, the following code is used:

```js
var style = graph.getStylesheet().getDefaultVertexStyle();
style[mxConstants.STYLE_SHAPE] = 'customShape';`
```

## mxStencil

Implements a generic shape which is based on a XML node as a description.

### shape

The outer element is shape, that has attributes
- `name`, string, required.  The stencil name that uniquely identifies the shape.
- `w` and `h` are optional decimal view bounds.  This defines your co-ordinate system for the graphics operations in the shape.  The default is `1`0``0`,1`0`0`.
- `aspect`, optional string.  Either `variable`, the default, or `fixed`  Fixed means always render the shape with the aspect ratio defined by the ratio w/h.  Variable causes the ratio to match that of the geometry of the current vertex.
- `strokewidth`, optional string.  Either an integer or the string `inherit`.  `inherit` indicates that the `strokeWidth` of the cell is only changed on scaling, not on resizing.  Default is `1`.  If numeric values are used, the `strokeWidth` of the cell is changed on both scaling and resizing and the value defines the multiple that is applied to the width.

#### Connections

If you want to define specific fixed connection points on the shape use the connections element.  Each constraint element within connections defines a fixed connection point on the shape.  Constraints have attributes:

- `perimeter`, required.  `1` or `0`.  `0` sets the connection point where specified by x,y.  `1` Causes the position of the connection point to be extrapolated from the center of the shape, through `x,y` to the point of intersection with the perimeter of the shape.
- `x` and `y` are the position of the fixed point relative to the bounds of the shape.  They can be automatically adjusted if `perimeter=1`.  So, `(`0`,`0`)` is top left, `(`0`.5,`0`.5)` the center, `(1,`0`.5)` the center of the right hand edge of the bounds, etc.  Values may be less than `0` or greater than `1` to be positioned outside of the shape.
- `name`, optional string.  A unique identifier for the port on the shape.
background and foreground

The path of the graphics drawing is split into two elements, foreground and background.  The split is to define which part any shadow applied to the shape is derived from (the background).  This, generally, means the background is the line tracing of the outside of the shape, but not always.

Any stroke, fill or fillstroke of a background must be the first element of the foreground element, they must not be used within background.  If the background is empty, this is not required.

Because the background cannot have any fill or stroke, it can contain only one path, rect, roundrect or ellipse element (or none).  It can also not include image, text or include-shape.

Note that the state, styling and drawing in mxGraph stencils is very close in design to that of HTML 5 canvas.  Tutorials on this subject, if you’re not familiar with the topic, will give a good high-level introduction to the concepts used.

#### State

Rendering within the foreground and background elements has the concept of state.  There are two types of operations other than state save/load, styling and drawing.  The styling operations change the current state, so you can save the current state with `<save/>` and pull the last saved state from the state stack using `<restore/>`.

#### Styling

The elements that change colors within the current state all take a hash prefixed hex color code (`#FFEA8`0``).

- `strokecolor`, this sets the color that drawing paths will be rendered in when a stroke or fillstroke command is issued.
- `fillcolor`, this sets the color that the inside of closed paths will be rendered in when a fill or `fillstroke` command is issued.
- `fontcolor`, this sets the color that fonts are rendered in when text is drawn.
- `alpha` defines the degree of transparency used between `1.0` for fully opaque and `0.0` for fully transparent.
- `fillalpha` defines the degree of fill transparency used between `1.0` for fully opaque and `0.0` for fully transparent.
- `strokealpha` defines the degree of stroke transparency used between `1.0` for fully opaque and `0.0` for fully transparent.
- `strokewidth` defines the integer thickness of drawing elements rendered by stroking.  Use fixed=`1` to apply the value as-is, without scaling.
- `dashed` is `1` for dashing enabled and `0` for disabled.

When `dashed` is enabled the current dash pattern, defined by dashpattern, is used on strokes. dashpattern is a sequence of space separated `on, off` lengths that define what distance to paint the stroke for, then what distance to paint nothing for, repeat...  The default is `3 3`.  You could define a more complex pattern with `5 3 2 6`, for example.  Generally, it makes sense to have an even number of elements in the dashpattern, but that’s not required.

`linejoin`, `linecap` and `miterlimit` are best explained by the Mozilla page on Canvas styling (about halfway down).  The values are all the same except we use `flat` for `linecap`, instead of Canvas’ `butt`.

For font styling there are.

- `fontsize`, an integer,
- `fontstyle`, an ORed bit pattern of bold (1), italic (2) and underline (4), i.e bold underline is `5`.
- `fontfamily`, is a string defining the typeface to be used.

#### Drawing

Most drawing is contained within a path element.  Again, the graphic primitives are very similar to that of HTML 5 canvas.

- `move` to attributes required decimals (x,y).
- `line` to attributes required decimals (x,y).
- `quad` to required decimals (x2,y2) via control point required decimals (x1,y1).
- `curve` to required decimals (x3,y3), via control points required decimals (x1,y1) and (x2,y2).
- `arc`, this doesn’t follow the HTML Canvas signatures, instead it’s a copy of the SVG arc command.  The SVG specification documentation gives the best description of its behaviors.  The attributes are named identically, they are decimals and all required.
- `close` ends the current subpath and causes an automatic straight line to be drawn from the current  point to the initial point of the current subpath.

#### Complex drawing

In addition to the graphics primitive operations there are non-primitive operations.  These provide an easy method to draw some basic shapes.

- `rect`, attributes: `x`, `y`, `w`, `h`, all required decimals
- `roundrect`, attributes: `x`, `y`, `w`, `h`, all required decimals.  Also `arcsize` an optional decimal attribute defining how large, the corner curves are.
- `ellipse`, attributes: `x`, `y`, `w`, `h`, all required decimals.
Note that these 3 shapes and all paths must be followed by either a `fill`, `stroke`, or `fillstroke`.

#### Text

text elements have the following attributes.

- `str`, the text string to display, required.
- `x` and `y`, the decimal location (x,y) of the text element, required.
- `align`, the horizontal alignment of the text element, either `left`, `center` or `right`.  Optional, default is `left`.
- `valign`, the vertical alignment of the text element, either `top`, `middle` or `bottom`.  Optional, default is `top`.
- `localized`, `0` or 1, if 1 then the `str` actually contains a key to use to fetch the value out of mxResources.  Optional, default is mxStencil.defaultLocalized.
- `vertical`, `0` or 1, if 1 the label is rendered vertically (rotated by 9`0` degrees).  Optional, default is `0`.
- `rotation`, angle in degrees (`0` to 36`0`).  The angle to rotate the text by.  Optional, default is `0`.
- `align-shape`, `0` or `1`, if `0` ignore the rotation of the shape when setting the text rotation.  Optional, default is `1`.

If `allowEval` is `true`, then the text content of the this element can define a function which is invoked with the shape as the only argument and returns the value for the text element (ignored if the str attribute is not `null`).

#### Images

image elements can either be external URLs, or data URIs, where supported (not in IE 7-).  Attributes are:

- `src`, required string.  Either a data URI or URL.
- `x`, `y`, required decimals.  The (x,y) position of the image.
`w`, `h`, required decimals.  The width and height of the image.
`flipH` and `flipV`, optional `0` or 1.  Whether to flip the image along the horizontal/vertical axis.  Default is `0` for both.
If allowEval is true, then the text content of the this element can define a function which is invoked with the shape as the only argument and returns the value for the image source (ignored if the src attribute is not null).

#### Sub-shapes

include-shape allow stencils to be rendered within the current stencil by referencing the sub-stencil by name.  Attributes are:

- `name`, required string.  The unique shape name of the stencil.
- `x`, `y`, `w`, `h`, required decimals.  The (x,y) position of the sub-shape and its width and height.

## mxStencilRegistry

A singleton class that provides a registry for stencils and the methods for painting those stencils onto a canvas or into a DOM.

## mxSwimlane

Extends mxShape to implement a swimlane shape.  This shape is registered under mxConstants.SHAPE_SWIMLANE in mxCellRenderer.  Use the <mxConstants.STYLE_STYLE_STARTSIZE> to define the size of the title region, mxConstants.STYLE_SWIMLANE_FILLCOLOR for the content area fill, mxConstants.STYLE_SEPARATORCOLOR to draw an additional vertical separator and mxConstants.STYLE_SWIMLANE_LINE to hide the line between the title region and the content area.  The mxConstants.STYLE_HORIZONTAL affects the orientation of this shape, not only its label.

## mxText

Extends mxShape to implement a text shape.  To change vertical text from bottom to top to top to bottom, the following code can be used:

```js
mxText.prototype.verticalTextRotation = 90;
```

## mxTriangle

Implementation of the triangle shape.