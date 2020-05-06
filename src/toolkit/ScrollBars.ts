import { mxgraphFactory } from "ts-mxgraph";

const { mxConnectionHandler, mxPoint, mxEvent } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export class ScrollableConnectionHandler {
  handler: any // mxConnectionHandler.prototype

  constructor() {
    this.handler = mxConnectionHandler.prototype
  }

  getRowY(state, tr) {
    var s = state.view.scale;
    var div = tr.parentNode.parentNode.parentNode;
    var offsetTop = parseInt(div.style.top);
    var y = state.y + (tr.offsetTop + tr.offsetHeight / 2 - div.scrollTop + offsetTop) * s;
    y = Math.min(state.y + state.height, Math.max(state.y + offsetTop * s, y));    
    return y;
  };  

  setTargetPerimeterPoint() {
    this.handler.getTargetPerimeterPoint = this.mxConnectionHandler
  }

  // Overrides target perimeter point for connection previews
  targetPerimterPoint(state, me) {
    const handler = this.handler
    // Determines the y-coordinate of the target perimeter point
    // by using the currentRowNode assigned in updateRow
    var y = me.getY();

    if (handler.currentRowNode != null)
    {
      y = this.getRowY(state, handler.currentRowNode);
    }

    // Checks on which side of the terminal to leave
    var x = state.x;
    
    if (handler.previous.getCenterX() > state.getCenterX())
    {
      x += state.width;
    }
    
    return new mxPoint(x, y); 
  }

  setSourcePerimeterPoint() {
    this.handler.getSourcePerimeterPoint = this.getSourcePerimeterPoint.bind(this.handler)
  }

    // Overrides source perimeter point for connection previews
  getSourcePerimeterPoint(state, next, me) {
    const handler = this.handler
      var y = me.getY();

      if (handler.sourceRowNode != null)
      {
        y = this.getRowY(state, handler.sourceRowNode);
      }

      // Checks on which side of the terminal to leave
      var x = state.x;
      
      if (next.x > state.getCenterX())
      {
        x += state.width;
      }

      return new mxPoint(x, y);
    };

    // Disables connections to invalid rows
    isValidTarget(cell) {
      const handler = this.handler
      return handler.currentRowNode != null;
    };
}

export class ScrollableCellRenderer {
  graph: any
  cellRenderer: any
  oldRedrawLabel: any

  constructor(graph: any) {
    this.graph = graph
    this.cellRenderer = graph.
    this.oldRedrawLabel = graph.cellRenderer.redrawLabel;
  }

  // Scroll events should not start moving the vertex
  isLabelEvent(state, evt) {
    var source = mxEvent.getSource(evt);

    return state.text != null && source != state.text.node &&
      source != state.text.node.getElementsByTagName('div')[0];
  };  


// Adds scrollbars to the outermost div and keeps the
// DIV position and size the same as the vertex
redrawLabel(state) {
  this.oldRedrawLabel.apply(this, arguments); // "supercall"
  var graph = state.view.graph;
  var model = graph.model;

  if (model.isVertex(state.cell) && state.text != null) {
    // Scrollbars are on the div
    var s = graph.view.scale;
    state.text.node.style.overflow = 'hidden';
    var div = state.text.node.getElementsByTagName('div')[0];
    
    if (div != null) {
      // Adds height of the title table cell
      var oh = 26;

      div.style.display = 'block';
      div.style.top = oh + 'px';
      div.style.width = Math.max(1, Math.round(state.width / s)) + 'px';
      div.style.height = Math.max(1, Math.round((state.height / s) - oh)) + 'px';
      
      // Installs the handler for updating connected edges
      if (div.scrollHandler == null) {
        div.scrollHandler = true;
        
        const updateEdges = () => {
          const edgeCount = model.getEdgeCount(state.cell);
          
          // Only updates edges to avoid update in DOM order
          // for text label which would reset the scrollbar
          for (var i = 0; i < edgeCount; i++) {
            var edge = model.getEdgeAt(state.cell, i);
            graph.view.invalidate(edge, true, false);
            graph.view.validate(edge);
          }
        };
        
        mxEvent.addListener(div, 'scroll', updateEdges);
        mxEvent.addListener(div, 'mouseup', updateEdges);
      }
    }
  }
}
