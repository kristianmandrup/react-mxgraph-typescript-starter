# Adds in-place highlighting for complete cell area (no hotspot).

```js
mxConnectionHandlerCreateMarker = mxConnectionHandler.prototype.createMarker;
mxConnectionHandler.prototype.createMarker = function()
{
  var marker = mxConnectionHandlerCreateMarker.apply(this, arguments);
```

Uses complete area of cell for new connections (no hotspot)

```js  
  marker.intersects = function(state, evt)
  {
    return true;
  };
```

Adds in-place highlighting

```js  
  mxCellHighlightHighlight = mxCellHighlight.prototype.highlight;
  marker.highlight.highlight = function(state)
  {
    if (this.state != state)
    {
      if (this.state != null)
      {
        this.state.style = this.lastStyle;
```

Workaround for shape using current stroke width if no strokewidth defined

```js
        this.state.style['strokeWidth'] = this.state.style['strokeWidth'] || '1';
        this.state.style['strokeColor'] = this.state.style['strokeColor'] || 'none';

        if (this.state.shape != null)
        {
          this.state.view.graph.cellRenderer.configureShape(this.state);
          this.state.shape.redraw();
        }
      }

      if (state != null)
      {
        this.lastStyle = state.style;
        state.style = mxUtils.clone(state.style);
        state.style['strokeColor'] = '#00ff00';
        state.style['strokeWidth'] = '3';

        if (state.shape != null)
        {
          state.view.graph.cellRenderer.configureShape(state);
          state.shape.redraw();
        }
      }

      this.state = state;
    }
  };
  
  return marker;
};
```

Define `createMarker` function

```js
mxEdgeHandlerCreateMarker = mxEdgeHandler.prototype.createMarker;
mxEdgeHandler.prototype.createMarker = function()
{
  var marker = mxEdgeHandlerCreateMarker.apply(this, arguments);
  
  // Adds in-place highlighting when reconnecting existing edges
  marker.highlight.highlight = this.graph.connectionHandler.marker.highlight.highlight;
  
  return marker;
}
```
