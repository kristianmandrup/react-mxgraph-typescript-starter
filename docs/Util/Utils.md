# Util

## mxAbstractCanvas2D

Base class for all canvases.  A description of the public API is available in mxXmlCanvas2D.  All color values of mxConstants.NONE will be converted to null in the state.

## mxAnimation

Implements a basic animation in JavaScript.

## mxAutoSaveManager

Manager for automatically saving diagrams.  The save hook must be implemented.

Example

```js
var mgr = new mxAutoSaveManager(editor.graph);
mgr.save = function()
{
  mxLog.show();
  mxLog.debug('save');
};
```

## mxClipboard

Singleton that implements a clipboard for graph cells.

Example

```js
mxClipboard.copy(graph);
mxClipboard.paste(graph2);
```

This copies the selection cells from the graph to the clipboard and pastes them into graph2.

For fine-grained control of the clipboard data the mxGraph.canExportCell and mxGraph.canImportCell functions can be overridden.

To restore previous parents for pasted cells, the implementation for copy and paste can be changed as follows.

```js
mxClipboard.copy = function(graph, cells)
{
  cells = cells || graph.getSelectionCells();
  var result = graph.getExportableCells(cells);

  mxClipboard.parents = new Object();

  for (var i = 0; i < result.length; i++)
  {
    mxClipboard.parents[i] = graph.model.getParent(cells[i]);
  }

  mxClipboard.insertCount = 1;
  mxClipboard.setCells(graph.cloneCells(result));

  return result;
};

mxClipboard.paste = function(graph)
{
  if (!mxClipboard.isEmpty())
  {
    var cells = graph.getImportableCells(mxClipboard.getCells());
    var delta = mxClipboard.insertCount * mxClipboard.STEPSIZE;
    var parent = graph.getDefaultParent();

    graph.model.beginUpdate();
    try
    {
      for (var i = 0; i < cells.length; i++)
      {
        var tmp = (mxClipboard.parents != null && graph.model.contains(mxClipboard.parents[i])) ?
             mxClipboard.parents[i] : parent;
        cells[i] = graph.importCells([cells[i]], delta, delta, tmp)[0];
      }
    }
    finally
    {
      graph.model.endUpdate();
    }

    // Increments the counter and selects the inserted cells
    mxClipboard.insertCount++;
    graph.setSelectionCells(cells);
  }
};
```

## mxDictionary

A wrapper class for an associative array with object keys.  Note: This implementation uses `mxObjectIdentitiy` to turn object keys into strings.

## mxDivResizer

Maintains the size of a div element in Internet Explorer.  This is a workaround for the right and bottom style being ignored in IE.

If you need a div to cover the `scrollwidth` and `-height` of a document, then you can use this class as follows:

```js
var resizer = new mxDivResizer(background);
resizer.getDocumentHeight = function()
{
  return document.body.scrollHeight;
}
resizer.getDocumentWidth = function()
{
  return document.body.scrollWidth;
}
resizer.resize();
```

## mxDragSource

Wrapper to create a drag source from a DOM element so that the element can be dragged over a graph and dropped into the graph as a new cell.

Problem is that in the dropHandler the current preview location is not available, so the preview and the dropHandler must match.

## mxEffects

Provides animation effects.

## mxEvent

Cross-browser DOM event support.  For internal event handling, mxEventSource and the graph event dispatch loop in mxGraph are used.

### Memory Leaks

Use this class for adding and removing listeners to/from DOM nodes.  The removeAllListeners function is provided to remove all listeners that have been added using addListener.  The function should be invoked when the last reference is removed in the JavaScript code, typically when the referenced DOM node is removed from the DOM.

## mxEventObject

The mxEventObject is a wrapper for all properties of a single event.  Additionally, it also offers functions to consume the event and check if it was consumed as follows:

```js
evt.consume();
evt.isConsumed() == true
```

## mxEventSource

Base class for objects that dispatch named events.  To create a subclass that inherits from `mxEventSource`, the following code is used.

```js
function MyClass() { };

MyClass.prototype = new mxEventSource();
MyClass.prototype.constructor = MyClass;
```

Known Subclasses

