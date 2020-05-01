# Cell overlay

Extends `mxEventSource` to implement a graph overlay, represented by an icon and a tooltip.  Overlays can handle and fire `click` events and are added to the graph using `mxGraph.addCellOverlay`, and removed using `mxGraph.removeCellOverlay`, or `mxGraph.removeCellOverlays` to remove all overlays.  The `mxGraph.getCellOverlays` function returns the array of overlays for a given cell in a graph.  If multiple overlays exist for the same cell, then `getBounds` should be overridden in at least one of the overlays.

Overlays appear on top of all cells in a special layer.  If this is not desirable, then the image must be rendered as part of the shape or label of the cell instead.

Example:

The following adds a new overlays for a given vertex and selects the cell if the overlay is clicked.

```js
var overlay = new mxCellOverlay(img, html);
graph.addCellOverlay(vertex, overlay);
overlay.addListener(mxEvent.CLICK, function(sender, evt)
{
  var cell = evt.getProperty('cell');
  graph.setSelectionCell(cell);
});
```

For cell overlays to be printed use `mxPrintPreview.printOverlays`.
