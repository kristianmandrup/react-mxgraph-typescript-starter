import mx from "./mx";
const { mxFastOrganicLayout, mxConstants, mxHierarchicalLayout, mxRadialTreeLayout, mxCircleLayout } = mx

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

  radial() {
    const layout = new mxRadialTreeLayout(this.graph)
    this.layout = layout
    return layout
  }
  
  circle(radius?: number) {
    const layout = new mxCircleLayout(this.graph, radius)
    this.layout = layout
    return layout
  }

  fastOrganic(force: number = 140) {
    // Creates a layout algorithm to be used
    // with the graph
    const layout = new mxFastOrganicLayout(graph);
    this.layout = layout
    // Moves stuff wider apart than usual
    layout.forceConstant = force;
    return layout
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