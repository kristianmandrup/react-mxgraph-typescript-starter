export class Animation {
  graph: any
  edge: any

  constructor(graph: any, edge: any) {
    this.graph = graph
    this.edge = edge
  }

  animate({animateClassName, strokeColor, strokeWidth}: {animateClassName: string, strokeColor?: string, strokeWidth?: number} = {animateClassName: 'flow', strokeColor: 'lightGray', strokeWidth: 6}) {  
    const { graph, edge } = this
    // Adds animation to edge shape and makes "pipe" visible
    var state = graph.view.getState(edge);
    state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
    state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', strokeWidth || 6);
    state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', strokeColor || 'lightGray');
    
    state.shape.node.getElementsByTagName('path')[1].setAttribute('class', animateClassName);
  }
}