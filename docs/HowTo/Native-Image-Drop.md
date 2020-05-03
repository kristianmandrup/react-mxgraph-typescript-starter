# How to do native Image drop into graph

Demonstrates handling native drag and drop of images (requires modern browser).

Checks if the browser is supported

```js
var fileSupport = window.File != null && window.FileReader != null && window.FileList != null;
```

If not supported, display error

```js
if (!fileSupport || !mxClient.isBrowserSupported())
{
  // Displays an error message if the browser is not supported.
  mxUtils.error('Browser is not supported!', 200, false);
}
```

If supported

```js
  else
  {
    // Disables the built-in context menu
    mxEvent.disableContextMenu(container);
    
    // Creates the graph inside the given container
    var graph = new mxGraph(container);

    // Enables rubberband selection
    new mxRubberband(graph);

    mxEvent.addListener(container, 'dragover', function(evt)
    {
      if (graph.isEnabled())
      {
        evt.stopPropagation();
        evt.preventDefault();
      }
    });
    
    mxEvent.addListener(container, 'drop', function(evt)
    {
      if (graph.isEnabled())
      {
        evt.stopPropagation();
        evt.preventDefault();

        // Gets drop location point for vertex
        var pt = mxUtils.convertPoint(graph.container, mxEvent.getClientX(evt), mxEvent.getClientY(evt));
        var tr = graph.view.translate;
        var scale = graph.view.scale;
        var x = pt.x / scale - tr.x;
        var y = pt.y / scale - tr.y;

        // Converts local images to data urls
        var filesArray = event.dataTransfer.files;

                for (var i = 0; i < filesArray.length; i++)
                {
            handleDrop(graph, filesArray[i], x + i * 10, y + i * 10);
                }
      }
    });
  }
};
```

Handles each file as a separate insert for simplicity.
Use barrier to handle multiple files as a single insert.

```js
function handleDrop(graph, file, x, y)
{
```

if the filetype is an image, create a `FileReader` instance `reader` 

```js
  if (file.type.substring(0, 5) == 'image') {
  var reader = new FileReader();
```

Create an `onload` function for the `reader`

```js
  reader.onload = function(e) {
```

Gets size of image for vertex

```js
    var data = e.target.result;
```

SVG needs special handling to add viewbox if missing and find initial size from SVG attributes (only for IE11)

If the file type is an SVG image, get the root element of the image

```js
if (file.type.substring(0, 9) == 'image/svg') {
  var comma = data.indexOf(',');
  var svgText = atob(data.substring(comma + 1));
  var root = mxUtils.parseXml(svgText);
```

Parses SVG to find width and height. If `root` is an element

```js
  if (root != null) {
```

Get all `svg` elements contained within the `root`

```js
    var svgs = root.getElementsByTagName('svg');
```

If there are `svg` elements, get the first (root) svg element and calculate widht and height of entire
SVG from that.

```js
if (svgs.length > 0) {
  var svgRoot = svgs[0];
  var w = parseFloat(svgRoot.getAttribute('width'));
  var h = parseFloat(svgRoot.getAttribute('height'));
```

Check if viewBox attribute already exists

```js
var vb = svgRoot.getAttribute('viewBox');
```

If viewbox not found, set a viewbox of the SVG width/height on the svg root element

```js
if (vb == null || vb.length == 0) {
  svgRoot.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
}
```

Uses width and height from viewbox for missing width and height attributes

```js
else if (isNaN(w) || isNaN(h))
{
  var tokens = vb.split(' ');

  if (tokens.length > 3)
  {
    w = parseFloat(tokens[2]);
    h = parseFloat(tokens[3]);
  }
}
```

Calculate width and height, making sure they are > 0 in any case.

```js
w = Math.max(1, Math.round(w));
h = Math.max(1, Math.round(h));
```

Define the image data using the xml extracted from the root svg element.
Insert a vertex into the graph using `shape=image`, the dimensions (`w` and `h`) and the image `data`.

```js
data = 'data:image/svg+xml,' + btoa(mxUtils.getXml(svgs[0], '\n'));
graph.insertVertex(null, null, '', x, y, w, h, 'shape=image;image=' + data + ';');
```

If not an SVG file, create new `Image` instance

```js
else {
  var img = new Image();
```

Create image `onload` handler function

```js
  img.onload = function() {
```

Calculate width `w` and height `h` of image `img`

```js
    var w = Math.max(1, img.width);
    var h = Math.max(1, img.height);
```

Converts format of data url to cell style value for use in vertex

```js
var semi = data.indexOf(';');
if (semi > 0) {
  data = data.substring(0, semi) + data.substring(data.indexOf(',', semi + 1));
}
```

Insert vertex with `shape=image` in graph, using image sized (width, height) and image data

```js
    graph.insertVertex(null, null, '', x, y, w, h, 'shape=image;image=' + data + ';');
  };
```

Set image `src` to image data loaded

```js
img.src = data;
```

Read file as data url (triggers `onload` handler of `reader`)

```js
reader.readAsDataURL(file);
```