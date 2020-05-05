export const isValidDropTarget = graph => {
  return {
    swimlane: (cell, cells, evt) => {
      return graph.isSwimlane(cell);
    }
  }
}
