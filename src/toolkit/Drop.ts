export class Drop {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  isValidDropTarget() {
    const { graph } = this
    return {
      swimlane: (cell) => {
        return graph.isSwimlane(cell);
      }
    }
  }
  
}
