import { mxgraphFactory } from "ts-mxgraph";

const { mxEvent, mxCellOverlay, mxUtils, mxConstants } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

const states = mws => {
  const { graph } = mws
  return {
    running: (state, cell) => {
      if (state !== 'Running') return
      graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, '#f8cecc', [cell]);
    },
    waiting: (state, cell) => {
      if (state !== 'Waiting') return
      graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, '#fff2cc', [cell]);
    },
    completed: (state, cell) => {
      if (state !== 'Completed') return
      graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, '#f8cecc', [cell]);
    },
    init: (state, cell) => {
      if (state !== 'Init') return
      graph.addCellOverlay(cell, mws.createOverlay(graph.warningImage, 'State: '+state));
    }
  }
}

export class MonitorWorkflowState {
  graph: any
  states: any

  constructor(graph: any, createStates: any) {
    this.graph = graph
    this.states = createStates(this)
  }

  get tooltipPostFix() {
    return '\nLast update: ' + new Date()
  }

  createOverlay(image, tooltip) {
    const overlay = new mxCellOverlay(image, tooltip);

    // Installs a handler for clicks on the overlay
    overlay.addListener(mxEvent.CLICK, (sender, evt) => {
      mxUtils.alert(tooltip + this.tooltipPostFix);
    });
    
    return overlay;
  };  

  /**
   * Updates the display of the given graph using the XML data
   */
  update(xml) {
    const { graph } = this
    if (xml === null || xml.length > 0) return
    var doc = mxUtils.parseXml(xml);
    
    if (doc != null && doc.documentElement != null) {
      var model = graph.getModel();
      var nodes = doc.documentElement.getElementsByTagName('update');
      
      if (nodes != null && nodes.length > 0) {
        model.beginUpdate();
        try {
          this.processNodes(nodes)
        }
        finally {
          model.endUpdate();
        }
      }
    }
  }

  processNodes(nodes) {
    nodes.map(this.processNode)
  }

  processNode = (node) => {  
    const { graph } = this
    const model = graph.getModel();

    const id = node.getAttribute('id');
    const state = node.getAttribute('state');
    
    // Gets the cell for the given activity name from the model
    var cell = model.getCell(id);  
    // Updates the cell color and adds some tooltip information
    if (cell === null) return
    // Resets the fillcolor and the overlay
    graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, 'white', [cell]);
    graph.removeCellOverlays(cell);
  }

  processStates(state, cell) {
    const { states } = this
    Object.keys(states).map(key => {
      const stateFn = states[key]
      stateFn(state, cell)
    })
  }
}