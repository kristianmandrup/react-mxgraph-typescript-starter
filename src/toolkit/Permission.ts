export class Permission {
  graph: any

  locked: boolean
  createEdges: boolean
  editEdges: boolean
  editVertices: boolean
  cloneCells: boolean

  constructor(graph: any, {locked, createEdges, editEdges, editVertices, cloneCells}: any = {}) {
    this.graph = graph
    this.locked = (locked != null) ? locked : false;
    this.createEdges = (createEdges != null) ? createEdges : true;
    this.editEdges = (editEdges != null) ? editEdges : true;;
    this.editVertices = (editVertices != null) ? editVertices : true;;
    this.cloneCells = (cloneCells != null) ? cloneCells : true;;
  }

  apply() {
    const { graph } = this
    graph.setConnectable(this.createEdges);
    graph.setCellsLocked(this.locked);
  };  
};

// Extends hook functions to use permission object. This could
// be done by assigning the respective switches (eg.
// setMovable), but this approach is more flexible, doesn't
// override any existing behaviour or settings, and allows for
// dynamic conditions to be used in the functions. See the
// specification for more functions to extend (eg.
// isSelectable).
export class GraphPermission {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  get currentPermission(): Permission {
    return this.graph.currentPermission
  }

  getModel(): any {
    return this.graph.getModel()
  }

  init() {
    const { graph, isCellDisconnectable, isTerminalPointMovable } = this
    graph.isCellDisconnectable = isCellDisconnectable
    graph.isTerminalPointMovable = isTerminalPointMovable
  }

  isCellDisconnectable() {
    const { graph, currentPermission } = this
    const origFn = graph.isCellDisconnectable;  
    return origFn.apply(this, arguments) && currentPermission.editEdges;
  }
  
  isTerminalPointMovable() {
    const { graph, currentPermission } = this
    const origFn = graph.isTerminalPointMovable;  
    return origFn.apply(this, arguments) && currentPermission.editEdges;
  }

  isCellBendable() {
    const { graph, currentPermission } = this
    const origFn = graph.isCellBendable;  
    return origFn.apply(this, arguments) && currentPermission.editEdges;
  }
    
  isLabelMovable() {
    const { graph, currentPermission } = this
    const origFn = graph.isLabelMovable;  
    return origFn.apply(this, arguments) && currentPermission.editEdges;
  }

  isCellMovable() {
    const { graph, currentPermission } = this
    const origFn = graph.isCellMovable;  
    return origFn.apply(this, arguments) && currentPermission.editVertices;
  }

  isCellResizable() {
    const { graph, currentPermission } = this
    const origFn = graph.isCellResizable;  
    return origFn.apply(this, arguments) && currentPermission.editVertices;
  }

  isCellEditable(cell) {
    const { graph, currentPermission } = this
    const origFn = graph.isCellEditable;  
    const canEdit = origFn.apply(this, arguments)
    const canEditVertices = (this.getModel().isVertex(cell) && currentPermission.editVertices)
    const canEditEdges = (this.getModel().isEdge(cell) && currentPermission.editEdges)
    return canEdit && (canEditVertices || canEditEdges)
  }
  
  isCellDeletable(cell): boolean {
    const { graph, currentPermission } = this
    const origFn = graph.isCellDeletable;  
    const canDelete = origFn.apply(this, arguments)
    const canEditVertices = (this.getModel().isVertex(cell) && currentPermission.editVertices)
    const canEditEdges = (this.getModel().isEdge(cell) && currentPermission.editEdges)
    return canDelete && (canEditVertices || canEditEdges)

  }

  isCellCloneable() {
    const { graph, currentPermission } = this
    const origFn = graph.isCellCloneable;  
    return origFn.apply(this, arguments) && currentPermission.cloneCells;
  }    
}
