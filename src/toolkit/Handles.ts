import { mxgraphFactory } from "ts-mxgraph";

const { mxVertexHandler, mxPoint, mxHandle, mxUtils } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export class Handle {
  handle: any
  state: any

  constructor(state: any) {
    this.handle = new mxHandle(state, undefined, undefined);
    this.state = state
  }

  init(): Handle {
    return this
  }
}

        
export class FirstHandle extends Handle {
  defaultPositions: any = {}
  handle: any
    
  init() {
    this.handle.ignoreGrid = true   
    return this         
  }

  getPosition(bounds) {
    const { defaultPositions, state } = this

    let label = 'pos2'
    const max2 = parseFloat(mxUtils.getValue(state.style, label, defaultPositions[label]))
    var pos2 = Math.max(0, Math.min(bounds.height, max2));

    label = 'pos2'
    const max1 = parseFloat(mxUtils.getValue(state.style, label, defaultPositions[label]))
    var pos1 = Math.max(0, Math.min(pos2, max1));

    return new mxPoint(bounds.getCenterX(), bounds.y + pos1);
  }

  setPosition(bounds, pt) {
    const { defaultPositions, state } = this
    let label = 'pos2'
    const max2 = parseFloat(mxUtils.getValue(state.style, label, defaultPositions[label]))
    var pos2 = Math.max(0, Math.min(bounds.height, ));
    
    label = 'pos1'          
    state.style[label] = Math.round(Math.max(0, Math.min(pos2, pt.y - bounds.y)));
  }

  execute() {
    this.handle.copyStyle('pos1');
  }
}

export class SecondHandle extends Handle {
  defaultPositions: any = {}
  handle: any
    
  init() {
    this.handle.ignoreGrid = true
    return this    
  }

  getPosition(bounds) {
    const { defaultPositions, state } = this
    let label = 'pos1'
    const max1 = parseFloat(mxUtils.getValue(state.style, label, defaultPositions[label]))
    var pos1 = Math.max(0, Math.min(bounds.height, max1));

    label = 'pos2'
    const max2 = parseFloat(mxUtils.getValue(state.style, label, defaultPositions[label]))
    var pos2 = Math.max(pos1, Math.min(bounds.height, max2));
    
    return new mxPoint(bounds.getCenterX(), bounds.y + pos2);
  };
  
  setPosition(bounds, pt) {
    let label = 'pos1'
    const { defaultPositions, state } = this
    const max1 = parseFloat(mxUtils.getValue(state.style, label, defaultPositions[label]))
    var pos1 = Math.max(0, Math.min(bounds.height, max1));
              
    label = 'pos2'
    this.state.style[label] = Math.round(Math.max(pos1, Math.min(bounds.height, pt.y - bounds.y)));
  };
  
  execute() {
    this.handle.copyStyle('pos2');
  }
}

export class Handles {
  handler: any
  shape: any

  constructor(shape: any) {
    this.shape = shape
    this.handler = mxVertexHandler.prototype  
  }

  createCustomHandles(shapeName: string) {
    const { handler } = this
    const { state } = handler
    handler.createCustomHandles = () => {
      if (state.style['shape'] === shapeName) {
        // Implements the handle for the first divider

        // first handle
        const first = new FirstHandle(state).init().handle
        // second handle
        const second = new SecondHandle(state).init().handle

        return [first, second]
      }   
    }
  }
}
