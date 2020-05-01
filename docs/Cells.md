# Cells

## Cell visibility	

toggleCells	Sets the visible state of the specified cells and all connected edges if includeEdges is true.
cellsToggled	Sets the visible state of the specified cells.

## Overlays	

addCellOverlay	Adds an mxCellOverlay for the specified cell.
getCellOverlays	Returns the array of mxCellOverlays for the given cell or null, if no overlays are defined.
removeCellOverlay	Removes and returns the given mxCellOverlay from the given cell.
removeCellOverlays	Removes all mxCellOverlays from the given cell.
clearCellOverlays	Removes all mxCellOverlays in the graph for the given cell and all its descendants.
setCellWarning	Creates an overlay for the given cell using the warning and image or warningImage and returns the new mxCellOverlay.

## Selection	

isCellSelected	Returns true if the given cell is selected.
isSelectionEmpty	Returns true if the selection is empty.
clearSelection	Clears the selection using mxGraphSelectionModel.clear.
getSelectionCount	Returns the number of selected cells.
getSelectionCell	Returns the first cell from the array of selected mxCells.
getSelectionCells	Returns the array of selected mxCells.
setSelectionCell	Sets the selection cell.
setSelectionCells	Sets the selection cell.
addSelectionCell	Adds the given cell to the selection.
addSelectionCells	Adds the given cells to the selection.
removeSelectionCell	Removes the given cell from the selection.
removeSelectionCells	Removes the given cells from the selection.
selectRegion	Selects and returns the cells inside the given rectangle for the specified event.
selectNextCell	Selects the next cell.
selectPreviousCell	Selects the previous cell.
selectParentCell	Selects the parent cell.
selectChildCell	Selects the first child cell.
selectCell	Selects the next, parent, first child or previous cell, if all arguments are false.
selectAll	Selects all children of the given parent cell or the children of the default parent if no parent is specified.
selectVertices	Select all vertices inside the given parent or the default parent.
selectVertices	Select all vertices inside the given parent or the default parent.
selectCells	Selects all vertices and/or edges depending on the given boolean arguments recursively, starting at the given parent or the default parent if no parent is specified.
selectCellForEvent	Selects the given cell by either adding it to the selection or replacing the selection depending on whether the given mouse event is a toggle event.
selectCellsForEvent	Selects the given cells by either adding them to the selection or replacing the selection depending on whether the given mouse event is a toggle event.
Selection state	
createHandler	Creates a new handler for the given cell state.
createVertexHandler	Hooks to create a new mxVertexHandler for the given mxCellState.
createEdgeHandler	Hooks to create a new mxEdgeHandler for the given mxCellState.
createEdgeSegmentHandler	Hooks to create a new <mxEdgeSegmentHandler> for the given mxCellState.
createElbowEdgeHandler	Hooks to create a new mxElbowEdgeHandler for the given mxCellState.

## In-place editing	

startEditing	Calls startEditingAtCell using the given cell or the first selection cell.
startEditingAtCell	Fires a startEditing event and invokes mxCellEditor.startEditing on <editor>.
getEditingValue	Returns the initial value for in-place editing.
stopEditing	Stops the current editing and fires a <editingStopped> event.
labelChanged	Sets the label of the specified cell to the given value using cellLabelChanged and fires mxEvent.LABEL_CHANGED while the transaction is in progress.
cellLabelChanged	Sets the new label for a cell.

## Cell styles

getCurrentCellStyle	Returns the style for the given cell from the cell state, if one exists, or using getCellStyle.
getCellStyle	Returns an array of key, value pairs representing the cell style for the given cell.
postProcessCellStyle	Tries to resolve the value for the image style in the image bundles and turns short data URIs as defined in mxImageBundle to data URIs as defined in RFC 2397 of the IETF.
setCellStyle	Sets the style of the specified cells.
toggleCellStyle	Toggles the boolean value for the given key in the style of the given cell and returns the new value as 0 or 1.
toggleCellStyles	Toggles the boolean value for the given key in the style of the given cells and returns the new value as 0 or 1.
setCellStyles	Sets the key to value in the styles of the given cells.
toggleCellStyleFlags	Toggles the given bit for the given key in the styles of the specified cells.
setCellStyleFlags	Sets or toggles the given bit for the given key in the styles of the specified cells.

## Cell alignment and orientation	

alignCells	Aligns the given cells vertically or horizontally according to the given alignment using the optional parameter as the coordinate.
flipEdge	Toggles the style of the given edge between null (or empty) and alternateEdgeStyle.
addImageBundle	Adds the specified mxImageBundle.
removeImageBundle	Removes the specified mxImageBundle.
getImageFromBundles	Searches all imageBundles for the specified key and returns the value for the first match or null if the key is not found.

## Cell cloning, insertion and removal	

cloneCell	Returns the clone for the given cell.
cloneCells	Returns the clones for the given cells.
insertVertex	Adds a new vertex into the given parent mxCell using value as the user object and the given coordinates as the mxGeometry of the new vertex.
createVertex	Hook method that creates the new vertex for insertVertex.
insertEdge	Adds a new edge into the given parent mxCell using value as the user object and the given source and target as the terminals of the new edge.
createEdge	Hook method that creates the new edge for insertEdge.
addEdge	Adds the edge to the parent and connects it to the given source and target terminals.
addCell	Adds the cell to the parent and connects it to the given source and target terminals.
addCells	Adds the cells to the parent at the given index, connecting each cell to the optional source and target terminal.
cellsAdded	Adds the specified cells to the given parent.
autoSizeCell	Resizes the specified cell to just fit around the its label and/or children
removeCells	Removes the given cells from the graph including all connected edges if includeEdges is true.
cellsRemoved	Removes the given cells from the model.
splitEdge	Splits the given edge by adding the newEdge between the previous source and the given cell and reconnecting the source of the given edge to the given cell.

