import mx from "./mx";
const { mxRectangle, mxUtils, mxEvent } = mx

export class Actions {
  graph: any
  hoverIcons: HoverIcons

  get state(): any {
    return this.graph.state
  }

  constructor(graph: any, hoverIcons: HoverIcons) {
    this.graph = graph
    this.hoverIcons = hoverIcons
  }

  destroyIcons() {
    this.hoverIcons.destroyIcons()
  }

  duplicate(evt) {
    const { graph, state } = this
    const { gridSize } = graph;
    graph.setSelectionCells(graph.moveCells([state.cell], gridSize, gridSize, true));
    mxEvent.consume(evt);
    this.destroyIcons();
  }  
}

export class HoverVertexListener {
  // Defines the tolerance before removing the icons
  iconTolerance = 20;
  currentState:any = null
  currentIconSet: any = null
  graph: any

  constructor(graph: any, state: any) {
    this.graph = graph || state.view.graph
  }

  mouseDown(sender, me) {
    // Hides icons on mouse down
    if (this.currentState != null) {
        this.dragLeave(me.getEvent(), this.currentState);
        this.currentState = null;
    }
  }

  mouseMove(sender, me) {
    const { graph } = this
    if (this.currentState !== null && (me.getState() === this.currentState ||
      me.getState() == null)) {
      const tol = this.iconTolerance;
      const tmp = new mxRectangle(me.getGraphX() - tol,
        me.getGraphY() - tol, 2 * tol, 2 * tol);

      if (mxUtils.intersects(tmp, this.currentState)) {
        return;
      }
    }
    
    let tmp = graph.view.getState(me.getCell());
    
    // Ignores everything but vertices
    if (graph.isMouseDown || (tmp != null && !graph.getModel().isVertex(tmp.cell))) {
      tmp = null;
    }

    if (tmp !== this.currentState) {
      if (this.currentState != null) {
          this.dragLeave(me.getEvent(), this.currentState);
      }    
      this.currentState = tmp;    
      if (this.currentState != null) {
          this.dragEnter(me.getEvent(), this.currentState);
      }
    }
  }

  mouseUp(sender, me) { }

  dragEnter(evt, state) {
    // const { graph } = this
    if (this.currentIconSet == null) {
      this.currentIconSet = new HoverVertexListener(null, state);
    }
  }

  dragLeave(evt, state) {
    if (this.currentIconSet != null) {
      this.currentIconSet.destroy();
      this.currentIconSet = null;
    }
  }  

  setGraphMouseListener() {
    const { graph } = this
    // Shows icons if the mouse is over a cell
    graph.addMouseListener({
      mouseDown: this.mouseDown,
      mouseMove: this.mouseMove,
      mouseUp: this.mouseUp,
      dragEnter: this.dragEnter,
      dragLeave: this.dragLeave
    });  
  }
}

export class HoverIcons {
  graph: any
  images: any[] = []

  constructor(graph: any) {
    this.graph = graph
    this.images = []
  }

  get state(): any {
    return this.graph.state
  }

  add({ gestureAction, clickAction, imagePath, title, size, left, top }: any = {}) {
    const { state  } = this

    const defaults = {
      left: (x, width) => x + width,
      top: (y, height) => y + height
    }

    left = left || defaults.left
    top = top || defaults.top

    size = {      
      width: 16,
      height: 16,
      ...size,      
    }
    title = title || 'missing title'
    const { width, height } = size

    // Icon1
    var img = mxUtils.createImage(imagePath);
    img.setAttribute('title', title);
    img.style.position = 'absolute';
    img.style.cursor = 'pointer';
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
    img.style.left = left(state.x, state.width) + 'px';
    img.style.top = top(state.y, state.height) + 'px';
    
    if (gestureAction) {
      mxEvent.addGestureListeners(img, gestureAction, undefined, undefined)
    }    
    if (clickAction) {
      mxEvent.addListener(img, 'click', clickAction)
    }
              
    state.view.graph.container.appendChild(img);
    this.images.push(img);
  }

  disableDrag(evt) {
    // Disables dragging the image
    mxEvent.consume(evt);        
  }

  delete(evt) {
    const { state, graph } = this
    graph.removeCells([state.cell]);
    mxEvent.consume(evt);
    this.destroyIcons();    
  }

  destroyIcons() {
    if (this.images != null) {
      for (var i = 0; i < this.images.length; i++) {
        var img = this.images[i];
        img.parentNode.removeChild(img);
      }
    }    
    this.images = [];
  };  
}