`mxGraphModel`, `mxGraph`, `mxGraphView`, `mxEditor`, `mxCellOverlay`, `mxToolbar`, `mxWindow`

## mxForm

A simple class for creating HTML forms.

## mxGuide

Implements the alignment of selection cells to other cells in the graph.

## mxImage

Encapsulates the URL, width and height of an image.

## mxImageBundle

Maps from keys to base64 encoded images or file locations.  All values must be URLs or use the format data:image/format followed by a comma and the base64 encoded image data, eg.  “data:image/gif,XYZ”, where XYZ is the base64 encoded image data.

To add a new image bundle to an existing graph, the following code is used

```js
var bundle = new mxImageBundle(alt);
bundle.putImage('myImage', 'data:image/gif,R0lGODlhEAAQAMIGAAAAAICAAICAgP' +
  '//AOzp2O3r2////////yH+FUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBCgAHACwAAAAA' +
  'EAAQAAADTXi63AowynnAMDfjPUDlnAAJhmeBFxAEloliKltWmiYCQvfVr6lBPB1ggxN1hi' +
  'laSSASFQpIV5HJBDyHpqK2ejVRm2AAgZCdmCGO9CIBADs=', fallback);
bundle.putImage('mySvgImage', 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">' +
  '<linearGradient id="gradient"><stop offset="10%" stop-color="#F00"/>' +
  '<stop offset="90%" stop-color="#fcc"/></linearGradient>' +
  '<rect fill="url(#gradient)" width="100%" height="100%"/></svg>'), fallback);
graph.addImageBundle(bundle);
```

Alt is an optional boolean (default is false) that specifies if the value
or the fallback should be returned in `getImage`.

The image can then be referenced in any cell style using image=myImage.
If you are using mxOutline, you should use the same image bundles in the
graph that renders the outline.

The keys for images are resolved in `mxGraph.postProcessCellStyle` and
turned into a data URI if the returned value has a short data URI format
as specified above.

A typical value for the fallback is a MTHML link as defined in RFC 2557.
Note that this format requires a file to be dynamically created on the
server-side, or the page that contains the graph to be modified to contain
the resources, this can be done by adding a comment that contains the
resource in the HEAD section of the page after the title tag.

This type of fallback mechanism should be used in IE6 and IE7. IE8 does
support data URIs, but the maximum size is limited to 32 KB, which means
all data URIs should be limited to 32 KB.

## mxImageExport

Creates a new image export instance to be used with an export canvas.  Here is an example that uses this class to create an image via a backend using `mxXmlExportCanvas`.

```js
var xmlDoc = mxUtils.createXmlDocument();
var root = xmlDoc.createElement('output');
xmlDoc.appendChild(root);

var xmlCanvas = new mxXmlCanvas2D(root);
var imgExport = new mxImageExport();
imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);

var bounds = graph.getGraphBounds();
var w = Math.ceil(bounds.x + bounds.width);
var h = Math.ceil(bounds.y + bounds.height);

var xml = mxUtils.getXml(root);
new mxXmlRequest('export', 'format=png&w=' + w +
     '&h=' + h + '&bg=#F9F7ED&xml=' + encodeURIComponent(xml))
     .simulate(document, '_blank');
```

## mxLog

A singleton class that implements a simple console.

## mxMorphing

Implements animation for morphing cells.  Here is an example of using this class for animating the result of a layout algorithm:

```js
graph.getModel().beginUpdate();
try
{
  var circleLayout = new mxCircleLayout(graph);
  circleLayout.execute(graph.getDefaultParent());
}
finally
{
  var morph = new mxMorphing(graph);
  morph.addListener(mxEvent.DONE, function()
  {
    graph.getModel().endUpdate();
  });

  morph.startAnimation();
}
```

## mxMouseEvent

Base class for all mouse events in mxGraph.  A listener for this event should implement the following methods:

```js
graph.addMouseListener(
{
  mouseDown: function(sender, evt)
  {
    mxLog.debug('mouseDown');
  },
  mouseMove: function(sender, evt)
  {
    mxLog.debug('mouseMove');
  },
  mouseUp: function(sender, evt)
  {
    mxLog.debug('mouseUp');
  }
});
```

