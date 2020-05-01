# mxGraphSelectionModel

Implements the selection model for a graph.  Here is a listener that handles all removed selection cells.

```js
graph.getSelectionModel().addListener(mxEvent.CHANGE, function(sender, evt)
{
  var cells = evt.getProperty('added');

  for (var i = 0; i < cells.length; i++)
  {
    // Handle cells[i]...
  }
});
```