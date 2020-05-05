import { mxgraphFactory } from "ts-mxgraph";

const { mxConstants, mxHierarchicalLayout } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export enum EDirection {
  North,
  South, 
  East,
  West
}

export const dirMap = {
  north: mxConstants.DIRECTION_NORTH,
  south: mxConstants.DIRECTION_SOUTH,
  east: mxConstants.DIRECTION_EAST,
  west: mxConstants.DIRECTION_WEST,

  [EDirection.North]: mxConstants.DIRECTION_NORTH,
  [EDirection.South]: mxConstants.DIRECTION_SOUTH,
  [EDirection.East]: mxConstants.DIRECTION_EAST,
  [EDirection.West]: mxConstants.DIRECTION_WEST
}

export type TDirection = EDirection | string

export class Layout {
  graph: any
  layout: any

  constructor(graph: any) {
    this.graph = graph
  }

  hierarchical(direction: TDirection) {
    const layout = new mxHierarchicalLayout(this.graph, dirMap[direction]);
    this.layout = layout
    return layout
  }
  
  execute(vertex: any) {
    this.layout.execute(this.graph.getDefaultParent(), vertex);
  }
}