## mxObjectIdentity

Identity for JavaScript objects and functions.  This is implemented using a simple incrementing counter which is stored in each object under FIELD_NAME.

The identity for an object does not change during its lifecycle.

## mxPanningManager

Implements a handler for panning.

## mxPoint

Implements a 2-dimensional vector with double precision coordinates.

## mxPopupMenu

Basic popup menu.  To add a vertical scrollbar to a given submenu, the following code can be used.

```js
var mxPopupMenuShowMenu = mxPopupMenu.prototype.showMenu;
mxPopupMenu.prototype.showMenu = function()
{
  mxPopupMenuShowMenu.apply(this, arguments);

  this.div.style.overflowY = 'auto';
  this.div.style.overflowX = 'hidden';
  this.div.style.maxHeight = '160px';
};
```

## mxRectangle

Extends mxPoint to implement a 2-dimensional rectangle with double precision coordinates.

## mxResources

Implements internationalization.  You can provide any number of resource files on the server using the following format for the filename: name[-en].properties.  The en stands for any lowercase 2-character language shortcut (eg. de for german, fr for french).

If the optional language extension is omitted, then the file is used as a default resource which is loaded in all cases.  If a properties file for a specific language exists, then it is used to override the settings in the default resource.  All entries in the file are of the form key=value.  The values may then be accessed in code via get.  Lines without equal signs in the properties files are ignored.

Resource files may either be added programmatically using add or via a resource tag in the UI section of the editor configuration file, eg:

```xml
<mxEditor>
  <ui>
    <resource basename="examples/resources/mxWorkflow"/>
```

The above element will load examples/resources/mxWorkflow.properties as well as the language specific file for the current language, if it exists.

Values may contain placeholders of the form {1}...{n} where each placeholder is replaced with the value of the corresponding array element in the params argument passed to mxResources.get.  The placeholder {1} maps to the first element in the array (at index 0).

See mxClient.language for more information on specifying the default language or disabling all loading of resources.

Lines that start with a # sign will be ignored.

### Special characters

To use unicode characters, use the standard notation (eg.  \u8fd1) or %u as a prefix (eg.  %u20AC will display a Euro sign).  For normal hex encoded strings, use % as a prefix, eg.  %F6 will display a “o umlaut” (&ouml;).

See resourcesEncoded to disable this.  If you disable this, make sure that your files are UTF-8 encoded.

### Asynchronous loading

By default, the core adds two resource files synchronously at load time.  To load these files asynchronously, set `mxLoadResources` to false before loading `mxClient.js` and use 
`mxResources.loadResources` instead.

## mxSvgCanvas2D

Extends `mxAbstractCanvas2D` to implement a canvas for SVG.  This canvas writes all calls as SVG output to the given SVG root node.

```js
var svgDoc = mxUtils.createXmlDocument();
var root = (svgDoc.createElementNS != null) ?
     svgDoc.createElementNS(mxConstants.NS_SVG, 'svg') : svgDoc.createElement('svg');

if (svgDoc.createElementNS == null)
{
  root.setAttribute('xmlns', mxConstants.NS_SVG);
  root.setAttribute('xmlns:xlink', mxConstants.NS_XLINK);
}
else
{
  root.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', mxConstants.NS_XLINK);
}

var bounds = graph.getGraphBounds();
root.setAttribute('width', (bounds.x + bounds.width + 4) + 'px');
root.setAttribute('height', (bounds.y + bounds.height + 4) + 'px');
root.setAttribute('version', '1.1');

svgDoc.appendChild(root);

var svgCanvas = new mxSvgCanvas2D(root);
```

A description of the public API is available in `mxXmlCanvas2D`.

To disable anti-aliasing in the output, use the following code.

`graph.view.canvas.ownerSVGElement.setAttribute('shape-rendering', 'crispEdges');`

Or set the respective attribute in the SVG element directly.

## mxToolbar

Creates a toolbar inside a given DOM node.  The toolbar may contain icons, buttons and combo boxes.

Variables 

