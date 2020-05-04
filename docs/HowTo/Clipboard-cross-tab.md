# How to create advanced Clipoboard functionality

Demonstrates clipboard providing cross-tab and cross-browser copy and paste.

Disables the built-in context menu

```js
mxEvent.disableContextMenu(container);
```

Creates the graph inside the given container

```js
var graph = new mxGraph(container);
```

Public helper method for shared clipboard.

```js
mxClipboard.cellsToString = function(cells)
{
  var codec = new mxCodec();
  var model = new mxGraphModel();
  var parent = model.getChildAt(model.getRoot(), 0);
  
  for (var i = 0; i < cells.length; i++)
  {
    model.add(parent, cells[i]);
  }

  return mxUtils.getXml(codec.encode(model));
};
```

Focused but invisible textarea during control or meta key events

```js
var textInput = document.createElement('textarea');
mxUtils.setOpacity(textInput, 0);
textInput.style.width = '1px';
textInput.style.height = '1px';
var restoreFocus = false;
var gs = graph.gridSize;
var lastPaste = null;
var dx = 0;
var dy = 0;
```

Workaround for no copy event in IE/FF if empty

```js
textInput.value = ' ';
```
  
Shows a textare when control/cmd is pressed to handle native clipboard actions.
Add event listener for `keydown` event

```js
mxEvent.addListener(document, 'keydown', function(evt)
{
  // No dialog visible
  var source = mxEvent.getSource(evt);
```

Triggered only if:

- graph is enabled
- mouse is not being pressed down
- graph is not being edited
- source of event is not `INPUT`

```js
  if (graph.isEnabled() && !graph.isMouseDown && !graph.isEditing() && source.nodeName != 'INPUT')
  {
```

Test for special keycode pressed

- Control for non-Mac
- Meta (Command key) for Mac

```js
    if (evt.keyCode == 224 /* FF */ || (!mxClient.IS_MAC && evt.keyCode == 17 /* Control */) || (mxClient.IS_MAC && evt.keyCode == 91 /* Meta */))
    {
      // Cannot use parentNode for check in IE
      if (!restoreFocus)
      {
        // Avoid autoscroll but allow handling of events
        textInput.style.position = 'absolute';
        textInput.style.left = (graph.container.scrollLeft + 10) + 'px';
        textInput.style.top = (graph.container.scrollTop + 10) + 'px';
        graph.container.appendChild(textInput);

        restoreFocus = true;
        textInput.focus();
        textInput.select();
      }
    }
  }
});
```

Restores focus on graph container and removes text input from DOM.
Add `keyup` event handler.

```js
    mxEvent.addListener(document, 'keyup', function(evt)
    {
```

Test for Control/Command key pressed down

```js
      if (restoreFocus && (evt.keyCode == 224 /* FF */ || evt.keyCode == 17 /* Control */ ||
        evt.keyCode == 91 /* Meta */))
```

If graph is not being edited set focus to graph container element.
Remove `textInput` node from `parentNode`

```js
      {
        restoreFocus = false;

        if (!graph.isEditing())
        {
          graph.container.focus();
        }

        textInput.parentNode.removeChild(textInput);
      }
    });
```

Inserts the XML for the given cells into the text input for copy

```js
var copyCells = function(graph, cells)
{
  if (cells.length > 0)
  {
    var clones = graph.cloneCells(cells);
```

Checks for orphaned relative children and makes absolute

```js
    for (var i = 0; i < clones.length; i++)
    {
      var state = graph.view.getState(cells[i]);

      if (state != null)
      {
        var geo = graph.getCellGeometry(clones[i]);

        if (geo != null && geo.relative)
        {
          geo.relative = false;
          geo.x = state.x / state.view.scale - state.view.translate.x;
          geo.y = state.y / state.view.scale - state.view.translate.y;
        }
      }
    }

    textInput.value = mxClipboard.cellsToString(clones);
  }
  
  textInput.select();
  lastPaste = textInput.value;
};
```

Handles copy event by putting XML for current selection into text input

```js
mxEvent.addListener(textInput, 'copy', mxUtils.bind(this, function(evt)
{
  if (graph.isEnabled() && !graph.isSelectionEmpty())
  {
    copyCells(graph, mxUtils.sortCells(graph.model.getTopmostCells(graph.getSelectionCells())));
    dx = 0;
    dy = 0;
  }
}));
```

Handles cut event by removing cells putting XML into text input

```js
mxEvent.addListener(textInput, 'cut', mxUtils.bind(this, function(evt)
{
  if (graph.isEnabled() && !graph.isSelectionEmpty())
  {
    copyCells(graph, graph.removeCells());
    dx = -gs;
    dy = -gs;
  }
}));
```

