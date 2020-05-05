import { mxgraphFactory } from "ts-mxgraph";

const { mxGraph } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export const createIsConstituent = graph => cell => {
	return graph.getCurrentCellStyle(cell)['constituent'] === '1';
};

export const redirectSelectionToParent = graph => cell => {
  if (graph.isPart(cell))
  {
    cell = graph.model.getParent(cell);
  }  
  mxGraph.prototype.selectCellForEvent(cell);
};