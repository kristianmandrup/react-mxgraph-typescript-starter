import { mxgraphFactory } from "ts-mxgraph";

const { mxGraph } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

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
