import { mxgraphFactory } from "ts-mxgraph";

const { mxUtils, mxConstants } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export class MonitorWorkflowState {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  /**
   * Updates the display of the given graph using the XML data
   */
  update(xml) {
    const { graph } = this
    if (xml != null && xml.length > 0) {
      var doc = mxUtils.parseXml(xml);
      
      if (doc != null && doc.documentElement != null) {
        var model = graph.getModel();
        var nodes = doc.documentElement.getElementsByTagName('update');
        
        if (nodes != null && nodes.length > 0) {
          model.beginUpdate();
          try {
            for (var i = 0; i < nodes.length; i++) {
              // Processes the activity nodes inside the process node
              var id = nodes[i].getAttribute('id');
              var state = nodes[i].getAttribute('state');
              
              // Gets the cell for the given activity name from the model
              var cell = model.getCell(id);
              
              // Updates the cell color and adds some tooltip information
              if (cell != null) {
                // Resets the fillcolor and the overlay
                graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, 'white', [cell]);
                graph.removeCellOverlays(cell);
    
                // Changes the cell color for the known states
                if (state === 'Running') {
                  graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, '#f8cecc', [cell]);
                }
                else if (state === 'Waiting') {
                  graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, '#fff2cc', [cell]);
                }
                else if (state === 'Completed') {
                  graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, '#d4e1f5', [cell]);
                }
                
                // Adds tooltip information using an overlay icon
                if (state !== 'Init') {
                  // Sets the overlay for the cell in the graph
                  // graph.addCellOverlay(cell, createOverlay(graph.warningImage, 'State: '+state));
                }
              }
            } // for
          }
          finally {
            model.endUpdate();
          }
        }
      }
    }
  }
}