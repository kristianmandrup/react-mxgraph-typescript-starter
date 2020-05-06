import mx from "./mx";
const { mxEvent, mxClient, mxUtils, mxUndoManager } = mx

export class HtmlLabel {
  graph: any
  cached: boolean
  userObj: any

  constructor(graph: any, userObj: any, {cached}: {cached: boolean}) {
    this.graph = graph
    this.cached = cached
    this.userObj = userObj
  }

  init() {
    const { graph } = this
    graph.convertValueToString = this.convertValueToString
    graph.cellLabelChanged = this.cellLabelChanged
    graph.getEditingValue = this.getEditingValue
  }

  isUserObject(cell, name: string = 'userobject' ): boolean {
    return mxUtils.isNode(cell.value, cell.value.nodeName) && cell.value.nodeName.toLowerCase() === name    
  }

  // Overrides method to provide a cell label in the display
  convertValueToString(cell) {
    const { cached, graph } = this
    if (cached && cell.div != null) {
      // Uses cached label
      return cell.div;
    }
    
    if (this.isUserObject(cell)) {
      // Returns a DOM for the label
      var div = document.createElement('div');
      div.innerHTML = cell.getAttribute('label');
      mxUtils.br(div);
      
      var checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');

      if (cell.getAttribute('checked') === 'true') {
        checkbox.setAttribute('checked', 'checked');
        checkbox.defaultChecked = true;
      }
      
      // Writes back to cell if checkbox is clicked
      mxEvent.addListener(checkbox, (mxClient.IS_QUIRKS) ? 'click' : 'change', function(evt) {
        var elt = cell.value.cloneNode(true);
        elt.setAttribute('checked', (checkbox.checked) ? 'true' : 'false');
        
        graph.model.setValue(cell, elt);
      });
      
      div.appendChild(checkbox);
      
      if (cached) {
        // Caches label
        cell.div = div;
      }
      
      return div;
    }

    return '';
  };

  // Overrides method to store a cell label in the model
  
  cellLabelChanged(cell, newValue, autoSize) {
    const { graph } = this
    const cellLabelChanged = graph.cellLabelChanged;
    if (this.isUserObject(cell)) {
      // Clones the value for correct undo/redo
      var elt = cell.value.cloneNode(true);
      elt.setAttribute('label', newValue);
      newValue = elt;
    }
    
    cellLabelChanged.apply(this, arguments);
  };
  
  // Overrides method to create the editing value
  
  getEditingValue(cell) {
    const { graph, userObj } = this
    if (this.isUserObject(cell)) {
      return cell.getAttribute('label');
    }

    var parent = graph.getDefaultParent();
    graph.insertVertex(parent, null, userObj, 20, 20, 80, 60);
    
    // Undo/redo
    var undoManager = new mxUndoManager(200);
    var listener = function(sender, evt)
    {
      undoManager.undoableEditHappened(evt.getProperty('edit'));
    };
    graph.getModel().addListener(mxEvent.UNDO, listener);
    graph.getView().addListener(mxEvent.UNDO, listener);
    
    document.body.appendChild(mxUtils.button('Undo', function()
    {
      undoManager.undo();
    }));
    
    document.body.appendChild(mxUtils.button('Redo', function()
    {
      undoManager.redo();
    }));    
  };
}