- `container` Reference to the DOM nodes that contains the toolbar.
- `enabled` Specifies if events are handled.
- `noReset` Specifies if resetMode requires a forced flag of true for resetting the current mode in the toolbar.
- `updateDefaultMode` Boolean indicating if the default mode should be the last selected switch mode or the first inserted switch mode.

Functions

- `addItem` Adds the given function as an image with the specified title and icon and returns the new image node.
- `addCombo` Adds and returns a new SELECT element using the given style.
- `addCombo` Adds and returns a new SELECT element using the given title as the default element.
- `addOption` Adds and returns a new OPTION element inside the given SELECT element.
addSwitchMode Adds a new selectable item to the toolbar.
- `addMode` Adds a new item to the toolbar.
- `selectMode` Resets the state of the previously selected mode and displays the given DOM node as selected.
- `resetMode` Selects the default mode and resets the state of the previously selected mode.
- `addSeparator` Adds the specifies image as a separator.
- `addBreak` Adds a break to the container.
- `addLine` Adds a horizontal line to the container.
- `destroy` Removes the toolbar and all its associated resources.

## mxUndoableEdit

Implements a composite undoable edit.  Here is an example for a custom change which gets executed via the model:

```js
function CustomChange(model, name)
{
  this.model = model;
  this.name = name;
  this.previous = name;
};

CustomChange.prototype.execute = function()
{
  var tmp = this.model.name;
  this.model.name = this.previous;
  this.previous = tmp;
};

var name = prompt('Enter name');
graph.model.execute(new CustomChange(graph.model, name));
```

## mxUndoManager

Implements a command history.  When changing the graph model, an <mxUndoableChange> object is created at the start of the transaction (when model.beginUpdate is called).  All atomic changes are then added to this object until the last model.endUpdate call, at which point the mxUndoableEdit is dispatched in an event, and added to the history inside mxUndoManager.  This is done by an event listener in mxEditor.installUndoHandler.

Each atomic change of the model is represented by an object (eg.  mxRootChange, mxChildChange, mxTerminalChange etc) which contains the complete undo information.  The mxUndoManager also listens to the mxGraphView and stores it’s changes to the current root as insignificant undoable changes, so that drilling (step into, step up) is undone.

This means when you execute an atomic change on the model, then change the current root on the view and click undo, the change of the root will be undone together with the change of the model so that the display represents the state at which the model was changed.  However, these changes are not transmitted for sharing as they do not represent a state change.

Example

When adding an undo manager to a graph, make sure to add it to the model and the view as well to maintain a consistent display across multiple undo/redo steps.

```js
var undoManager = new mxUndoManager();
var listener = function(sender, evt)
{
  undoManager.undoableEditHappened(evt.getProperty('edit'));
};
graph.getModel().addListener(mxEvent.UNDO, listener);
graph.getView().addListener(mxEvent.UNDO, listener);
```

The code creates a function that informs the undoManager of an undoable edit and binds it to the undo event of mxGraphModel and mxGraphView using mxEventSource.addListener.

## mxUrlConverter

Converts relative and absolute URLs to absolute URLs with protocol and domain.

## mxVmlCanvas2D

Implements a canvas to be used for rendering VML.  Here is an example of implementing a fallback for SVG images which are not supported in VML-based browsers.

```js
var mxVmlCanvas2DImage = mxVmlCanvas2D.prototype.image;
mxVmlCanvas2D.prototype.image = function(x, y, w, h, src, aspect, flipH, flipV)
{
  if (src.substring(src.length - 4, src.length) == '.svg')
  {
    src = 'http://www.jgraph.com/images/mxgraph.gif';
  }

  mxVmlCanvas2DImage.apply(this, arguments);
};
```

To disable anti-aliasing in the output, use the following code.

`document.createStyleSheet().cssText = mxClient.VML_PREFIX + '\\:*{antialias:false;)}';`

A description of the public API is available in mxXmlCanvas2D.  Note that there is a known issue in VML where gradients are painted using the outer bounding box of rotated shapes, not the actual bounds of the shape.  See also text for plain text label restrictions in shapes for VML.

## mxWindow

Basic window inside a document.

Examples

Creating a simple window.

```js
var tb = document.createElement('div');
var wnd = new mxWindow('Title', tb, 100, 100, 200, 200, true, true);
wnd.setVisible(true);
```

