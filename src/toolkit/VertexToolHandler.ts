import mx from "./mx";
const { mxClient, mxVertexHandler, mxUtils, mxEvent } = mx

const noOp = () => {}

export class VertexToolHandler {
  graph: any
  domNode: any
  vertexHandler: any
  
  state: any
  actions: any

  constructor(graph: any, state: any = {}) {
    this.graph = graph
    this.state = state
    this.vertexHandler = new mxVertexHandler(state = {});
    
    this.actions = this.createActions()
  }

  init(...args) {
    this.vertexHandler.init(...args)    
  }

  createActions() {
    const { graph, state, vertexHandler } = this
    return {
      'delete': (evt) => {
        graph.removeCells([state.cell]);
        mxEvent.consume(evt);
      },
      'move': (evt) => {
        graph.graphHandler.start(state.cell,
          mxEvent.getClientX(evt), mxEvent.getClientY(evt));
        graph.graphHandler.cellWasClicked = true;
        graph.isMouseDown = true;
        graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
        mxEvent.consume(evt);
      },
      size: (evt) => {
        vertexHandler.start(mxEvent.getClientX(evt), mxEvent.getClientY(evt), 7);
        graph.isMouseDown = true;
        graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
        mxEvent.consume(evt);
      },
      connect: (evt) => {
        var pt = mxUtils.convertPoint(this.graph.container,
            mxEvent.getClientX(evt), mxEvent.getClientY(evt));
        this.graph.connectionHandler.start(this.state, pt.x, pt.y);
        this.graph.isMouseDown = true;
        this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
        mxEvent.consume(evt);
      }
    }
  }

  redraw() {
    this.vertexHandler.redrawTools()
  }

  redrawTools() {
    if (this.state != null && this.domNode != null)
    {
      var dy = (mxClient.IS_VML && document.compatMode === 'CSS1Compat') ? 20 : 4;
      this.domNode.style.left = (this.state.x + this.state.width - 56) + 'px';
      this.domNode.style.top = (this.state.y + this.state.height + dy) + 'px';
    }
  };
  
  destroyContextIcons(...args) {
    this.vertexHandler.destroy(...args);

    if (this.domNode != null)
    {
      this.domNode.parentNode.removeChild(this.domNode);
      this.domNode = null;
    }
  };  

  createContextDiv() {
    this.domNode = document.createElement('div');
    this.domNode.style.position = 'absolute';
    this.domNode.style.whiteSpace = 'nowrap';    
  }  
  
  createImage(src) {
    if (mxClient.IS_IE && !mxClient.IS_SVG) {
      var img = document.createElement('div');
      img.style.backgroundImage = 'url(' + src + ')';
      img.style.backgroundPosition = 'center';
      img.style.backgroundRepeat = 'no-repeat';
      img.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';      
      return img;
    }
    else {
      return mxUtils.createImage(src);
    }
  };  

  addContextIcon(imagePath, { title, size, type }: any = {}) {
    const img = this.createImage(imagePath);
    img.setAttribute('title', title);
    img.style.cursor = 'pointer';
    img.style.width = `${size.width}px`;
    img.style.height = `${size.height}px`;

    if (type === 'delete')
    var actionFn: any; 
    actionFn = this.actions[type]

    mxEvent.addGestureListeners(img, (evt) => {
      // Disables dragging the image
      mxEvent.consume(evt);
    }, noOp, noOp);
    
    mxEvent.addListener(img, 'click', actionFn)
    this.domNode.appendChild(img);
  }
} 

