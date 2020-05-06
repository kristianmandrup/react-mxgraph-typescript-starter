import { mxgraphFactory } from "ts-mxgraph";
import { DrawLayer } from './Layers';
import { StyleSheet } from './Stylesheet';
import { VertexToolHandler } from './VertexToolHandler';

const { mxMorphing, mxEvent, mxCellState, mxRubberband, mxKeyHandler, mxGraphModel, mxGraph } = mxgraphFactory({
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
  editor: any
  _rubberband: any
  _keyHandler: any

  constructor(graph: any, editor?: any) {
    this.graph = graph
    this.editor = editor
  }

  get model() {
    return this.graph.model
  }

  isPart(cell: any) {
    this.graph.isPart(cell)
  }

  setFoldingEnabled(value: boolean) {
    this.graph.foldingEnabled = value;
  }

  setRecursiveResizeEnabled(value: boolean) {
    this.graph.recursiveResize = value;
  }

  setCellsDisconnectable(value: boolean) {
    this.graph.setCellsDisconnectable(value);
  }

  setAllowDanglingEdges(value: boolean) {
    this.graph.setAllowDanglingEdges(value);
  }

  setCellsEditable(value: boolean) {
    this.graph.setCellsEditable(value);
  }
  
  setCenterZoom(value: boolean) {
    this.graph.centerZoom = value;
  }

  getModel() {
    return this.graph.getModel()
  }

  draw(): DrawLayer {
    return new DrawLayer(this, this.defaultParent)
  }

  // Disables automatic handling of ports. This disables the reset of the
  // respective style in mxGraph.cellConnected. Note that this feature may
  // be useful if floating and fixed connections are combined.
  disableAutoPorts() {
    this.setPortsEnabled(false);
  }

  setPortsEnabled(value: boolean) {
    this.graph.setPortsEnabled(value);
  }

  morph(onDone: () => void) {
    var morph = new mxMorphing(this.graph);
    morph.addListener(mxEvent.DONE, () => {
      if (onDone != null) {
        onDone();
      }
    });
    
    morph.startAnimation();    
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

  addCellOverlay(cell, overlay) {
    this.graph.addCellOverlay(cell, overlay)
  };

  stopEditing(value: boolean) {
    this.graph.stopEditing(value);
  }
  
  hidePopupMenu() {
    this.graph.popupMenuHandler.hideMenu();
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

  get stylesheet() {
    return this.graph.getStylesheet()
  }

  withStylesheet() {
    return new StyleSheet(this.stylesheet)
  }

  enableConnectPreview() {
    this.graph.connectionHandler.createEdgeState = (me) => {
      var edge = this.graph.createEdge(null, null, null, null, null);      
      return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
    };
  }

  createVertexHandler(...args) {
    this.graph.createHandler = (state) => {
      if (state != null && this.model.isVertex(state.cell)) {
        return new VertexToolHandler(this.graph, state);
      }

      return mxGraph.prototype.createHandler(state);
    }
  };  

  setHtmlLabels(value: boolean) {
    this.graph.setHtmlLabels(value);  
  }
  

  setPanning(value: boolean) {
    this.graph.setPanning(value)
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
