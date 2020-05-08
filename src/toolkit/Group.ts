import mx from "./mx";
const { mxCell, mxGeometry, mxGraphHandler, mxPopupMenuHandler } = mx

export class GroupSelection {
  graph: any
  graphHandler: any
  popupHandler: any

  constructor(graph: any) {
    this.graph = graph
    this.graphHandler = mxGraphHandler.prototype
    this.popupHandler = mxPopupMenuHandler.prototype
  }

  init() {
    const { popupHandler, graphHandler, mouseDown, getInitialCellForEvent, 
      isDelayedSelection, selectDelayed, getCellForPopupEvent } = this
    popupHandler.getCellForPopupEvent = getCellForPopupEvent

    graphHandler.mouseDown = mouseDown
    graphHandler.getInitialCellForEvent = getInitialCellForEvent    
    graphHandler.isDelayedSelection = isDelayedSelection
    graphHandler.selectDelayed = selectDelayed
  }
  
  // Don't clear selection if multiple cells selected
    mouseDown(sender, me) {
      const { graph, graphHandler } = this
      const graphHandlerMouseDown = graphHandler.mouseDown;
      graphHandlerMouseDown.apply(this, arguments);

      if (graph.isCellSelected(me.getCell()) && graph.getSelectionCount() > 1)
      {
        graphHandler.delayedSelection = false;
      }
    }
    
    getInitialCellForEvent(me) {
      // Selects descendants before children selection mode
      var graphHandlerGetInitialCellForEvent = mxGraphHandler.prototype.getInitialCellForEvent;
			var model = this.graph.getModel();
			var psel = model.getParent(this.graph.getSelectionCell());
			var cell = graphHandlerGetInitialCellForEvent.apply(this, arguments);
			var parent = model.getParent(cell);
			
			if (psel == null || (psel !== cell && psel !== parent)) {
				while (!this.graph.isCellSelected(cell) && !this.graph.isCellSelected(parent) &&
						model.isVertex(parent) && !this.graph.isValidRoot(parent)) {
					cell = parent;
					parent = this.graph.getModel().getParent(cell);
				}
			}
			
			return cell;
		}	

		isDelayedSelection(cell) {
      const { graphHandler, graph } = this
      // Selection is delayed to mouseup if child selected
      var graphHandlerIsDelayedSelection = mxGraphHandler.prototype.isDelayedSelection;
			var result = graphHandlerIsDelayedSelection.apply(graphHandler, arguments);
			var model = this.graph.getModel();
			var psel = model.getParent(this.graph.getSelectionCell());
			var parent = model.getParent(cell);
			
			if (psel == null || (psel !== cell && psel !== parent)) {
				if (!graph.isCellSelected(cell) && model.isVertex(parent) && !graph.isValidRoot(parent)) {
					result = true;
				}
			}			
			return result;
		}
		
		// Delayed selection of parent group
		selectDelayed(me) {
      const { graphHandler } = this
			var cell = me.getCell();
			
			if (!cell) {
				cell = graphHandler.cell;
			}
			
			var model = this.graph.getModel();
			var parent = model.getParent(cell);
      
      const isValidSelected = (cell, parent) =>
        this.graph.isCellSelected(cell) && 
        model.isVertex(parent) && 
        !this.graph.isValidRoot(parent)

			while (isValidSelected(cell, parent)) {
				cell = parent;
				parent = model.getParent(cell);
			}
			
			this.graph.selectCellForEvent(cell, me.getEvent());
		}
	
		// Returns last selected ancestor
		getCellForPopupEvent(me)
		{
			var cell = me.getCell();
			var model = this.graph.getModel();
			var parent = model.getParent(cell);
			
			while (model.isVertex(parent) && !this.graph.isValidRoot(parent)) {
				if (this.graph.isCellSelected(parent)) {
					cell = parent;
				}
				
				parent = model.getParent(parent);
			}
			
			return cell;
		};  
}

export class Group {
  group: any
  
  constructor(name: string = 'Group', label: string = 'group') {
    const group = new mxCell(name, new mxGeometry(), label);
    this.group = group
  }  

  setVertex(value: boolean) {
    const { group } = this
    group.setVertex(true);
  }
  
  setConnectable(value: boolean) {
    const { group } = this
    group.setConnectable(true);
  }
}

