# Variables	

mouseListeners	Holds the mouse event listeners.
isMouseDown	Holds the state of the mouse button.
model	Holds the mxGraphModel that contains the cells to be displayed.
view	Holds the mxGraphView that caches the mxCellStates for the cells.
stylesheet	Holds the mxStylesheet that defines the appearance of the cells.
selectionModel	Holds the mxGraphSelectionModel that models the current selection.
cellEditor	Holds the mxCellEditor that is used as the in-place editing.
cellRenderer	Holds the mxCellRenderer for rendering the cells in the graph.
multiplicities	An array of mxMultiplicities describing the allowed connections in a graph.
renderHint	RenderHint as it was passed to the constructor.
dialect	Dialect to be used for drawing the graph.
gridSize	Specifies the grid size.
gridEnabled	Specifies if the grid is enabled.
portsEnabled	Specifies if ports are enabled.
nativeDoubleClickEnabled	Specifies if native double click events should be detected.
doubleTapEnabled	Specifies if double taps on touch-based devices should be handled as a double click.
doubleTapTimeout	Specifies the timeout for double taps and non-native double clicks.
doubleTapTolerance	Specifies the tolerance for double taps and double clicks in quirks mode.
lastTouchX	Holds the x-coordinate of the last touch event for double tap detection.
lastTouchX	Holds the y-coordinate of the last touch event for double tap detection.
lastTouchTime	Holds the time of the last touch event for double click detection.
tapAndHoldEnabled	Specifies if tap and hold should be used for starting connections on touch-based devices.
tapAndHoldDelay	Specifies the time for a tap and hold.
tapAndHoldInProgress	True if the timer for tap and hold events is running.
tapAndHoldValid	True as long as the timer is running and the touch events stay within the given <tapAndHoldTolerance>.
initialTouchX	Holds the x-coordinate of the intial touch event for tap and hold.
initialTouchY	Holds the y-coordinate of the intial touch event for tap and hold.
tolerance	Tolerance for a move to be handled as a single click.
defaultOverlap	Value returned by getOverlap if isAllowOverlapParent returns true for the given cell.
defaultParent	Specifies the default parent to be used to insert new cells.
alternateEdgeStyle	Specifies the alternate edge style to be used if the main control point on an edge is being doubleclicked.
backgroundImage	Specifies the mxImage to be returned by getBackgroundImage.
pageVisible	Specifies if the background page should be visible.
pageBreaksVisible	Specifies if a dashed line should be drawn between multiple pages.
pageBreakColor	Specifies the color for page breaks.
pageBreakDashed	Specifies the page breaks should be dashed.
minPageBreakDist	Specifies the minimum distance for page breaks to be visible.
preferPageSize	Specifies if the graph size should be rounded to the next page number in sizeDidChange.
pageFormat	Specifies the page format for the background page.
pageScale	Specifies the scale of the background page.
enabled	Specifies the return value for isEnabled.
escapeEnabled	Specifies if mxKeyHandler should invoke escape when the escape key is pressed.
invokesStopCellEditing	If true, when editing is to be stopped by way of selection changing, data in diagram changing or other means stopCellEditing is invoked, and changes are saved.
enterStopsCellEditing	If true, pressing the enter key without pressing control or shift will stop editing and accept the new value.
useScrollbarsForPanning	Specifies if scrollbars should be used for panning in panGraph if any scrollbars are available.
exportEnabled	Specifies the return value for canExportCell.
importEnabled	Specifies the return value for canImportCell.
cellsLocked	Specifies the return value for isCellLocked.
cellsCloneable	Specifies the return value for isCellCloneable.
foldingEnabled	Specifies if folding (collapse and expand via an image icon in the graph should be enabled).
cellsEditable	Specifies the return value for isCellEditable.
cellsDeletable	Specifies the return value for isCellDeletable.
cellsMovable	Specifies the return value for isCellMovable.
edgeLabelsMovable	Specifies the return value for edges in isLabelMovable.
vertexLabelsMovable	Specifies the return value for vertices in isLabelMovable.
dropEnabled	Specifies the return value for isDropEnabled.
splitEnabled	Specifies if dropping onto edges should be enabled.
cellsResizable	Specifies the return value for isCellResizable.
cellsBendable	Specifies the return value for isCellsBendable.
cellsSelectable	Specifies the return value for isCellSelectable.
cellsDisconnectable	Specifies the return value for <isCellDisconntable>.
autoSizeCells	Specifies if the graph should automatically update the cell size after an edit.
autoSizeCellsOnAdd	Specifies if autoSize style should be applied when cells are added.
autoScroll	Specifies if the graph should automatically scroll if the mouse goes near the container edge while dragging.
ignoreScrollbars	Specifies if the graph should automatically scroll regardless of the scrollbars.
translateToScrollPosition	Specifies if the graph should automatically convert the current scroll position to a translate in the graph view when a mouseUp event is received.
timerAutoScroll	Specifies if autoscrolling should be carried out via mxPanningManager even if the container has scrollbars.
allowAutoPanning	Specifies if panning via panGraph should be allowed to implement autoscroll if no scrollbars are available in scrollPointToVisible.
autoExtend	Specifies if the size of the graph should be automatically extended if the mouse goes near the container edge while dragging.
maximumGraphBounds	mxRectangle that specifies the area in which all cells in the diagram should be placed.
minimumGraphSize	mxRectangle that specifies the minimum size of the graph.
minimumContainerSize	mxRectangle that specifies the minimum size of the <container> if resizeContainer is true.
maximumContainerSize	mxRectangle that specifies the maximum size of the container if resizeContainer is true.
resizeContainer	Specifies if the container should be resized to the graph size when the graph size has changed.
border	Border to be added to the bottom and right side when the container is being resized after the graph has been changed.
keepEdgesInForeground	Specifies if edges should appear in the foreground regardless of their order in the model.
keepEdgesInBackground	Specifies if edges should appear in the background regardless of their order in the model.
allowNegativeCoordinates	Specifies if negative coordinates for vertices are allowed.
constrainChildren	Specifies if a child should be constrained inside the parent bounds after a move or resize of the child.
constrainRelativeChildren	Specifies if child cells with relative geometries should be constrained inside the parent bounds, if constrainChildren is true, and/or the maximumGraphBounds.
extendParents	Specifies if a parent should contain the child bounds after a resize of the child.
extendParentsOnAdd	Specifies if parents should be extended according to the extendParents switch if cells are added.
extendParentsOnAdd	Specifies if parents should be extended according to the extendParents switch if cells are added.
recursiveResize	Specifies the return value for isRecursiveResize.
collapseToPreferredSize	Specifies if the cell size should be changed to the preferred size when a cell is first collapsed.
zoomFactor	Specifies the factor used for zoomIn and zoomOut.
keepSelectionVisibleOnZoom	Specifies if the viewport should automatically contain the selection cells after a zoom operation.
centerZoom	Specifies if the zoom operations should go into the center of the actual diagram rather than going from top, left.
resetViewOnRootChange	Specifies if the scale and translate should be reset if the root changes in the model.
resetEdgesOnResize	Specifies if edge control points should be reset after the resize of a connected cell.
resetEdgesOnMove	Specifies if edge control points should be reset after the move of a connected cell.
resetEdgesOnConnect	Specifies if edge control points should be reset after the the edge has been reconnected.
allowLoops	Specifies if loops (aka self-references) are allowed.
defaultLoopStyle	mxEdgeStyle to be used for loops.
multigraph	Specifies if multiple edges in the same direction between the same pair of vertices are allowed.
connectableEdges	Specifies if edges are connectable.
allowDanglingEdges	Specifies if edges with disconnected terminals are allowed in the graph.
cloneInvalidEdges	Specifies if edges that are cloned should be validated and only inserted if they are valid.
disconnectOnMove	Specifies if edges should be disconnected from their terminals when they are moved.
labelsVisible	Specifies if labels should be visible.
htmlLabels	Specifies the return value for isHtmlLabel.
swimlaneSelectionEnabled	Specifies if swimlanes should be selectable via the content if the mouse is released.
swimlaneNesting	Specifies if nesting of swimlanes is allowed.
swimlaneIndicatorColorAttribute	The attribute used to find the color for the indicator if the indicator color is set to ‘swimlane’.
imageBundles	Holds the list of image bundles.
minFitScale	Specifies the minimum scale to be applied in fit.
maxFitScale	Specifies the maximum scale to be applied in fit.
panDx	Current horizontal panning value.
panDy	Current vertical panning value.
collapsedImage	Specifies the mxImage to indicate a collapsed state.
expandedImage	Specifies the mxImage to indicate a expanded state.
warningImage	Specifies the mxImage for the image to be used to display a warning overlay.
alreadyConnectedResource	Specifies the resource key for the error message to be displayed in non-multigraphs when two vertices are already connected.
containsValidationErrorsResource	Specifies the resource key for the warning message to be displayed when a collapsed cell contains validation errors.
collapseExpandResource	Specifies the resource key for the tooltip on the collapse/expand icon.
init	Initializes the <container> and creates the respective datastructures.
createHandlers	Creates the tooltip-, panning-, connection- and graph-handler (in this order).
createTooltipHandler	Creates and returns a new mxTooltipHandler to be used in this graph.
createSelectionCellsHandler	Creates and returns a new mxTooltipHandler to be used in this graph.
createConnectionHandler	Creates and returns a new mxConnectionHandler to be used in this graph.
createGraphHandler	Creates and returns a new mxGraphHandler to be used in this graph.
createPanningHandler	Creates and returns a new mxPanningHandler to be used in this graph.
createPopupMenuHandler	Creates and returns a new mxPopupMenuHandler to be used in this graph.
createSelectionModel	Creates a new mxGraphSelectionModel to be used in this graph.
createStylesheet	Creates a new mxGraphSelectionModel to be used in this graph.
createGraphView	Creates a new mxGraphView to be used in this graph.
createCellRenderer	Creates a new mxCellRenderer to be used in this graph.
createCellEditor	Creates a new mxCellEditor to be used in this graph.
getModel	Returns the mxGraphModel that contains the cells.
getView	Returns the mxGraphView that contains the mxCellStates.
getStylesheet	Returns the mxStylesheet that defines the style.
setStylesheet	Sets the mxStylesheet that defines the style.
getSelectionModel	Returns the mxGraphSelectionModel that contains the selection.
setSelectionModel	Sets the <mxSelectionModel> that contains the selection.
getSelectionCellsForChanges	Returns the cells to be selected for the given array of changes.
graphModelChanged	Called when the graph model changes.
updateSelection	Removes selection cells that are not in the model from the selection.
processChange	Processes the given change and invalidates the respective cached data in view.
removeStateForCell	Removes all cached information for the given cell and its descendants.
Overlays	