Creating a window that contains an iframe.

```js
var frame = document.createElement('iframe');
frame.setAttribute('width', '192px');
frame.setAttribute('height', '172px');
frame.setAttribute('src', 'http://www.example.com/');
frame.style.backgroundColor = 'white';

var w = document.body.clientWidth;
var h = (document.body.clientHeight || document.documentElement.clientHeight);
var wnd = new mxWindow('Title', frame, (w-200)/2, (h-200)/3, 200, 200);
wnd.setVisible(true);
```

To limit the movement of a window, eg. to keep it from being moved beyond the top, left corner the following method can be overridden (recommended):

```js
wnd.setLocation = function(x, y)
{
  x = Math.max(0, x);
  y = Math.max(0, y);
  mxWindow.prototype.setLocation.apply(this, arguments);
};
```

Or the following event handler can be used

```js
wnd.addListener(mxEvent.MOVE, function(e)
{
  wnd.setLocation(Math.max(0, wnd.getX()), Math.max(0, wnd.getY()));
});
```

To keep a window inside the current window

```js
mxEvent.addListener(window, 'resize', mxUtils.bind(this, function()
{
  var iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var ih = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  var x = this.window.getX();
  var y = this.window.getY();

  if (x + this.window.table.clientWidth > iw)
  {
    x = Math.max(0, iw - this.window.table.clientWidth);
  }

  if (y + this.window.table.clientHeight > ih)
  {
    y = Math.max(0, ih - this.window.table.clientHeight);
  }

  if (this.window.getX() != x || this.window.getY() != y)
  {
    this.window.setLocation(x, y);
  }
}));
```

## mxXmlCanvas2D

Base class for all canvases.  The following methods make up the public interface of the canvas 2D for all painting in mxGraph:

- save, restore
- scale, translate, rotate
- setAlpha, setFillAlpha, setStrokeAlpha, setFillColor, setGradient, setStrokeColor, setStrokeWidth, setDashed, setDashPattern, setLineCap, setLineJoin, setMiterLimit
- setFontColor, setFontBackgroundColor, setFontBorderColor, setFontSize, setFontFamily, setFontStyle
- setShadow, setShadowColor, setShadowAlpha, setShadowOffset
- rect, roundrect, ellipse, image, text
- begin, moveTo, lineTo, quadTo, curveTo
- stroke, fill, fillAndStroke

`mxAbstractCanvas2D.arcTo` is an additional method for drawing paths.  This is a synthetic method, meaning that it is turned into a sequence of curves by default.  Subclassers may add native support for arcs.

## mxXmlRequest

XML HTTP request wrapper.  See also: `mxUtils.get`, `mxUtils.post` and `mxUtils.load`. This class provides a cross-browser abstraction for Ajax requests.

Encoding

For encoding parameter values, the built-in encodeURIComponent JavaScript method must be used.  For automatic encoding of post data in mxEditor the mxEditor.escapePostData switch can be set to true (default).  The encoding will be carried out using the conte type of the page.  That is, the page containting the editor should contain a meta tag in the header, eg.  `<meta http-equiv=”Content-Type” content=”text/html; charset=UTF-8”>`

Example

```js
var onload = function(req)
{
  mxUtils.alert(req.getDocumentElement());
}

var onerror = function(req)
{
  mxUtils.alert('Error');
}
new mxXmlRequest(url, 'key=value').send(onload, onerror);
```

Sends an asynchronous POST request to the specified URL.

Example

```js
var req = new mxXmlRequest(url, 'key=value', 'POST', false);
req.send();
mxUtils.alert(req.getDocumentElement());
```

Sends a synchronous POST request to the specified URL.

Example

```js
var encoder = new mxCodec();
var result = encoder.encode(graph.getModel());
var xml = encodeURIComponent(mxUtils.getXml(result));
new mxXmlRequest(url, 'xml='+xml).send();
```

Sends an encoded graph model to the specified URL using xml as the parameter name.  The parameter can then be retrieved in C# as follows:

`string xml = HttpUtility.UrlDecode(context.Request.Params["xml"]);`