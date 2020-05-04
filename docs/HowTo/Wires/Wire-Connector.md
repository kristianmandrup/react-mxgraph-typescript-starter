# WireConnector: Implements a custom resistor shape

Direction currently ignored here

```js
mxEdgeStyle.WireConnector = function(state, source, target, hints, result)
{
```

Creates array of all way- and terminalpoints

```js
var pts = state.absolutePoints;
var horizontal = true;
var hint = null;
```

Gets the initial connection from the source terminal or edge

```js
if (source != null && state.view.graph.model.isEdge(source.cell))
{
  horizontal = state.style['sourceConstraint'] == 'horizontal';
}
else if (source != null)
{
  horizontal = source.style['portConstraint'] != 'vertical';
```

Checks the direction of the shape and rotates

```js
  var direction = source.style[mxConstants.STYLE_DIRECTION];
  
  if (direction == 'north' || direction == 'south')
  {
    horizontal = !horizontal;
  }
}
```

Adds the first point
TODO: Should move along connected segment

```js
var pt = pts[0];

if (pt == null && source != null)
{
  pt = new mxPoint(state.view.getRoutingCenterX(source), state.view.getRoutingCenterY(source));
}
else if (pt != null)
{
  pt = pt.clone();
}

var first = pt;
```

Adds the waypoints

```js
if (hints != null && hints.length > 0)
{
  // FIXME: First segment not movable
  /*hint = state.view.transformControlPoint(state, hints[0]);
  mxLog.show();
  mxLog.debug(hints.length,'hints0.y='+hint.y, pt.y)
  
  if (horizontal && Math.floor(hint.y) != Math.floor(pt.y))
  {
    mxLog.show();
    mxLog.debug('add waypoint');

    pt = new mxPoint(pt.x, hint.y);
    result.push(pt);
    pt = pt.clone();
    //horizontal = !horizontal;
  }*/
  
  for (var i = 0; i < hints.length; i++)
  {
    horizontal = !horizontal;
    hint = state.view.transformControlPoint(state, hints[i]);

    if (horizontal)
    {
      if (pt.y != hint.y)
      {
        pt.y = hint.y;
        result.push(pt.clone());
      }
    }
    else if (pt.x != hint.x)
    {
      pt.x = hint.x;
      result.push(pt.clone());
    }
  }
}
else
{
  hint = pt;
}
```

Adds the last point

```js
pt = pts[pts.length - 1];

// TODO: Should move along connected segment
if (pt == null && target != null)
{
  pt = new mxPoint(state.view.getRoutingCenterX(target), state.view.getRoutingCenterY(target));
}

if (horizontal)
{
  if (pt.y != hint.y && first.x != pt.x)
  {
    result.push(new mxPoint(pt.x, hint.y));
  }
}
else if (pt.x != hint.x && first.y != pt.y)
{
  result.push(new mxPoint(hint.x, pt.y));
}
};

mxStyleRegistry.putValue('wireEdgeStyle', mxEdgeStyle.WireConnector);
```

This connector needs an mxEdgeSegmentHandler

```js
mxGraphCreateHandler = mxGraph.prototype.createHandler;
mxGraph.prototype.createHandler = function(state)
{
var result = null;

if (state != null)
{
  if (this.model.isEdge(state.cell))
  {
    var style = this.view.getEdgeStyle(state);

    if (style == mxEdgeStyle.WireConnector)
    {
      return new mxEdgeSegmentHandler(state);
    }
  }
}

return mxGraphCreateHandler.apply(this, arguments);
```
