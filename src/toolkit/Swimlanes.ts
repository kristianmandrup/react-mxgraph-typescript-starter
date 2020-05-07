import mx from "./mx";
const { mxSwimlaneManager } = mx

export class Swimlanes {
  graph: any
  manager: any

  constructor(graph: any) {
    this.graph = graph
  }
  
  createSwimlaneManager({horizontal, addEnavled, resizeEnabled}: any = {}) {
    const manager = new mxSwimlaneManager(this.graph, horizontal, addEnavled, resizeEnabled);
    this.manager = manager
    return manager
  } 
  
}