## Cell sizing	

updateCellSize	Updates the size of the given cell in the model using cellSizeUpdated.
cellSizeUpdated	Updates the size of the given cell in the model using getPreferredSizeForCell to get the new size.
getPreferredSizeForCell	Returns the preferred width and height of the given mxCell as an mxRectangle.
resizeCell	Sets the bounds of the given cell using resizeCells.
resizeCells	Sets the bounds of the given cells and fires a mxEvent.RESIZE_CELLS event while the transaction is in progress.
cellsResized	Sets the bounds of the given cells and fires a mxEvent.CELLS_RESIZED event.
cellResized	Resizes the parents recursively so that they contain the complete area of the resized child cell.
resizeChildCells	Resizes the child cells of the given cell for the given new geometry with respect to the current geometry of the cell.
constrainChildCells	Constrains the children of the given cell using constrainChild.
scaleCell	Scales the points, position and size of the given cell according to the given vertical and horizontal scaling factors.
extendParent	Resizes the parents recursively so that they contain the complete area of the resized child cell.

## Cell moving	

importCells	Clones and inserts the given cells into the graph using the move method and returns the inserted cells.
moveCells	Moves or clones the specified cells and moves the cells or clones by the given amount, adding them to the optional target cell.
cellsMoved	Moves the specified cells by the given vector, disconnecting the cells using disconnectGraph is disconnect is true.
translateCell	Translates the geometry of the given cell and stores the new, translated geometry in the model as an atomic change.
getCellContainmentArea	Returns the mxRectangle inside which a cell is to be kept.
getMaximumGraphBounds	Returns the bounds inside which the diagram should be kept as an mxRectangle.
constrainChild	Keeps the given cell inside the bounds returned by getCellContainmentArea for its parent, according to the rules defined by getOverlap and isConstrainChild.
resetEdges	Resets the control points of the edges that are connected to the given cells if not both ends of the edge are in the given cells array.
resetEdge	Resets the control points of the given edge.

## Cell connecting and connection constraints	

getOutlineConstraint	Returns the constraint used to connect to the outline of the given state.
getAllConnectionConstraints	Returns an array of all mxConnectionConstraints for the given terminal.
getConnectionConstraint	Returns an mxConnectionConstraint that describes the given connection point.
setConnectionConstraint	Sets the mxConnectionConstraint that describes the given connection point.
getConnectionPoint	Returns the nearest point in the list of absolute points or the center of the opposite terminal.
connectCell	Connects the specified end of the given edge to the given terminal using cellConnected and fires mxEvent.CONNECT_CELL while the transaction is in progress.
cellConnected	Sets the new terminal for the given edge and resets the edge points if resetEdgesOnConnect is true.
disconnectGraph	Disconnects the given edges from the terminals which are not in the given array.

## Cell retrieval	

getDefaultParent	Returns defaultParent or mxGraphView.currentRoot or the first child child of mxGraphModel.root if both are null.
setDefaultParent	Sets the defaultParent to the given cell.
getSwimlane	Returns the nearest ancestor of the given cell which is a swimlane, or the given cell, if it is itself a swimlane.
getSwimlaneAt	Returns the bottom-most swimlane that intersects the given point (x, y) in the cell hierarchy that starts at the given parent.
getCellAt	Returns the bottom-most cell that intersects the given point (x, y) in the cell hierarchy starting at the given parent.
intersects	Returns the bottom-most cell that intersects the given point (x, y) in the cell hierarchy that starts at the given parent.
hitsSwimlaneContent	Returns true if the given coordinate pair is inside the content are of the given swimlane.
getChildVertices	Returns the visible child vertices of the given parent.
getChildEdges	Returns the visible child edges of the given parent.
getChildCells	Returns the visible child vertices or edges in the given parent.
getConnections	Returns all visible edges connected to the given cell without loops.
getIncomingEdges	Returns the visible incoming edges for the given cell.
getOutgoingEdges	Returns the visible outgoing edges for the given cell.
getEdges	Returns the incoming and/or outgoing edges for the given cell.
isValidAncestor	Returns whether or not the specified parent is a valid ancestor of the specified cell, either direct or indirectly based on whether ancestor recursion is enabled.
getOpposites	Returns all distinct visible opposite cells for the specified terminal on the given edges.
getEdgesBetween	Returns the edges between the given source and target.
getPointForEvent	Returns an mxPoint representing the given event in the unscaled, non-translated coordinate space of <container> and applies the grid.
getCells	Returns the child vertices and edges of the given parent that are contained in the given rectangle.
getCellsBeyond	Returns the children of the given parent that are contained in the halfpane from the given point (x0, y0) rightwards or downwards depending on rightHalfpane and bottomHalfpane.
findTreeRoots	Returns all children in the given parent which do not have incoming edges.
traverse	Traverses the (directed) graph invoking the given function for each visited vertex and edge.