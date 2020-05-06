import { mxgraphFactory } from "ts-mxgraph";

const { mxVertexHandler, mxPoint, mxHandle, mxUtils } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export class Handle {
  handle: any
  state: any
  defaultPositions: any = {}

  constructor(state: any) {
    this.handle = new mxHandle(state, undefined, undefined);
    this.state = state
  }

  init(): Handle {
    return this
  }

  calcPos(maxB, minB, label = 'pos1'): any {
    const { defaultPositions, state } = this    
    const max = parseFloat(mxUtils.getValue(state.style, label, defaultPositions[label]))
    return Math.max(maxB, Math.min(minB, max));
  }

  setStyle({bounds, pt, pos}, label = 'pos1') {
    const { state } = this
    state.style[label] = Math.round(Math.max(0, Math.min(pos, pt.y - bounds.y)));
  }
}

        
export class FirstHandle extends Handle {
  defaultPositions: any = {}
  handle: any
    
  init() {
    this.handle.ignoreGrid = true   
    return this         
  }

  // first:
  // 0, Math.min(bounds.height
  // 0, Math.min(pos2
  getPosition(bounds) {
    const posBounds = this.calcPos(0, bounds.height, 'pos2')
    const pos = this.calcPos(0, posBounds, 'pos1')
    return new mxPoint(bounds.getCenterX(), bounds.y + pos);
  }

  setPosition(bounds, pt) {
    const pos = this.calcPos(0, bounds.height)
    this.setStyle({bounds, pt, pos})
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

  // second:
  // 0, Math.min(bounds.height
  // pos1, Math.min(bounds.height
  getPosition(bounds) {
    const posBounds = this.calcPos(0, bounds.height, 'pos1')
    const pos = this.calcPos(posBounds, bounds.height, 'pos2')    
    return new mxPoint(bounds.getCenterX(), bounds.y + pos);
  };
  
  setPosition(bounds, pt) {
    const pos = this.calcPos(bounds, 'pos1')              
    this.setStyle({bounds, pt, pos}, 'pos2')
  };
  
  execute() {
    this.handle.copyStyle('pos2');
  }
}

export class Handles {
  handler: any
  shape: any
  handleMap: any = {}

  constructor(shape: any) {
    this.shape = shape
    this.handler = mxVertexHandler.prototype  
  }

  init() {
    this.registerHandle('first', this.createHandle(FirstHandle))
    this.registerHandle('second', this.createHandle(SecondHandle))				
  }

  enableRotation() {
    this.handler.rotationEnabled = true;
    return this
  }

  enableLivePreview() {
    this.handler.livePreview = true;    
    return this
  }

  registerHandle(name, handle) {
    this.handleMap[name] = handle
  }

  get state(): any {
    return this.handler.state
  }

  createHandle(clazz) {
    return new clazz(this.state).init().handle
  }

  createCustomHandles(shapeName: string) {
    const { handler } = this
    const { state } = handler
    handler.createCustomHandles = () => {
      if (state.style['shape'] === shapeName) {
        // Implements the handle for the first divider
        const handles = Object.values(this.handleMap)
        return handles
      }   
    }
  }
}
