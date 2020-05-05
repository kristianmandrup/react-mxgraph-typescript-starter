import { mxgraphFactory } from "ts-mxgraph";

const { mxRubberband, mxKeyHandler, mxGraphModel, mxGraph } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export const createGraphWithModel = (container: Element, model?: any) => {
  model = model || new mxGraphModel();
  return new mxGraph(container, model);
}

export const createToolbarDOMElement = ({left, top}: {left: number, top: number} = {left: 24, top: 26}): Element => {
  left = left || 24
  top = top || 26
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.overflow = 'hidden';
  container.style.left = `${left}px`;
  container.style.top = `${top}px`;
  container.style.right = '0px';
  container.style.bottom = '0px';
  container.style.background = 'url("images/grid.gif")';
  return container
}

export class Graph {
  graph: any
  _rubberband: any
  _keyHandler: any

  constructor(graph: any) {
    this.graph = graph
  }

  setConnectable(value: boolean) {
    this.graph.setConnectable(value);
  }
  
  setMultigraph(value: boolean) {
    this.graph.setMultigraph(value);
  }
  
  get rubberband() {
    this._rubberband = this._rubberband || new mxRubberband(this.graph)
    return this._rubberband
  }

  get keyHandler() {
    this._keyHandler = this._keyHandler || new mxKeyHandler(this.graph);
    return this._keyHandler      
  }
}
