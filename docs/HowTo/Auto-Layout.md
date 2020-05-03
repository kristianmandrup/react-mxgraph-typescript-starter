# How to Auto layout

```js
  mxEvent.disableContextMenu(container);
```  

Override `installCellOverlayListeners` method for `mxCellRenderer` while keeping reference to built-in method.

In the method we start by calling original method, then we set up `mxEvent` listeners for:

- pointer down
- mouse down
- touch down

Each with the same effect, a `pointerdown` event, so as to streamline the behavior.

```js
  var mxCellRendererInstallCellOverlayListeners = mxCellRenderer.prototype.installCellOverlayListeners;

  mxCellRenderer.prototype.installCellOverlayListeners = function(state, overlay, shape)
  {
    mxCellRendererInstallCellOverlayListeners.apply(this, arguments);

    const triggerEventName = (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown'
    const effect = (evt) => {
      overlay.fireEvent(new mxEventObject('pointerdown', 'event', evt, 'state', state))
    }

    mxEvent.addListener(shape.node, triggerEventName, effect)

    if (!mxClient.IS_POINTER && mxClient.IS_TOUCH)
    {
      mxEvent.addListener(shape.node, 'touchstart', effect)
    }
  };
```  
  
Create the graph inside the given container.

```js  
  var graph = new mxGraph(container);
```

Enable panning and set `useLeftButtonForPanning` so left button can be used for panning.
Disallow "dangling edges".

```js
  graph.setPanning(true);
  graph.panningHandler.useLeftButtonForPanning = true;
  graph.setAllowDanglingEdges(false);
  graph.connectionHandler.select = false;
  graph.view.setTranslate(20, 20);
```

Enable rubberband selection

```js
  new mxRubberband(graph);
```

Get the default parent for inserting new cells. This is normally the first child of the root (ie. layer 0).

```js
  var parent = graph.getDefaultParent();
```  

Create an `addOverlay` function that takes a `cell` as argument.  
The function creates a new overlay with an `add` image and a tooltip `Add outgoing`. For the overlay we add an `onClick` event handler which:

- clears graph selection
- gets the cell geometry data of the cell clicked
- call `executeLayout` with `change` and `post` functions (see definition of `executeLayout` further below)

The `change` functions inserts a new `World` vertex for the cell, at the x and y geoposition of the cell, then adds an overlay for this new vertex. It then inserts a new edge between the cell and the vertex.

The `update` function simply scrolls the view to make the new vertex visible.

```js
  var addOverlay = function(cell)
  {
    // Creates a new overlay with an 'add' image and a tooltip
    var overlay = new mxCellOverlay(new mxImage('images/add.png', 24, 24), 'Add outgoing');
    overlay.cursor = 'hand';

    // Installs a handler for clicks on the overlay
    overlay.addListener(mxEvent.CLICK, function(sender, evt2)
    {
      graph.clearSelection();
      var geo = graph.getCellGeometry(cell);

      var v2;

      executeLayout(function()
      {
        v2 = graph.insertVertex(parent, null, 'World!', geo.x, geo.y, 80, 30);
        addOverlay(v2);
        graph.view.refresh(v2);
        var e1 = graph.insertEdge(parent, null, '', cell, v2);
      }, function()
      {
        graph.scrollCellToVisible(v2);
      });
    });
```

We also add a `pointerdown` listener to the overlay, which:

- gets the `state` and `event` data for the event object `eo` (where pointer was at when event triggered)
- hides the popup menu
- stops editing mode
- calculate the nearest point in the graph
- start connection handler from state and point

```js
    // Special CMS event
    overlay.addListener('pointerdown', function(sender, eo)
    {
      var evt2 = eo.getProperty('event');
      var state = eo.getProperty('state');

      graph.popupMenuHandler.hideMenu();
      graph.stopEditing(false);

      var pt = mxUtils.convertPoint(graph.container,
          mxEvent.getClientX(evt2), mxEvent.getClientY(evt2));
      graph.connectionHandler.start(state, pt.x, pt.y);
      graph.isMouseDown = true;
      graph.isMouseTrigger = mxEvent.isMouseEvent(evt2);
      mxEvent.consume(evt2);
    });
```

The `overlay` is added to the `cell` via `addCellOverlay(cell, overlay)`

```js
    // Sets the overlay for the cell in the graph
    graph.addCellOverlay(cell, overlay);
  }
```

```js
  // Adds cells to the model in a single step
  graph.getModel().beginUpdate();
```

We insert a new vertex `v1` and add an `overlay` for this vertex via `addOverlay(v1)`

```js
  var v1;
  try
  {
    v1 = graph.insertVertex(parent, null, 'Hello,', 0, 0, 80, 30);
    addOverlay(v1);
  }
```

Then we finally update the displayby ending the model update transaction

```js
  finally
  {
    // Updates the display
    graph.getModel().endUpdate();
  }
```

We create a new layout based on `mxHierarchicalLayout` with direction west.

```js
  var layout = new mxHierarchicalLayout(graph, mxConstants.DIRECTION_WEST);
```

We create a custom `executeLayout` function which starts a new model transaction

```js
  var executeLayout = function(change, post)
  {
    graph.getModel().beginUpdate();
    try
    {
      if (change != null)
      {
        change();
      }

        layout.execute(graph.getDefaultParent(), v1);
    }
    catch (e)
    {
      throw e;
    }
```

We create a new morph object via `mxMorphing` and we add a `DONE` listener to the `morph` which ends
the model transaction.

```js
    finally
    {
      // New API for animating graph layout results asynchronously
      var morph = new mxMorphing(graph);
      morph.addListener(mxEvent.DONE, mxUtils.bind(this, function()
      {
        graph.getModel().endUpdate();

        if (post != null)
        {
          post();
        }
      }));
```

We then start the morph animation via `startAnimation`

```js
      morph.startAnimation();
    }
  };
```

We define a custom `connect` method for `mxEdgeHandler` to handle connecting an edge with a terminal (node).
We call the original `connect` method ("inheritance") and then call `executeLayout()`.

We set up similar overrides for graph `resizeCell` and `connectionHandler` `CONNECT` event, calling `executeLayout()` in each case to create uniform experience.

```js
  var edgeHandleConnect = mxEdgeHandler.prototype.connect;
  mxEdgeHandler.prototype.connect = function(edge, terminal, isSource, isClone, me)
  {
    edgeHandleConnect.apply(this, arguments);
    executeLayout();
  };
  
  graph.resizeCell = function()
  {
    mxGraph.prototype.resizeCell.apply(this, arguments);

    executeLayout();
  };

  graph.connectionHandler.addListener(mxEvent.CONNECT, function()
  {
    executeLayout();
  });
}
```
