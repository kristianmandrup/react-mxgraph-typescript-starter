# Handler

- [Handler](#handler)
  - [mxCellHighlight](#mxcellhighlight)
  - [mxCellMarker](#mxcellmarker)
  - [mxCellTracker](#mxcelltracker)
  - [mxConnectionHandler](#mxconnectionhandler)
    - [Example](#example)
    - [Using images to trigger connections](#using-images-to-trigger-connections)
  - [mxConstraintHandler](#mxconstrainthandler)
  - [mxEdgeHandler](#mxedgehandler)
  - [mxElbowEdgeHandler](#mxelbowedgehandler)
  - [mxGraphHandler](#mxgraphhandler)
  - [mxHandle](#mxhandle)
  - [mxPanningHandler](#mxpanninghandler)
  - [mxPopupMenuHandler](#mxpopupmenuhandler)
  - [mxRubberband](#mxrubberband)
  - [mxSelectionCellsHandler](#mxselectioncellshandler)
  - [mxTooltipHandler](#mxtooltiphandler)
  - [mxVertexHandler](#mxvertexhandler)

## mxCellHighlight

A helper class to highlight cells.  Here is an example for a given cell.

```js
var highlight = new mxCellHighlight(graph, '#ff0000', 2);
highlight.highlight(graph.view.getState(cell)));
```

## mxCellMarker

A helper class to process mouse locations and highlight cells.

Helper class to highlight cells.  To add a cell marker to an existing graph for highlighting all cells, the following code is used:

```js
var marker = new mxCellMarker(graph);
graph.addMouseListener({
  mouseDown: function() {},
  mouseMove: function(sender, me)
  {
    marker.process(me);
  },
  mouseUp: function() {}
});
```

## mxCellTracker

Event handler that highlights cells. Inherits from `mxCellMarker`.

Example:

`new mxCellTracker(graph, '#00FF00');`

For detecting `dragEnter`, `dragOver` and `dragLeave` on cells, the following code can be used:

```js
graph.addMouseListener(
{
  cell: null,
  mouseDown: function(sender, me) { },
  mouseMove: function(sender, me)
  {
    var tmp = me.getCell();

    if (tmp != this.cell)
    {
      if (this.cell != null)
      {
        this.dragLeave(me.getEvent(), this.cell);
      }

      this.cell = tmp;

      if (this.cell != null)
      {
        this.dragEnter(me.getEvent(), this.cell);
      }
    }

    if (this.cell != null)
    {
      this.dragOver(me.getEvent(), this.cell);
    }
  },
  mouseUp: function(sender, me) { },
  dragEnter: function(evt, cell)
  {
    mxLog.debug('dragEnter', cell.value);
  },
  dragOver: function(evt, cell)
  {
    mxLog.debug('dragOver', cell.value);
  },
  dragLeave: function(evt, cell)
  {
    mxLog.debug('dragLeave', cell.value);
  }
});
```

## mxConnectionHandler

Graph event handler that creates new connections.  Uses `mxTerminalMarker` for finding and highlighting the source and target vertices and factoryMethod to create the edge instance.  This handler is built-into `mxGraph.connectionHandler` and enabled using `mxGraph.setConnectable`.

### Example

```js
new mxConnectionHandler(graph, function(source, target, style)
{
  edge = new mxCell('', new mxGeometry());
  edge.setEdge(true);
  edge.setStyle(style);
  edge.geometry.relative = true;
  return edge;
});
```

Here is an alternative solution that just sets a specific user object for new edges by overriding insertEdge.

```js
mxConnectionHandlerInsertEdge = mxConnectionHandler.prototype.insertEdge;
mxConnectionHandler.prototype.insertEdge = function(parent, id, value, source, target, style)
{
  value = 'Test';

  return mxConnectionHandlerInsertEdge.apply(this, arguments);
};
```

### Using images to trigger connections

This handler uses mxTerminalMarker to find the source and target cell for the new connection and creates a new edge using connect.  The new edge is created using createEdge which in turn uses factoryMethod or creates a new default edge.

The handler uses a “highlight-paradigm” for indicating if a cell is being used as a source or target terminal, as seen in other diagramming products.  In order to allow both, moving and connecting cells at the same time, mxConstants.DEFAULT_HOTSPOT is used in the handler to determine the hotspot of a cell, that is, the region of the cell which is used to trigger a new connection.  The constant is a value between 0 and 1 that specifies the amount of the width and height around the center to be used for the hotspot of a cell and its default value is 0.5.  In addition, mxConstants.MIN_HOTSPOT_SIZE defines the minimum number of pixels for the width and height of the hotspot.

This solution, while standards compliant, may be somewhat confusing because there is no visual indicator for the hotspot and the highlight is seen to switch on and off while the mouse is being moved in and out.  Furthermore, this paradigm does not allow to create different connections depending on the highlighted hotspot as there is only one hotspot per cell and it normally does not allow cells to be moved and connected at the same time as there is no clear indication of the connectable area of the cell.

To come across these issues, the handle has an additional createIcons hook with a default implementation that allows to create one icon to be used to trigger new connections.  If this icon is specified, then new connections can only be created if the image is clicked while the cell is being highlighted.  The createIcons hook may be overridden to create more than one mxImageShape for creating new connections, but the default implementation supports one image and is used as follows:

In order to display the “connect image” whenever the mouse is over the cell, an DEFAULT_HOTSPOT of 1 should be used:

```js
mxConstants.DEFAULT_HOTSPOT = 1;
```

In order to avoid confusion with the highlighting, the highlight color should not be used with a connect image:

```js
mxConstants.HIGHLIGHT_COLOR = null;
```

To install the image, the connectImage field of the mxConnectionHandler must be assigned a new mxImage instance:

```js
mxConnectionHandler.prototype.connectImage = new mxImage('images/green-dot.gif', 14, 14);
```

This will use the green-dot.gif with a width and height of 14 pixels as the image to trigger new connections.  In createIcons the icon field of the handler will be set in order to remember the icon that has been clicked for creating the new connection.  This field will be available under selectedIcon in the connect method, which may be overridden to take the icon that triggered the new connection into account.  This is useful if more than one icon may be used to create a connection.

## mxConstraintHandler

Handles constraints on connection targets.  This class is in charge of showing fixed points when the mouse is over a vertex and handles constraints to establish new connections.

## mxEdgeHandler

Graph event handler that reconnects edges and modifies control points and the edge label location.  Uses `mxTerminalMarker` for finding and highlighting new source and target vertices.  This handler is automatically created in mxGraph.createHandler for each selected edge.

To enable adding/removing control points, the following code can be used

```js
mxEdgeHandler.prototype.addEnabled = true;
mxEdgeHandler.prototype.removeEnabled = true;
```

Note: This is an experimental feature.

## mxElbowEdgeHandler

Graph event handler that reconnects edges and modifies control points and the edge label location.  Uses `mxTerminalMarker` for finding and highlighting new source and target vertices.  This handler is automatically created in `mxGraph.createHandler`.  It extends `mxEdgeHandler`.

## mxGraphHandler

Graph event handler that handles selection.  Individual cells are handled separately using `mxVertexHandler` or one of the edge handlers.  These handlers are created using `mxGraph.createHandler` in `mxGraphSelectionModel.cellAdded`.

To avoid the container to scroll a moved cell into view, set `scrollAfterMove` to false.

## mxHandle

Implements a single custom handle for vertices.

mxKeyHandler:

Event handler that listens to keystroke events.  This is not a singleton, however, it is normally only required once if the target is the document element (default).

This handler installs a key event listener in the topmost DOM node and processes all events that originate from descandants of `mxGraph.container` or from the topmost DOM node. The latter means that all unhandled keystrokes are handled by this object regardless of the focused state of the graph.

Example:

The following example creates a key handler that listens to the delete key (46) and deletes the selection cells if the graph is enabled.

```js
var keyHandler = new mxKeyHandler(graph);
keyHandler.bindKey(46, function(evt)
{
  if (graph.isEnabled())
  {
    graph.removeCells();
  }
});
```

Keycodes:

See [example](http://tinyurl.com/yp8jgl) or [list of codes](http://tinyurl.com/229yqw) for a list of keycodes or install a key event listener into the document element and print the key codes of the respective events to the console.

To support the `Command` key and the `Control` key on the Mac, the following code can be used.

```js
keyHandler.getFunction = function(evt)
{
  if (evt != null)
  {
    return (mxEvent.isControlDown(evt) || (mxClient.IS_MAC && evt.metaKey)) ? this.controlKeys[evt.keyCode] : this.normalKeys[evt.keyCode];
  }

  return null;
};
```

## mxPanningHandler

Event handler that pans and creates popupmenus.  To use the left mousebutton for panning without interfering with cell moving and resizing, use `isUseLeftButton` and `isIgnoreCell`.  For grid size steps while panning, use `useGrid`.  This handler is built-into `mxGraph.panningHandler` and enabled using `mxGraph.setPanning`.

## mxPopupMenuHandler

Event handler that creates popupmenus.

## mxRubberband

Event handler that selects rectangular regions.  This is not built-into mxGraph.  To enable rubberband selection in a graph, use the following code.

Example:

```js
var rubberband = new mxRubberband(graph);
```

## mxSelectionCellsHandler

An event handler that manages cell handlers and invokes their mouse event processing functions.

## mxTooltipHandler

Graph event handler that displays tooltips.  mxGraph.getTooltip is used to get the tooltip for a cell or handle.  This handler is built-into `mxGraph.tooltipHandler` and enabled using `mxGraph.setTooltips`.

Example

```js
var handler = new mxTooltipHandler(graph);
```

## mxVertexHandler

Event handler for resizing cells.  This handler is automatically created in `mxGraph.createHandler`.
