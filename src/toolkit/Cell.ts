import { mxgraphFactory } from "ts-mxgraph";

const { mxGraph } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export class CellTooltip {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  init() {
    this.graph.getTooltipForCell = this.getTooltipForCell
  }
  getTooltipForCell(cell) {
    const { graph } = this
    const getTooltipForCell = graph.getTooltipForCell;
    const model = graph.getModel()
    
    if (!cell) return ''
    let tip = '';
    var src = model.getTerminal(cell, true);      
    if (src) {
      tip += this.getTooltipForCell(src) + ' ';
    }      
    var parent = model.getParent(cell);      
    if (model.isVertex(parent)) {
      tip += this.getTooltipForCell(parent) + '.';
    }
    tip += getTooltipForCell.apply(graph, arguments);      
    const trg = model.getTerminal(cell, false);      
    if (trg) {
      tip += ' ' + this.getTooltipForCell(trg);
    }
    return tip;
  } 
}

export class Cell {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  createIsConstituent(cell) {
    return this.graph.getCurrentCellStyle(cell)['constituent'] === '1';
  };
  
  redirectSelectionToParent(cell) {
    const { graph } = this
    if (graph.isPart(cell))
    {
      cell = graph.model.getParent(cell);
    }  
    mxGraph.prototype.selectCellForEvent(cell);
  };
}
