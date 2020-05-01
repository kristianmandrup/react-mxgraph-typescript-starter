# Graph behaviour	

isResizeContainer	Returns resizeContainer.
setResizeContainer	Sets resizeContainer.
isEnabled	Returns true if the graph is enabled.
setEnabled	Specifies if the graph should allow any interactions.
isEscapeEnabled	Returns escapeEnabled.
setEscapeEnabled	Sets escapeEnabled.
isInvokesStopCellEditing	Returns invokesStopCellEditing.
setInvokesStopCellEditing	Sets invokesStopCellEditing.
isEnterStopsCellEditing	Returns enterStopsCellEditing.
setEnterStopsCellEditing	Sets enterStopsCellEditing.
isCellLocked	Returns true if the given cell may not be moved, sized, bended, disconnected, edited or selected.
isCellsLocked	Returns true if the given cell may not be moved, sized, bended, disconnected, edited or selected.
setCellsLocked	Sets if any cell may be moved, sized, bended, disconnected, edited or selected.
getCloneableCells	Returns the cells which may be exported in the given array of cells.
isCellCloneable	Returns true if the given cell is cloneable.
isCellsCloneable	Returns cellsCloneable, that is, if the graph allows cloning of cells by using control-drag.
setCellsCloneable	Specifies if the graph should allow cloning of cells by holding down the control key while cells are being moved.
getExportableCells	Returns the cells which may be exported in the given array of cells.
canExportCell	Returns true if the given cell may be exported to the clipboard.
getImportableCells	Returns the cells which may be imported in the given array of cells.
canImportCell	Returns true if the given cell may be imported from the clipboard.
isCellSelectable	Returns true if the given cell is selectable.
isCellsSelectable	Returns cellsSelectable.
setCellsSelectable	Sets cellsSelectable.
getDeletableCells	Returns the cells which may be exported in the given array of cells.
isCellDeletable	Returns true if the given cell is moveable.
isCellsDeletable	Returns cellsDeletable.
setCellsDeletable	Sets cellsDeletable.
isLabelMovable	Returns true if the given edges’s label is moveable.
isCellRotatable	Returns true if the given cell is rotatable.
getMovableCells	Returns the cells which are movable in the given array of cells.
isCellMovable	Returns true if the given cell is moveable.
isCellsMovable	Returns cellsMovable.
setCellsMovable	Specifies if the graph should allow moving of cells.
isGridEnabled	Returns gridEnabled as a boolean.
setGridEnabled	Specifies if the grid should be enabled.
isPortsEnabled	Returns portsEnabled as a boolean.
setPortsEnabled	Specifies if the ports should be enabled.
getGridSize	Returns gridSize.
setGridSize	Sets gridSize.
getTolerance	Returns tolerance.
setTolerance	Sets tolerance.
isVertexLabelsMovable	Returns vertexLabelsMovable.
setVertexLabelsMovable	Sets vertexLabelsMovable.
isEdgeLabelsMovable	Returns edgeLabelsMovable.
isEdgeLabelsMovable	Sets edgeLabelsMovable.
isSwimlaneNesting	Returns swimlaneNesting as a boolean.
setSwimlaneNesting	Specifies if swimlanes can be nested by drag and drop.
isSwimlaneSelectionEnabled	Returns swimlaneSelectionEnabled as a boolean.
setSwimlaneSelectionEnabled	Specifies if swimlanes should be selected if the mouse is released over their content area.
isMultigraph	Returns multigraph as a boolean.
setMultigraph	Specifies if the graph should allow multiple connections between the same pair of vertices.
isAllowLoops	Returns allowLoops as a boolean.
setAllowDanglingEdges	Specifies if dangling edges are allowed, that is, if edges are allowed that do not have a source and/or target terminal defined.
isAllowDanglingEdges	Returns allowDanglingEdges as a boolean.
setConnectableEdges	Specifies if edges should be connectable.
isConnectableEdges	Returns connectableEdges as a boolean.
setCloneInvalidEdges	Specifies if edges should be inserted when cloned but not valid wrt.
isCloneInvalidEdges	Returns cloneInvalidEdges as a boolean.
setAllowLoops	Specifies if loops are allowed.
isDisconnectOnMove	Returns disconnectOnMove as a boolean.
setDisconnectOnMove	Specifies if edges should be disconnected when moved.
isDropEnabled	Returns dropEnabled as a boolean.
setDropEnabled	Specifies if the graph should allow dropping of cells onto or into other cells.
isSplitEnabled	Returns splitEnabled as a boolean.
setSplitEnabled	Specifies if the graph should allow dropping of cells onto or into other cells.
isCellResizable	Returns true if the given cell is resizable.
isCellsResizable	Returns cellsResizable.
setCellsResizable	Specifies if the graph should allow resizing of cells.
isTerminalPointMovable	Returns true if the given terminal point is movable.
isCellBendable	Returns true if the given cell is bendable.
isCellsBendable	Returns <cellsBenadable>.
setCellsBendable	Specifies if the graph should allow bending of edges.
isCellEditable	Returns true if the given cell is editable.
isCellsEditable	Returns cellsEditable.
setCellsEditable	Specifies if the graph should allow in-place editing for cell labels.
isCellDisconnectable	Returns true if the given cell is disconnectable from the source or target terminal.
isCellsDisconnectable	Returns cellsDisconnectable.
setCellsDisconnectable	Sets cellsDisconnectable.
isValidSource	Returns true if the given cell is a valid source for new connections.
isValidTarget	Returns isValidSource for the given cell.
isValidConnection	Returns true if the given target cell is a valid target for source.
setConnectable	Specifies if the graph should allow new connections.
isConnectable	Returns true if the <connectionHandler> is enabled.
setTooltips	Specifies if tooltips should be enabled.
setPanning	Specifies if panning should be enabled.
isEditing	Returns true if the given cell is currently being edited.
isAutoSizeCell	Returns true if the size of the given cell should automatically be updated after a change of the label.
isAutoSizeCells	Returns autoSizeCells.
setAutoSizeCells	Specifies if cell sizes should be automatically updated after a label change.
isExtendParent	Returns true if the parent of the given cell should be extended if the child has been resized so that it overlaps the parent.
isExtendParents	Returns extendParents.
setExtendParents	Sets extendParents.
isExtendParentsOnAdd	Returns extendParentsOnAdd.
setExtendParentsOnAdd	Sets extendParentsOnAdd.
isExtendParentsOnMove	Returns <extendParentsOnMove>.
setExtendParentsOnMove	Sets <extendParentsOnMove>.
isRecursiveResize	Returns recursiveResize.
setRecursiveResize	Sets recursiveResize.
isConstrainChild	Returns true if the given cell should be kept inside the bounds of its parent according to the rules defined by getOverlap and isAllowOverlapParent.
isConstrainChildren	Returns constrainChildren.
setConstrainChildren	Sets constrainChildren.
isConstrainRelativeChildren	Returns constrainRelativeChildren.
setConstrainRelativeChildren	Sets constrainRelativeChildren.
isConstrainChildren	Returns allowNegativeCoordinates.
setConstrainChildren	Sets allowNegativeCoordinates.
getOverlap	Returns a decimal number representing the amount of the width and height of the given cell that is allowed to overlap its parent.
isAllowOverlapParent	Returns true if the given cell is allowed to be placed outside of the parents area.
getFoldableCells	Returns the cells which are movable in the given array of cells.
isCellFoldable	Returns true if the given cell is foldable.
isValidDropTarget	Returns true if the given cell is a valid drop target for the specified cells.
isSplitTarget	Returns true if the given edge may be splitted into two edges with the given cell as a new terminal between the two.
getDropTarget	Returns the given cell if it is a drop target for the given cells or the nearest ancestor that may be used as a drop target for the given cells.