export const actionResourceMap = {
  delete: {
    action: 'delete',
    label: 'Delete', 
    imagePath: 'delete2.png',
    spacer: true
  },
  cut: {
    action: 'cut',
    label: 'Cut', 
    imagePath: 'cut.png'
  },
  copy: {
     action: 'copy', 
     label: 'Copy', 
     imagePath: 'copy.png'
  },
  paste: {
    action: 'paste', 
    label: 'Paste', 
    imagePath: 'paste.png',
    spacer: true
  },
  undo: {
    action: 'undo', 
    label: 'Undo', 
    imagePath: 'undo.png'
  },
  redo: {
    action: 'redo', 
    label: 'Redo', 
    imagePath: 'redo.png',
    spacer: true
  },
  show: {
    action: 'show', 
    label: 'Show', 
    imagePath: 'camera.png'
  },
  print: {
    action: 'print',
    label: 'Print', 
    imagePath: 'printer.png',
    spacer: true
  },   
  collapseAll: {
    action: 'collapseAll', 
    label: 'Collapse All', 
    imagePath: 'navigate_minus.png'
  },
  expandAll: {
    action: 'expandAll', 
    label: 'Expand All', 
    imagePath: 'navigate_plus.png'
  },
  enterGroup: {
    action: 'enterGroup', 
    label: 'Enter', 
    imagePath: 'view_next.png'
  },
  exitGroup: {
    action: 'exitGroup', 
    label: 'Exit', 
    imagePath: 'view_previous.png'
  },
  zoomIn: {
    action: 'zoomIn', 
    label: 'Zoom In', 
    imagePath: 'zoom_in.png'
  },
  zoomOut: {
    action: 'zoomOut', 
    label: 'Zoom Out', 
    imagePath: 'zoom_out.png',
    spacer: true
  },
  actualSize: {
    action: 'actualSize', 
    label: 'Actual size', 
    imagePath: 'view_1_1.png'    
  },
  fit: {
    action: 'fit', 
    label: 'Fit', 
    imagePath: 'fit_to_size.png',
    spacer: true
  }
}

export const defaults = {
  actionResourceMap 
}