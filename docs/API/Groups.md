# Groups

## Grouping

- `groupCells` Adds the cells into the given group.
- `getCellsForGroup` Returns the cells with the same parent as the first cell in the given array.
- `getBoundsForGroup` Returns the bounds to be used for the given group and children.
- `createGroupCell` Hook for creating the group cell to hold the given array of mxCells if no group cell was given to the `group` function.
- `ungroupCells` Ungroups the given cells by moving the children the children to their parents parent and removing the empty groups.
- `removeCellsAfterUngroup` Hook to remove the groups after ungroupCells.
- `removeCellsFromParent` Removes the specified cells from their parents and adds them to the default parent.
- `updateGroupBounds` Updates the bounds of the given groups to include all children and returns the passed-in cells.
- `getBoundingBox` Returns the bounding box for the given array of mxCells.

## Folding

- `foldCells` Sets the collapsed state of the specified cells and all descendants if recurse is true.
- `cellsFolded` Sets the collapsed state of the specified cells.
- `swapBounds` Swaps the alternate and the actual bounds in the geometry of the given cell invoking `updateAlternateBounds` before carrying out the swap.
- `updateAlternateBounds` Updates or sets the alternate bounds in the given geometry for the given cell depending on whether the cell is going to be collapsed.
- `addAllEdges` Returns an array with the given cells and all edges that are connected to a cell or one of its descendants.
- `getAllEdges` Returns all edges connected to the given cells or its descendants.

## Drilldown

- `getCurrentRoot` Returns the current root of the displayed cell hierarchy.
- `getTranslateForRoot` Returns the translation to be used if the given cell is the root cell as an mxPoint.
- `isPort` Returns `true` if the given cell is a “port”, that is, when connecting to it, the cell returned by `getTerminalForPort` should be used as the terminal and the port should be referenced by the `ID` in either the `mxConstants.STYLE_SOURCE_PORT` or the or the `mxConstants.STYLE_TARGET_PORT`.
- `getTerminalForPort` Returns the terminal to be used for a given port.
- `getChildOffsetForCell` Returns the offset to be used for the cells inside the given cell.
- `enterGroup` Uses the given cell as the root of the displayed cell hierarchy.
- `exitGroup` Changes the current root to the next valid root in the displayed cell hierarchy.
- `home` Uses the root of the model as the root of the displayed cell hierarchy and selects the previous root.
- `isValidRoot` Returns `true` if the given cell is a valid root for the cell display hierarchy.