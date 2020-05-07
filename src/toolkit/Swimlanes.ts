import mx from "./mx";
const { mxLayoutManager, mxSwimlaneManager, mxStackLayout } = mx

export class SwimlaneLayoutManager {
  graph: any
  layoutManager: any
  layout: any

  constructor(graph: any, layout: any) {
    this.graph = graph
    const layoutManager = new mxLayoutManager(graph);
    this.layoutManager = layoutManager  
    this.layout = layout
  }

  init() {
    this.layoutManager = this.getLayout
    return this
  }

  get model(): any {
    return this.graph.model
  }

  setLayout() {
    this.layout = new SwimlaneLayout(this.graph).init()
  }

  getLayout(cell) {
    const { graph, layout, model } = this
    if (!model.isEdge(cell) && graph.getModel().getChildCount(cell) > 0 &&
      (model.getParent(cell) === model.getRoot() || graph.isPool(cell))) {
      layout.fill = graph.isPool(cell);      
      return layout;
    }    
    return null;
  }
}


export class SwimlaneLayout {
  graph: any
  layout: any
  layoutManager: any

  constructor(graph: any) {
    this.graph = graph
  
    // Creates a stack depending on the orientation of the swimlane
    const layout = new mxStackLayout(graph, false);
    this.layout = layout
  }

  createManager() {
    return new SwimlaneLayoutManager(this.graph, this.layout).init()
  }  
    

  // Keeps the lanes and pools stacked
  init() {
    const { layout } = this
    // Makes sure all children fit into the parent swimlane
    layout.resizeParent = true;          
    // Applies the size to children if parent size changes
    layout.fill = true;

    layout.isVertexIgnored = this.isVertexIgnored
    return this
  }

  // Only update the size of swimlanes
  isVertexIgnored(vertex) {
    const { graph } = this
    return !graph.isSwimlane(vertex);
  }
}
				
				

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