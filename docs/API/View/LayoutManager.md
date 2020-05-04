# mxLayoutManager

Implements a layout manager that runs a given layout after any changes to the graph

Example:

```ts
var layoutMgr = new mxLayoutManager(graph);
layoutMgr.getLayout = function(cell, eventName)
{
  return layout;
};
```

See getLayout for a description of the possible eventNames.