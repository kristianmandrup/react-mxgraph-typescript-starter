import mx from "./mx";
import { defaults } from './defaults';
import { StyleCombiner } from './Style';
const { mxCodec, mxUtils, mxConstants } = mx

const createExportModal = (graph, showModalWindow, props) => cell => {
  let { size, title } = props
  size = {
    ...size || {},
    width: 400,
    height: 400
  }
  const { width, height } = size
  title = title || 'Export Model XML'
  var textarea = document.createElement('textarea');
  textarea.style.width = `${width}px`;
  textarea.style.height = `${height}px`;
  var enc = new mxCodec(mxUtils.createXmlDocument());
  var node = enc.encode(graph.getModel());
  textarea.value = mxUtils.getPrettyXml(node);
  showModalWindow(graph, title, textarea, width + 10, height + 40);
};

export class Actions {
  editor: any
  showModalWindow: any
  _actionResourceMap: any
  doExport: (cell) => void

  constructor(editor: any, props: any = {}) {
    const showModalWindow = props.showModalWindow || editor.showModalWindow
    this.editor = editor
    this.showModalWindow = showModalWindow
    this.actionResourceMap = props.actionResourceMap || defaults.actionResourceMap
    this.doExport = createExportModal(this.graph, showModalWindow, props)
  }

  set actionResourceMap(actionResourceMap) {
    this._actionResourceMap = actionResourceMap
  }

  get actionResourceMap() {
    return this._actionResourceMap
  }

  actionIconImagePath(imagePath) {
    return 'images/' + imagePath
  }

  get graph() {
    return this.editor.graph
  }

  groupUngroup(cell) {
    const { editor } = this
    cell = cell || editor.graph.getSelectionCell();
    if (cell != null && editor.graph.isSwimlane(cell))
    {
      editor.execute('ungroup', cell);
    }
    else
    {
      editor.execute('group');
    }
  }  

  createExportModal(props: any, factory = createExportModal) {
    this.doExport = factory(this.graph, this.showModalWindow, props)    
  }

  get rotationMap() {
    return {
      east: 'south',
      south: 'west',
      west: 'north',
      north: 'east'
    }
  }

  flipHorizontal() {
    const { graph } = this
    graph.toggleCellStyles(mxConstants.STYLE_FLIPH);
  }
  
  flipVertical() {
    const { graph } = this
    graph.toggleCellStyles(mxConstants.STYLE_FLIPV);
  }

  setStyle(newStyle: string, cell?: any) {
    const { graph } = this
    cell = cell || graph.getSelectionCell();
					
    if (!cell) return
    const style = graph.getModel().getStyle(cell)      
    if (!style) return

    const combinedStyle = this.combineStyle(style, newStyle)

    graph.getModel().setStyle(cell, combinedStyle);
  }

  combineStyle(style, newStyle): string {
    return this.createStyleCombiner().combine(style, newStyle)
  }

  createStyleCombiner() {
    return new StyleCombiner()
  }
  
  rotate(cell?: any) {
    const { graph } = this
    cell = cell || graph.getSelectionCell();    
    if (!cell) return

    var geo = graph.getCellGeometry(cell);
    if (!geo) return
    
    graph.getModel().beginUpdate();
    try {      
      // Rotates the size and position in the geometry
      geo = geo.clone();
      geo.x += geo.width / 2 - geo.height / 2;
      geo.y += geo.height / 2 - geo.width / 2;
      var tmp = geo.width;
      geo.width = geo.height;
      geo.height = tmp;
      
      graph.getModel().setGeometry(cell, geo);
      
      // Reads the current direction and advances by 90 degrees
      var state = graph.view.getState(cell);
      
      if (state === null) {
        graph.getModel().endUpdate();
        return
      }
      let dir = state.style[mxConstants.STYLE_DIRECTION] || 'east' 
      dir = this.rotationMap[dir]
      graph.setCellStyles(mxConstants.STYLE_DIRECTION, dir, [cell]);
    }
    finally {
      graph.getModel().endUpdate();
    }
  }
}