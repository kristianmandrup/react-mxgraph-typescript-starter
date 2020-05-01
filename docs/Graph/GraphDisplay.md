# Graph display	

getGraphBounds	Returns the bounds of the visible graph.
getCellBounds	Returns the scaled, translated bounds for the given cell.
getBoundingBoxFromGeometry	Returns the bounding box for the geometries of the vertices in the given array of cells.
refresh	Clears all cell states or the states for the hierarchy starting at the given cell and validates the graph.
snap	Snaps the given numeric value to the grid if gridEnabled is true.
snapDelta	Snaps the given delta with the given scaled bounds.
panGraph	Shifts the graph display by the given amount.
zoomIn	Zooms into the graph by zoomFactor.
zoomOut	Zooms out of the graph by zoomFactor.
zoomActual	Resets the zoom and panning in the view.
zoomTo	Zooms the graph to the given scale with an optional boolean center argument, which is passd to zoom.
center	Centers the graph in the container.
zoom	Zooms the graph using the given factor.
zoomToRect	Zooms the graph to the specified rectangle.
scrollCellToVisible	Pans the graph so that it shows the given cell.
scrollRectToVisible	Pans the graph so that it shows the given rectangle.
getCellGeometry	Returns the mxGeometry for the given cell.
isCellVisible	Returns true if the given cell is visible in this graph.
isCellCollapsed	Returns true if the given cell is collapsed in this graph.
isCellConnectable	Returns true if the given cell is connectable in this graph.
isOrthogonal	Returns true if perimeter points should be computed such that the resulting edge has only horizontal or vertical segments.
isLoop	Returns true if the given cell state is a loop.
isCloneEvent	Returns true if the given event is a clone event.
isTransparentClickEvent	Hook for implementing click-through behaviour on selected cells.
isToggleEvent	Returns true if the given event is a toggle event.
isGridEnabledEvent	Returns true if the given mouse event should be aligned to the grid.
isConstrainedEvent	Returns true if the given mouse event should be aligned to the grid.
isIgnoreTerminalEvent	Returns true if the given mouse event should not allow any connections to be made.