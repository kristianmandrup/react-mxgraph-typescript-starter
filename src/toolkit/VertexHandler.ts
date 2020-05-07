import mx from "./mx";
const { mxVertexHandler, mxShape, mxConstants, mxStencilRegistry } = mx

export class VertexHandler {
  vertexHandlerProto: any
  graph: any
  state: any

  constructor(graph: any, state: any = {}) {
    this.vertexHandlerProto = mxVertexHandler.prototype
    this.graph = graph
    this.state = state
  }

  enableVertexResizePreviews() {
    this.vertexHandlerProto.createSelectionShape = this.createSelectionShape
  }

  // Uses the shape for resize previews
  createSelectionShape(bounds) {
    const handler = this.vertexHandlerProto
    var key = this.state.style[mxConstants.STYLE_SHAPE];
    var stencil = mxStencilRegistry.getStencil(key);
    let shape: any = null;
    
    if (stencil != null)
    {
      shape = new mxShape(stencil);
      shape.apply(this.state);
    }
    else
    {
      shape = new this.state.shape.constructor();
    }
    
    shape.outline = true;
    shape.bounds = bounds;
    shape.stroke = mxConstants.HANDLE_STROKECOLOR;
    shape.strokewidth = handler.getSelectionStrokeWidth();
    shape.isDashed = handler.isSelectionDashed();
    shape.isShadow = false;
      
    return shape;
  };     
}