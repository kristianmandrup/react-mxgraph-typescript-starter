# How to Animate

```html
<style type="text/css">
  .flow {
    stroke-dasharray: 8;
    animation: dash 0.5s linear;
    animation-iteration-count: infinite;
  }
  @keyframes dash {
    to {
      stroke-dashoffset: -16;
    }
  }
</style>
```

```js
  var graph = new mxGraph(container);
  graph.setEnabled(false);
  var parent = graph.getDefaultParent();

  var vertexStyle = 'shape=cylinder;strokeWidth=2;fillColor=#ffffff;strokeColor=black;' +
    'gradientColor=#a0a0a0;fontColor=black;fontStyle=1;spacingTop=14;';
  
  graph.getModel().beginUpdate();
  try
  {
    var v1 = graph.insertVertex(parent, null, 'Pump', 20, 20, 60, 60,vertexStyle);
    var v2 = graph.insertVertex(parent, null, 'Tank', 200, 150, 60, 60,vertexStyle);
    var e1 = graph.insertEdge(parent, null, '', v1, v2,
      'strokeWidth=3;endArrow=block;endSize=2;endFill=1;strokeColor=black;rounded=1;');
    e1.geometry.points = [new mxPoint(230, 50)];
    graph.orderCells(true, [e1]);
  }
  finally
  {
    // Updates the display
    graph.getModel().endUpdate();
  }

  // Adds animation to edge shape and makes "pipe" visible
  var state = graph.view.getState(e1);
  state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
  state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', '6');
  state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', 'lightGray');

  // add flow class with CSS animation
  state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'flow');
};
```

