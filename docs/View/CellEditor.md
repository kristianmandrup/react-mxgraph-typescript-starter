## In-place editor

In-place editor for the graph.  To control this editor, use `mxGraph.invokesStopCellEditing`, `mxGraph.enterStopsCellEditing` and `mxGraph.escapeEnabled`.  If `mxGraph.enterStopsCellEditing` is true then `ctrl-enter` or `shift-enter` can be used to create a linefeed.  The `F2` and escape keys can always be used to stop editing.

To customize the location of the textbox in the graph, override `getEditorBounds` as follows:

```js
graph.cellEditor.getEditorBounds = function(state)
{
  var result = mxCellEditor.prototype.getEditorBounds.apply(this, arguments);

  if (this.graph.getModel().isEdge(state.cell))
  {
    result.x = state.getCenterX() - result.width / 2;
    result.y = state.getCenterY() - result.height / 2;
  }

  return result;
};
```

Note that this hook is only called if `autoSize` is `false`.  If `autoSize` is `true`, then `mxShape.getLabelBounds` is used to compute the current bounds of the textbox.

The textarea uses the `mxCellEditor` CSS class.  You can modify this class in your custom CSS.  Note: You should modify the CSS after loading the client in the page.

Example:

To only allow numeric input in the in-place editor, use the following code.

```js
var text = graph.cellEditor.textarea;

mxEvent.addListener(text, 'keydown', function (evt)
{
  if (!(evt.keyCode >= 48 && evt.keyCode <= 57) &&
      !(evt.keyCode >= 96 && evt.keyCode <= 105))
  {
    mxEvent.consume(evt);
  }
});
```
