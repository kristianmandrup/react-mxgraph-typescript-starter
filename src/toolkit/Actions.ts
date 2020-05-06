import { mxgraphFactory } from "ts-mxgraph";
import { defaults } from './defaults';

const { mxCodec, mxUtils } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

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
}