Merges XML into existing graph and layers

```js
var importXml = function(xml, dx, dy)
{
  dx = (dx != null) ? dx : 0;
  dy = (dy != null) ? dy : 0;
  var cells = []

  try
  {
    var doc = mxUtils.parseXml(xml);
    var node = doc.documentElement;

    if (node != null)
    {
      var model = new mxGraphModel();
      var codec = new mxCodec(node.ownerDocument);
      codec.decode(node, model);

      var childCount = model.getChildCount(model.getRoot());
      var targetChildCount = graph.model.getChildCount(graph.model.getRoot());
```

Merges existing layers and adds new layers

```js
      graph.model.beginUpdate();
      try
      {
        for (var i = 0; i < childCount; i++)
        {
          var parent = model.getChildAt(model.getRoot(), i);
```

Adds cells to existing layers if not locked

```js
          if (targetChildCount > i)
          {
```

Inserts into active layer if only one layer is being pasted

```js
            var target = (childCount == 1) ? graph.getDefaultParent() : graph.model.getChildAt(graph.model.getRoot(), i);

            if (!graph.isCellLocked(target))
            {
              var children = model.getChildren(parent);
              cells = cells.concat(graph.importCells(children, dx, dy, target));
            }
          }
          else
          {
```

Delta is non cascading, needs separate move for layers

```js
            parent = graph.importCells([parent], 0, 0, graph.model.getRoot())[0];
            var children = graph.model.getChildren(parent);
            graph.moveCells(children, dx, dy);
            cells = cells.concat(children);
          }
        }
      }
      finally
      {
        graph.model.endUpdate();
      }
    }
  }
  catch (e)
  {
    alert(e);
    throw e;
  }
  
  return cells;
};
```

Parses and inserts XML into graph

```js
var pasteText = function(text)
{
  var xml = mxUtils.trim(text);
  var x = graph.container.scrollLeft / graph.view.scale - graph.view.translate.x;
  var y = graph.container.scrollTop / graph.view.scale - graph.view.translate.y;
  
  if (xml.length > 0)
  {
    if (lastPaste != xml)
    {
      lastPaste = xml;
      dx = 0;
      dy = 0;
    }
    else
    {
      dx += gs;
      dy += gs;
    }
```

Standard paste via control-v

```js
    if (xml.substring(0, 14) == '<mxGraphModel>')
    {
      graph.setSelectionCells(importXml(xml, dx, dy));
      graph.scrollCellToVisible(graph.getSelectionCell());
    }
  }
};
```

Cross-browser function to fetch text from paste events

```js
var extractGraphModelFromEvent = function(evt)
{
  var data = null;
  
  if (evt != null)
  {
    var provider = (evt.dataTransfer != null) ? evt.dataTransfer : evt.clipboardData;

    if (provider != null)
    {
      if (document.documentMode == 10 || document.documentMode == 11)
      {
        data = provider.getData('Text');
      }
      else
      {
        data = (mxUtils.indexOf(provider.types, 'text/html') >= 0) ? provider.getData('text/html') : null;

        if (mxUtils.indexOf(provider.types, 'text/plain' && (data == null || data.length == 0)))
        {
          data = provider.getData('text/plain');
        }
      }
    }
  }
  
  return data;
};
```

Handles paste event by parsing and inserting XML

```js
mxEvent.addListener(textInput, 'paste', function(evt)
{
```

Clears existing contents before paste - should not be needed because all text is selected, but doesn't hurt since the actual pasting of the new text is delayed in all cases.

```js  
  textInput.value = '';

  if (graph.isEnabled())
  {
    var xml = extractGraphModelFromEvent(evt);

    if (xml != null && xml.length > 0)
    {
      pasteText(xml);
    }
    else
    {
```

Timeout for new value to appear

```js
      window.setTimeout(mxUtils.bind(this, function()
      {
        pasteText(textInput.value);
      }), 0);
    }
  }

  textInput.select();
});
```

Enables rubberband selection

```js
new mxRubberband(graph);
```

Gets the default parent for inserting new cells. This is normally the first child of the root (ie. layer 0).

```js
var parent = graph.getDefaultParent();
```

Adds cells to the model in a single step

```js
graph.getModel().beginUpdate();
try
{
  var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
  var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
  var e1 = graph.insertEdge(parent, null, '', v1, v2);
}
```

Updates the display

```js
    finally
    {
      graph.getModel().endUpdate();
    }
  }
};
```
