# mxMultiplicity

Defines invalid connections along with the error messages that they produce.  To add or remove rules on a graph, you must add/remove instances of this class to `mxGraph.multiplicities`.

Example:

```js
graph.multiplicities.push(new mxMultiplicity(
  true, 'rectangle', null, null, 0, 2, ['circle'],
  'Only 2 targets allowed',
  'Only circle targets allowed'));
```
  
Defines a rule where each rectangle must be connected to no more than 2 circles and no other types of targets are allowed.