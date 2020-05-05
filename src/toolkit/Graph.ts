import { mxgraphFactory } from "ts-mxgraph";
import { DrawLayer } from './Layers';

const { mxRubberband, mxKeyHandler, mxGraphModel, mxGraph } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export const createGraphWithModel = (container: Element, model?: any) => {
  model = model || new mxGraphModel();
  return new mxGraph(container, model);
}

export const createGraphDOMElement = ({left, top}: {left: number, top: number} = {left: 24, top: 26}): Element => {
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

export interface IGraph {
  graph: any
  model: any
}

export const createIsPort = graph => (cell) => {
  var geo = graph.getCellGeometry(cell);
  console.log({geo})
  return (geo != null) ? geo.relative : false;
};

export class Graph {
  graph: any
  _rubberband: any
  _keyHandler: any

  constructor(graph: any) {
    this.graph = graph
  }

  get model() {
    return this.graph.getModel()
  }

  draw(): DrawLayer {
    return new DrawLayer(this, this.defaultParent)
  }

  beginUpdate() {
    this.model.beginUpdate()
  }

  endUpdate() {
    this.model.endUpdate()
  }

  updateTransaction(fn) {
    this.model.beginUpdate()
    fn(this)
    this.model.endUpdate()
  }


  get defaultParent() {
    return this.graph.getDefaultParent();
  }

  disableFolding() {
    this.graph.isCellFoldable = (cell) => false
  }

  enablePorts() {
    this.graph.isPort = createIsPort(this.graph)
  }

  setTooltips(value: boolean) {
    this.graph.setTooltips(value);
  }

  get getStylesheet() {
    return this.graph.getStylesheet()
  }
  
  get defaultEdgeStyle() {
    return this.getStylesheet.getDefaultEdgeStyle();
  }
  
  setEnabled(value: boolean) {
    this.graph.setEnabled(value);
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
