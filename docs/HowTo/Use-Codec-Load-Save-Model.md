# How to use Codec to Load and Save a model

Get all the divs

```js
				var divs = document.getElementsByTagName('*');
```				

For each div

```js
for (var i = 0; i < divs.length; i++) {
  // ...
}
```

if the `div` element has any `className` with `mxgraph`

```js
const div = divs[i]
if (div.className.toString().indexOf('mxgraph') >= 0)
```

Parse text context of the `container` (div) element to create an `xmlDocument` representing it.

```js
function(container)
{
  var xml = mxUtils.getTextContent(container);
  var xmlDocument = mxUtils.parseXml(xml);
```  

Create a decoder for the `xmlDocument` using `mxCodec`

```js
if (xmlDocument.documentElement != null && xmlDocument.documentElement.nodeName == 'mxGraphModel')
{
  var decoder = new mxCodec(xmlDocument);
  var node = xmlDocument.documentElement;
```

Clear container inner html

```js
  container.innerHTML = '';
```

Create a new Graph for the container and set it up with no tooltips and not enabled.

```js
var graph = new mxGraph(container);
graph.centerZoom = false;
graph.setTooltips(false);
graph.setEnabled(false);
```

Changes the default style for edges "in-place"

```js
var style = graph.getStylesheet().getDefaultEdgeStyle();
style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
```

Enables panning with left mouse button

```js
graph.panningHandler.useLeftButtonForPanning = true;
graph.panningHandler.ignoreCell = true;
graph.container.style.cursor = 'move';
graph.setPanning(true);
```

```js
if (divs[i].style.width == '' && divs[i].style.height == '')
{
  graph.resizeContainer = true;
}
else
{
  // Adds border for fixed size boxes
  graph.border = 20;
}
```

use `decoder` to decode the `graph` model

```js
decoder.decode(node, graph.getModel());
graph.resizeContainer = false;
```

Adds zoom `buttons` in top, left corner

```js
var buttons = document.createElement('div');
buttons.style.position = 'absolute';
buttons.style.overflow = 'visible';
var bs = graph.getBorderSizes();
buttons.style.top = (container.offsetTop + bs.y) + 'px';
buttons.style.left = (container.offsetLeft + bs.x) + 'px';
```

Calculate some coordinate offsets

```js
var left = 0;
var bw = 16;
var bh = 16;

if (mxClient.IS_QUIRKS)
{
  bw -= 1;
  bh -= 1;
}
```

Define `addButton` function, that take a `label` (for the button) and a function to be triggered when
clicking the button

```js
function addButton(label, funct)
{
  var btn = document.createElement('div');
  mxUtils.write(btn, label);
  btn.style.position = 'absolute';
  btn.style.backgroundColor = 'transparent';
  btn.style.border = '1px solid gray';
  btn.style.textAlign = 'center';
  btn.style.fontSize = '10px';
  btn.style.cursor = 'hand';
  btn.style.width = bw + 'px';
  btn.style.height = bh + 'px';
  btn.style.left = left + 'px';
  btn.style.top = '0px';
```

Add `onClick` event handler for `btn` button that calls the `funct` function passed as 2nd argument to
`addButton` (factory function)

```js
  mxEvent.addListener(btn, 'click', function(evt)
  {
    funct();
    mxEvent.consume(evt);
  });
```

Adjust left position for placement of next button

```js
  left += bw;
```

Append newly created button `btn` to `buttons` element (container).

```js
  buttons.appendChild(btn);
};
```

Call `addButton` function to create buttons for `+` (zoom in) and `-` (zoom out)

```js
addButton('+', function()
{
  graph.zoomIn();
});

addButton('-', function()
{
  graph.zoomOut();
});
```

Append `buttons` to `container` element

```js
  if (container.nextSibling != null)
  {
    container.parentNode.insertBefore(buttons, container.nextSibling);
  }
  else
  {
    container.appendChild(buttons);
  }
}
```
